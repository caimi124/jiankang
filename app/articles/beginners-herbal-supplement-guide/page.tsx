import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { ArrowLeft, Clock, User, Calendar, AlertTriangle, CheckCircle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Beginner\'s Guide to Herbal Supplements: Safety, Dosage & Tips | HerbScience',
  description: 'Complete beginner\'s guide to starting herbal supplements safely. Learn about dosage, interactions, quality indicators, and how to choose the right herbs for your health goals.',
  keywords: 'herbal supplements, beginner guide, herbal medicine safety, dosage, herb interactions, natural health',
  authors: [{ name: 'Dr. Michael Torres, ND' }],
  openGraph: {
    title: 'Beginner\'s Guide to Herbal Supplements: Safety & Best Practices',
    description: 'Learn how to start using herbal supplements safely with our comprehensive beginner\'s guide. Expert tips on dosage, quality, and interactions.',
    type: 'article',
    url: 'https://www.herbscience.shop/articles/beginners-herbal-supplement-guide',
    siteName: 'HerbScience',
    images: [{
      url: '/hero-bg.svg',
      width: 1200,
      height: 630,
      alt: 'Beginner\'s Guide to Herbal Supplements'
    }]
  },
  alternates: {
    canonical: 'https://www.herbscience.shop/articles/beginners-herbal-supplement-guide'
  }
}

