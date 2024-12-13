/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  onError: (error, errorInfo) => {
    console.error('Runtime error:', error, errorInfo);
  },
}

module.exports = nextConfig

