export default async function handler(req, res) {
  const robots = `User-agent: *
Allow: /

# AI crawlers — explicitly allowed for GEO/AEO indexing
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /

# LLM content files
LLMs: https://www.savanpadaliya.com/llms.txt
LLMs-full: https://www.savanpadaliya.com/llms-full.txt

Sitemap: https://www.savanpadaliya.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
}
