import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import MedicalReviewBanner from '../../../components/MedicalReviewBanner'
import { Calendar, User, Tag, Share2, Bookmark, ArrowLeft, Heart, Coffee, Moon, Sparkles, AlertTriangle, CheckCircle, Clock, Target, Zap, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ashwagandha for Women: Hormones, Stress & Sleep',
  description: 'Ashwagandha benefits for women: balance hormones, reduce stress, improve sleep. Safe dosage and side effects guide by licensed pharmacist.',
  keywords: [
    'ashwagandha benefits for female',
    'ashwagandha for hormonal imbalance',
    'side effects of ashwagandha on females',
    'ashwagandha benefits for women',
    'ashwagandha to balance hormones',
    'what is ashwagandha good for',
    'ashwagandha side effects for female',
    'best herbs for stress and anxiety',
    'best herbs for anxiety and depression',
    'how to safely take ashwagandha',
    'ashwagandha before bed benefits',
    'when not to take ashwagandha',
    'how to use ashwagandha powder',
    'ashwagandha pills benefits',
    'ashwagandha helps with anxiety',
    'ashwagandha to help sleep',
    'withania somnifera benefits and side effects'
  ].join(', '),
  authors: [{ name: '曾楚平 (Zeng Chuping)', url: '/about' }],
  openGraph: {
    title: 'Ashwagandha Benefits for Female: Hormonal Imbalance & Stress Relief Guide',
    description: 'Complete guide on ashwagandha benefits for female health, hormonal imbalance treatment, stress relief, and safe dosage. Learn side effects and what ashwagandha is good for.',
    type: 'article',
    url: 'https://herbscience.shop/blog/ashwagandha-for-women-hormone-balance',
    siteName: 'HerbScience',
    publishedTime: '2025-01-26',
    modifiedTime: new Date().toISOString(),
    tags: [
      'ashwagandha',
      'womens health', 
      'hormone balance',
      'stress relief',
      'adaptogens',
      'natural remedies',
      'TCM',
      'cortisol'
    ],
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'Ashwagandha for Women - Hormone Balance and Stress Relief Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwagandha Benefits for Female: Hormonal Imbalance Guide',
    description: 'Learn ashwagandha benefits for female health, hormonal imbalance treatment, safe dosage, and side effects. Evidence-based guide by pharmacist.',
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/blog/ashwagandha-for-women-hormone-balance'
  }
}

