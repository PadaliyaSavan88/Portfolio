export default async function handler(req, res) {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

# AI crawlers — explicitly allowed for GEO/AEO indexing
User-agent: GPTBot
Allow: /
Disallow: /api/

User-agent: ChatGPT-User
Allow: /
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: anthropic-ai
Allow: /
Disallow: /api/

User-agent: cohere-ai
Allow: /
Disallow: /api/

# LLM content files
# LLMs: https://savanpadaliya.com/llms.txt
# LLMs-full: https://savanpadaliya.com/llms-full.txt

Sitemap: https://savanpadaliya.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
}
