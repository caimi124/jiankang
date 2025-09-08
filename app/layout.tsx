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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2) format('woff2')}
            @font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2) format('woff2')}
            *{box-sizing:border-box}
            body{font-family:Inter,system-ui,sans-serif;margin:0;padding:0;line-height:1.6;overflow-x:hidden}
            .hero-section{background:linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 100%);padding:5rem 1rem;text-align:center;min-height:70vh;display:flex;align-items:center;justify-content:center}
            .hero-title{font-size:3rem;font-weight:600;color:#0f172a;margin:0 0 1rem 0;line-height:1.2;text-size-adjust:100%}
            .hero-subtitle{font-size:1.25rem;color:#475569;margin:0 0 2rem 0;max-width:48rem;margin-left:auto;margin-right:auto;text-size-adjust:100%}
            img{height:auto;width:auto;max-width:100%}
            @media(max-width:768px){.hero-title{font-size:2rem}.hero-subtitle{font-size:1.125rem}.hero-section{min-height:60vh;padding:3rem 1rem}}
          `
        }} />
        <link rel="preload" href="/logo.png" as="image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}