import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://herbscience.shop'
  const currentDate = new Date().toISOString()

  // 核心草药列表（32个）
  const herbSlugs = [
    // 高优先级草药
    'turmeric', 'ashwagandha', 'ginger', 'ginseng', 'cinnamon',
    // 流行草药
    'peppermint', 'chamomile', 'echinacea', 'valerian-root', 'st-johns-wort',
    'milk-thistle', 'holy-basil', 'rhodiola',
    // 其他草药
    'licorice-root', 'elderberry', 'fenugreek', 'black-pepper', 'cayenne',
    'clove', 'pumpkin-seeds', 'onion', 'astragalus', 'bacopa', 'cordyceps',
    'gotu-kola', 'kava', 'lemon-balm', 'lions-mane', 'maca-root', 'nettle',
    'passionflower', 'reishi', 'saw-palmetto'
  ]

  return [
    // 首页（最高优先级）
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          zh: `${baseUrl}/zh`,
        },
      },
    },
    // 中文首页
    {
      url: `${baseUrl}/zh`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: baseUrl,
          zh: `${baseUrl}/zh`,
        },
      },
    },

    // 核心功能页面
    {
      url: `${baseUrl}/constitution-test`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/constitution-test`,
          zh: `${baseUrl}/zh/constitution-test`,
        },
      },
    },
    {
      url: `${baseUrl}/herb-finder`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/herb-finder`,
          zh: `${baseUrl}/zh/herb-finder`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/blog`,
          zh: `${baseUrl}/zh/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          zh: `${baseUrl}/zh/about`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // 草药详情页（32个）
    ...herbSlugs.map((slug, index) => {
      // 根据位置分配优先级
      let priority = 0.75
      if (slug === 'turmeric') priority = 0.9
      else if (index < 5) priority = 0.85
      else if (index < 13) priority = 0.8

      return {
        url: `${baseUrl}/herbs/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority,
      }
    }),

    // 中文版核心页面
    {
      url: `${baseUrl}/zh/constitution-test`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/herb-finder`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}

