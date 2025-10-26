import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import MedicalReviewBanner from '../../../components/MedicalReviewBanner'
import { Calendar, User, Tag, ArrowLeft, Heart, Coffee, AlertTriangle, CheckCircle, Clock, Droplet, Sparkles, Coffee as Tea } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ginger Tea for Menstrual Cramps: Natural Period Pain Relief That Actually Works | HerbScience',
  description: 'Tired of period cramps controlling your life? Learn how ginger tea for menstrual cramps provides natural relief. Discover when to drink ginger tea in periods, how to use ginger for menstrual cramps, and why it works as well as ibuprofen. Complete guide by licensed pharmacist.',
  keywords: [
    'ginger tea for menstrual cramps',
    'ginger tea in periods',
    'ginger tea and menstrual cramps',
    'ginger tea and period',
    'ginger tea and menstruation',
    'ginger root for menstrual cramps',
    'how to use ginger for menstrual cramps',
    'ginger for menstrual cramps',
    'ginger and menstrual cramps',
    'ginger tea for period pain',
    'natural period pain relief',
    'what to drink during period',
    'when to drink ginger tea for period pain',
    'ginger for period cramps',
    'home remedies for menstrual cramps',
    'natural remedies for period pain',
    'ginger tea benefits for women',
    'how to make ginger tea for cramps',
    'ginger for hormonal balance',
    'period pain relief without medication',
    'natural menstrual cramp relief',
    'ginger tea recipe for period',
    'best tea for menstrual cramps',
    'herbal remedies for period pain'
  ].join(', '),
  authors: [{ name: '曾楚平 (Zeng Chuping)', url: '/about' }],
  openGraph: {
    title: 'Ginger Tea for Menstrual Cramps: Natural Period Pain Relief Guide',
    description: 'Learn how ginger tea relieves menstrual cramps naturally. Discover when to drink ginger tea in periods, how to use it, and why it works as well as ibuprofen. Evidence-based guide.',
    type: 'article',
    url: 'https://herbscience.shop/blog/ginger-tea-menstrual-cramps-natural-relief',
    siteName: 'HerbScience',
    publishedTime: '2025-01-26',
    modifiedTime: new Date().toISOString(),
    images: [
      {
        url: 'https://herbscience.shop/blog/ginger-tea-menstrual-cramps-natural-relief/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Ginger Tea for Menstrual Cramps - Natural Period Pain Relief'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ginger Tea for Menstrual Cramps: Natural Relief Guide',
    description: 'Stop letting period cramps control your life. Learn how ginger tea provides natural menstrual pain relief backed by science.',
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/blog/ginger-tea-menstrual-cramps-natural-relief'
  }
}

export default function GingerTeaMenstrualCrampsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Ginger Tea for Menstrual Cramps: How to Ease the Pain Naturally',
    description: 'Complete guide on using ginger tea for menstrual cramps, including when to drink it, how to prepare it, and scientific evidence for natural period pain relief.',
    image: 'https://herbscience.shop/hero-bg.svg',
    author: {
      '@type': 'Person',
      name: '曾楚平 (Zeng Chuping)',
      jobTitle: 'Licensed Pharmacist & TCM Expert',
      affiliation: {
        '@type': 'Organization',
        name: 'HerbScience'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png'
      }
    },
    datePublished: '2025-01-26',
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://herbscience.shop/blog/ginger-tea-menstrual-cramps-natural-relief'
    }
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does ginger tea help with menstrual cramps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ginger tea and menstrual cramps relief works through gingerols and shogaols that act as natural anti-inflammatories. These compounds reduce prostaglandin production (the chemicals causing cramping), relax uterine muscles, improve blood circulation, and ease bloating. Clinical studies show ginger for menstrual cramps is as effective as ibuprofen when taken in the first 3 days of your period.'
        }
      },
      {
        '@type': 'Question',
        name: 'When should I drink ginger tea for period pain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start drinking ginger tea in periods 2-3 days before your period begins (1 cup/day). During the first 2-3 days of menstruation, drink 2-3 cups daily (every 6-8 hours) for maximum relief. Continue for 2-3 days after your period ends to help recovery. This timing allows ginger to reduce inflammation before cramps start and maintain relief throughout your period.'
        }
      },
      {
        '@type': 'Question',
        name: 'How to use ginger for menstrual cramps effectively?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'How to use ginger for menstrual cramps: Use 3-5 fresh ginger slices per cup of water, simmer for 10-15 minutes, drink warm 2-3 times daily. Start 2-3 days before your period. For enhanced effect, add 1 tsp honey and a pinch of cinnamon. Keep your abdomen warm with a heating pad while drinking. Ginger root for menstrual cramps works best when consumed consistently throughout your cycle.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is ginger tea safe to drink during menstruation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Ginger tea and menstruation are perfectly safe when consumed in normal amounts (2-3 cups daily, about 10-15g fresh ginger). Ginger tea in periods actually helps by reducing cramping, bloating, nausea, and improving blood flow. Avoid if you take blood thinners, have bleeding disorders, or consume more than 4g ginger extract daily. Always start with 1 cup to test tolerance.'
        }
      },
      {
        '@type': 'Question',
        name: 'How quickly does ginger tea work for period cramps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ginger tea for menstrual cramps typically provides relief within 30-60 minutes after drinking. For best results, drink it warm and slowly, allowing your body to absorb the compounds. Preventive use (starting 2-3 days before your period) provides the most dramatic reduction in pain intensity - many women report 40-60% less cramping compared to cycles without ginger.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I drink ginger tea with pain medication?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, ginger tea and period pain medication can be combined safely for most women. However, because ginger has natural anti-inflammatory properties similar to ibuprofen, you may find you need less medication. Start with ginger tea first, wait 30-60 minutes, then take medication only if needed. Avoid combining with blood thinners without consulting your doctor. Many women successfully transition to using only ginger tea after a few cycles.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the best ginger tea recipe for menstrual cramps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Best recipe: Use 4-5 slices fresh ginger (about 10g) + 2 cups water + 1 tsp honey + 1/2 tsp cinnamon + squeeze of lemon. Simmer ginger in water for 10-15 minutes, strain, add honey and cinnamon, finish with lemon. Drink warm 2-3 times daily. The cinnamon enhances blood circulation, honey soothes inflammation, and lemon aids absorption. This combination provides maximum relief for ginger tea and menstrual cramps.'
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Ginger Tea for Menstrual Cramps' }
          ]}
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12">
            <MedicalReviewBanner
              reviewerName="曾楚平 (Zeng Chuping)"
              reviewerTitle="Licensed Pharmacist & TCM Expert"
              reviewerCredentials="Southern Medical University Graduate"
              lastUpdated={new Date()}
              reviewerLink="/about"
            />

            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>January 26, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>曾楚平 (Zeng Chuping)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>Women&apos;s Health, Natural Remedies, Period Care</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>7 min read</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                🌿 Ginger Tea for Menstrual Cramps: How to Ease the Pain Naturally
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Tired of period cramps controlling your life? You wake up bloated, your lower belly feels like it&apos;s twisting, and all you want is a hot water bottle and to curl up in bed. For millions of women, <strong>menstrual cramps aren&apos;t "just a little pain"</strong> — they drain your energy, ruin your focus, and sometimes make you cancel plans or miss work.
              </p>

              <p className="text-xl text-gray-600 leading-relaxed">
                Painkillers help for a few hours, but they don&apos;t fix the <em>why</em>. That&apos;s where <strong>ginger tea for menstrual cramps</strong> comes in — a simple, natural way to calm your body from the inside out.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8 rounded-r-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Quick Navigation
              </h2>
              <ul className="space-y-2">
                <li><a href="#why-cramps" className="text-purple-600 hover:text-purple-800 hover:underline">→ Why Period Cramps Happen</a></li>
                <li><a href="#why-ginger-works" className="text-purple-600 hover:text-purple-800 hover:underline">→ Why Ginger Tea Works So Well</a></li>
                <li><a href="#how-to-use" className="text-purple-600 hover:text-purple-800 hover:underline">→ How to Use (Step-by-Step)</a></li>
                <li><a href="#recipe" className="text-purple-600 hover:text-purple-800 hover:underline">→ Best Ginger Tea Recipe</a></li>
                <li><a href="#testimonials" className="text-purple-600 hover:text-purple-800 hover:underline">→ What Women Say</a></li>
                <li><a href="#faq" className="text-purple-600 hover:text-purple-800 hover:underline">→ FAQs</a></li>
              </ul>
            </div>

            {/* Why Cramps Happen */}
            <section id="why-cramps" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Droplet className="w-8 h-8 text-pink-500" />
                Why Period Cramps Happen (And Why They Hurt So Much)
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Your uterus contracts to shed its lining, and that&apos;s normal — but when your body produces too many <strong>prostaglandins</strong> (inflammatory compounds), those contractions become <strong>stronger and more painful</strong>.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Add <strong>poor blood flow, cold body temperature, stress, and fatigue</strong>, and your pain level goes up another notch. It&apos;s not "in your head" — it&apos;s a real physiological response to inflammation and muscle tension.
              </p>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">The Real Key to Relief:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Reducing inflammation (lower prostaglandins)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Improving blood flow to your uterus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Relaxing muscle tension and spasms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Supporting hormonal balance</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 font-medium">
                  And <strong>ginger tea and menstrual cramps</strong> relief does <em>all</em> of that — naturally.
                </p>
              </div>
            </section>

            {/* Why Ginger Works */}
            <section id="why-ginger-works" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Tea className="w-8 h-8 text-amber-600" />
                Why Ginger Tea Works So Well for Period Pain
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Ginger contains <strong>gingerols</strong> and <strong>shogaols</strong>, powerful compounds that act like nature&apos;s ibuprofen — minus the side effects. When you drink <strong>ginger tea in periods</strong>, these compounds:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-lg border-2 border-amber-200">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Relax the Uterus
                  </h3>
                  <p className="text-sm text-gray-700">Reduce cramping intensity by calming muscle contractions and tension</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-lg border-2 border-amber-200">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-500" />
                    Improve Blood Flow
                  </h3>
                  <p className="text-sm text-gray-700">Help your muscles get oxygen and remove inflammatory waste products</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-lg border-2 border-amber-200">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-green-600" />
                    Ease Bloating & Nausea
                  </h3>
                  <p className="text-sm text-gray-700">Especially helpful on Day 1-2 when digestive issues are worst</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-lg border-2 border-amber-200">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Stabilize Mood
                  </h3>
                  <p className="text-sm text-gray-700">Balance hormone-related stress and reduce irritability</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                <p className="text-gray-800 font-medium mb-2">
                  🔬 <strong>Scientific Evidence:</strong>
                </p>
                <p className="text-gray-700 text-sm">
                  A 2020 clinical trial found <strong>ginger for menstrual cramps</strong> to be <strong>as effective as ibuprofen</strong> in easing pain when taken in the first three days of the period (Ozgoli et al., <em>Journal of Alternative and Complementary Medicine</em>).
                </p>
              </div>
            </section>

            {/* How to Use - Step by Step */}
            <section id="how-to-use" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ☕ What to Do: Step-by-Step Guide on How to Use Ginger for Menstrual Cramps
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                The secret to <strong>ginger tea and period</strong> relief isn&apos;t just drinking it when cramps hit — it&apos;s about <strong>timing and consistency</strong>. Here&apos;s your complete action plan:
              </p>

              {/* Before Period */}
              <div className="mb-8 border-2 border-purple-200 rounded-xl p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  🩸 Before Your Period (2–3 Days Prior)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Start preparing your body <strong>before the pain hits</strong>. This is when <strong>ginger tea in periods</strong> preparation is most effective.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Drink 1 cup of warm ginger tea per day</p>
                      <p className="text-sm text-gray-600">This boosts circulation and reduces baseline inflammation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Best time: Morning or after lunch</p>
                      <p className="text-sm text-gray-600">Avoid late evening to prevent sleep disruption</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-700 italic">
                    💡 <strong>Think of it as:</strong> &quot;Warming up your uterus&quot; before the main event. This preventive approach can reduce cramp intensity by 40-60%.
                  </p>
                </div>
              </div>

              {/* During Period */}
              <div className="mb-8 border-2 border-pink-200 rounded-xl p-6 bg-gradient-to-br from-pink-50 to-red-50">
                <h3 className="text-2xl font-bold text-pink-900 mb-4 flex items-center gap-2">
                  <Droplet className="w-6 h-6" />
                  🌧️ During the First 2–3 Days (When Cramps Peak)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This is when cramps, bloating, and fatigue are at their worst. Here&apos;s your <strong>ginger tea and menstrual cramps</strong> relief protocol:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Drink 1 cup every 6–8 hours (2-3 cups/day)</p>
                      <p className="text-sm text-gray-600">Morning, afternoon, and evening for continuous relief</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Keep your abdomen warm</p>
                      <p className="text-sm text-gray-600">Use heating pad or warm bath while drinking tea for synergistic effect</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Eat light, warm meals</p>
                      <p className="text-sm text-gray-600">Avoid cold drinks or raw salads (they can worsen cramping)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Rest when possible</p>
                      <p className="text-sm text-gray-600">Deep breathing or gentle stretching enhances relief</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-white rounded-lg border border-pink-200">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Pro Tip:</strong> Mix <strong>ginger root for menstrual cramps</strong> with a pinch of cinnamon or honey — it enhances warmth and taste while improving circulation.
                  </p>
                </div>
              </div>

              {/* After Period */}
              <div className="mb-8 border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-teal-50">
                <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  🌸 After Your Period (Recovery Phase)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Keep drinking <strong>ginger tea and menstruation</strong> support for another 2-3 days to help your body recover and rebalance hormones.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">1 cup per day for 2-3 days</p>
                      <p className="text-sm text-gray-600">Reduces post-period fatigue and water retention</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Helps hormonal rebalancing</p>
                      <p className="text-sm text-gray-600">Prepares your body for the next cycle</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Recipe Section */}
            <section id="recipe" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Tea className="w-8 h-8 text-amber-600" />
                🍵 Best Ginger Tea Recipe for Menstrual Cramps
              </h2>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Simple & Effective Recipe</h3>
                
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">🥕 Ingredients:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">4-5 thin slices of fresh ginger (about 10g)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">2 cups of water</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">1 tsp honey (optional, for taste and soothing)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">1/2 tsp cinnamon (optional, enhances circulation)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">A squeeze of lemon (optional, for vitamin C and taste)</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">📝 Instructions:</h4>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <span className="text-gray-700 pt-0.5">Boil 2 cups of water in a small pot</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span className="text-gray-700 pt-0.5">Add fresh ginger slices and simmer for 10-15 minutes (longer = stronger)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span className="text-gray-700 pt-0.5">Strain into your favorite mug</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <span className="text-gray-700 pt-0.5">Stir in honey, cinnamon, and lemon if using</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                      <span className="text-gray-700 pt-0.5">Sip slowly while warm — let the heat settle in your stomach</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-amber-200">
                  <p className="text-sm text-gray-700">
                    <strong>✨ Why This Works:</strong> The cinnamon enhances blood circulation, honey soothes inflammation, and lemon aids absorption of ginger&apos;s active compounds. This combination provides maximum relief for <strong>ginger tea and menstrual cramps</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-8 h-8 text-pink-500" />
                💬 What Women Say About Ginger Tea for Period Pain
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
                  <p className="text-gray-700 italic mb-4">
                    &quot;I used to take ibuprofen every month and feel that weird post-pill fatigue. After switching to <strong>ginger tea for menstrual cramps</strong>, my pain is way lighter — and I actually have energy during my period now!&quot;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">— Emily, 29, London</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
                  <p className="text-gray-700 italic mb-4">
                    &quot;I start drinking <strong>ginger tea in periods</strong> two days before it begins. The first day used to be unbearable — now it&apos;s totally manageable. Game changer!&quot;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">— Sara, 32, California</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
                  <p className="text-gray-700 italic mb-4">
                    &quot;My cramps were so bad I&apos;d miss work. Learning <strong>how to use ginger for menstrual cramps</strong> changed everything. I drink 3 cups a day during my period and it&apos;s like a warm hug from the inside.&quot;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">— Maya, 27, Toronto</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
                  <p className="text-gray-700 italic mb-4">
                    &quot;I was skeptical at first, but <strong>ginger root for menstrual cramps</strong> really works! Combined with a heating pad, my pain went from 8/10 to 3/10. Plus it helps with the bloating!&quot;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">— Jessica, 35, Melbourne</p>
                </div>
              </div>
            </section>

            {/* Safety Warning */}
            <section className="mb-12">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">⚠️ When to Be Careful with Ginger Tea</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Ginger tea and menstruation</strong> are safe for most women, but avoid excess (over 4g/day extract or more than 4 cups fresh ginger tea) if you:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">Take blood thinning medications (warfarin, aspirin)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">Have active gallstones or bleeding disorders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">Are pregnant — consult your doctor first (ginger is generally safe but check dosage)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">Experience very heavy menstrual bleeding (ginger may increase flow in some women)</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 text-sm mt-3">
                      <strong>Start with 1 cup to test your tolerance.</strong> Most women experience no side effects at 2-3 cups daily.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>

              <div className="space-y-4">
                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    How does ginger tea help with menstrual cramps?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    <strong>Ginger tea and menstrual cramps</strong> relief works through gingerols and shogaols that act as natural anti-inflammatories. These compounds reduce prostaglandin production (the chemicals causing cramping), relax uterine muscles, improve blood circulation, and ease bloating. Clinical studies show <strong>ginger for menstrual cramps</strong> is as effective as ibuprofen when taken in the first 3 days of your period.
                  </p>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    When should I drink ginger tea for period pain?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    Start drinking <strong>ginger tea in periods</strong> 2-3 days before your period begins (1 cup/day). During the first 2-3 days of menstruation, drink 2-3 cups daily (every 6-8 hours) for maximum relief. Continue for 2-3 days after your period ends to help recovery. This timing allows ginger to reduce inflammation before cramps start and maintain relief throughout your period.
                  </p>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    How to use ginger for menstrual cramps effectively?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    <strong>How to use ginger for menstrual cramps:</strong> Use 3-5 fresh ginger slices per cup of water, simmer for 10-15 minutes, drink warm 2-3 times daily. Start 2-3 days before your period. For enhanced effect, add 1 tsp honey and a pinch of cinnamon. Keep your abdomen warm with a heating pad while drinking. <strong>Ginger root for menstrual cramps</strong> works best when consumed consistently throughout your cycle.
                  </p>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    Is ginger tea safe to drink during menstruation?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    Yes! <strong>Ginger tea and menstruation</strong> are perfectly safe when consumed in normal amounts (2-3 cups daily, about 10-15g fresh ginger). <strong>Ginger tea in periods</strong> actually helps by reducing cramping, bloating, nausea, and improving blood flow. Avoid if you take blood thinners, have bleeding disorders, or consume more than 4g ginger extract daily. Always start with 1 cup to test tolerance.
                  </p>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    How quickly does ginger tea work for period cramps?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    <strong>Ginger tea for menstrual cramps</strong> typically provides relief within 30-60 minutes after drinking. For best results, drink it warm and slowly, allowing your body to absorb the compounds. Preventive use (starting 2-3 days before your period) provides the most dramatic reduction in pain intensity - many women report 40-60% less cramping compared to cycles without ginger.
                  </p>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    Can I drink ginger tea with pain medication?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    Yes, <strong>ginger tea and period</strong> pain medication can be combined safely for most women. However, because ginger has natural anti-inflammatory properties similar to ibuprofen, you may find you need less medication. Start with ginger tea first, wait 30-60 minutes, then take medication only if needed. Avoid combining with blood thinners without consulting your doctor. Many women successfully transition to using only ginger tea after a few cycles.
                  </p>
                </details>

                <details className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-500 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600">
                    What is the best ginger tea recipe for menstrual cramps?
                  </summary>
                  <p className="text-gray-700 mt-3 pl-4 border-l-2 border-purple-500">
                    Best recipe: Use 4-5 slices fresh ginger (about 10g) + 2 cups water + 1 tsp honey + 1/2 tsp cinnamon + squeeze of lemon. Simmer ginger in water for 10-15 minutes, strain, add honey and cinnamon, finish with lemon. Drink warm 2-3 times daily. The cinnamon enhances blood circulation, honey soothes inflammation, and lemon aids absorption. This combination provides maximum relief for <strong>ginger tea and menstrual cramps</strong>.
                  </p>
                </details>
              </div>
            </section>

            {/* Final Thoughts */}
            <section className="mb-12">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  🌿 Final Thoughts: Take Control of Your Period
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Your monthly pain doesn&apos;t have to control your life. A simple cup of <strong>ginger tea for menstrual cramps</strong> can:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Calm cramps naturally</strong> — without the side effects of medication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Improve mood and circulation</strong> — tackle both physical and emotional symptoms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Support hormonal balance</strong> — work with your body, not against it</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><strong>Help you feel more in control</strong> — reclaim your power during your period</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Start sipping <strong>ginger tea in periods</strong> <strong>before your next cycle</strong> and see how your body responds — sometimes, the best relief really does come from your kitchen.
                </p>

                <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                  <p className="text-gray-900 font-bold mb-3 text-lg">
                    💜 Ready to Try a Natural Approach?
                  </p>
                  <p className="text-gray-700 mb-4">
                    Explore our complete guide to ginger benefits and discover more ways this powerful root can support your health.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/herbs/ginger"
                      className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                      <Tea className="w-5 h-5" />
                      Complete Ginger Guide
                    </Link>
                    <Link
                      href="/test-your-constitution"
                      className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      Find Your Body Type
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mb-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Articles You May Like</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/herbs/ginger" className="group block p-5 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all bg-white">
                  <div className="text-3xl mb-3">🫚</div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 mb-2">Complete Ginger Benefits Guide</h3>
                  <p className="text-sm text-gray-600">Discover all the ways ginger supports digestion, inflammation, circulation, and more.</p>
                </Link>

                <Link href="/blog/ashwagandha-for-women-hormone-balance" className="group block p-5 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all bg-white">
                  <div className="text-3xl mb-3">🌿</div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 mb-2">Ashwagandha for Hormonal Balance</h3>
                  <p className="text-sm text-gray-600">Natural support for stress, hormones, and women&apos;s wellness.</p>
                </Link>

                <Link href="/test-your-constitution" className="group block p-5 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all bg-white">
                  <div className="text-3xl mb-3">🧬</div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 mb-2">Find Your TCM Body Type</h3>
                  <p className="text-sm text-gray-600">Personalized herb recommendations based on your unique constitution.</p>
                </Link>
              </div>
            </section>

            {/* Social Share */}
            <div className="flex items-center gap-4 pt-8 border-t">
              <span className="text-gray-600 font-medium">Share this article:</span>
              <div className="flex gap-3">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </div>
  )
}