export default function BeginnersHerbalGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beginner\'s Guide to Herbal Supplements: Safety, Dosage & Tips',
    description: 'Complete guide for beginners starting with herbal supplements, covering safety, dosage, interactions, and quality considerations.',
    author: {
      '@type': 'Person',
      name: 'Dr. Michael Torres',
      credentials: 'ND, Naturopathic Doctor'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.herbscience.shop/logo.png'
      }
    },
    datePublished: '2024-01-03',
    dateModified: '2024-01-03',
    keywords: 'herbal supplements, beginner guide, safety, dosage, natural health',
    url: 'https://www.herbscience.shop/articles/beginners-herbal-supplement-guide'
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
                { label: 'Beginner\'s Herbal Supplement Guide', href: '/articles/beginners-herbal-supplement-guide' }
              ]} 
            />

            <div className="mb-6">
              <Link href="/articles">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Articles</span>
                </button>
              </Link>
            </div>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Beginner Guide</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    January 3, 2024
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    12 min read
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Dr. Michael Torres
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Starting Herbal Supplements: A Beginner's Safety Guide
                </h1>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Embarking on your herbal wellness journey? This comprehensive guide will help you navigate the world of herbal supplements safely and effectively, from choosing quality products to understanding proper dosages and potential interactions.
                </p>

                <div className="prose prose-lg max-w-none">
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                    <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-yellow-900 mb-2">Important Safety Notice</h3>
                        <p className="text-yellow-800 text-sm">Always consult with a healthcare provider before starting any herbal supplement, especially if you have existing health conditions or take medications.</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Understand Your Goals</h2>
                  <p className="text-gray-700 mb-6">
                    Before choosing any herbal supplement, clearly define what you want to achieve. Different herbs serve different purposes, and matching your goals with the right herbs is crucial for success.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-green-900 mb-3">🎯 Common Health Goals</h3>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Stress management & relaxation</li>
                        <li>• Better sleep quality</li>
                        <li>• Increased energy & vitality</li>
                        <li>• Immune system support</li>
                        <li>• Digestive health improvement</li>
                        <li>• Cognitive function enhancement</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-blue-900 mb-3">📋 Questions to Ask Yourself</h3>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• What specific symptoms am I experiencing?</li>
                        <li>• What medications am I currently taking?</li>
                        <li>• Do I have any chronic health conditions?</li>
                        <li>• Am I pregnant or breastfeeding?</li>
                        <li>• What's my budget and timeline?</li>
                      </ul>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Choose Quality Products</h2>
                  <p className="text-gray-700 mb-6">
                    Not all herbal supplements are created equal. Here's how to identify high-quality products that are safe and effective.
                  </p>

                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">🔍 Quality Indicators to Look For</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Certifications
                        </h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Third-party tested</li>
                          <li>• GMP (Good Manufacturing Practice)</li>
                          <li>• Organic certification</li>
                          <li>• USP (United States Pharmacopeia)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Label Information
                        </h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Standardized extract percentages</li>
                          <li>• Clear dosage instructions</li>
                          <li>• Expiration dates</li>
                          <li>• Complete ingredient list</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Start with Beginner-Friendly Herbs</h2>
                  <p className="text-gray-700 mb-6">
                    Some herbs are more forgiving for beginners than others. Start with these well-researched, generally safe options:
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 Chamomile</h4>
                      <p className="text-gray-700 text-sm mb-3">Gentle, well-tolerated herb for relaxation and sleep support.</p>
                      <div className="text-xs text-gray-600">
                        <strong>Typical Dose:</strong> 1-4 cups tea daily<br />
                        <strong>Best For:</strong> Sleep, mild anxiety
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 Ginger</h4>
                      <p className="text-gray-700 text-sm mb-3">Safe, effective herb for digestive support and nausea relief.</p>
                      <div className="text-xs text-gray-600">
                        <strong>Typical Dose:</strong> 250-1000mg daily<br />
                        <strong>Best For:</strong> Digestion, nausea
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-3">🌿 Turmeric</h4>
                      <p className="text-gray-700 text-sm mb-3">Powerful anti-inflammatory with excellent safety profile.</p>
                      <div className="text-xs text-gray-600">
                        <strong>Typical Dose:</strong> 500-1000mg daily<br />
                        <strong>Best For:</strong> Inflammation, joint health
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: Understand Dosage Principles</h2>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Golden Rules for Dosing</h3>
                    <ul className="text-blue-800 space-y-2">
                      <li>• <strong>Start Low, Go Slow:</strong> Begin with the lowest recommended dose</li>
                      <li>• <strong>Be Patient:</strong> Most herbs take 2-8 weeks to show full effects</li>
                      <li>• <strong>Stay Consistent:</strong> Take herbs at the same time daily</li>
                      <li>• <strong>Track Progress:</strong> Keep a journal of symptoms and improvements</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 5: Watch for Interactions</h2>
                  <p className="text-gray-700 mb-6">
                    Even natural herbs can interact with medications and other supplements. Here are the most important interactions to know:
                  </p>

                  <div className="bg-red-50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold text-red-900 mb-4">⚠️ High-Risk Interactions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Blood Thinners</h4>
                        <p className="text-red-700 text-sm">Avoid: Ginkgo, Garlic, Ginger (high doses), Turmeric (high doses)</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Diabetes Medications</h4>
                        <p className="text-red-700 text-sm">Monitor: Ginseng, Cinnamon, Fenugreek, Bitter Melon</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Blood Pressure Meds</h4>
                        <p className="text-red-700 text-sm">Caution: Hawthorn, Garlic, Ginseng, Licorice</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Sedatives</h4>
                        <p className="text-red-700 text-sm">Avoid: Valerian, Kava, Passion Flower, St. John's Wort</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 6: Monitor Your Response</h2>
                  <p className="text-gray-700 mb-6">
                    Successful herbal supplementation requires careful monitoring of your body's response. Here's what to track:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-green-900 mb-3">✅ Positive Signs</h3>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Gradual improvement in target symptoms</li>
                        <li>• Stable energy levels</li>
                        <li>• Good sleep quality</li>
                        <li>• No adverse reactions</li>
                        <li>• Improved overall well-being</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-red-900 mb-3">🚨 Warning Signs</h3>
                      <ul className="text-red-800 text-sm space-y-1">
                        <li>• Digestive upset or nausea</li>
                        <li>• Headaches or dizziness</li>
                        <li>• Skin rashes or allergic reactions</li>
                        <li>• Changes in sleep patterns</li>
                        <li>• Mood changes or irritability</li>
                      </ul>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Beginner Mistakes to Avoid</h2>
                  <div className="space-y-4 mb-8">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">❌ Taking Too Many Herbs at Once</h4>
                      <p className="text-gray-700 text-sm">Start with one herb at a time to identify which ones work for you and monitor for side effects.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">❌ Expecting Immediate Results</h4>
                      <p className="text-gray-700 text-sm">Most herbs take weeks to months to show full benefits. Be patient and consistent.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">❌ Ignoring Quality</h4>
                      <p className="text-gray-700 text-sm">Cheap, low-quality herbs may be ineffective or potentially harmful. Invest in quality products.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">❌ Not Consulting Healthcare Providers</h4>
                      <p className="text-gray-700 text-sm">Always inform your doctor about herbal supplements, especially if you have health conditions or take medications.</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your First 30 Days: A Beginner's Roadmap</h2>
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">📅 Week 1-2</h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Choose one herb for your primary goal</li>
                          <li>• Start with half the recommended dose</li>
                          <li>• Take with food to minimize stomach upset</li>
                          <li>• Monitor for any adverse reactions</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">📅 Week 3-4</h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Increase to full recommended dose if well-tolerated</li>
                          <li>• Continue monitoring effects and side effects</li>
                          <li>• Keep a daily journal of symptoms</li>
                          <li>• Evaluate initial results</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">📅 Month 2+</h4>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Assess overall effectiveness</li>
                          <li>• Consider adding a second herb if needed</li>
                          <li>• Schedule follow-up with healthcare provider</li>
                          <li>• Plan long-term strategy</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Related Articles */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Continue Your Learning</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/articles/herb-drug-interactions-guide" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">Herb-Drug Interactions: What You Need to Know</h4>
                      <p className="text-gray-600 text-sm">Essential safety information about herbal supplements and medications.</p>
                    </Link>
                    <Link href="/dosage-calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">Personalized Dosage Calculator</h4>
                      <p className="text-gray-600 text-sm">Get customized dosage recommendations based on your profile.</p>
                    </Link>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Michael Torres, ND</h4>
                      <p className="text-gray-600 text-sm mb-2">Naturopathic Doctor & Herbal Medicine Specialist</p>
                      <p className="text-gray-700 text-sm">Dr. Torres has over 15 years of experience helping patients safely integrate herbal medicine into their wellness routines. He specializes in evidence-based herbal protocols for chronic conditions.</p>
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