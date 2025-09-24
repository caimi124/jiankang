import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TCM Constitution Test | Discover Your Body Type | HerbScience',
  description: 'Take our comprehensive TCM constitution test to discover your body type and get personalized herbal recommendations. 35-question assessment based on traditional Chinese medicine.',
  keywords: [
    'TCM constitution test',
    'body type test',
    'traditional chinese medicine',
    'herbal recommendations',
    'personalized medicine',
    'qi deficiency',
    'yin yang balance',
    'herbal consultation'
  ],
  openGraph: {
    title: 'TCM Constitution Test | Discover Your Body Type',
    description: 'Take our comprehensive TCM constitution test to discover your body type and get personalized herbal recommendations.',
    type: 'website',
    url: 'https://herbscience.shop/constitution-test',
    siteName: 'HerbScience.shop',
    images: [
      {
        url: 'https://herbscience.shop/constitution-test/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TCM Constitution Test - Discover Your Body Type'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCM Constitution Test | Discover Your Body Type',
    description: 'Take our comprehensive TCM constitution test to discover your body type.',
    images: ['https://herbscience.shop/constitution-test/opengraph-image']
  },
  alternates: {
    canonical: 'https://herbscience.shop/constitution-test',
    languages: {
      'en': 'https://herbscience.shop/constitution-test',
      'zh': 'https://herbscience.shop/zh/constitution-test',
      'x-default': 'https://herbscience.shop/constitution-test'
    }
  }
}

export default function ConstitutionTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
