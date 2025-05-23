/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '**',
      }
    ],
  },
}

module.exports = nextConfig 