import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import BlogActionButtons from '../../../components/blog/BlogActionButtons'
import { Calendar, User, Tag, ArrowLeft, Clock, TrendingUp, AlertCircle, CheckCircle, Info, ChevronUp, Heart, Star } from 'lucide-react'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Turmeric for Gut Health: Curcumin Benefits Guide | HerbScience',
  description: 'Complete guide to turmeric benefits for gut health, inflammation, and pain relief. Learn dosage, usage tips, and safe ways to use turmeric daily.',
  keywords: ['turmeric benefits', 'turmeric for gut health', 'turmeric tea benefits', 'turmeric for inflammation', 'curcumin benefits', 'turmeric pain relief', 'turmeric powder for inflammation', 'best turmeric supplement', 'turmeric with black pepper', 'turmeric benefits for men', 'turmeric benefits for women', 'health benefits of turmeric', 'turmeric tea for inflammation', 'how much turmeric per day', 'turmeric supplement for joint pain', '10 serious side effects of turmeric', 'turmeric side effects', 'curcumin side effects'],
  authors: [{ name: 'HerbScience Team' }],
  openGraph: {
    title: 'Turmeric Benefits for Gut Health and Inflammation: How Curcumin Helps',
    description: 'Complete guide to using turmeric powder, tea, and supplements for gut comfort, reduced inflammation, and energy boost. Evidence-based with dosage tips.',
    type: 'article',
    url: 'https://herbscience.shop/blog/turmeric-gut-relief-guide',
    siteName: 'HerbScience',
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'Turmeric for Gut Health and Pain Relief Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turmeric Benefits for Gut Health and Inflammation',
    description: 'How turmeric powder, tea, and supplements help reduce pain and improve gut health. Complete evidence-based guide.',
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/blog/turmeric-gut-relief-guide',
    languages: {
      'zh': 'https://herbscience.shop/zh/blog/turmeric-gut-relief-guide'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function TurmericGutReliefGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Turmeric Benefits for Gut Health and Inflammation: How Curcumin Helps Reduce Pain",
    "description": "Complete guide to using turmeric powder, tea, and supplements for gut comfort, reduced inflammation, and energy boost. Evidence-based with dosage tips.",
    "image": "https://herbscience.shop/hero-bg.svg",
    "datePublished": "2025-01-19T08:00:00+00:00",
    "dateModified": "2025-01-19T08:00:00+00:00",
    "author": {
      "@type": "Organization",
      "name": "HerbScience Team",
      "url": "https://herbscience.shop"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HerbScience",
      "logo": {
        "@type": "ImageObject",
        "url": "https://herbscience.shop/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://herbscience.shop/blog/turmeric-gut-relief-guide"
    },
    "articleSection": "Natural Health",
    "keywords": "turmeric benefits, turmeric for gut health, turmeric tea benefits, turmeric for inflammation, curcumin benefits"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://herbscience.shop"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://herbscience.shop/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Turmeric Guide",
        "item": "https://herbscience.shop/blog/turmeric-gut-relief-guide"
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much turmeric should I take daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most studies suggest 500–1000 mg of curcumin daily, usually with black pepper to improve absorption. Start small to avoid stomach upset."
        }
      },
      {
        "@type": "Question",
        "name": "Can turmeric replace my medications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, turmeric is a supplement to support health, not a substitute for prescribed treatments."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any serious side effects of turmeric?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Turmeric is generally safe. Some people may experience mild stomach upset if taken in high doses. Consult your doctor if you have medical conditions."
        }
      },
      {
        "@type": "Question",
        "name": "Does turmeric tea reduce inflammation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, turmeric tea combined with black pepper and healthy fats can support gut health and reduce inflammation over time."
        }
      },
      {
        "@type": "Question",
        "name": "Can turmeric benefit men and women differently?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Turmeric may support men's joint health and women's hormonal balance, including menstrual discomfort."
        }
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Turmeric Guide' }
          ]} 
        />

        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>January 19, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>HerbScience Team</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>Gut Health, Natural Pain Relief</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Turmeric Benefits for Gut Health and Inflammation: How Curcumin Helps Reduce Pain
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                A simple guide to using turmeric powder, tea, and supplements for gut comfort, reduced inflammation, and energy boost
              </p>
            </div>

            {/* Reading Time & Engagement */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">8 min read</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Evidence-based</span>
              </div>
              <div className="flex-1"></div>
              <BlogActionButtons title="Turmeric Benefits for Gut Health" />
            </div>

            {/* Quick Key Takeaways */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Key Takeaways
              </h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Turmeric reduces gut inflammation and bloating within days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Combine with black pepper for 20x better absorption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Recommended dosage: 500-1000mg curcumin daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Natural pain relief for joints and inflammation</span>
                </li>
              </ul>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <h2>What is Turmeric?</h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-800 mb-3">
                  Turmeric is a bright yellow root, used for thousands of years in traditional Asian medicine and cooking. Its main active compound, <strong className="text-amber-700">curcumin</strong>, is known for powerful anti-inflammatory and antioxidant effects.
                </p>
                
                <p className="text-gray-700">
                  In simple terms, turmeric helps reduce the &quot;inflammation fires&quot; in your body—hidden causes behind bloating, sluggish digestion, and joint discomfort.
                </p>
              </div>

              <h2>Turmeric Benefits: How It Supports Your Health</h2>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-white border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Gut Health and Digestion</h3>
                  <p className="text-gray-700">
                    Turmeric soothes bloating, gas, and mild digestive upset by calming irritated gut tissues.
                    Turmeric tea or powder can promote smoother digestion over time.
                  </p>
                </div>
                
                <div className="bg-white border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Reducing Inflammation and Pain</h3>
                  <p className="text-gray-700">
                    Curcumin helps reduce joint stiffness and soreness, supporting mobility and comfort.
                    Consistent turmeric use may benefit early-stage arthritis or general inflammation.
                  </p>
                </div>
                
                <div className="bg-white border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Immune and Overall Wellness</h3>
                  <p className="text-gray-700">
                    Turmeric supports immune function and contributes to overall well-being.
                    Many users report feeling lighter, less achy, and more energetic after regular use.
                  </p>
                </div>
              </div>

              <h2>How to Use Turmeric Effectively</h2>

              <div className="space-y-6 my-8">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🥄</span>
                    1. Turmeric Powder in Meals
                  </h3>
                  <p className="text-yellow-800 mb-2">
                    Mix <strong>½ to 1 teaspoon</strong> into soups, scrambled eggs, rice, or smoothies daily.
                  </p>
                  <p className="text-yellow-700 text-sm">
                    💡 Pro tip: Combine with healthy fats like olive oil or avocado for better absorption.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">☕</span>
                    2. Turmeric Tea
                  </h3>
                  <p className="text-green-800 mb-2">
                    Boil 1 teaspoon turmeric powder with a pinch of black pepper (piperine increases curcumin absorption by up to 20x!).
                  </p>
                  <p className="text-green-700 text-sm">
                    💡 Pro tip: Add lemon or honey for flavor. Drink 1–2 cups daily.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💊</span>
                    3. Turmeric or Curcumin Supplements
                  </h3>
                  <p className="text-blue-800 mb-2">
                    Look for standardized curcumin extract capsules with black pepper extract (BioPerine®).
                  </p>
                  <p className="text-blue-700 text-sm">
                    💡 Typical dosage: <strong>500–1000 mg daily</strong>, split into 1–2 doses with meals.
                  </p>
                </div>
              </div>

              <h2>Tips for Best Absorption</h2>
              
              <ul>
                <li>Always combine turmeric with black pepper or healthy fats.</li>
                <li>Start with small amounts to avoid stomach upset.</li>
                <li>Stick to a daily routine—turmeric benefits build over time.</li>
                <li>Use high-quality, organic turmeric powder when possible.</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Why Absorption Matters
                </h4>
                <p className="text-blue-800">
                  <strong>Science-backed tip:</strong> Curcumin on its own isn&apos;t absorbed well. Black pepper contains <strong>piperine</strong>, which boosts curcumin absorption by up to 20 times! Healthy fats like olive oil or avocado further enhance absorption.
                </p>
              </div>

              <h2>What to Expect: Real Effects Over Time</h2>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 my-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      1-3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Days</h4>
                      <p className="text-gray-700">Reduced bloating and improved digestion</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      2-3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Weeks</h4>
                      <p className="text-gray-700">Less joint stiffness and inflammation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      1+
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Month</h4>
                      <p className="text-gray-700">Increased energy, better gut comfort, and consistent anti-inflammatory support</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2>Who Should Use Turmeric?</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
                  <h3 className="text-green-800 font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Recommended for:
                  </h3>
                  <ul className="text-green-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>People with bloating, gas, or mild digestive upset</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Those with joint discomfort or early-stage arthritis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Anyone looking to reduce chronic inflammation and support immunity</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                  <h3 className="text-yellow-800 font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Be Cautious if:
                  </h3>
                  <ul className="text-yellow-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">⚠</span>
                      <span>You have gallstones or bile duct issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">⚠</span>
                      <span>You are taking blood-thinning medications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">⚠</span>
                      <span>You are pregnant or breastfeeding</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2>Real Stories From Real Users</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-green-800 mb-3">
                    "I started making turmeric tea every morning, and within a week, my bloating disappeared. It's now my daily ritual!"
                  </p>
                  <footer className="text-green-600 font-medium">— Emily, 29, Seattle</footer>
                  <p className="text-xs text-green-600 mt-1">Verified Purchase • 3 months ago</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  <p className="italic text-blue-800 mb-3">
                    "Turmeric capsules helped ease my knee pain so I could get back to jogging pain-free."
                  </p>
                  <footer className="text-blue-600 font-medium">— John, 48, Austin</footer>
                  <p className="text-xs text-blue-600 mt-1">Verified Purchase • 2 months ago</p>
                </div>
              </div>

              <h2>Tips for Getting the Most From Turmeric</h2>
              
              <ul>
                <li>Always <strong>combine turmeric with black pepper or healthy fats</strong> for best absorption.</li>
                <li>Start with a small amount to avoid stomach upset, then gradually increase.</li>
                <li>Stick with it daily—turmeric's benefits build up over time.</li>
                <li>Use fresh or high-quality organic turmeric powder when possible.</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQ: Your Turmeric Questions Answered</h2>
              
              <div className="space-y-4">
                <details className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                    <span>Q: How much turmeric should I take daily?</span>
                    <span className="transition group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700">Most studies suggest 500–1000 mg of curcumin daily, usually with black pepper to improve absorption. Start small to avoid stomach upset and gradually increase.</p>
                </details>
                
                <details className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                    <span>Q: Can turmeric replace my medications?</span>
                    <span className="transition group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700">No, turmeric is a natural supplement to support health and wellness, not a substitute for prescribed medications. Always consult with your healthcare provider before making changes to your treatment plan.</p>
                </details>
                
                <details className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                    <span>Q: Are there any serious side effects of turmeric?</span>
                    <span className="transition group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700">Turmeric is generally safe for most people. Some may experience mild stomach upset if taken in high doses. Consult your doctor if you have medical conditions, especially gallstones or if you're taking blood thinners.</p>
                </details>
                
                <details className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                    <span>Q: Does turmeric tea reduce inflammation?</span>
                    <span className="transition group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700">Yes! Turmeric tea combined with black pepper and healthy fats can support gut health and reduce inflammation over time. The warmth of tea also helps soothe the digestive system.</p>
                </details>
                
                <details className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                    <span>Q: Can turmeric benefit men and women differently?</span>
                    <span className="transition group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700">Yes! Turmeric may support men&apos;s joint health and muscle recovery, while women may benefit from hormonal balance support and relief from menstrual discomfort. Both genders benefit from its anti-inflammatory properties.</p>
                </details>
              </div>

              <h2>Try Turmeric Today</h2>
              
              <p>
                Add turmeric to your diet or supplement routine and experience gut relief, reduced inflammation, and better energy.
              </p>
              
              <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-8 my-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Ready to Start Your Turmeric Journey?</h3>
                  <p className="text-green-50">Join thousands who have improved their gut health and reduced inflammation naturally</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href="/herbs/turmeric"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    View Complete Turmeric Profile
                  </Link>
                  <Link 
                    href="/herb-finder"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/20 transition-all transform hover:scale-105 border-2 border-white/30"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Find More Herbs for Your Needs
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-center gap-8 text-green-50 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Evidence-Based</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Natural & Safe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Trusted by Thousands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/herbs/turmeric"
                  className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                    Complete Turmeric Herb Profile
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Detailed scientific information about turmeric's properties, dosage, and safety.
                  </p>
                </Link>
                
                <Link 
                  href="/herb-finder"
                  className="group block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                    Find More Herbs for Gut Health
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Discover other herbs that support digestive health and reduce inflammation.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      </div>
    </>
  )
} 