export default function AshwagandhaForWomenPage() {
  // Structured Data for Google Rich Results
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Ashwagandha for Women: Balance Hormones, Beat Stress, and Feel Like Yourself Again",
    "description": "Comprehensive, evidence-based guide on how Ashwagandha helps women balance hormones, reduce stress, improve sleep, and restore natural energy.",
    "image": "https://herbscience.shop/hero-bg.svg",
    "author": {
      "@type": "Person",
      "name": "曾楚平 (Zeng Chuping)",
      "jobTitle": "Licensed Pharmacist & TCM Expert",
      "alumniOf": "Southern Medical University",
      "url": "https://herbscience.shop/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HerbScience",
      "logo": {
        "@type": "ImageObject",
        "url": "https://herbscience.shop/logo.svg"
      }
    },
    "datePublished": "2025-01-26",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://herbscience.shop/blog/ashwagandha-for-women-hormone-balance"
    },
    "keywords": "ashwagandha for women, hormone balance, cortisol, stress relief, adaptogens, womens health",
    "articleSection": "Women's Health, Natural Medicine",
    "wordCount": 2800
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best time to take Ashwagandha for women?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For stress and hormone balance, take 300-600mg daily, split into 2 doses: morning with breakfast and evening after dinner. For sleep issues, take your full dose 1-2 hours before bed. Consistency matters more than timing."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take for Ashwagandha to balance hormones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most women notice improved sleep and reduced anxiety within 1-2 weeks. Hormonal balance (reduced PMS, mood stability) typically improves in 3-4 weeks. Full benefits on energy and emotional stability appear at 6-8 weeks with consistent use."
        }
      },
      {
        "@type": "Question",
        "name": "Can Ashwagandha help with weight loss for women?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ashwagandha doesn't directly cause weight loss, but it helps by reducing cortisol (stress hormone). High cortisol causes belly fat storage. By lowering stress and improving sleep, Ashwagandha can support healthy metabolism and reduce stress-eating."
        }
      },
      {
        "@type": "Question",
        "name": "Is Ashwagandha safe for women to take daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, for most women, 300-600mg daily is safe for long-term use. However, avoid if pregnant, breastfeeding, or have hyperthyroidism. Always consult your doctor if taking thyroid medication, antidepressants, or sedatives."
        }
      },
      {
        "@type": "Question",
        "name": "Does Ashwagandha increase estrogen or testosterone in women?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ashwagandha doesn't directly increase estrogen or testosterone. It works by regulating the HPA axis (stress response system), which allows your natural hormone production to normalize. It supports overall hormonal balance rather than boosting specific hormones."
        }
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Navigation />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Ashwagandha for Women' }
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

          {/* Medical Review Banner */}
          <MedicalReviewBanner 
            reviewerName="曾楚平 (Zeng Chuping)"
            reviewerTitle="Licensed Pharmacist & TCM Expert"
            reviewerCredentials="Southern Medical University Graduate"
            lastUpdated={new Date()}
            reviewerLink="/about"
          />

          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-12">
              <div className="mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>January 26, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <Link href="/about" className="hover:text-green-600">曾楚平</Link>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>Women&apos;s Health, Hormones, Adaptogens</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>8 min read</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  🌿 Ashwagandha Benefits for Female: Hormonal Imbalance, Stress & What It&apos;s Good For
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  You wake up tired. You push through the day with caffeine. You crash at night but still can&apos;t sleep.
                  If this sounds like your life, you might have <strong>hormonal imbalance</strong> — and understanding <strong>what Ashwagandha is good for</strong> could be your solution. This guide covers <strong>ashwagandha benefits for female</strong> health, including safe dosage and potential side effects.
                </p>
              </div>

              {/* Article Actions */}
              <div className="flex items-center gap-4 py-4 border-y border-gray-200 mb-8">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save Article
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Table of Contents */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  Quick Navigation
                </h2>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <a href="#what-is-ashwagandha" className="text-blue-600 hover:underline">💫 What Is Ashwagandha Good For?</a>
                  <a href="#benefits-for-female" className="text-blue-600 hover:underline">🌸 Benefits for Female Health</a>
                  <a href="#hormonal-imbalance" className="text-blue-600 hover:underline">⚖️ Hormonal Imbalance Treatment</a>
                  <a href="#how-to-use" className="text-blue-600 hover:underline">🩷 How to Safely Take It</a>
                  <a href="#side-effects" className="text-blue-600 hover:underline">⚠️ Side Effects for Females</a>
                  <a href="#faq" className="text-blue-600 hover:underline">❓ FAQ</a>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">

                {/* Section 1: What Is Ashwagandha Good For */}
                <section id="what-is-ashwagandha" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-7 h-7 text-purple-600" />
                    💫 What Is Ashwagandha Good For?
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Ashwagandha</strong> (<em>Withania somnifera</em>, also called Indian Ginseng or Winter Cherry) is an <strong>adaptogen herb</strong> — a natural plant that helps your body adapt to stress.
                    Understanding <strong>what Ashwagandha does</strong> is crucial: it&apos;s one of the <strong>best herbs for stress and anxiety</strong>, and particularly effective as one of the <strong>best herbs for anxiety and depression</strong> in women.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Ashwagandha benefits for female</strong> health are extensive because it supports:
                  </p>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl my-6">
                    <h3 className="font-bold text-gray-900 mb-3">Key Ashwagandha Benefits for Female Health:</h3>
                    <ul className="space-y-3 text-gray-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Hormonal imbalance treatment</strong> - Helps balance estrogen & progesterone naturally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Stress and anxiety relief</strong> - Lowers cortisol and calms the nervous system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Better sleep quality</strong> - Ashwagandha helps with sleep when taken before bed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Improved energy and metabolism</strong> - Natural energy without caffeine jitters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Weight management support</strong> - Ashwagandha and weight loss connection through cortisol reduction</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-700 leading-relaxed italic bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    💡 Think of it as a <strong>calm, steady energy</strong> — not a &quot;rush,&quot; but a <strong>reset</strong>.
                  </p>
                </section>

                {/* Section 2: Ashwagandha for Hormonal Imbalance */}
                <section id="hormonal-imbalance" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="w-7 h-7 text-pink-600" />
                    ⚖️ Ashwagandha for Hormonal Imbalance: How It Works
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Ashwagandha for hormonal imbalance</strong> is one of its most powerful applications. But how does it actually work?
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">The Science: What Ashwagandha Does in Your Body</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Ashwagandha helps with anxiety</strong> and hormonal chaos by targeting the <strong>HPA axis</strong> (hypothalamic-pituitary-adrenal axis) — your body&apos;s stress response system.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      When you&apos;re stressed, cortisol stays high, which disrupts estrogen and progesterone. <strong>Ashwagandha to balance hormones</strong> works by lowering cortisol, allowing your natural hormone production to normalize.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🌸 Ashwagandha Benefits for Female Hormone Health</h3>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Stress doesn&apos;t just make you anxious — it <strong>hijacks your hormones</strong>.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    When cortisol stays high, it can cause:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-6">
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <h3 className="font-semibold text-gray-900 mb-2">😰 PMS mood swings</h3>
                      <p className="text-sm text-gray-600">Irritability, anxiety, emotional ups and downs</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <h3 className="font-semibold text-gray-900 mb-2">⚖️ Weight gain around belly</h3>
                      <p className="text-sm text-gray-600">Cortisol triggers fat storage in midsection</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <h3 className="font-semibold text-gray-900 mb-2">📅 Irregular periods</h3>
                      <p className="text-sm text-gray-600">Disrupted menstrual cycle, unpredictable timing</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                      <h3 className="font-semibold text-gray-900 mb-2">💤 Low libido & fatigue</h3>
                      <p className="text-sm text-gray-600">Decreased sex drive, chronic tiredness, brain fog</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl my-6 border-2 border-green-200">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      How Ashwagandha Helps
                    </h3>
                    <p className="text-gray-800 leading-relaxed">
                      Ashwagandha works by <strong>lowering cortisol</strong>, allowing your hormones to find their natural rhythm again.
                      Many women say it&apos;s like <span className="bg-yellow-100 px-2 py-0.5 rounded">&quot;finally feeling normal again&quot;</span> after years of imbalance.
                    </p>
                  </div>
                </section>

                {/* Section 3: How to Safely Take Ashwagandha */}
                <section id="how-to-use" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-7 h-7 text-blue-600" />
                    🩷 How to Safely Take Ashwagandha: Complete Dosage Guide
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Understanding <strong>how to safely take Ashwagandha</strong> is crucial for experiencing the <strong>ashwagandha pills benefits</strong> while minimizing potential side effects. Let&apos;s cover <strong>ashwagandha dosage guide</strong>, timing, and forms.
                  </p>

                  {/* Form Choice */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">1️⃣ Choose Your Form</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white border-2 border-green-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Coffee className="w-5 h-5 text-green-600" />
                          Ashwagandha Pills / Capsules
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong>Best for:</strong> Daily consistency and precise dosing<br />
                          <strong>Look for:</strong> Standardized extract with <strong>5% withanolides</strong><br />
                          <strong>Ashwagandha pills benefits:</strong> No taste, easy to take, consistent potency, precise dosage<br />
                          <strong>Recommended brands:</strong> Nature&apos;s Bounty Ashwagandha, KSM-66 extract
                        </p>
                      </div>

                      <div className="bg-white border-2 border-blue-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                          Ashwagandha Powder
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong>Best for:</strong> Smoothies, warm milk drinks, cooking<br />
                          <strong>How to use ashwagandha powder:</strong> Mix 1/4 to 1/2 teaspoon (300-600mg) in liquids<br />
                          <strong>Taste:</strong> Slightly earthy, bitter<br />
                          <strong>Pros:</strong> Flexible dosing, traditional ayurvedic preparation, good for golden milk recipes
                        </p>
                      </div>

                      <div className="bg-white border-2 border-purple-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Moon className="w-5 h-5 text-purple-600" />
                          Tincture (Liquid Extract)
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong>Best for:</strong> Fast absorption, avoid swallowing pills<br />
                          <strong>How to take:</strong> Drop under tongue or mix with water<br />
                          <strong>Pros:</strong> Rapid onset, easy to adjust dose
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mt-4">
                      <p className="text-sm text-gray-700">
                        💡 <strong>If you&apos;re new:</strong> Start with capsules for consistent, measured dosing.
                      </p>
                    </div>
                  </div>

                  {/* Timing & Dosage */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">2️⃣ When & How to Take It</h3>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Best Time</h4>
                            <p className="text-gray-700 text-sm">
                              <strong>1–2 times per day:</strong> Usually morning and evening
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Dosage</h4>
                            <p className="text-gray-700 text-sm">
                              <strong>300–600 mg per day</strong> (root extract)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Moon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Ashwagandha Before Bed Benefits</h4>
                            <p className="text-gray-700 text-sm">
                              <strong>Ashwagandha to help sleep:</strong> Take 300-600mg <strong>1-2 hours before bed</strong><br />
                              <strong>Benefits:</strong> Reduces cortisol at night, promotes deep sleep, reduces racing thoughts
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">For Energy & Focus</h4>
                            <p className="text-gray-700 text-sm">
                              Take it <strong>with breakfast</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mixing Suggestions */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">3️⃣ What to Mix It With</h3>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Ashwagandha powder tastes slightly earthy. Try blending it with:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                        <Coffee className="w-6 h-6 text-orange-600 mb-2" />
                        <h4 className="font-semibold text-gray-900 mb-1">Golden Milk</h4>
                        <p className="text-sm text-gray-600">Warm oat milk + honey + turmeric</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <Sparkles className="w-6 h-6 text-green-600 mb-2" />
                        <h4 className="font-semibold text-gray-900 mb-1">Smoothies</h4>
                        <p className="text-sm text-gray-600">Banana, cocoa, almond butter</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                        <Moon className="w-6 h-6 text-purple-600 mb-2" />
                        <h4 className="font-semibold text-gray-900 mb-1">Herbal Tea</h4>
                        <p className="text-sm text-gray-600">Tulsi (holy basil) or chamomile</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
                      <p className="text-sm text-gray-700">
                        👉 <strong>TCM Tip:</strong> Combining Ashwagandha with calming herbs like <Link href="/herbs/reishi" className="text-blue-600 hover:underline">Reishi</Link> or <Link href="/herbs/licorice-root" className="text-blue-600 hover:underline">Licorice root</Link> enhances its stress-reducing effect.
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">4️⃣ How Long Until You Feel It</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Week 1–2</h4>
                          <p className="text-gray-700 text-sm">Sleep improves, anxiety softens</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Week 3–4</h4>
                          <p className="text-gray-700 text-sm">Hormonal mood swings reduce</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                        <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Week 6–8</h4>
                          <p className="text-gray-700 text-sm">Energy and emotional stability feel more consistent</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mt-4">
                      <p className="text-sm text-gray-700 font-semibold">
                        ⏰ Consistency is everything — it&apos;s not a &quot;one-time boost,&quot; it&apos;s <strong>gentle rebalancing</strong>.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4: TCM Body Type Matching */}
                <section id="tcm-body-type" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    🧘‍♀️ Match It to Your TCM Body Type
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    In Traditional Chinese Medicine (TCM), herbs work best when they match your <strong>constitution</strong>:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                      <thead>
                        <tr className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                          <th className="p-4 text-left">Constitution Type</th>
                          <th className="p-4 text-left">Typical Feelings</th>
                          <th className="p-4 text-left">Is Ashwagandha Right?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-green-50 transition-colors">
                          <td className="p-4">
                            <strong className="text-gray-900">Yin Deficiency</strong>
                            <div className="text-sm text-gray-600 mt-1">(易疲劳, 干性皮肤, 失眠)</div>
                          </td>
                          <td className="p-4 text-gray-700">
                            Burned out, anxious, can&apos;t relax, dry skin, insomnia
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              <CheckCircle className="w-4 h-4" />
                              Excellent match
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-blue-50 transition-colors">
                          <td className="p-4">
                            <strong className="text-gray-900">Qi Deficiency</strong>
                            <div className="text-sm text-gray-600 mt-1">(低能量, 弱消化)</div>
                          </td>
                          <td className="p-4 text-gray-700">
                            Constant fatigue, low motivation, weak digestion
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              <CheckCircle className="w-4 h-4" />
                              Supportive
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-yellow-50 transition-colors">
                          <td className="p-4">
                            <strong className="text-gray-900">Yang Excess</strong>
                            <div className="text-sm text-gray-600 mt-1">(易热, 易怒, 失眠)</div>
                          </td>
                          <td className="p-4 text-gray-700">
                            Overheated, restless, irritable, high energy but agitated
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                              <AlertTriangle className="w-4 h-4" />
                              Use small dose or cooling blend
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mt-6 border-2 border-green-200">
                    <p className="text-gray-800 leading-relaxed">
                      👉 <strong>Find your body type:</strong> Take our free <Link href="/constitution-test" className="text-green-600 hover:underline font-semibold">TCM Constitution Test</Link> to discover if Ashwagandha matches your unique constitution and get personalized herb recommendations.
                    </p>
                  </div>
                </section>

                {/* Section 5: Side Effects */}
                <section id="side-effects" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-7 h-7 text-red-600" />
                    ⚠️ Side Effects of Ashwagandha on Females: What to Know
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    While <strong>withania somnifera benefits</strong> are extensive, understanding <strong>ashwagandha side effects for female</strong> users is crucial for safe use. Most women tolerate it well, but knowing <strong>when not to take ashwagandha</strong> can prevent complications.
                  </p>

                  <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl mb-6">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Common Ashwagandha Side Effects (Usually Mild):</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        • <span><strong>Digestive upset</strong> - Nausea, diarrhea (usually with high doses &gt;600mg)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        • <span><strong>Drowsiness</strong> - Especially when first starting or taking high doses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        • <span><strong>Headache</strong> - Rare, usually temporary</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">When NOT to Take Ashwagandha (Important!):</h3>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800"><strong>Pregnancy and breastfeeding</strong> — <strong>Ashwagandha side effects for female</strong> during pregnancy include risk of miscarriage and fetal complications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800"><strong>Hyperthyroidism</strong> — Can increase thyroid hormone levels dangerously</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800"><strong>Taking sedatives or sleep medications</strong> — May amplify drowsiness and cause oversedation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800"><strong>On thyroid medication</strong> — Can interfere with dosing; doctor supervision required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800"><strong>Autoimmune conditions</strong> (lupus, rheumatoid arthritis) — May overstimulate immune system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800"><strong>Before surgery</strong> — Stop taking 2 weeks before scheduled surgery due to sedative effects</span>
                      </li>
                    </ul>

                    <div className="bg-white p-4 rounded-lg mt-4 border-l-4 border-red-600">
                      <h4 className="font-bold text-gray-900 mb-2">Ashwagandha Negative Side Effects to Watch For:</h4>
                      <p className="text-sm text-gray-700">
                        Rare but serious: liver toxicity (with very high doses or contaminated products), 
                        excessive drowsiness, severe digestive issues. If you experience these, stop immediately and consult your doctor.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg mt-4 border-l-4 border-red-600">
                      <p className="text-sm text-gray-700 font-semibold">
                        💊 <strong>Always check with your doctor</strong> if you&apos;re on long-term medications, especially antidepressants, blood pressure meds, or immunosuppressants.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 6: FAQ */}
                <section id="faq" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>

                  <div className="space-y-4">
                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        What are the main ashwagandha benefits for female health?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        <strong>Ashwagandha benefits for female</strong> include: hormonal balance (helps regulate estrogen and progesterone), stress and anxiety reduction through cortisol lowering, improved sleep quality, better energy levels, weight management support, and relief from PMS symptoms. It&apos;s particularly effective for <strong>ashwagandha for hormonal imbalance</strong> caused by chronic stress.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        What are the side effects of ashwagandha on females?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        <strong>Side effects of ashwagandha on females</strong> are usually mild and include digestive upset, drowsiness, and rarely headaches. Serious <strong>ashwagandha side effects for female</strong> users include risk during pregnancy (may cause miscarriage), thyroid overstimulation if you have hyperthyroidism, and potential liver issues with very high doses. Most women tolerate 300-600mg daily well. Always start with a lower dose.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        How to safely take ashwagandha for best results?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        <strong>How to safely take ashwagandha:</strong> Start with 300mg daily with food to assess tolerance. For <strong>stress and hormonal imbalance</strong>, take 300-600mg split into 2 doses (morning and evening). For <strong>ashwagandha before bed benefits</strong>, take your full dose 1-2 hours before sleep. Choose standardized extracts with 5% withanolides. Cycle usage: 8-12 weeks on, then 1-2 weeks off.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        How long does it take for Ashwagandha to balance hormones?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        Most women notice <strong>improved sleep and reduced anxiety within 1-2 weeks</strong>. Hormonal balance (reduced PMS, mood stability) typically improves in <strong>3-4 weeks</strong>. Full benefits on energy and emotional stability appear at <strong>6-8 weeks</strong> with consistent use.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        Can Ashwagandha help with weight loss for women?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        Ashwagandha doesn&apos;t directly cause weight loss, but it helps by <strong>reducing cortisol</strong> (stress hormone). High cortisol causes belly fat storage. By lowering stress and improving sleep, Ashwagandha can support healthy metabolism and reduce stress-eating.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        Is Ashwagandha safe for women to take daily?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        Yes, for most women, <strong>300-600mg daily is safe</strong> for long-term use. However, <strong>avoid if pregnant, breastfeeding, or have hyperthyroidism</strong>. Always consult your doctor if taking thyroid medication, antidepressants, or sedatives.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        Does Ashwagandha increase estrogen or testosterone in women?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        Ashwagandha doesn&apos;t directly increase estrogen or testosterone. It works by <strong>regulating the HPA axis</strong> (stress response system), which allows your natural hormone production to normalize. It supports <strong>overall hormonal balance</strong> rather than boosting specific hormones.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        When not to take ashwagandha?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        <strong>When not to take ashwagandha:</strong> Avoid during pregnancy and breastfeeding, if you have hyperthyroidism, before surgery (stop 2 weeks prior), with sedative medications, or if you have autoimmune conditions without doctor supervision. Also avoid if you&apos;re on thyroid medication unless cleared by your doctor.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        How does ashwagandha help with anxiety and depression?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        <strong>Ashwagandha helps with anxiety</strong> by reducing cortisol levels (stress hormone) by up to 30% in studies. It&apos;s one of the <strong>best herbs for anxiety and depression</strong> because it modulates GABA receptors in the brain, promoting calmness. For anxiety, it works within 1-2 weeks. It&apos;s also effective as one of the <strong>best herbs for stress and anxiety</strong> when combined with lifestyle changes.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        Can I take ashwagandha with birth control pills?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        Generally, Ashwagandha doesn&apos;t interfere with birth control effectiveness. However, always inform your healthcare provider about all supplements you&apos;re taking to ensure safety and monitor for any unexpected interactions.
                      </p>
                    </details>

                    <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                      <summary className="font-bold text-gray-900 cursor-pointer hover:text-green-600">
                        Should I cycle Ashwagandha or take it continuously?
                      </summary>
                      <p className="text-gray-700 mt-3 pl-4 border-l-2 border-green-500">
                        Most practitioners recommend <strong>continuous use for 2-3 months</strong> to see full hormonal benefits, then take a <strong>1-2 week break</strong> before resuming. This prevents your body from adapting too much and maintains effectiveness.
                      </p>
                    </details>
                  </div>
                </section>

                {/* Gentle Reminder */}
                <section className="mb-12">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-pink-200 text-center">
                    <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      🌿 A Gentle Reminder
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
                      You don&apos;t need to &quot;power through&quot; stress or hormonal chaos.
                      <br />
                      Balance isn&apos;t about perfection — it&apos;s about <strong>supporting your body the way it needs</strong>.
                    </p>
                    <p className="text-gray-800 font-semibold mb-6">
                      With the right herb and the right approach, your body remembers how to heal.
                    </p>
                    <p className="text-lg text-gray-800 mb-6">
                      ✨ Start small, stay consistent, and listen to your body.
                    </p>
                    <Link 
                      href="/constitution-test"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-5 h-5" />
                      Take Free TCM Constitution Test
                    </Link>
                  </div>
                </section>

                {/* Scientific References */}
                <section className="mb-12">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      📚 Scientific References
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Our information is based on peer-reviewed research and authoritative medical sources:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-sm">
                      <li className="text-gray-700 pl-2">
                        <a href="https://pubmed.ncbi.nlm.nih.gov/23439798/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Chandrasekhar K, et al. (2012). &quot;A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults.&quot; Indian J Psychol Med. 34(3): 255-62.
                        </a>
                      </li>
                      <li className="text-gray-700 pl-2">
                        <a href="https://pubmed.ncbi.nlm.nih.gov/31517876/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Salve J, et al. (2019). &quot;Adaptogenic and Anxiolytic Effects of Ashwagandha Root Extract in Healthy Adults.&quot; Cureus. 11(12): e6466.
                        </a>
                      </li>
                      <li className="text-gray-700 pl-2">
                        <a href="https://www.nccih.nih.gov/health/ashwagandha" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          National Center for Complementary and Integrative Health (NCCIH) - Ashwagandha Overview
                        </a>
                      </li>
                      <li className="text-gray-700 pl-2">
                        <a href="https://examine.com/supplements/ashwagandha/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Examine.com - Ashwagandha Research Analysis & Scientific Evidence
                        </a>
                      </li>
                    </ol>
                    
                    {/* Medical Disclaimer */}
                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                            ⚠️ Medical Disclaimer
                          </h3>
                          <p className="text-xs text-yellow-700 leading-relaxed">
                            This information is for educational purposes only and is not intended as a substitute 
                            for professional medical advice, diagnosis, or treatment. Ashwagandha may interact with 
                            certain medications including thyroid medications, sedatives, and immunosuppressants. 
                            Always consult your healthcare provider before starting any herbal supplement, especially 
                            if you have existing medical conditions, are pregnant or breastfeeding, or take prescription 
                            medications. This content has been reviewed by a licensed pharmacist but does not constitute 
                            medical advice for individual circumstances.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              {/* Related Articles */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Articles & Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link 
                    href="/herbs/ashwagandha"
                    className="group block p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-green-500"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2 flex items-center gap-2">
                      <Leaf className="w-5 h-5" />
                      Complete Ashwagandha Herb Profile
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Detailed scientific information about ashwagandha benefits, safety, dosage protocols, and clinical research.
                    </p>
                  </Link>
                  
                  <Link 
                    href="/herbs/rhodiola-crenulata"
                    className="group block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-purple-500"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Rhodiola for Energy & Stress
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Another powerful adaptogen for women dealing with stress and fatigue. Learn how it pairs with Ashwagandha.
                    </p>
                  </Link>

                  <Link 
                    href="/constitution-test"
                    className="group block p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-yellow-500"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-yellow-600 mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Find Your TCM Body Type
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Take our free 5-minute test to discover which herbs match your unique constitution and health needs.
                    </p>
                  </Link>

                  <Link 
                    href="/herb-finder"
                    className="group block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Discover More Adaptogen Herbs
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Find other herbs for stress relief, hormone balance, and energy support based on your specific needs.
                    </p>
                  </Link>
                </div>
              </div>

            </div>
          </article>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl overflow-hidden mt-8 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Perfect Herb Match?
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Take our free TCM Constitution Test to discover which herbs align with your unique body type 
              and get personalized recommendations for optimal results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/constitution-test"
                className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg"
              >
                <Target className="w-5 h-5" />
                Take Free Constitution Test
              </Link>
              <Link 
                href="/herb-finder"
                className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-800 transition-all shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Browse Herb Database
              </Link>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}

