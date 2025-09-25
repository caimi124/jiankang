'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Users, Star, CheckCircle } from 'lucide-react'

interface EnhancedCTAProps {
  type?: 'constitution-test' | 'herb-finder' | 'newsletter'
  className?: string
}

export default function EnhancedCTA({ type = 'constitution-test', className = '' }: EnhancedCTAProps) {
  const ctaConfigs = {
    'constitution-test': {
      title: 'Discover Your Perfect Herbs',
      subtitle: 'Take our TCM Constitution Test for personalized herbal recommendations',
      benefits: [
        'Complete in 5 minutes',
        'Based on 2000+ years of TCM wisdom',
        'Personalized herb recommendations',
        'Completely free to use'
      ],
      buttonText: 'Start Constitution Test',
      buttonHref: '/constitution-test',
      stats: { users: '50,000+', accuracy: '95%', time: '5 minutes' },
      gradient: 'from-green-500 to-blue-600'
    },
    'herb-finder': {
      title: 'Find Your Ideal Herbs',
      subtitle: 'Smart matching based on your symptoms and constitution',
      benefits: [
        'Intelligent symptom matching',
        'Safety assessment included',
        'Dosage guidance provided',
        'Expert recommendations'
      ],
      buttonText: 'Start Herb Finder',
      buttonHref: '/herb-finder',
      stats: { herbs: '200+', matches: 'Precise matching', safety: 'Safety checked' },
      gradient: 'from-purple-500 to-pink-600'
    },
    'newsletter': {
      title: 'Get Latest Herbal Insights',
      subtitle: 'Subscribe to our expert herbal wellness newsletter',
      benefits: [
        'Weekly curated content',
        'Expert deep-dive analysis',
        'Practical health tips',
        'Unsubscribe anytime'
      ],
      buttonText: 'Subscribe Free',
      buttonHref: '/newsletter',
      stats: { subscribers: '10,000+', articles: 'Weekly updates', expert: 'Expert written' },
      gradient: 'from-orange-500 to-red-600'
    }
  }

  const config = ctaConfigs[type]

  return (
    <div className={`bg-gradient-to-br ${config.gradient} rounded-2xl p-8 text-white ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {config.title}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {config.subtitle}
          </p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(config.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-white/80 text-sm capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* 优势列表 */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {config.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-white/90 flex-shrink-0" />
              <span className="text-white/90">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="text-center">
          <Link 
            href={config.buttonHref}
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <span>{config.buttonText}</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <p className="mt-4 text-white/70 text-sm">
            <Clock className="inline h-4 w-4 mr-1" />
            Get started instantly - no registration required
          </p>
        </div>

        {/* 社会证明 */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">Trusted by thousands</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm">4.9 star rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}