'use client'

import Link from 'next/link'
import SmartSearch from '../components/SmartSearch'
import TrustIndicators from '../components/TrustIndicators'
import PersonalizedRecommendations from '../components/PersonalizedRecommendations'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-700">
                🌿 HerbScience.shop
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/herb-finder" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  Herb Finder
                </Link>
                <Link href="/ingredient-checker" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  Ingredient Checker
                </Link>
                <Link href="/knowledge-center" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  Knowledge Center
                </Link>
                <Link href="/user-experiences" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                  User Experiences
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Search */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Herbal Supplements,
              <span className="text-green-600 block">Demystified</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Understand what you take. Discover what works. Make informed decisions about herbal supplements with science-backed insights and personalized recommendations.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mb-8">
              <SmartSearch 
                placeholder="Search herbs, symptoms, or get safety information..."
                onSearch={(query, filters) => {
                  // Handle search - could redirect to search results page
                  console.log('Search:', query, filters);
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/herb-finder" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                Find Your Herbs
              </Link>
              <Link href="/ingredient-checker" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                Check Safety
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Functions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything You Need to Navigate Herbal Supplements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/herb-finder" className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group-hover:border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Symptom-Based Finder</h3>
                <p className="text-gray-600">Enter your symptoms and discover which herbs might help, backed by traditional use and modern research.</p>
              </div>
            </Link>

            <Link href="/ingredient-checker" className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group-hover:border-green-200">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety Checker</h3>
                <p className="text-gray-600">Upload your supplement label and get detailed safety analysis of each ingredient and potential interactions.</p>
              </div>
            </Link>

            <Link href="/knowledge-center" className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group-hover:border-green-200">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Knowledge Base</h3>
                <p className="text-gray-600">Browse comprehensive guides on herbs, research studies, and traditional medicine principles.</p>
              </div>
            </Link>

            <Link href="/constitution-test" className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group-hover:border-green-200">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Body Constitution Quiz</h3>
                <p className="text-gray-600">Discover your unique body type through Traditional Chinese Medicine assessment for personalized recommendations.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Herbal Supplement Concerns, Solved
            </h2>
            <p className="text-xl text-gray-600">
              We understand the challenges people face when choosing herbal supplements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">❓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"I don't know what this herb actually does"</h3>
                  <p className="text-gray-600 text-sm">Our database explains each herb's traditional uses, active compounds, and scientific evidence in plain English.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤔</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"Will this actually work for me?"</h3>
                  <p className="text-gray-600 text-sm">We provide evidence ratings and help you understand which herbs have strong vs. limited research support.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"Is this safe to take?"</h3>
                  <p className="text-gray-600 text-sm">Our safety checker identifies potential risks, contraindications, and drug interactions before you start.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">😰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"What if I get side effects?"</h3>
                  <p className="text-gray-600 text-sm">We list known side effects, warning signs to watch for, and when to stop taking supplements.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"Are herbal supplements FDA approved?"</h3>
                  <p className="text-gray-600 text-sm">We explain supplement regulations, quality standards, and how to choose reputable brands.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🈲</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">"I can't read Chinese herb names"</h3>
                  <p className="text-gray-600 text-sm">We provide English names, pronunciation guides, and clear explanations for all traditional herbs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility - Enhanced */}
      <TrustIndicators />

      {/* Personalized Recommendations */}
      <PersonalizedRecommendations />

      {/* User Testimonials */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">SM</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-gray-600">Wellness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-700">"Finally found a reliable source for herbal information. The safety checker saved me from a potentially dangerous interaction!"</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">DL</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">David L.</h4>
                  <p className="text-sm text-gray-600">Chronic Pain Sufferer</p>
                </div>
              </div>
              <p className="text-gray-700">"The symptom-based finder helped me discover turmeric and boswellia. My joint pain has improved significantly."</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">MJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Maria J.</h4>
                  <p className="text-sm text-gray-600">Anxiety Management</p>
                </div>
              </div>
              <p className="text-gray-700">"The constitution quiz revealed I'm a 'heat' type. The cooling herbs recommended work perfectly for my anxiety."</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How HerbScience.shop Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Describe Your Needs</h3>
              <p className="text-gray-600">Tell us your symptoms, health goals, or current supplements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your needs against our scientific database</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Recommendations</h3>
              <p className="text-gray-600">See personalized herb suggestions with safety information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Informed Decisions</h3>
              <p className="text-gray-600">Choose supplements with confidence and proper guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are herbal supplements safe?</h3>
              <p className="text-gray-600">Herbal supplements can be safe when used appropriately, but they can also interact with medications and cause side effects. Our safety checker helps identify potential risks before you start taking any supplement.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I know if an herb will work for me?</h3>
              <p className="text-gray-600">Individual responses vary, but our evidence ratings show which herbs have strong scientific support. We also consider your body constitution to provide more personalized recommendations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use this information to replace medical treatment?</h3>
              <p className="text-gray-600">No. Our information is for educational purposes only and should not replace professional medical advice. Always consult with your healthcare provider before starting any new supplement regimen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make Informed Decisions About Herbal Supplements?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users who trust HerbScience.shop for reliable herbal information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/herb-finder" className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Herb Finder
            </Link>
            <Link href="/ingredient-checker" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
              Check My Supplements
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🌿 HerbScience.shop</h3>
              <p className="text-gray-400">
                Evidence-based herbal supplement information for informed health decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/herb-finder" className="hover:text-white">Herb Finder</Link></li>
                <li><Link href="/ingredient-checker" className="hover:text-white">Safety Checker</Link></li>
                <li><Link href="/knowledge-center" className="hover:text-white">Knowledge Base</Link></li>
                <li><Link href="/user-experiences" className="hover:text-white">User Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Research Studies</a></li>
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white">TCM Basics</a></li>
                <li><a href="#" className="hover:text-white">Herb Dictionary</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-2">© 2025 HerbScience.shop - All Rights Reserved</p>
            <p className="text-sm">
              <strong>Disclaimer:</strong> This website provides educational information only and is not intended to diagnose, treat, cure, or prevent any disease. 
              Always consult with a qualified healthcare professional before starting any herbal supplement regimen.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
} 