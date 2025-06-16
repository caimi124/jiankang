import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://herbscience.shop'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/herb-finder`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ingredient-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/knowledge-center`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/user-experiences`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Herb-specific pages (for future implementation)
  const herbPages = [
    'ashwagandha',
    'turmeric',
    'ginseng',
    'reishi-mushroom',
    'rhodiola',
    'ginger',
    'echinacea',
    'ginkgo-biloba'
  ].map(herb => ({
    url: `${baseUrl}/herbs/${herb}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Condition-specific pages (for future implementation)
  const conditionPages = [
    'anxiety',
    'insomnia',
    'depression',
    'digestive-issues',
    'inflammation',
    'immune-support',
    'stress-management',
    'cognitive-health'
  ].map(condition => ({
    url: `${baseUrl}/conditions/${condition}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...herbPages, ...conditionPages]
} 