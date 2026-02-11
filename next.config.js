/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.newsdata.io',
      },
      {
        protocol: 'https',
        hostname: 'newsdata.io',
      },
    ],
  },
}

module.exports = nextConfig
