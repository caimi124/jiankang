'use client'

/**
 * 精选草药展示组件
 * 用途：在首页展示所有草药，帮助Google索引
 * 添加位置：app/page.tsx 或 app/HomeClient.tsx
 */

export default function FeaturedHerbsSection() {
  const featuredHerbs = [
    { name: 'Turmeric', slug: 'turmeric', icon: '🟡', priority: 'high' },
    { name: 'Ashwagandha', slug: 'ashwagandha', icon: '🟢', priority: 'high' },
    { name: 'Ginger', slug: 'ginger', icon: '🟠', priority: 'high' },
    { name: 'Cinnamon', slug: 'cinnamon', icon: '🟤', priority: 'high' },
    { name: 'Chamomile', slug: 'chamomile', icon: '🌼', priority: 'high' },
    { name: 'Peppermint', slug: 'peppermint', icon: '🌿', priority: 'high' },
    { name: 'Rhodiola', slug: 'rhodiola', icon: '🔴', priority: 'high' },
    { name: 'Echinacea', slug: 'echinacea', icon: '🟣', priority: 'medium' },
    { name: 'Valerian Root', slug: 'valerian-root', icon: '💜', priority: 'medium' },
    { name: "St. John's Wort", slug: 'st-johns-wort', icon: '🟡', priority: 'medium' },
    { name: 'Holy Basil', slug: 'holy-basil', icon: '🟢', priority: 'medium' },
    { name: 'Milk Thistle', slug: 'milk-thistle', icon: '🌸', priority: 'medium' },
    { name: 'Licorice Root', slug: 'licorice-root', icon: '🟤', priority: 'medium' },
    { name: 'Fenugreek', slug: 'fenugreek', icon: '🟨', priority: 'medium' },
    { name: 'Black Pepper', slug: 'black-pepper', icon: '⚫', priority: 'medium' },
    { name: 'Cayenne', slug: 'cayenne', icon: '🔴', priority: 'medium' },
    { name: 'Clove', slug: 'clove', icon: '🟤', priority: 'medium' },
    { name: 'Pumpkin Seeds', slug: 'pumpkin-seeds', icon: '🎃', priority: 'medium' },
    { name: 'Astragalus', slug: 'astragalus', icon: '🟡', priority: 'low' },
    { name: 'Bacopa', slug: 'bacopa', icon: '🟢', priority: 'low' },
    { name: 'Cordyceps', slug: 'cordyceps', icon: '🟫', priority: 'low' },
    { name: 'Gotu Kola', slug: 'gotu-kola', icon: '🌿', priority: 'low' },
    { name: 'Kava', slug: 'kava', icon: '🟤', priority: 'low' },
    { name: 'Lemon Balm', slug: 'lemon-balm', icon: '🍋', priority: 'low' },
    { name: "Lion's Mane", slug: 'lions-mane', icon: '🦁', priority: 'low' },
    { name: 'Nettle', slug: 'nettle', icon: '🌿', priority: 'low' },
    { name: 'Passionflower', slug: 'passionflower', icon: '🌺', priority: 'low' },
    { name: 'Reishi', slug: 'reishi', icon: '🍄', priority: 'low' },
    { name: 'Saw Palmetto', slug: 'saw-palmetto', icon: '🌴', priority: 'low' },
  ]

  const highPriority = featuredHerbs.filter(h => h.priority === 'high')
  const otherHerbs = featuredHerbs.filter(h => h.priority !== 'high')

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            🌿 Featured Herbal Encyclopedia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our curated herb database with detailed benefits, dosages, safety information, and scientific research support
          </p>
        </div>

        {/* 热门草药（大卡片） */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
            <span className="mr-2">⭐</span>
            Most Popular Herbs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {highPriority.map((herb) => (
              <a
                key={herb.slug}
                href={`/herbs/${herb.slug}`}
                className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border-2 border-transparent hover:border-green-400"
              >
                <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                  {herb.icon}
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  {herb.name}
                </span>
                <span className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 其他草药（小卡片） */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
            <span className="mr-2">🌱</span>
            More Herb Options
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-3">
            {otherHerbs.map((herb) => (
              <a
                key={herb.slug}
                href={`/herbs/${herb.slug}`}
                className="group bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                title={herb.name}
              >
                <span className="text-2xl mb-1">{herb.icon}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-green-600 line-clamp-2">
                  {herb.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 底部CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/herb-finder"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              🔍 Smart Herb Finder
            </a>
            <a
              href="/constitution-test"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              🧬 Constitution Test
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            💡 Tip: Take the constitution test to find herbs that match your body type
          </p>
        </div>
      </div>
    </section>
  )
}

