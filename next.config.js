/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.SUPABASE_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
