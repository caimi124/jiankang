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
    domains: ['images.unsplash.com', 'via.placeholder.com'],
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

  // Enable SWC minification
  swcMinify: true,

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

  // Enable static optimization
  trailingSlash: false,
}

module.exports = nextConfig 