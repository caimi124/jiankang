/**
 * 相关草药推荐组件 - 增强内部链接结构
 * 帮助Google发现更多页面，提升整站SEO
 */

import React from 'react'
import Link from 'next/link'

interface RelatedHerb {
  /** 草药名称 */
  name: string
  /** URL slug */
  slug: string
  /** 简短描述 */
  shortDescription: string
  /** 主要功效（可选） */
  primaryBenefit?: string
  /** 图标emoji（可选） */
  icon?: string
}

interface RelatedHerbsSectionProps {
  /** 当前草药的slug（用于排除自己） */
  currentSlug: string
  /** 相关草药列表（可选，如果没有则显示默认推荐） */
  relatedHerbs?: RelatedHerb[]
  /** 推荐数量 */
  count?: number
}

export default function RelatedHerbsSection({ 
  currentSlug,
  relatedHerbs,
  count = 3
}: RelatedHerbsSectionProps) {
  
  // 默认的热门草药推荐
  const defaultHerbs: RelatedHerb[] = [
    {
      name: 'Turmeric',
      slug: 'turmeric',
      shortDescription: 'Powerful anti-inflammatory and antioxidant properties for joint health and brain function.',
      primaryBenefit: 'Anti-inflammatory',
      icon: '🌟'
    },
    {
      name: 'Ashwagandha',
      slug: 'ashwagandha',
      shortDescription: 'Adaptogenic herb for stress relief, energy balance, and immune support.',
      primaryBenefit: 'Stress Relief',
      icon: '🧘'
    },
    {
      name: 'Ginger',
      slug: 'ginger',
      shortDescription: 'Digestive support, nausea relief, and anti-inflammatory benefits.',
      primaryBenefit: 'Digestive Health',
      icon: '🫚'
    },
    {
      name: 'Ginseng',
      slug: 'ginseng',
      shortDescription: 'Energy booster, cognitive enhancement, and immune system support.',
      primaryBenefit: 'Energy & Focus',
      icon: '⚡'
    },
    {
      name: 'Cinnamon',
      slug: 'cinnamon',
      shortDescription: 'Blood sugar regulation, antioxidant properties, and metabolic support.',
      primaryBenefit: 'Blood Sugar Control',
      icon: '🌿'
    },
    {
      name: 'Peppermint',
      slug: 'peppermint',
      shortDescription: 'Digestive comfort, headache relief, and respiratory support.',
      primaryBenefit: 'Digestive Comfort',
      icon: '🍃'
    },
    {
      name: 'Chamomile',
      slug: 'chamomile',
      shortDescription: 'Relaxation, sleep support, and gentle digestive aid.',
      primaryBenefit: 'Sleep & Relaxation',
      icon: '🌼'
    },
    {
      name: 'Echinacea',
      slug: 'echinacea',
      shortDescription: 'Immune system support and cold prevention.',
      primaryBenefit: 'Immune Support',
      icon: '🛡️'
    },
    {
      name: 'Valerian Root',
      slug: 'valerian-root',
      shortDescription: 'Natural sleep aid and anxiety reduction.',
      primaryBenefit: 'Sleep Aid',
      icon: '😴'
    }
  ]

  // 使用提供的相关草药或默认列表
  let displayHerbs = relatedHerbs || defaultHerbs
  
  // 排除当前草药
  displayHerbs = displayHerbs.filter(herb => herb.slug !== currentSlug)
  
  // 限制数量
  displayHerbs = displayHerbs.slice(0, count)

  if (displayHerbs.length === 0) {
    return null
  }

  return (
    <div className="mt-12 border-t pt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🌿 Related Herbs You May Like
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Explore similar herbs and natural remedies for your wellness journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayHerbs.map((herb) => (
          <Link 
            key={herb.slug} 
            href={`/herbs/${herb.slug}`}
            className="group block p-5 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-xl transition-all duration-300 bg-white"
          >
            {/* 顶部：图标和主要功效 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl" aria-hidden="true">{herb.icon || '🌱'}</span>
              {herb.primaryBenefit && (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {herb.primaryBenefit}
                </span>
              )}
            </div>
            
            {/* 标题 */}
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors mb-2">
              {herb.name}
            </h3>
            
            {/* 描述 */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
              {herb.shortDescription}
            </p>
            
            {/* 查看更多链接 */}
            <div className="flex items-center text-green-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Learn more</span>
              <svg 
                className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      {/* 查看所有草药链接 */}
      <div className="mt-6 text-center">
        <Link 
          href="/herb-finder" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm hover:underline"
        >
          <span>Browse All Herbs</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
      
      {/* 结构化数据：ItemList（相关项目列表） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Related Herbs',
            itemListElement: displayHerbs.map((herb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `https://herbscience.shop/herbs/${herb.slug}`,
              name: herb.name
            }))
          })
        }}
      />
    </div>
  )
}

