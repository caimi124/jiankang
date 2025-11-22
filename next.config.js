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
  
  // 性能监控
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },


  // 🎯 重定向规则（优化顺序，避免循环）
  async redirects() {
    return [
      // ===== 1. index.html 清理 =====
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
      
      // ===== 2. 旧 URL 格式重定向（herb-finder → herbs）=====
      {
        source: '/herb-finder/:slug',
        destination: '/herbs/:slug',
        permanent: true,
      },
      
      // ===== 3. 草药页面URL规范化 =====
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
        source: '/herbs/rhodiola-rosea',
        destination: '/herbs/rhodiola',
        permanent: true,
      },
      
      // ===== 4. 测试页面重定向 =====
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
      {
        source: '/simple-test',
        destination: '/constitution-test/quick',
        permanent: true,
      },
      
      // ===== 5. 旧路径重定向 =====
      {
        source: '/articles',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/quiz',
        destination: '/constitution-test',
        permanent: true,
      },
      {
        source: '/quiz/:path*',
        destination: '/constitution-test/:path*',
        permanent: true,
      },
      
      // ===== 6. 功能页面重命名 =====
      {
        source: '/ingredient-checker',
        destination: '/constitution-test',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
    ]
  },

  // 🔧 安全和性能 Headers（合并版）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // HTTPS 强制
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // 安全性
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          // CSP（内容安全策略）
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://cdn.sanity.io https://api.sanity.io",
              "frame-src 'self' https://www.googletagmanager.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'"
            ].join('; ')
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
