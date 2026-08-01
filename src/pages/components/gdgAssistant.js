import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getContextForQuery, KNOWLEDGE_BASE_UPDATED } from '@/lib/gdgKnowledgeBase';

const snapshotLabel = new Date(`${KNOWLEDGE_BASE_UPDATED}T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export default function GdgAssistant() {
  const [engine, setEngine] = useState(null);
  const [gpuSupported, setGpuSupported] = useState(null);
  const [status, setStatus] = useState('Checking WebGPU support...');
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const isInitializing = useRef(false);

  useEffect(() => {
    if (isInitializing.current) return;
    isInitializing.current = true;

    if (typeof navigator === 'undefined' || !navigator.gpu) {
      setGpuSupported(false);
      setStatus('This AI assistant runs fully in your browser via WebGPU. Please open this page in a recent desktop version of Chrome or Edge with hardware acceleration enabled.');
      return;
    }
    setGpuSupported(true);

    async function initModel() {
      try {
        const webllm = await import('@mlc-ai/web-llm');
        const initProgressCallback = (report) => setStatus(report.text);
        const modelId = 'gemma-2-2b-it-q4f16_1-MLC';
        const webLlmEngine = await webllm.CreateMLCEngine(modelId, { initProgressCallback });
        setEngine(webLlmEngine);
        setStatus('Gemma 2 loaded on your GPU. Ask a question below.');
      } catch (err) {
        console.error('WebGPU Init Error:', err);
        setStatus('Initialization failed. Ensure your browser has WebGPU and hardware acceleration enabled.');
      }
    }
    initModel();
  }, []);

  const askGemma = async () => {
    if (!engine || !input || loading) return;
    setLoading(true);
    setReply('');

    const matchedContext = getContextForQuery(input);
    const systemInstruction = `You are a helpful assistant answering questions about GDG Rajkot and GDG Cloud Rajkot, two Google Developer Group community chapters. Use ONLY the following context to answer accurately, and say you don't know if the answer isn't in the context.\nContext: ${matchedContext}`;

    try {
      const chunks = await engine.chat.completions.create({
        messages: [{ role: 'user', content: `${systemInstruction}\n\nQuestion: ${input}` }],
        stream: true,
      });

      for await (const chunk of chunks) {
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) setReply((prev) => prev + delta);
      }
    } catch (err) {
      console.error('Inference Error:', err);
      setReply('Error running the local WebGPU generation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-card-ui mt-4">
      <div className="mb-3" style={{ fontSize: '0.85rem', color: '#374151', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem' }}>
        <strong>Status:</strong> {status}
      </div>

      {gpuSupported && (
        <>
          <div className="mb-3">
            <label className="tool-label mb-2 d-block">Ask about GDG Rajkot or GDG Cloud Rajkot</label>
            <input
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Who organizes GDG Cloud Rajkot?"
              disabled={!engine || loading}
              onKeyDown={(e) => e.key === 'Enter' && askGemma()}
              style={{ borderRadius: 8, fontSize: '0.95rem' }}
            />
          </div>

          <button className="btn-primary-custom px-4" onClick={askGemma} disabled={!engine || loading || !input}>
            {loading ? 'Thinking…' : 'Ask'}
          </button>

          {reply && (
            <div className="mt-4">
              <p className="tool-label mb-2">Answer</p>
              <div className="gdg-answer">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{reply}</ReactMarkdown>
              </div>
            </div>
          )}
        </>
      )}

      <p className="mt-4 mb-0" style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
        Runs entirely on your device via WebGPU — nothing is sent to a server. First load downloads ~1.5GB of model weights (cached after). Community data as of {snapshotLabel}.
      </p>
    </div>
  );
}
