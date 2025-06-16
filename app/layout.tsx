import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'HerbScience.shop - Discover the Science of Herbal Supplements',
    template: '%s | HerbScience.shop'
  },
  description: 'Trusted knowledge about traditional herbs, tailored recommendations, and tools to understand how herbs work for your body type. Find the right herbal supplements backed by science.',
  keywords: ['herbal supplements', 'traditional chinese medicine', 'TCM', 'herbs', 'natural health', 'body constitution', 'herbal remedies', 'plant medicine'],
  authors: [{ name: 'HerbScience Team' }],
  creator: 'HerbScience.shop',
  publisher: 'HerbScience.shop',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://herbscience.shop',
    siteName: 'HerbScience.shop',
    title: 'Discover the Science of Herbal Supplements',
    description: 'Trusted knowledge about traditional herbs, tailored recommendations, and tools to understand how herbs work for your body type.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience.shop - Herbal Supplements Science',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover the Science of Herbal Supplements',
    description: 'Trusted knowledge about traditional herbs, tailored recommendations, and tools to understand how herbs work for your body type.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://herbscience.shop',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        {/* Analytics and tracking scripts can be added here */}
      </body>
    </html>
  )
} 