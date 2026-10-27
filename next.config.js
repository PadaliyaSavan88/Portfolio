/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      // Merged into the api-forge post on 2026-10-27 (two near-duplicate posts competing for the same queries).
      {
        source: "/blogs/build-express-api-with-api-forge",
        destination: "/blogs/api-forge-claude-code-backend-skill",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.savanpadaliya.com" }],
        destination: "https://savanpadaliya.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://savanpadaliya.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/api/robots" },
    ];
  },
};

module.exports = nextConfig;
