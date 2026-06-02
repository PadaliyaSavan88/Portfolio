import { useState } from 'react';
import bcrypt from 'bcryptjs';
import Link from 'next/link';

export default function BcryptInlineWidget() {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleHash() {
    if (!password) { setError('Enter a password first.'); return; }
    setError('');
    setLoading(true);
    setHash('');
    try {
      setHash(await bcrypt.hash(password, 12));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(hash).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="bcrypt-inline-widget">
      <h3 className="bcrypt-widget-heading">Try it — Hash a password with bcrypt</h3>
      <p className="bcrypt-widget-sub">Cost factor 12. Runs in your browser — nothing is stored or transmitted.</p>
      <div className="bcrypt-widget-row">
        <input
          type="text"
          placeholder="Enter any password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && handleHash()}
          className="bcrypt-widget-input"
          aria-label="Password to hash"
        />
        <button
          onClick={handleHash}
          disabled={loading || !password}
          className="bcrypt-widget-btn"
        >
          {loading ? 'Hashing…' : 'Hash'}
        </button>
      </div>
      {error && <p className="bcrypt-widget-error">{error}</p>}
      {hash && (
        <div className="bcrypt-widget-result">
          <code className="bcrypt-widget-hash">{hash}</code>
          <button onClick={handleCopy} className="bcrypt-widget-copy">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <p className="bcrypt-widget-footer">
        Need to verify a hash or adjust the cost rounds?{' '}
        <Link href="/tools/bcrypt-generator">Open the full bcrypt generator →</Link>
      </p>
    </div>
  );
}
