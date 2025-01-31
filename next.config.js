/** @type {import('next').NextConfig} */
/*
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
*/
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
}

module.exports = nextConfig

