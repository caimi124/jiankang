import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HerbDetailClient from './HerbDetailClient'
import { herbs } from '../../../lib/herbs-data-complete'

interface HerbPageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for each herb
export async function generateMetadata({ params }: HerbPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const herb = herbs.find(h => 
    generateSlug(h.herbName, h.englishName) === resolvedParams.slug
  )
  
  if (!herb) {
    return {
      title: 'Herb Not Found | HerbScience.shop',
      description: 'The requested herb information could not be found.'
    }
  }

  const title = `${herb.herbName} (${herb.englishName}) - Complete Guide | HerbScience.shop`
  const description = herb.overview || herb.description || `Comprehensive guide to ${herb.herbName} - ${herb.benefits ? herb.benefits.substring(0, 150) + '...' : 'traditional uses, benefits, dosage, and safety information.'}`

  return {
    title,
    description,
    keywords: [
      herb.herbName,
      herb.englishName,
      herb.latinName,
      ...herb.tags,
      ...herb.efficacy,
      'traditional chinese medicine',
      'TCM',
      'herbal medicine',
      'natural remedies'
    ].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://herbscience.shop/herbs/${resolvedParams.slug}`,
      siteName: 'HerbScience.shop',
      images: [
        {
          url: `/herbs/${resolvedParams.slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${herb.herbName} (${herb.englishName}) - Traditional Chinese Medicine`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/herbs/${resolvedParams.slug}-og.jpg`],
    },
    alternates: {
      canonical: `https://herbscience.shop/herbs/${resolvedParams.slug}`,
      languages: {
        'en': `https://herbscience.shop/herbs/${resolvedParams.slug}`,
        'zh': `https://herbscience.shop/zh/herbs/${resolvedParams.slug}`,
      },
    },
  }
}

// Generate static params for all herbs
export async function generateStaticParams() {
  return herbs.map((herb) => ({
    slug: generateSlug(herb.herbName, herb.englishName),
  }))
}

// Generate slug from herb names
function generateSlug(chineseName: string, englishName: string): string {
  if (englishName) {
    return englishName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }
  return chineseName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
}

export default async function HerbDetailPage({ params }: HerbPageProps) {
  const resolvedParams = await params
  const herb = herbs.find(h => 
    generateSlug(h.herbName, h.englishName) === resolvedParams.slug
  )
  
  if (!herb) {
    notFound()
  }

  // Generate structured data for Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${herb.herbName} (${herb.englishName})`,
    description: herb.overview || herb.description,
    brand: {
      '@type': 'Brand',
      name: 'HerbScience.shop'
    },
    category: 'Herbal Medicine',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Latin Name',
        value: herb.latinName
      },
      {
        '@type': 'PropertyValue',
        name: 'Constitution Type',
        value: herb.constitutionType
      },
      {
        '@type': 'PropertyValue',
        name: 'Safety Level',
        value: herb.safetyLevel
      },
      {
        '@type': 'PropertyValue',
        name: 'Part Used',
        value: herb.partUsed
      },
      {
        '@type': 'PropertyValue',
        name: 'Taste',
        value: herb.taste
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (herb.qualityScore / 20).toFixed(1), // Convert 0-100 to 0-5 scale
      reviewCount: Math.floor(herb.popularityScore / 2), // Generate review count from popularity
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Traditional Chinese Medicine Practitioner'
        },
        reviewBody: herb.overview ? herb.overview.substring(0, 200) + '...' : `Excellent traditional herb with proven benefits for ${herb.efficacy.slice(0, 3).join(', ')}.`
      }
    ],
    offers: {
      '@type': 'Offer',
      availability: herb.availability === 'Common' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      priceRange: herb.priceRange === 'Low' ? '$' : herb.priceRange === 'Moderate' ? '$$' : '$$$',
      priceCurrency: 'USD',
      url: `https://herbscience.shop/herbs/${resolvedParams.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'HerbScience.shop'
      }
    },
    additionalType: 'https://schema.org/Drug',
    activeIngredient: herb.activeCompounds ? herb.activeCompounds.split(',').map(c => c.trim()) : [],
    dosageForm: 'Herb',
    mechanismOfAction: herb.mechanismOfAction,
    indication: herb.benefits,
    contraindication: herb.contraindications
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Main Component */}
      <HerbDetailClient herb={herb} />
    </>
  )
} 