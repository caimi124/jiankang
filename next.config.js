// 简化的Next.js配置 - 排查Constitution Test问题
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🖼️ 图片优化配置
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'herbscience.shop'],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'], // 使用现代图片格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // 响应式尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 图标尺寸
    minimumCacheTTL: 86400, // 24小时缓存
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 基本设置
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  swcMinify: true, // 使用SWC压缩器提升性能

  // 确保没有额外的重定向
  skipTrailingSlashRedirect: true,
  
  // 🚀 Core Web Vitals 优化
  compiler: {
    // 移除console.log以减少包大小
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // 临时禁用ESLint检查 - 紧急调试模式
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 📊 性能优化实验性功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/lib', '@/components'],
    turbo: {
      resolveAlias: {
        canvas: './empty-module.js',
      },
    },
    // 启用部分渲染预加载
    ppr: false, // 稳定版本暂时关闭
  },
  
  // 🎨 性能监控
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // 基本重定向（保留核心功能）
  async redirects() {
    return [
      // 🔧 修复重复URL问题 - 移除 index.html
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/zh/index.html',
        destination: '/zh',
        permanent: true,
      },
      
      // 🎯 强制HTTPS重定向（消除http://重定向链）
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://herbscience.shop/:path*',
        permanent: true,
      },
      
      // 🌐 规范化域名（消除www重定向）
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.herbscience.shop',
          },
        ],
        destination: 'https://herbscience.shop/:path*',
        permanent: true,
      },
      
      // 🔧 测试页面重定向
      {
        source: '/test',
        destination: '/constitution-test',
        permanent: true,
      },
      {
        source: '/test/:path*',
        destination: '/constitution-test/:path*',
        permanent: true,
      },
      
      // 🌿 草药页面URL规范化
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
      {
        source: '/herb-finder/:slug',
        destination: '/herbs/:slug',
        permanent: true,
      },
      
      // 📚 旧文章路径重定向
      {
        source: '/articles/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/quiz/:path*',
        destination: '/constitution-test/:path*',
        permanent: true,
      },
    ]
  },

  // 🔧 强制HTTPS和安全headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
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
