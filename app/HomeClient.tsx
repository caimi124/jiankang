'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight, Shield, Users, TrendingUp, Star, Clock, Leaf, Heart, Brain } from 'lucide-react'

// 延迟加载组件
const Header = dynamic(() => import('../components/Header'), { ssr: false })
const NewsletterForm = dynamic(() => import('../components/NewsletterForm'), { ssr: false })
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false })

// SEO优化组件 - 帮助Google索引所有页面
const FeaturedHerbsSection = dynamic(() => import('../components/FeaturedHerbsSection'), { ssr: true })
const LatestBlogsSection = dynamic(() => import('../components/LatestBlogsSection'), { ssr: true })

export default function HomeClient() {
  return (
    <>
      <Header />
      
      {/* Hero区域 - 针对中老年用户的清晰价值主张 */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* 信任徽章 */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-6 text-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Trusted by 50,000+ health-conscious adults</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Herbs That Actually Work for{' '}
              <span className="text-green-600">Your Body</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Take our free 2-minute constitution test to discover herbs that actually work for your unique body type
            </p>
            
            <p className="text-lg text-gray-600 mb-8">
              Based on 3,000+ years of Traditional Chinese Medicine • Safe for ages 35-75+ • No side effects
            </p>

            {/* 主要CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/constitution-test/quick"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all shadow-xl"
              >
                <Clock className="w-6 h-6" />
                Take Free 2-Min Test
                <ArrowRight className="w-6 h-6" />
              </Link>
              
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-50 border-2 border-gray-200 transition-all"
              >
                See How It Works
              </Link>
            </div>

            {/* 社交证明 */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.8/5 from 12,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>85% report improvement</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>FDA-compliant guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO优化：精选草药和最新博客 */}
      <FeaturedHerbsSection />
      <LatestBlogsSection />

      {/* 问题痛点 - 与中老年用户共鸣 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tired of Herbs That Don't Work?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most people waste money on herbs that aren't right for their body type. Here's why:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                One-Size-Fits-All Advice
              </h3>
              <p className="text-gray-700">
                Generic herb recommendations ignore your unique body chemistry and health history
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confusing Information
              </h3>
              <p className="text-gray-700">
                Conflicting advice from blogs and forums leaves you more confused than before
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Wasted Money
              </h3>
              <p className="text-gray-700">
                Buying expensive supplements that don't work because they're wrong for your constitution
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              There's a Better Way ✨
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our personalized approach matches herbs to YOUR specific body type, health conditions, and needs
            </p>
            <Link
              href="/constitution-test/quick"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Discover Your Perfect Herbs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 工作原理 */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works (It's Simple!)
            </h2>
            <p className="text-lg text-gray-600">
              Get personalized herb recommendations in 3 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 步骤1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Take the Test
                </h3>
                <p className="text-gray-700 mb-4">
                  Answer 10 simple questions about your health, energy, sleep, and digestion
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Only 2 minutes</span>
                </div>
              </div>
              {/* 箭头 */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-green-400" />
              </div>
            </div>

            {/* 步骤2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Get Your Constitution
                </h3>
                <p className="text-gray-700 mb-4">
                  Discover your body type (Qi Deficiency, Yin Deficiency, etc.) with detailed explanation
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Brain className="w-4 h-4" />
                  <span>Instant results</span>
                </div>
              </div>
              {/* 箭头 */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-green-400" />
              </div>
            </div>

            {/* 步骤3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Start Your Journey
                </h3>
                <p className="text-gray-700 mb-4">
                  Get personalized herb recommendations, dosage guides, and lifestyle tips
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Leaf className="w-4 h-4" />
                  <span>Actionable plan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/constitution-test/quick"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Start My Free Test Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* 用户评价 - 已移至后面整合展示 */}

      {/* 快速功能入口 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Ways We Can Help
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Herb Finder */}
            <Link
              href="/herb-finder"
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Herb Finder</h3>
              <p className="text-gray-600 mb-4">
                Search our database of 50+ herbs by symptom, condition, or name
              </p>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                Explore Herbs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 35-Question Test */}
            <Link
              href="/constitution-test"
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Test</h3>
              <p className="text-gray-600 mb-4">
                Want more accuracy? Take our comprehensive 35-question test
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Take Detailed Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Blog/Knowledge Center */}
            <Link
              href="/blog"
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Health Guides</h3>
              <p className="text-gray-600 mb-4">
                Evidence-based articles on herbs, dosages, and natural wellness
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-medium">
                Read Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-green-100">
              Join our growing community of health-conscious individuals
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Tests Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-green-100">Report Improvement</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-green-100">User Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-green-100">Herbs Documented</div>
            </div>
          </div>
        </div>
      </section>

      {/* 用户评价和案例 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real People
            </h2>
            <p className="text-lg text-gray-600">
              See how others improved their health with personalized herb recommendations
            </p>
          </div>
          <Testimonials variant="carousel" />
        </div>
      </section>

      {/* Newsletter订阅 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <NewsletterForm 
            variant="hero"
            source="homepage"
            title="🌿 Get Weekly Personalized Herb Tips"
            description="Join 10,000+ people receiving custom herb recommendations, health tips, and exclusive guides delivered to your inbox."
            buttonText="Get Free Herb Guide"
          />
        </div>
      </section>

      {/* 最后的CTA */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Find Herbs That Actually Work?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Take the free 2-minute test and get your personalized herb recommendations today
          </p>
          
          <Link
            href="/constitution-test/quick"
            className="inline-flex items-center gap-3 px-10 py-5 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all shadow-xl"
          >
            <Clock className="w-7 h-7" />
            Start Free Test
            <ArrowRight className="w-7 h-7" />
          </Link>

          <p className="mt-6 text-sm text-gray-600">
            ✅ No registration required • ✅ 100% Free • ✅ Instant results • ✅ Privacy protected
          </p>
        </div>
      </section>

      {/* Footer（简化版） */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <Leaf className="w-6 h-6" />
                HerbScience
              </div>
              <p className="text-gray-400 text-sm">
                Personalized herbal medicine based on Traditional Chinese Medicine principles
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Get Started</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/constitution-test/quick" className="hover:text-white">Quick Test (2 min)</Link></li>
                <li><Link href="/constitution-test" className="hover:text-white">Detailed Test (10 min)</Link></li>
                <li><Link href="/herb-finder" className="hover:text-white">Herb Finder</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Health Blog</Link></li>
                <li><Link href="/about" className="hover:text-white">About TCM</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 HerbScience.shop • This information is for educational purposes only and does not constitute medical advice.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
