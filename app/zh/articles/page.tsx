import React from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export default function Articles() {
  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '文章' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                📚 专业文章
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                深度的草药研究文章和专业分析，为您提供权威的健康知识。
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-32 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-8xl mb-8">🔬</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              专业文章即将上线
            </h2>
            <p className="text-xl text-gray-600">
              我们正在准备更多专业的草药研究文章，敬请期待！
            </p>
          </div>
        </section>
      </div>
    </div>
  )
} 