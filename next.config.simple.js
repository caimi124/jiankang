// 简化的Next.js配置 - 排查Constitution Test问题
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基本图片配置
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'herbscience.shop'],
    unoptimized: false,
  },

  // 基本设置
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  
  // 简化的实验性功能
  experimental: {
    optimizeCss: true,
  },

  // 基本重定向（保留核心功能）
  async redirects() {
    return [
      {
        source: '/test',
        destination: '/constitution-test',
        permanent: true,
      },
      {
        source: '/herbs/pumpkin-seed',
        destination: '/herbs/pumpkin-seeds',
        permanent: true,
      },
    ]
  },

  // TypeScript配置
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint配置
  eslint: {
    ignoreDuringBuilds: false, // 启用lint检查
  },

  // 启用React严格模式
  reactStrictMode: true,
}

module.exports = nextConfig
