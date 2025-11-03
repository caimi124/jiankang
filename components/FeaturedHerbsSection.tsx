'use client'

/**
 * 精选草药展示组件
 * 用途：在首页展示所有草药，帮助Google索引
 * 添加位置：app/page.tsx 或 app/HomeClient.tsx
 */

export default function FeaturedHerbsSection() {
  const featuredHerbs = [
    { name: '姜黄', slug: 'turmeric', icon: '🟡', priority: 'high' },
    { name: '印度人参', slug: 'ashwagandha', icon: '🟢', priority: 'high' },
    { name: '生姜', slug: 'ginger', icon: '🟠', priority: 'high' },
    { name: '肉桂', slug: 'cinnamon', icon: '🟤', priority: 'high' },
    { name: '洋甘菊', slug: 'chamomile', icon: '🌼', priority: 'high' },
    { name: '薄荷', slug: 'peppermint', icon: '🌿', priority: 'high' },
    { name: '红景天', slug: 'rhodiola', icon: '🔴', priority: 'high' },
    { name: '紫锥菊', slug: 'echinacea', icon: '🟣', priority: 'medium' },
    { name: '缬草', slug: 'valerian-root', icon: '💜', priority: 'medium' },
    { name: '圣约翰草', slug: 'st-johns-wort', icon: '🟡', priority: 'medium' },
    { name: '圣罗勒', slug: 'holy-basil', icon: '🟢', priority: 'medium' },
    { name: '水飞蓟', slug: 'milk-thistle', icon: '🌸', priority: 'medium' },
    { name: '甘草', slug: 'licorice-root', icon: '🟤', priority: 'medium' },
    { name: '葫芦巴', slug: 'fenugreek', icon: '🟨', priority: 'medium' },
    { name: '黑胡椒', slug: 'black-pepper', icon: '⚫', priority: 'medium' },
    { name: '辣椒', slug: 'cayenne', icon: '🔴', priority: 'medium' },
    { name: '丁香', slug: 'clove', icon: '🟤', priority: 'medium' },
    { name: '南瓜子', slug: 'pumpkin-seeds', icon: '🎃', priority: 'medium' },
    { name: '黄芪', slug: 'astragalus', icon: '🟡', priority: 'low' },
    { name: '假马齿苋', slug: 'bacopa', icon: '🟢', priority: 'low' },
    { name: '冬虫夏草', slug: 'cordyceps', icon: '🟫', priority: 'low' },
    { name: '积雪草', slug: 'gotu-kola', icon: '🌿', priority: 'low' },
    { name: '卡瓦胡椒', slug: 'kava', icon: '🟤', priority: 'low' },
    { name: '柠檬香蜂草', slug: 'lemon-balm', icon: '🍋', priority: 'low' },
    { name: '猴头菇', slug: 'lions-mane', icon: '🦁', priority: 'low' },
    { name: '荨麻', slug: 'nettle', icon: '🌿', priority: 'low' },
    { name: '西番莲', slug: 'passionflower', icon: '🌺', priority: 'low' },
    { name: '灵芝', slug: 'reishi', icon: '🍄', priority: 'low' },
    { name: '锯棕榈', slug: 'saw-palmetto', icon: '🌴', priority: 'low' },
  ]

  const highPriority = featuredHerbs.filter(h => h.priority === 'high')
  const otherHerbs = featuredHerbs.filter(h => h.priority !== 'high')

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            🌿 精选中草药百科
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            探索我们精心整理的草药数据库，每种草药都有详细的功效、用量、安全信息和科学研究支持
          </p>
        </div>

        {/* 热门草药（大卡片） */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
            <span className="mr-2">⭐</span>
            最受欢迎的草药
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
                  查看详情 →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 其他草药（小卡片） */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
            <span className="mr-2">🌱</span>
            更多草药选择
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
              🔍 智能草药查找器
            </a>
            <a
              href="/constitution-test"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              🧬 体质测试
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            💡 提示：通过体质测试了解最适合您的草药
          </p>
        </div>
      </div>
    </section>
  )
}

