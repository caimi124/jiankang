/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance Optimizations
  experimental: {
    // Enable edge runtime for better performance
    runtime: 'nodejs',
    // Optimize bundle size
    optimizeCss: true,
    // Enable concurrent features
    appDir: true,
    // Enable server components logging
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  },

  // Image Optimization
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Image quality settings
    quality: 80,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different viewports
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domains for external images
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    // Minimize image size for better loading
    minimumCacheTTL: 31536000, // 1 year
    // Enable blur placeholder
    placeholder: 'blur',
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

  // Enable SWC minification
  swcMinify: true,

  // Webpack optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      }
    }

    // Add bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      )
    }

    return config
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
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
        source: '/herbs',
        destination: '/herb-finder',
        permanent: true,
      },
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/search',
        destination: '/api/search',
      },
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
    ignoreDuringBuilds: false,
  },

  // Output settings for deployment
  output: 'standalone', // For Docker deployments
  
  // Enable static optimization
  trailingSlash: false,
  
  // API routes
  async apiRoutes() {
    return {
      '/api/health': {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    }
  },
}

module.exports = nextConfig 