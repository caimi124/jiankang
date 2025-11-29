import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import MedicalReviewBanner from '../../../components/MedicalReviewBanner'
import { 
  Calendar, User, Tag, Share2, Bookmark, ArrowLeft, 
  Dumbbell, Zap, Heart, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, Target, Pill, Coffee, Moon, Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fenugreek for Men: Boost Testosterone Naturally (2024 Guide)',
  description: 'Fenugreek for testosterone: 600mg daily boosts levels 12-20%. Science-backed guide on dosage, timing, and safety. Expert-reviewed for men 30-60.',
  keywords: [
    'fenugreek for men',
    'fenugreek testosterone',
    'fenugreek benefits for men',
    'fenugreek dosage for testosterone',
    'natural testosterone booster',
    'fenugreek for muscle building',
    'fenugreek for libido',
    'fenugreek supplement for male',
    'how to boost testosterone naturally',
    'fenugreek side effects men',
    'best time to take fenugreek',
    'fenugreek with ashwagandha',
    'testosterone support supplements',
    'fenugreek pills benefits'
  ].join(', '),
  authors: [{ name: 'HerbScience Team' }, { name: '曾楚平 (Zeng Chuping), Licensed Pharmacist & TCM Expert', url: '/about' }],
  openGraph: {
    title: 'Fenugreek for Men: Natural Testosterone Boost Guide',
    description: 'Science-backed fenugreek guide for men: boost testosterone 12-20%, increase libido, build muscle. Safe dosage and timing by licensed pharmacist.',
    type: 'article',
    url: 'https://herbscience.shop/blog/fenugreek-for-men-testosterone-boost',
    siteName: 'HerbScience',
    publishedTime: '2024-11-29',
    modifiedTime: new Date().toISOString(),
    tags: [
      'fenugreek',
      'testosterone',
      'mens health',
      'muscle building',
      'libido',
      'natural supplements',
      'TCM',
      'adaptogen'
    ],
    images: [
      {
        url: '/hero-bg.svg',
        width: 1200,
        height: 630,
        alt: 'Fenugreek for Men - Natural Testosterone Boost Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenugreek for Men: Boost Testosterone Naturally',
    description: 'Science-backed guide: 600mg fenugreek daily boosts testosterone 12-20%. Learn dosage, timing, and safety tips.',
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/blog/fenugreek-for-men-testosterone-boost'
  }
}

export default function FenugreekForMenPage() {
  // Structured Data for Google Rich Results
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Fenugreek for Men: Boosting Testosterone Naturally - Complete Evidence-Based Guide",
    "description": "Comprehensive guide on how fenugreek helps men boost testosterone, build muscle, and increase libido naturally. Expert-reviewed dosage and safety information.",
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
    "datePublished": "2024-11-29",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://herbscience.shop/blog/fenugreek-for-men-testosterone-boost"
    },
    "keywords": "fenugreek for men, testosterone boost, natural testosterone booster, mens health, muscle building, libido enhancement",
    "articleSection": "Men's Health, Natural Medicine",
    "wordCount": 2400
  }

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use Fenugreek to Boost Testosterone",
    "description": "Step-by-step guide to using fenugreek for natural testosterone support",
    "image": "https://herbscience.shop/hero-bg.svg",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose Your Form",
        "text": "Select fenugreek capsules (500-600mg standardized extract) or powder (1-2 teaspoons daily)",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Determine Optimal Timing",
        "text": "Take in the morning for energy, or post-workout for muscle recovery, or before bed for libido support",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Start with Correct Dosage",
        "text": "Begin with 500-600mg daily (split into 300mg twice daily with meals)",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Combine with Synergistic Supplements",
        "text": "Pair with Vitamin D, Zinc, or Ashwagandha for enhanced testosterone support",
        "position": 4
      },
      {
        "@type": "HowToStep",
        "name": "Maintain Consistency",
        "text": "Take daily for 2-4 weeks to see noticeable effects on testosterone, energy, and muscle mass",
        "position": 5
      }
    ]
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best fenugreek dosage for testosterone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The research-backed dosage is 600mg of standardized fenugreek extract (50% saponins) daily, split into 300mg twice daily with meals. Clinical studies show this dosage increases free testosterone by 12.26% and total testosterone by 6.57% in men aged 25-52 over 8 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "How long does fenugreek take to boost testosterone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most men notice effects after 2-4 weeks of consistent use. Testosterone levels typically increase within 8 weeks, with improvements in libido (82% of participants), sexual performance (66%), and energy levels (81%) according to clinical studies."
        }
      },
      {
        "@type": "Question",
        "name": "When is the best time to take fenugreek for men?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For energy: morning with breakfast. For muscle growth: post-workout with protein. For libido: 30-60 minutes before bedtime. Split your dose into twice daily (morning and evening) for consistent testosterone support."
        }
      },
      {
        "@type": "Question",
        "name": "Can I combine fenugreek with other testosterone supplements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Fenugreek synergizes well with Vitamin D (essential for testosterone), Zinc (supports hormone production), and Ashwagandha (reduces cortisol stress hormone). This combination can provide comprehensive testosterone support."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any side effects of fenugreek for men?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fenugreek is generally safe. Mild side effects may include digestive upset, maple syrup-scented body odor (harmless), or potential blood sugar lowering. Avoid if allergic to legumes. Consult your doctor if taking diabetes or blood-thinning medications."
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Fenugreek for Men' }
          ]} 
        />

        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Articles
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
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 px-8 py-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Dumbbell className="w-4 h-4" />
                  Men's Health
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Testosterone
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Evidence-Based
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Fenugreek for Men: Boosting Testosterone Naturally
              </h1>

              <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                A practical, science-backed guide to using fenugreek for natural testosterone support, muscle building, and enhanced vitality
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Nov 29, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">8 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">By HerbScience Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-12">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                As men age, it's normal to experience a gradual decline in testosterone levels. This can lead to a variety of symptoms—such as <strong>low energy, reduced muscle mass, and mood changes</strong>. If you've been feeling less energetic or struggling with other signs of low testosterone, you're not alone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Fortunately, <strong>Fenugreek may be a natural way to support healthy testosterone levels</strong>. But how exactly can Fenugreek help, and when should you use it? Let's dive into this practical guide to help you feel stronger, more focused, and energized.
              </p>
            </div>

            {/* Quick Stats Box */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Key Research Findings
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">+12-20%</div>
                  <div className="text-sm text-gray-600">Testosterone Increase</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">600mg</div>
                  <div className="text-sm text-gray-600">Optimal Daily Dose</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">2-4 weeks</div>
                  <div className="text-sm text-gray-600">Time to See Results</div>
                </div>
              </div>
            </div>

            {/* Section 1: Why Consider Fenugreek */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Why Should You Consider Fenugreek?
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Testosterone plays a crucial role in your overall health, affecting everything from your energy levels and muscle mass to your mood and libido. When testosterone levels drop, many men notice changes that can make them feel less like themselves.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Signs You May Need Testosterone Support
                </h3>
                <p className="text-gray-700 mb-4">If you're dealing with any of the following, Fenugreek might be worth considering:</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Constant Fatigue</h4>
                      <p className="text-sm text-gray-600">
                        If you're always tired, especially during or after exercise, your testosterone levels may be lower than you need them to be. Fenugreek supports natural energy production.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Dumbbell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Difficulty Gaining Muscle</h4>
                      <p className="text-sm text-gray-600">
                        Struggling to build muscle despite regular workouts? Low testosterone could be a factor. Fenugreek may support natural muscle growth by helping maintain testosterone levels.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Reduced Libido</h4>
                      <p className="text-sm text-gray-600">
                        Testosterone directly impacts sexual desire. If you've noticed a decrease in libido, Fenugreek might help restore a healthy balance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Mood Swings & Irritability</h4>
                      <p className="text-sm text-gray-600">
                        Low testosterone levels can lead to mood changes, including irritability and stress. Fenugreek may help regulate your mood and keep you more level-headed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: How to Use Fenugreek */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Pill className="w-8 h-8 text-green-600" />
                How to Use Fenugreek for Testosterone Support
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Incorporating Fenugreek into your routine is simple. Here's a practical guide to help you get started:
              </p>

              {/* Subsection 1: Supplement Forms */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Fenugreek Supplement Forms</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">💊 Capsules or Tablets (Most Convenient)</h4>
                    <p className="text-gray-700 mb-2">
                      These are convenient and easy to take. Typically, you can find Fenugreek supplements that are designed to support testosterone levels in a single daily dose.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-900">
                        <strong>Recommended:</strong> 500-600mg per day (standardized to 50% saponins). Always check the specific supplement's instructions.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">🥄 Fenugreek Powder (Flexible Option)</h4>
                    <p className="text-gray-700 mb-2">
                      You can mix Fenugreek powder into smoothies, shakes, or even teas. This is a great option if you prefer to incorporate the herb into your food or drink.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-900">
                        <strong>Dosage:</strong> 1-2 teaspoons (5-10g) daily mixed in protein shakes or smoothies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsection 2: Best Time to Take */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Best Time to Take Fenugreek</h3>
                
                <p className="text-gray-700 mb-4">
                  Fenugreek can be taken at any time of day, but timing can optimize specific benefits:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                    <Coffee className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">For Energy & Focus</h4>
                      <p className="text-sm text-gray-600">Take your Fenugreek supplement in the <strong>morning with breakfast</strong> to help boost energy levels throughout the day.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                    <Dumbbell className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">For Muscle Growth</h4>
                      <p className="text-sm text-gray-600">If you're working out, taking Fenugreek <strong>post-workout with protein</strong> may help support muscle recovery and growth.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                    <Moon className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">For Libido Support</h4>
                      <p className="text-sm text-gray-600">To support sexual health, you may want to take Fenugreek <strong>30 minutes to an hour before bedtime</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsection 3: Dosage Tips */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Fenugreek Dosage Tips</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      <strong>Standard Dose:</strong> A typical Fenugreek supplement contains 500-600mg per serving. This is usually safe for most men.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      <strong>Split Dosing:</strong> For best results, split into 300mg twice daily (morning and evening with meals).
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      <strong>Start Low:</strong> It's always a good idea to start with a smaller dose (300mg) and increase as needed to assess tolerance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subsection 4: Supplement Combinations */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Can You Combine Fenugreek with Other Supplements?</h3>
                
                <p className="text-gray-700 mb-4">
                  <strong>Yes!</strong> Fenugreek can be combined with other supplements that support male health. Here are powerful synergistic combinations:
                </p>

                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-bold text-gray-900 mb-2">☀️ Fenugreek + Vitamin D</h4>
                    <p className="text-sm text-gray-600">
                      Vitamin D is crucial for testosterone production. Combining it with Fenugreek can <strong>maximize your results</strong>. Studies show low Vitamin D is linked to low testosterone.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-bold text-gray-900 mb-2">⚡ Fenugreek + Zinc</h4>
                    <p className="text-sm text-gray-600">
                      Zinc is another important nutrient for testosterone levels. Combining it with Fenugreek can have a <strong>synergistic effect</strong>, especially for men with zinc deficiency.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-bold text-gray-900 mb-2">🌿 Fenugreek + Ashwagandha</h4>
                    <p className="text-sm text-gray-600">
                      This adaptogenic herb can help <strong>reduce stress and balance hormones</strong>, making it a great complement to Fenugreek. Ashwagandha lowers cortisol (stress hormone) while Fenugreek boosts testosterone.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-orange-300">
                  <p className="text-sm font-medium text-orange-900">
                    💡 <strong>Pro Tip:</strong> For comprehensive testosterone support, consider a stack of Fenugreek (600mg) + Vitamin D (2000-4000 IU) + Zinc (15-30mg) + Ashwagandha (300mg). <Link href="/herbs/fenugreek" className="text-green-600 hover:underline">Learn more about fenugreek combinations →</Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Start Guide Checklist */}
            <section className="mb-10">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  Quick Start Guide: 4-Step Checklist
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="bg-white text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold mb-1">Choose your form</h3>
                      <p className="text-green-100 text-sm">Capsules (500-600mg), tablets, or powder (1-2 tsp daily)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="bg-white text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold mb-1">Take daily with meals</h3>
                      <p className="text-green-100 text-sm">500-600mg split into 300mg twice daily (morning + evening)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="bg-white text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold mb-1">Combine with Vitamin D or Zinc (optional)</h3>
                      <p className="text-green-100 text-sm">For enhanced testosterone support and synergistic effects</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="bg-white text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold mb-1">Consistency is key</h3>
                      <p className="text-green-100 text-sm">Take regularly for 2-4 weeks to see noticeable effects on testosterone, energy, and muscle</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Precautions Section */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                Precautions: Who Should Avoid Fenugreek?
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                While Fenugreek is generally safe for most men, there are some important considerations:
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-lg">
                  <h3 className="font-bold text-red-900 mb-2">❌ Diabetes or Low Blood Sugar</h3>
                  <p className="text-gray-700 text-sm">
                    If you have diabetes or take blood sugar medications, <strong>consult with your doctor before taking Fenugreek</strong>. Fenugreek can significantly lower blood sugar, potentially causing hypoglycemia when combined with medications.
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-5 rounded-lg">
                  <h3 className="font-bold text-orange-900 mb-2">⚠️ Blood Thinning Medications</h3>
                  <p className="text-gray-700 text-sm">
                    Fenugreek has mild anticoagulant effects. If you're taking blood thinners like warfarin, monitor closely and consult your healthcare provider.
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
                  <h3 className="font-bold text-yellow-900 mb-2">🥜 Allergies to Legumes</h3>
                  <p className="text-gray-700 text-sm">
                    Fenugreek belongs to the legume family. If you're allergic to peanuts, soybeans, or chickpeas, you may have cross-reactivity. <strong>Start with a small dose to test for allergic reactions.</strong>
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">👃 Maple Syrup Odor (Harmless)</h3>
                  <p className="text-gray-700 text-sm">
                    High doses may cause your sweat and urine to smell like maple syrup. This is <strong>completely harmless</strong> but worth noting. It's due to the compound sotolone in fenugreek.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Tips Section */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Additional Tips for Supporting Testosterone Levels Naturally
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                While Fenugreek can be a helpful supplement, combining it with these lifestyle strategies can <strong>maximize testosterone production</strong>:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Dumbbell className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Exercise Regularly</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Strength training and high-intensity interval training (HIIT)</strong> are particularly beneficial for boosting testosterone. Aim for 3-4 resistance training sessions per week.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Coffee className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Eat a Balanced Diet</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    Ensure you're getting plenty of <strong>healthy fats (avocado, olive oil), lean protein, and micronutrients like zinc and magnesium</strong>. Avoid excessive sugar and processed foods.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Moon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Get Enough Sleep</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    Testosterone levels are highest when you get <strong>7-9 hours of quality sleep</strong> each night. Poor sleep can reduce testosterone by up to 15%.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Sparkles className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Reduce Stress</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    Chronic stress elevates <strong>cortisol, which lowers testosterone</strong>. Practice relaxation techniques like meditation, yoga, or deep breathing daily.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-10">
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Learn More About Fenugreek?</h2>
                <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
                  Discover the complete fenugreek guide including TCM body type matching, scientific evidence, dosage forms, and herb pairing recommendations.
                </p>
                <Link
                  href="/herbs/fenugreek"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
                >
                  <Target className="w-6 h-6" />
                  View Complete Fenugreek Guide
                </Link>
              </div>
            </section>

            {/* Final Thoughts */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Thoughts on Fenugreek for Testosterone Support</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Incorporating Fenugreek into your routine may be a <strong>simple and natural way to support healthy testosterone levels</strong>. Whether you're trying to regain energy, build muscle, or boost your libido, Fenugreek could be the boost you need.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Remember these key points:
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Dosage:</strong> 600mg daily (split into 300mg twice daily)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Timing:</strong> Morning for energy, post-workout for muscle, or before bed for libido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Duration:</strong> 2-4 weeks to see noticeable effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Combinations:</strong> Pair with Vitamin D, Zinc, or Ashwagandha for synergy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Lifestyle:</strong> Combine with exercise, good diet, sleep, and stress management</span>
                  </li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <p className="text-gray-700 font-medium">
                    ⚕️ <strong>Medical Disclaimer:</strong> Just remember, <strong>consistency is key</strong>, and always consult with a healthcare provider if you have any concerns or are taking medications. Individual results may vary.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles You May Like</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/herbs/fenugreek" className="group bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">Complete Fenugreek Guide</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Full herb profile with TCM body type matching, scientific evidence, and personalized dosage recommendations
                  </p>
                </Link>

                <Link href="/blog" className="group bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Dumbbell className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">More Men's Health Articles</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Explore our complete collection of evidence-based men's health and natural supplement guides
                  </p>
                </Link>
              </div>
            </section>

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">Share this article:</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5 text-blue-600" />
                    </button>
                    <button className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors">
                      <Bookmark className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    Testosterone
                  </span>
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    Men's Health
                  </span>
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    Natural Supplements
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Sure If Fenugreek Is Right for You?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Traditional Chinese Medicine teaches that not all herbs work for all people. Take our free TCM Constitution Test to discover your unique body type and get personalized herb recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/constitution-test"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
            >
              <Target className="w-5 h-5" />
              Take Free Constitution Test
            </Link>
            <Link
              href="/herb-finder"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Browse All Herbs
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
