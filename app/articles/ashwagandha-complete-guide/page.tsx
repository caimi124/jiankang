import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { ArrowLeft, Clock, User, Calendar, Tag, Share, Bookmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ashwagandha Complete Guide: Benefits, Dosage, and Safety | HerbScience',
  description: 'Comprehensive guide to Ashwagandha (Withania somnifera) - benefits, dosage, side effects, interactions, and scientific evidence for stress relief and adaptogenic properties.',
  keywords: 'ashwagandha, withania somnifera, adaptogen, stress relief, anxiety, sleep, cortisol, ayurveda, herbal medicine',
  authors: [{ name: 'Dr. Sarah Chen, PhD Pharmacology' }],
  openGraph: {
    title: 'Ashwagandha Complete Guide: Benefits, Dosage, and Safety',
    description: 'Evidence-based guide to Ashwagandha for stress relief, better sleep, and overall wellness. Learn proper dosage and safety considerations.',
    type: 'article',
    url: 'https://www.herbscience.shop/articles/ashwagandha-complete-guide',
    siteName: 'HerbScience',
    images: [{
      url: '/hero-bg.svg',
      width: 1200,
      height: 630,
      alt: 'Ashwagandha Complete Guide'
    }]
  },
  alternates: {
    canonical: 'https://www.herbscience.shop/articles/ashwagandha-complete-guide'
  }
}

export default function AshwagandhaGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Ashwagandha Complete Guide: Benefits, Dosage, and Safety',
    description: 'Comprehensive guide to Ashwagandha (Withania somnifera) including benefits, dosage, side effects, and scientific evidence.',
    author: {
      '@type': 'Person',
      name: 'Dr. Sarah Chen',
      credentials: 'PhD Pharmacology'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.herbscience.shop/logo.png'
      }
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
    keywords: 'ashwagandha, adaptogen, stress relief, anxiety, sleep, herbal medicine',
    url: 'https://www.herbscience.shop/articles/ashwagandha-complete-guide'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Articles', href: '/articles' },
                { label: 'Ashwagandha Complete Guide', href: '/articles/ashwagandha-complete-guide' }
              ]} 
            />

            {/* Back button */}
            <div className="mb-6">
              <Link href="/articles">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Articles</span>
                </button>
              </Link>
            </div>

            {/* Article Header */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Adaptogenic Herbs</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    January 15, 2024
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    15 min read
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Dr. Sarah Chen
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Ashwagandha Complete Guide: Benefits, Dosage, and Safety
                </h1>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Ashwagandha (Withania somnifera), known as the "Indian Winter Cherry," is one of the most studied adaptogenic herbs. This comprehensive guide covers everything you need to know about using Ashwagandha safely and effectively for stress relief, better sleep, and overall wellness.
                </p>

                {/* Content Sections */}
                <div className="prose prose-lg max-w-none">
                  
                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is Ashwagandha?</h2>
                  <p className="text-gray-700 mb-6">
                    Ashwagandha is a powerful adaptogenic herb that has been used in Ayurvedic medicine for over 3,000 years. The name "Ashwagandha" comes from Sanskrit, meaning "smell of horse," referring to both its unique odor and its traditional belief to impart the strength and vitality of a horse.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-blue-900 mb-3">🧠 Stress & Anxiety Relief</h3>
                      <p className="text-blue-800 text-sm">Reduces cortisol levels by up to 30% and helps manage chronic stress and anxiety disorders.</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-purple-900 mb-3">😴 Better Sleep Quality</h3>
                      <p className="text-purple-800 text-sm">Improves sleep onset time and sleep quality through GABA pathway modulation.</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-green-900 mb-3">💪 Energy & Endurance</h3>
                      <p className="text-green-800 text-sm">Enhances physical performance, muscle strength, and reduces exercise-induced fatigue.</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-orange-900 mb-3">🛡️ Immune Support</h3>
                      <p className="text-orange-800 text-sm">Modulates immune system function and supports overall vitality and wellness.</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Dosage Guidelines</h2>
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Root Powder</h4>
                        <p className="text-gray-700 text-sm">1-6g daily, split into 2 doses</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Standardized Extract</h4>
                        <p className="text-gray-700 text-sm">300-500mg daily, with meals</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Liquid Extract</h4>
                        <p className="text-gray-700 text-sm">2-4ml daily, in water</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safety & Contraindications</h2>
                  <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                    <h3 className="font-semibold text-red-900 mb-3">Important Safety Information</h3>
                    <ul className="text-red-800 space-y-1">
                      <li>• Avoid during pregnancy and breastfeeding</li>
                      <li>• Not recommended for autoimmune diseases (lupus, MS, RA)</li>
                      <li>• May interact with diabetes and blood pressure medications</li>
                      <li>• Discontinue 2 weeks before surgery</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Scientific Evidence</h2>
                  <p className="text-gray-700 mb-4">
                    Multiple randomized controlled trials have demonstrated Ashwagandha's effectiveness:
                  </p>
                  <ul className="text-gray-700 space-y-2 mb-6">
                    <li>• <strong>Stress Reduction:</strong> 27.9% reduction in serum cortisol levels (Indian J Med Res, 2012)</li>
                    <li>• <strong>Anxiety:</strong> Significant improvement in anxiety scores vs placebo (Phytomedicine, 2019)</li>
                    <li>• <strong>Sleep Quality:</strong> 72% improvement in sleep quality scores (PLoS One, 2020)</li>
                    <li>• <strong>Physical Performance:</strong> Significant increase in muscle strength and mass (J Int Soc Sports Nutr, 2015)</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Choose Quality Ashwagandha</h2>
                  <div className="bg-yellow-50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">Quality Indicators</h3>
                    <ul className="text-yellow-800 space-y-1">
                      <li>• Standardized to contain 1.5-12% withanolides</li>
                      <li>• Third-party tested for purity and potency</li>
                      <li>• Organic certification preferred</li>
                      <li>• Reputable manufacturer with GMP certification</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4 mb-8">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">How long does it take to see results?</h4>
                      <p className="text-gray-700 text-sm">Most people notice stress relief within 1-2 weeks, while sleep and energy benefits may take 4-6 weeks of consistent use.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Can I take Ashwagandha with other supplements?</h4>
                      <p className="text-gray-700 text-sm">Generally yes, but avoid with sedatives or blood sugar medications without medical supervision. Always consult healthcare providers about interactions.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Should I cycle Ashwagandha use?</h4>
                      <p className="text-gray-700 text-sm">Yes, many experts recommend cycling: 6-8 weeks on, followed by a 2-week break to prevent tolerance.</p>
                    </div>
                  </div>

                </div>

                {/* Related Articles */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/articles/rhodiola-vs-ginseng-comparison" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">Rhodiola vs Ginseng: Choosing the Right Adaptogen</h4>
                      <p className="text-gray-600 text-sm">Compare these powerful adaptogens for energy and stress relief.</p>
                    </Link>
                    <Link href="/articles/natural-anxiety-relief-herbs" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">Natural Anxiety Relief: Evidence-Based Herbal Options</h4>
                      <p className="text-gray-600 text-sm">Discover herbs with proven anxiety-reducing effects.</p>
                    </Link>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Sarah Chen, PhD</h4>
                      <p className="text-gray-600 text-sm mb-2">Pharmacology & Herbal Medicine Research</p>
                      <p className="text-gray-700 text-sm">Dr. Chen specializes in adaptogenic herbs and their clinical applications. She has published over 50 peer-reviewed papers on herbal medicine safety and efficacy.</p>
                    </div>
                  </div>
                </div>

              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  )
} 