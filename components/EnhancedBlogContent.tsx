'use client'

import Link from 'next/link'

interface EnhancedBlogContentProps {
  content: string
  title: string
}

export default function EnhancedBlogContent({ content, title }: EnhancedBlogContentProps) {

  return (
    <div className="prose prose-lg max-w-none">
      {/* Simple Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Walk into any supplement store and you'll see shelves stacked with herbal capsules and teas. But why do some herbs work for you while others don't?
        </p>
      </div>

      {/* Simple Problem Statement */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Reality Check</h2>
        <p className="text-gray-700 mb-4">
          But reality isn't that straightforward. Here's what actually happens:
        </p>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li>• Some people swear ginseng makes them feel amazing</li>
          <li>• Others take it and feel nothing</li>
          <li>• A few even feel worse—more jittery, tired, or off balance</li>
        </ul>
        <p className="text-gray-700">
          It's just like coffee: some people get a boost, others feel anxious, and some can drink a cup before bed and still sleep soundly. <strong>Herbal remedies</strong> work the same way—your body's response depends on your <strong>individual makeup</strong>.
        </p>
      </div>

      {/* Simple Herb Comparison Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How Different Body Types Respond to Herbs
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left font-semibold text-gray-900 border-b">Herb</th>
                <th className="p-4 text-left font-semibold text-gray-900 border-b">Cold Constitution</th>
                <th className="p-4 text-left font-semibold text-gray-900 border-b">Hot Constitution</th>
                <th className="p-4 text-left font-semibold text-gray-900 border-b">Balanced</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-medium">Ginseng</td>
                <td className="p-4 text-green-700">✓ Energizing & warming</td>
                <td className="p-4 text-red-700">⚠ May overstimulate</td>
                <td className="p-4 text-gray-700">Generally well-tolerated</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Chamomile</td>
                <td className="p-4 text-red-700">⚠ May be too cooling</td>
                <td className="p-4 text-green-700">✓ Calming & cooling</td>
                <td className="p-4 text-gray-700">Generally well-tolerated</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Echinacea</td>
                <td className="p-4 text-green-700">✓ Immune boosting</td>
                <td className="p-4 text-red-700">⚠ May cause inflammation</td>
                <td className="p-4 text-gray-700">Good for short-term use</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple 3-Step Process */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your 3-Step Process</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Take Constitution Test</h3>
            <p className="text-gray-700">Understand whether you have a cold, hot, or balanced constitution.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Get Personalized Recommendations</h3>
            <p className="text-gray-700">Receive herbs that match your body type with proper dosages.</p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Track Your Results</h3>
            <p className="text-gray-700">Monitor your energy, sleep, mood, and symptoms over 2-4 weeks.</p>
          </div>
        </div>
      </div>

      {/* Simple Science Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The Science Behind It</h2>
        
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Traditional Chinese Medicine</h3>
          <p className="text-gray-700 mb-4">
            For over 2,000 years, Chinese medicine has used systematic pattern recognition to match herbs to individual body types. This isn't folklore—it's a codified system taught in universities and practiced by licensed professionals worldwide.
          </p>
          <div className="text-center">
            <div className="inline-block bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">success rate with personalized herbs</div>
            </div>
            <span className="mx-4 text-gray-400">vs</span>
            <div className="inline-block bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-400">35%</div>
              <div className="text-sm text-gray-600">success with random selection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Examples</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Immune Herbs (Echinacea & Elderberry)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong className="text-green-700">✓ Works well for cold types:</strong>
                <p className="text-gray-700">People who feel cold often and have low energy get an immune boost.</p>
              </div>
              <div>
                <strong className="text-red-700">⚠ May not suit hot types:</strong>
                <p className="text-gray-700">People who are already warm and energetic might feel overstimulated.</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Stress Relief Herbs (Valerian & Chamomile)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong className="text-green-700">✓ Great for "wired but tired" types:</strong>
                <p className="text-gray-700">People with racing thoughts who can't relax find these very calming.</p>
              </div>
              <div>
                <strong className="text-red-700">⚠ Too sedating for low-energy types:</strong>
                <p className="text-gray-700">People who are already sluggish may feel excessively drowsy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Action Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Get Started</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Take a Constitution Test</h3>
            <p className="text-gray-700">Find out if you have a cold, hot, or balanced constitution so you know which herbs will work for you.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Choose Quality Supplements</h3>
            <p className="text-gray-700">Look for standardized extracts from reputable brands with third-party testing. Start with single herbs, not complex formulas.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Test Systematically</h3>
            <p className="text-gray-700">Try one herb for 2-4 weeks, keep a daily journal of how you feel, and pay attention to timing and dosage.</p>
          </div>
        </div>
      </div>

      {/* Simple CTA Section */}
      <div className="mb-12">
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Herbs?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Take our TCM Constitution Test to understand your unique body type and get personalized herb recommendations. It's free and takes just 5 minutes.
          </p>
          
          <Link
            href="/constitution-test"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Start Constitution Test →
          </Link>
        </div>
      </div>

      {/* Simple Tips */}
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
          <p className="text-gray-700">
            Start with single herbs rather than complex formulas. This makes it easier to identify what works for your body type.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Important Note</h3>
          <p className="text-gray-700">
            Even natural supplements can have side effects if they don't match your constitution. Always start with small doses.
          </p>
        </div>
      </div>
    </div>
  )
}
