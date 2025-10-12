import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics, { GoogleTagManagerNoScript } from '../components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
  description: 'Discover the power of herbal medicine with our evidence-based guide. Get personalized herb recommendations, safety information, and expert insights backed by scientific research.',
  keywords: [
    'herbal medicine',
    'natural remedies',
    'herbs for health',
    'traditional chinese medicine',
    'herbal supplements',
    'plant medicine',
    'alternative medicine',
    'natural healing',
    'herb safety',
    'evidence-based herbalism'
  ],
  openGraph: {
    title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    description: 'Discover the power of herbal medicine with our evidence-based guide. Get personalized herb recommendations, safety information, and expert insights.',
    type: 'website',
    url: 'https://herbscience.shop',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: 'https://herbscience.shop/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - Evidence-Based Herbal Medicine Guide'
      }
    ],
    locale: 'en_US',
    alternateLocale: ['zh_CN']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbScience.shop | Evidence-Based Herbal Medicine Guide',
    description: 'Discover the power of herbal medicine with our evidence-based guide.',
    images: ['https://herbscience.shop/opengraph-image']
  },
  alternates: {
    canonical: 'https://herbscience.shop/',
    languages: {
      'en': 'https://herbscience.shop/',
      'zh': 'https://herbscience.shop/zh',
      'x-default': 'https://herbscience.shop/'
    }
  },
  metadataBase: new URL('https://herbscience.shop'),
  // Google Search Console verification
  // 1. Go to https://search.google.com/search-console/
  // 2. Add property: https://herbscience.shop
  // 3. Use HTML tag method and paste the content value below
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || undefined
  },
  // Favicon configuration
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 结构化数据：WebSite + Organization
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HerbScience.shop',
    url: 'https://herbscience.shop',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://herbscience.shop/herb-finder?query={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HerbScience',
    alternateName: 'HERB SCIENCE',
    description: 'Health Customization through Evidence-Based Herbal Medicine',
    url: 'https://herbscience.shop',
    logo: {
      '@type': 'ImageObject',
      url: 'https://herbscience.shop/logo.svg',
      width: 256,
      height: 256
    },
    sameAs: [
      'https://www.facebook.com/herbscience',
      'https://www.instagram.com/herbscience',
      'https://www.youtube.com/@herbscience'
    ]
  }
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#059669" />
        <link rel="dns-prefetch" href="//herbscience.shop" />
        <link rel="preconnect" href="https://herbscience.shop" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        
        {/* Critical CSS inlined for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;margin:0;padding:0}
            html{font-size:16px;-webkit-text-size-adjust:100%}
            body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;line-height:1.5;color:#1f2937;background:#fff;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased}
            .hero-section{background:#f0fdf4;padding:3rem 1rem 2rem;text-align:center;min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center}
            .hero-title{font-size:clamp(1.5rem,4vw,2rem);font-weight:600;color:#0f172a;margin:0 0 1rem 0;line-height:1.2;max-width:90%;word-wrap:break-word}
            .hero-subtitle{font-size:clamp(0.9rem,2.5vw,1rem);color:#1f2937;margin:0 0 2rem 0;max-width:35rem;line-height:1.6}
            a{color:#059669;text-decoration:none}
            a:hover{text-decoration:underline}
            img{max-width:100%;height:auto;display:block;loading:lazy}
            button,a[role="button"]{cursor:pointer;border:none;outline:none;transition:opacity 0.2s ease}
            button:hover,a[role="button"]:hover{opacity:0.9}
            .loading-skeleton{background:#f3f4f6;border-radius:0.5rem;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
            @media(prefers-reduced-motion:reduce){*,::before,::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}
          `
        }} />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        {/* Structured data - non-blocking */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} 
          defer
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} 
          defer
        />
        
        {/* Google Analytics 和 Google Tag Manager */}
        <GoogleAnalytics />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) - 必须放在body开始处 */}
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  )
}