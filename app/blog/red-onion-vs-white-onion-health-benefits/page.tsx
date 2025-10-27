import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import MedicalReviewBanner from '../../../components/MedicalReviewBanner'
import { Calendar, User, Tag, ArrowLeft, Heart, Sparkles, ShieldCheck, Leaf, CheckCircle, XCircle, Info, TrendingUp, Apple } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Red Onion vs White Onion: Which Is Healthier? (Science-Backed Comparison) | HerbScience',
  description: 'Red onion vs white onion — which is healthier? Discover the key differences in antioxidants, quercetin, anthocyanins, digestion benefits, and how to use each for maximum health impact. Evidence-based guide for Western readers.',
  keywords: [
    'red onion vs white onion',
    'onion health benefits',
    'pickled onion benefits',
    'who should not eat onion',
    'onion medicinal uses',
    'onion for cholesterol',
    'onion for digestion',
    'onion for weight loss',
    'onion antioxidants',
    'onion quercetin',
    'onion sulfur compounds',
    'onion and garlic benefits',
    'onion side effects',
    'onion health risks',
    'onion for heart health',
    'onion anti-inflammatory',
    'red onion benefits',
    'white onion benefits',
    'onion nutrition comparison',
    'best onion for health',
    'anthocyanins in red onions',
    'onion for gut health',
    'onion for immunity',
    'natural remedies',
    'healthy cooking'
  ],
  authors: [{ name: '曾楚平 (Zeng Chuping)', url: '/about' }],
  openGraph: {
    title: 'Red Onion vs White Onion: Which Is Healthier? | HerbScience',
    description: 'Evidence-based comparison of red vs white onions. Learn which is best for antioxidants, digestion, heart health, and cooking. Complete nutrient breakdown and usage guide.',
    type: 'article',
    url: 'https://herbscience.shop/blog/red-onion-vs-white-onion-health-benefits',
    siteName: 'HerbScience',
    publishedTime: '2025-01-27',
    modifiedTime: new Date().toISOString(),
    images: [
      {
        url: 'https://herbscience.shop/blog/red-onion-vs-white-onion-health-benefits/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Red Onion vs White Onion Health Comparison'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Onion vs White Onion: Which Is Healthier?',
    description: 'Science-backed comparison: antioxidants, digestion, heart health. Complete guide to choosing the right onion for your health goals.',
    images: ['/hero-bg.svg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/blog/red-onion-vs-white-onion-health-benefits'
  }
}

export default function RedOnionVsWhiteOnionPage() {
  return (
    <>
      {/* 结构化数据 - Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Red Onion vs White Onion: Which Is Healthier?',
            description: 'Evidence-based comparison of red vs white onions for antioxidants, digestion, heart health, and cooking.',
            image: 'https://herbscience.shop/hero-bg.svg',
            datePublished: '2025-01-27',
            dateModified: new Date().toISOString(),
            author: {
              '@type': 'Person',
              name: '曾楚平 (Zeng Chuping)',
              jobTitle: 'Licensed Pharmacist & TCM Expert',
              url: 'https://herbscience.shop/about'
            },
            publisher: {
              '@type': 'Organization',
              name: 'HerbScience',
              logo: {
                '@type': 'ImageObject',
                url: 'https://herbscience.shop/logo.png'
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://herbscience.shop/blog/red-onion-vs-white-onion-health-benefits'
            },
            keywords: 'red onion vs white onion, onion health benefits, onion antioxidants, quercetin, anthocyanins'
          })
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Red onion vs white onion: Which is healthier?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Both are healthy, but red onions contain 2-3x more quercetin and anthocyanins (powerful antioxidants) than white onions, making them better for heart health and inflammation. White onions are milder and easier to digest, making them ideal for sensitive stomachs.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the main health benefits of red onions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Red onions are rich in quercetin and anthocyanins, providing superior antioxidant, anti-inflammatory, and heart health benefits. They help reduce LDL cholesterol, support healthy blood pressure, and may offer cancer-protective effects.'
                }
              },
              {
                '@type': 'Question',
                name: 'Are white onions easier to digest than red onions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, white onions are milder in flavor and generally easier to digest, especially for people with IBS or sensitive stomachs. They cause less bloating and are better tolerated when cooked.'
                }
              },
              {
                '@type': 'Question',
                name: 'Who should not eat onions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'People with severe onion allergies, IBS/FODMAP sensitivity (raw onions), acid reflux/GERD (raw onions), those on blood thinners, or scheduled for surgery within 2 weeks should avoid or limit onion consumption. Always consult your healthcare provider.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I combine red and white onions in my diet?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! Use red onions raw in salads for maximum antioxidants, and white onions cooked in soups and stir-fries for gentle digestive support. Combining both gives you the best of both worlds.'
                }
              }
            ]
          })
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://herbscience.shop'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://herbscience.shop/blog'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Red Onion vs White Onion',
                item: 'https://herbscience.shop/blog/red-onion-vs-white-onion-health-benefits'
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navigation />
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Red Onion vs White Onion', href: '/blog/red-onion-vs-white-onion-health-benefits' }
          ]}
        />
        <MedicalReviewBanner />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back to Blog Link */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              🧅 Red Onion vs White Onion: Which Is Healthier?
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime="2025-01-27">January 27, 2025</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>曾楚平 (Zeng Chuping)</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              
              {/* Spoiler Alert Callout */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
                <p className="text-lg font-semibold text-emerald-900 mb-2">
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  Spoiler alert:
                </p>
                <p className="text-emerald-800 mb-0">
                  Both are healthy — but they shine in slightly different ways. If you've ever stood in front of your grocery store's onion section wondering <em>which one is actually better for you</em>, this guide has your answer.
                </p>
              </div>

              {/* Quick Answer */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                Quick Answer: Red Onions Win on Antioxidants, White Onions Win on Digestibility
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-emerald-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Best For</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Nutrient Highlight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-red-600">Red Onion</td>
                      <td className="border border-gray-300 px-4 py-3">Antioxidant boost, heart health, anti-inflammatory support</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Quercetin, anthocyanins</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-600">White Onion</td>
                      <td className="border border-gray-300 px-4 py-3">Gentle on the stomach, low odor, versatile cooking</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Sulfur compounds, vitamin C</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-lg text-gray-700 italic">
                Let's peel back the layers (pun intended).
              </p>

              {/* Red Onion Section */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                💜 Red Onion: The Antioxidant Powerhouse
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                That beautiful purple-red color isn't just for Instagram aesthetics — it comes from <strong>anthocyanins</strong>, natural plant pigments that fight inflammation and oxidative stress.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                🔹 Health Benefits of Red Onions:
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Heart health:</strong> Red onions help reduce LDL cholesterol and support healthy blood pressure thanks to their high quercetin content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Anti-inflammatory:</strong> Great for those dealing with mild inflammation, joint pain, or skin flare-ups. The anthocyanins work as natural anti-inflammatories.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Cancer-fighting properties:</strong> Quercetin and anthocyanins work together to neutralize harmful free radicals and may offer protective effects.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>2-3x more antioxidants:</strong> Red onions contain significantly higher levels of quercetin than white or yellow onions, especially in the outer layers.</span>
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                <p className="text-blue-900 mb-0">
                  <Apple className="w-5 h-5 inline mr-2" />
                  <strong>Best way to eat:</strong> Raw or lightly cooked. Toss thin slices into salads, sandwiches, or guacamole — cooking destroys some of the pigments (and their benefits). Let sliced red onions sit for 10 minutes before eating to maximize allicin production.
                </p>
              </div>

              {/* White Onion Section */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                <Leaf className="w-8 h-8 text-green-600" />
                🤍 White Onion: The Gut-Friendly All-Rounder
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                White onions are milder in flavor and easier to digest — especially for people who get bloated or have sensitive stomachs. If onions usually give you trouble, white onions (especially when cooked) are your friend.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                🔹 Health Benefits of White Onions:
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Supports digestion:</strong> Contains natural prebiotics (inulin, FOS) that feed healthy gut bacteria and improve overall digestive health.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Immune booster:</strong> Rich in vitamin C and sulfur compounds that enhance immune defense and antibacterial activity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Cooks beautifully:</strong> Keeps flavor without overpowering dishes. Caramelizes into natural sweetness.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Lower FODMAP impact:</strong> When well-cooked, white onions are better tolerated by people with IBS compared to raw red onions.</span>
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                <p className="text-blue-900 mb-0">
                  <Apple className="w-5 h-5 inline mr-2" />
                  <strong>Best way to eat:</strong> Sautéed or roasted. Perfect for soups, stir-fries, and tacos where you want a mellow onion sweetness without the bite. Cooking also reduces the sulfur compounds that cause tears and odor.
                </p>
              </div>

              {/* Nutritional Comparison */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                ⚖️ Nutritional Comparison (per 100g)
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Nutrient</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">Red Onion</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-600">White Onion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Calories</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">40</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">42</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Fiber</td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">1.7g</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">1.2g</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Vitamin C</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">12% DV</td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">15% DV</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Antioxidants</td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">⭐⭐⭐⭐</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">⭐⭐</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Flavor Strength</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Medium-Strong</td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Mild-Medium</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Digestibility</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Moderate</td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
                <p className="text-emerald-900 mb-0">
                  <Info className="w-5 h-5 inline mr-2" />
                  <strong>Bottom line:</strong> Both are low-calorie, nutrient-dense, and good for your heart — but red onions win the <strong>antioxidant crown</strong>, while white onions win the <strong>digestibility medal</strong>.
                </p>
              </div>

              {/* Real Talk Section */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                😅 Real Talk: Which One Should You Use?
              </h2>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Trying to eat cleaner or support heart health?</strong> Go with <strong className="text-red-600">red onions</strong> — more antioxidants, better anti-inflammatory action, and superior quercetin content for cholesterol management.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Sensitive stomach or hate lingering onion breath?</strong> Choose <strong className="text-gray-700">white onions</strong> — gentle, sweet, and perfect for everyday meals without digestive upset.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Cooking hack:</strong> Combine both! Red for salads and raw applications, white for cooked dishes. You'll get flavor <em>and</em> function. This is what nutritionists and chefs recommend.</span>
                </li>
              </ul>

              {/* Bonus: Pickled Onions */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  🥒 Bonus: Pickled Onion Benefits
                </h3>
                <p className="text-purple-800">
                  Want the best of both worlds? Try <strong>pickled red onions</strong>! Pickling preserves quercetin while adding probiotic bacteria for gut health. Pickled onions combine prebiotic fibers with fermentation benefits, making them easier to digest than raw. Add 2-4 tablespoons daily to meals as a delicious, gut-friendly condiment.
                </p>
                <p className="text-purple-800 mt-2">
                  <Link href="/herbs/onion" className="text-purple-600 hover:text-purple-700 font-medium underline">
                    Learn more about pickled onion benefits →
                  </Link>
                </p>
              </div>

              {/* When to Avoid Onions */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-orange-600" />
                🚫 When to Avoid Onions (Who Should Not Eat Onion)
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Even though onions are healthy, they're <strong>not for everyone</strong>. Here's who should not eat onion or should limit consumption:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span><strong>Acid reflux (GERD):</strong> Raw onions can trigger heartburn and worsen symptoms. Try well-cooked onions instead.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span><strong>IBS or FODMAP sensitivity:</strong> Raw onions may cause bloating, gas, and digestive discomfort. Start with small amounts of cooked white onions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span><strong>Blood thinners:</strong> High onion consumption may increase bleeding risk if you take warfarin or aspirin. Consult your doctor.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span><strong>Surgery:</strong> Stop eating medicinal amounts of onions 2 weeks before scheduled surgery (affects blood clotting).</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <span><strong>Severe allergies or G6PD deficiency:</strong> Rare but serious conditions that require complete avoidance.</span>
                </li>
              </ul>

              <p className="text-gray-700 italic">
                If that's you, start small — and don't eat onions on an empty stomach. <Link href="/herbs/onion#safety" className="text-emerald-600 hover:text-emerald-700 underline">See complete safety guidelines here</Link>.
              </p>

              {/* Fun Fact */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                  🧠 Fun Fact
                </h3>
                <p className="text-yellow-800 mb-0">
                  In Ancient Egypt, onions were worshiped as a symbol of eternal life — because their layers represented eternity. Today, they're more likely to represent <em>"eternal tears while chopping"</em>, but the onion health benefits are just as timeless. Modern science validates what ancient cultures knew: onions are powerful medicine.
                </p>
              </div>

              {/* Onion & Garlic Benefits */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                🧄 Onion and Garlic Benefits: The Dynamic Duo
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Want to supercharge your health? Combine onions with garlic! Both contain sulfur compounds that work synergistically for:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Enhanced cardiovascular protection:</strong> Double the cholesterol-lowering and blood pressure support.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Stronger immune defense:</strong> Natural antibacterial and antiviral effects amplified.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span><strong>Better anti-inflammatory effects:</strong> Powerful combo for joint health and inflammation reduction.</span>
                </li>
              </ul>

              <p className="text-gray-700">
                This powerful duo is a cornerstone of heart-healthy Mediterranean and Asian diets. <Link href="/herbs/onion#pairs-well-with" className="text-emerald-600 hover:text-emerald-700 underline">Explore more herb combinations here</Link>.
              </p>

              {/* Bottom Line */}
              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                ✅ Bottom Line: Red Onion vs White Onion
              </h2>

              <p className="text-xl text-gray-800 leading-relaxed mb-6">
                Both <strong>red and white onions</strong> are healthy — they just shine in different ways.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-900 mb-3">🔴 Red Onion:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>✓ Higher antioxidants (quercetin, anthocyanins)</li>
                    <li>✓ Great for heart health and cholesterol</li>
                    <li>✓ Anti-inflammatory benefits</li>
                    <li>✓ Best eaten raw for maximum benefits</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">⚪ White Onion:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li>✓ Milder flavor, easier to digest</li>
                    <li>✓ Better for sensitive stomachs (IBS)</li>
                    <li>✓ Excellent cooking versatility</li>
                    <li>✓ Lower odor and breath impact</li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                So the next time you're at the store, grab both — your body (and your recipes) will thank you. Use red onions for their superior antioxidant power in salads, and white onions for their gentle digestibility in cooked dishes.
              </p>

              {/* Related Articles Section */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🔗 Related Articles & Resources
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Link 
                    href="/herbs/onion" 
                    className="block p-4 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-emerald-900 mb-2">Complete Onion Health Guide</h3>
                    <p className="text-sm text-emerald-700">17 FAQs, 10 usage forms, safety guidelines, and more</p>
                  </Link>

                  <Link 
                    href="/herbs/garlic" 
                    className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-purple-900 mb-2">Garlic Health Benefits</h3>
                    <p className="text-sm text-purple-700">The perfect partner to onions for cardiovascular health</p>
                  </Link>

                  <Link 
                    href="/herbs/turmeric" 
                    className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-orange-900 mb-2">Turmeric Anti-Inflammatory Guide</h3>
                    <p className="text-sm text-orange-700">Combine with onions for powerful inflammation support</p>
                  </Link>

                  <Link 
                    href="/constitution-test" 
                    className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-blue-900 mb-2">Find Your Body Type</h3>
                    <p className="text-sm text-blue-700">Discover which herbs (including onions) suit you best</p>
                  </Link>
                </div>
              </div>

            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">曾楚平 (Zeng Chuping)</h3>
                  <p className="text-sm text-gray-600 mb-2">Licensed Pharmacist & TCM Expert</p>
                  <p className="text-gray-700 leading-relaxed">
                    Southern Medical University graduate specializing in Traditional Chinese Medicine and evidence-based herbal therapy. Passionate about making ancient wisdom accessible to modern Western audiences through science-backed, practical guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Health with Herbs?</h3>
              <p className="text-emerald-50 mb-6">
                Discover personalized herb recommendations based on your unique body constitution. Take our free TCM assessment now.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/constitution-test" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Take Free Constitution Test
                  <span>→</span>
                </Link>
                <Link 
                  href="/herb-finder" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 border-2 border-white transition-colors"
                >
                  Explore Herb Database
                  <span>→</span>
                </Link>
              </div>
            </div>

          </article>

        </main>
      </div>
    </>
  )
}

