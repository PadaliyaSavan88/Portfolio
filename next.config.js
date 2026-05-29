/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
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
