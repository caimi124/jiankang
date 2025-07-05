// Next.js Configuration - Force Deployment Update: 2025-01-19 18:52:00
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different viewports
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domains for external images
    domains: ['images.unsplash.com', 'via.placeholder.com', 'herbscience.shop'],
    // Minimize image size for better loading
    minimumCacheTTL: 31536000, // 1 year
    // Remote patterns for security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },

  // Compression
  compress: true,

  // Power pack optimization
  poweredByHeader: false,

  // 实验性性能优化
  experimental: {
    // CSS 优化
    optimizeCss: true,
    // 预构建优化
    optimizePackageImports: ['lucide-react'],
    // 优化字体加载
    optimizeServerReact: true,
    // 减少 JavaScript bundle
    serverMinification: true,
  },

  // Headers for security and performance
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
          // 性能优化 headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // 静态资源缓存优化
      {
        source: '/(.*)\\.(js|css|woff|woff2|ico|png|jpg|jpeg|gif|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
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
        source: '/herbs',
        destination: '/herb-finder',
        permanent: true,
      }
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/search',
        destination: '/api/search',
      },
      // API 优化重写
      {
        source: '/api/v2/:path*',
        destination: '/api/:path*',
      }
    ]
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'herbscience-app',
  },

  // Enable TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable static optimization
  trailingSlash: false,

  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // SWC 优化
    styledComponents: false,
  },

  // Bundle 分析优化
  webpack: (config, { dev, isServer, webpack }) => {
    // 生产环境 bundle 优化
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
        },
      }
    }

    // 模块解析优化
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }

    return config
  },

  reactStrictMode: true,
}

module.exports = nextConfig 