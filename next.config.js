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
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
    // 最小缓存时间
    minimumCacheTTL: 31536000, // 1年
    // 远程模式
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },

  // 启用压缩
  compress: true,

  // 隐藏Powered By头
  poweredByHeader: false,

  // 🚀 实验性性能优化
  experimental: {
    // CSS优化
    optimizeCss: true,
  },

  // 🚀 性能优化headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
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
      // 域名规范化重定向
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
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'herbscience.shop',
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'https',
          },
        ],
        destination: 'https://herbscience.shop/:path*',
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

  // 🚀 Webpack优化
  webpack: (config, { dev, isServer, webpack }) => {
    // 生产环境bundle优化
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
          // 🚀 新增：草药相关组件单独打包
          herbs: {
            test: /[\\/]components[\\/]Herb/,
            name: 'herbs',
            chunks: 'all',
            priority: 3,
          }
        },
      }
    }

    // 模块解析优化
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }

    // 🚀 新增：启用模块联邦
    if (!isServer) {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: 'herbscience',
          filename: 'remoteEntry.js',
          exposes: {
            './HerbCard': './components/HerbRecommendations.tsx',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      )
    }

    return config
  },

  reactStrictMode: true,
}

module.exports = nextConfig 