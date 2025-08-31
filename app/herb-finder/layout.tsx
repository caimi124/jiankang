import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Herb Finder | Find Herbs for Your Symptoms | HerbScience',
  description: 'Find the perfect herbs for your symptoms with our intelligent herb finder. Search by symptoms, constitution type, or health goals. Evidence-based recommendations.',
  keywords: [
    'herb finder',
    'herbal medicine',
    'symptom based herbs',
    'herbal recommendations',
    'traditional medicine',
    'herb search',
    'herbal consultation',
    'natural remedies'
  ],
  openGraph: {
    title: 'Herb Finder | Find Herbs for Your Symptoms',
    description: 'Find the perfect herbs for your symptoms with our intelligent herb finder. Search by symptoms, constitution type, or health goals.',
    type: 'website',
    url: 'https://herbscience.shop/herb-finder',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: 'https://herbscience.shop/herb-finder/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Herb Finder - Find Herbs for Your Symptoms'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herb Finder | Find Herbs for Your Symptoms',
    description: 'Find the perfect herbs for your symptoms with our intelligent herb finder.',
    images: ['https://herbscience.shop/herb-finder/opengraph-image']
  },
  alternates: {
    canonical: 'https://herbscience.shop/herb-finder',
    languages: {
      'en': 'https://herbscience.shop/herb-finder',
      'zh': 'https://herbscience.shop/zh/herb-finder',
      'x-default': 'https://herbscience.shop/herb-finder'
    }
  }
}

export default function HerbFinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
