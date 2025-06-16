'use client'

import { useState } from 'react'

export default function HomePage() {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)

  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 px-6 text-center overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 text-green-600 mr-3">🌿</div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              HerbScience
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Discover the Science of Herbal Supplements
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-700 leading-relaxed">
            Trusted knowledge about traditional herbs, tailored recommendations, and AI-powered tools to understand how herbs work for your unique body type.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsQuizModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg group"
            >
              Start Constitution Quiz
              <span className="ml-2">→</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-green-600 font-medium py-3 px-6 rounded-2xl border-2 border-green-600 transition-all duration-200 text-lg">
              Explore Herb Database
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-5 h-5 mr-2 text-green-600">👥</span>
              <span>50,000+ Users Trust Us</span>
            </div>
            <div className="flex items-center">
              <span className="w-5 h-5 mr-2 text-green-600">🏆</span>
              <span>Science-Based Recommendations</span>
            </div>
            <div className="flex items-center">
              <span className="w-5 h-5 mr-2 text-green-600">🛡️</span>
              <span>Safety-First Approach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Tools for Herbal Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive suite of AI-powered tools to help you make informed decisions about herbal supplements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-green-200 group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-50 p-3 rounded-2xl group-hover:bg-green-100 transition-colors">
                  <span className="text-2xl">🔍</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                    Symptom-Based Herb Finder
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Search herbs by symptom (e.g. insomnia, anxiety, digestion) and find clinically relevant matches with dosage recommendations.
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                    <span>Learn More</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-green-200 group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-50 p-3 rounded-2xl group-hover:bg-green-100 transition-colors">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                    Ingredient Checker & Safety Evaluator
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Upload your supplement label or paste ingredients – we'll explain what each does, interactions, and possible risks.
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                    <span>Learn More</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-green-200 group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-50 p-3 rounded-2xl group-hover:bg-green-100 transition-colors">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                    Herbal Knowledge Base
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Browse hundreds of herbs with scientific summaries, TCM theory, and modern clinical research evidence.
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                    <span>Learn More</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-green-200 group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-green-50 p-3 rounded-2xl group-hover:bg-green-100 transition-colors">
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                    AI Body Constitution Quiz
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Use our AI-powered diagnostic tool based on Traditional Chinese Medicine to understand your unique body type.
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                    <span>Learn More</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Health Professionals & Enthusiasts
            </h2>
            <p className="text-xl text-gray-600">
              See what our community says about HerbScience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "HerbScience helped me understand which herbs work best for my constitution. The personalized recommendations are spot-on!"
              </p>
              <div>
                <div className="font-semibold text-gray-900">Sarah M.</div>
                <div className="text-sm text-gray-600">Wellness Coach</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Finally, a science-based platform that bridges traditional wisdom with modern research. I recommend it to all my patients."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Dr. James L.</div>
                <div className="text-sm text-gray-600">Integrative Medicine</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The ingredient checker saved me from potential herb interactions. This tool is invaluable for anyone serious about herbal health."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Lisa K.</div>
                <div className="text-sm text-gray-600">Health Enthusiast</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-friendly Article Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Herbal Insights & Research
            </h2>
            <p className="text-xl text-gray-600">
              Evidence-based articles to guide your herbal wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Mental Health
                  </span>
                  <span className="text-sm text-gray-500">8 min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                  Top 5 Chinese Herbs for Anxiety (Backed by Science)
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Learn how Reishi, Schisandra, and others can help calm the mind and regulate stress response according to recent clinical studies.
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Read Article</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    TCM Theory
                  </span>
                  <span className="text-sm text-gray-500">12 min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                  Understanding Your Body Type in TCM
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  How to recognize heat/cold, yin/yang imbalance – and how it affects herb selection for optimal health outcomes.
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Read Article</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Safety
                  </span>
                  <span className="text-sm text-gray-500">10 min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                  Herb-Drug Interactions: What You Need to Know
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Critical safety information about how herbal supplements can interact with common medications and what to watch for.
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Read Article</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-50 text-green-600 font-medium py-3 px-6 rounded-2xl border-2 border-green-600 transition-all duration-200">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your Optimal Herbal Profile?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Take our comprehensive AI-powered constitution quiz and get personalized herb recommendations based on Traditional Chinese Medicine principles.
          </p>
          <button 
            onClick={() => setIsQuizModalOpen(true)}
            className="bg-white text-green-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="w-8 h-8 text-green-400 mr-2">🌿</span>
                <h3 className="text-2xl font-bold">HerbScience.shop</h3>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Bridging ancient herbal wisdom with modern science to help you make informed decisions about your health.
              </p>
              <p className="text-sm text-gray-400">
                Educational use only. Not medical advice. Consult healthcare professionals before starting any herbal regimen.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/herb-finder" className="hover:text-green-400 transition-colors">Herb Finder</a></li>
                <li><a href="/ingredient-checker" className="hover:text-green-400 transition-colors">Safety Checker</a></li>
                <li><a href="/knowledge-base" className="hover:text-green-400 transition-colors">Knowledge Base</a></li>
                <li><a href="/constitution-quiz" className="hover:text-green-400 transition-colors">Constitution Quiz</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/articles" className="hover:text-green-400 transition-colors">Articles</a></li>
                <li><a href="/research" className="hover:text-green-400 transition-colors">Research</a></li>
                <li><a href="/safety" className="hover:text-green-400 transition-colors">Safety Guidelines</a></li>
                <li><a href="/contact" className="hover:text-green-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HerbScience.shop – All Rights Reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Quiz Modal Placeholder */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Constitution Quiz Coming Soon!</h3>
            <p className="text-gray-600 mb-6">
              Our AI-powered Traditional Chinese Medicine constitution quiz is currently in development. 
              Sign up to be notified when it's ready!
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsQuizModalOpen(false)}
                className="bg-white hover:bg-gray-50 text-green-600 font-medium py-3 px-6 rounded-2xl border-2 border-green-600 transition-all duration-200 flex-1"
              >
                Close
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 flex-1">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 