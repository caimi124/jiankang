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

  // 确保没有额外的重定向
  skipTrailingSlashRedirect: true,
  
  // 临时禁用ESLint检查 - 紧急调试模式
  eslint: {
    ignoreDuringBuilds: true,
  },
  
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
      {
        source: '/herbs/cloves',
        destination: '/herbs/clove',
        permanent: true,
      },
    ]
  },

  // TypeScript配置
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint配置（紧急调试：构建时忽略）
  // 注意：上方已设置 eslint.ignoreDuringBuilds = true，不要在此处覆盖

  // 启用React严格模式
  reactStrictMode: true,
}

module.exports = nextConfig
