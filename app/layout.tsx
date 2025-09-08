import type { Metadata } from 'next'
import './globals.css'

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
  metadataBase: new URL('https://herbscience.shop')
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
    url: 'https://herbscience.shop',
    logo: {
      '@type': 'ImageObject',
      url: 'https://herbscience.shop/logo.png',
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
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;margin:0;padding:0}
            html{font-size:16px;-webkit-text-size-adjust:100%}
            body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.5;color:#1f2937;background:#fff;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased}
            .hero-section{background:#f0fdf4;padding:3rem 1rem 2rem;text-align:center;min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center}
            .hero-title{font-size:2rem;font-weight:600;color:#0f172a;margin:0 0 1rem 0;line-height:1.2;max-width:90%;word-wrap:break-word}
            .hero-subtitle{font-size:1rem;color:#1f2937;margin:0 0 2rem 0;max-width:35rem;line-height:1.6}
            a{color:#059669;text-decoration:none}
            a:hover{text-decoration:underline}
            img{max-width:100%;height:auto;display:block}
            button,a[role="button"]{cursor:pointer;border:none;outline:none;transition:opacity 0.2s}
            button:hover,a[role="button"]:hover{opacity:0.9}
          `
        }} />
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}