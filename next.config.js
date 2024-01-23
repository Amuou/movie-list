/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sxqjaqqxqdjirgvgslat.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
