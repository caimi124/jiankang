// Next.js Configuration - Performance Optimized: 2025-01-19
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 性能优化：简化图片配置
  images: {
    // 启用现代图片格式
    formats: ['image/webp', 'image/avif'],
    // 优化设备尺寸
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // 优化图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // 外部图片域名
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'herbscience.shop'],
    // 最小缓存时间
    minimumCacheTTL: 31536000, // 1年
    // 远程模式
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'herbscience.shop',
        pathname: '/images/**',
      },
    ],
    // 禁用图片优化以排除问题
    unoptimized: false,
  },

  // 启用压缩
  compress: true,

  // 隐藏Powered By头
  poweredByHeader: false,

  // 🚀 实验性性能优化
  experimental: {
    // CSS优化
    optimizeCss: true,
    // 优化包导入
    optimizePackageImports: ['react', 'react-dom', 'next', '@heroicons/react', 'lucide-react'],
  },

  // 🚀 优化服务器组件
  transpilePackages: ['@sanity/client', '@sanity/image-url'],

  // 🚀 性能优化headers（移除可能阻止JavaScript的严格安全头）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // 在开发环境不添加HSTS
          ...(process.env.NODE_ENV === 'production' ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }] : []),
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // 🚀 优化：更长的缓存时间
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      },
      // 🚀 优化：静态资源缓存
      {
        source: '/(.*)\\.(js|css|woff|woff2|ico|png|jpg|jpeg|gif|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // 🚀 新增：API缓存优化
      {
        source: '/api/herbs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=600'
          }
        ]
      }
    ]
  },

  // 重定向配置
  async redirects() {
    return [
      // 域名规范化重定向 - 统一使用www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'herbscience.shop',
          },
        ],
        destination: 'https://www.herbscience.shop/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.herbscience.shop',
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'https',
          },
        ],
        destination: 'https://www.herbscience.shop/:path*',
        permanent: true,
      },
      // 页面重定向
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/test',
        destination: '/constitution-test',
        permanent: true,
      },
      {
        source: '/test-enhanced',
        destination: '/constitution-test',
        permanent: true,
      },
      {
        source: '/test-cms',
        destination: '/admin',
        permanent: true,
      },
      // 草药别名重定向
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

  // 重写配置
  async rewrites() {
    return [
      {
        source: '/search',
        destination: '/api/search',
      },
      {
        source: '/api/v2/:path*',
        destination: '/api/:path*',
      }
    ]
  },

  // 环境变量
  env: {
    CUSTOM_KEY: 'herbscience-app',
  },

  // TypeScript配置
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint配置
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 静态优化
  trailingSlash: false,

  // 🚀 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },



  // 🚀 Webpack配置 - 性能优化
  webpack: (config, { dev, isServer }) => {
    // 仅在开发环境添加基本的路径别名
    if (dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname),
      }
    }

    // 🚀 彻底禁用polyfills和core-js + 移除未使用模块
    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js': false,
      '@babel/runtime': false,
      // 移除未使用的大型依赖
      'lodash': false,
      'moment': false,
      'axios': false,
      'date-fns': false,
      'classnames': 'clsx', // 使用轻量级替代品
    }
    
    
    // 启用tree shaking和dead code elimination + 现代化优化
    config.optimization = {
      ...config.optimization,
      sideEffects: false,
      // 移除旧版代码
      moduleIds: 'deterministic',
      // 优化打包大小
      minimize: !dev,
    }

    // 🚀 移动端优化：激进的代码分割 + 禁用polyfills
    if (!isServer && !dev) {
      // 禁用不必要的polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        path: false,
        os: false,
        fs: false,
      }
      
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 10,
            },
            icons: {
              test: /[\\/]node_modules[\\/](@heroicons|lucide-react)[\\/]/,
              name: 'icons',
              chunks: 'async',
              priority: 5,
            },
            sanity: {
              test: /[\\/]node_modules[\\/](@sanity|next-sanity)[\\/]/,
              name: 'sanity',
              chunks: 'async',
              priority: 5,
            },
          },
        },
      }
    }

    return config
  },

  reactStrictMode: true,
}

module.exports = nextConfig 