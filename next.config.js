/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      }
    ];
  },
  reactStrictMode: true,
}

module.exports = nextConfig
