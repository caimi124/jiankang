'use client'

import Link from 'next/link'

interface EnhancedBlogContentProps {
  content: string
  title: string
}

export default function EnhancedBlogContent({ content, title }: EnhancedBlogContentProps) {

  return (
    <div className="max-w-none">
      {/* 移除重复标题，直接开始内容 */}
      <div className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Walk into any supplement store and you'll see shelves stacked with herbal capsules and teas. But why do some herbs work for you while others don't?
        </p>
      </div>

      {/* Problem Statement */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">The Reality Check</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          But reality isn't that straightforward. Here's what actually happens:
        </p>
        <ul className="space-y-3 text-gray-700 mb-6 pl-4">
          <li className="flex items-start">
            <span className="text-green-600 mr-3 mt-1">•</span>
            <span>Some people swear ginseng makes them feel amazing</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-3 mt-1">•</span>
            <span>Others take it and feel nothing</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-3 mt-1">•</span>
            <span>A few even feel worse—more jittery, tired, or off balance</span>
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          It's just like coffee: some people get a boost, others feel anxious, and some can drink a cup before bed and still sleep soundly. <strong>Herbal remedies</strong> work the same way—your body's response depends on your <strong>individual makeup</strong>.
        </p>
      </div>

      {/* Herb Comparison Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          How Different Body Types Respond to Herbs
        </h2>
        
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-left font-semibold text-gray-900 text-sm uppercase tracking-wide">Herb</th>
                <th className="p-4 text-left font-semibold text-gray-900 text-sm uppercase tracking-wide">❄️ Cold Constitution</th>
                <th className="p-4 text-left font-semibold text-gray-900 text-sm uppercase tracking-wide">🔥 Hot Constitution</th>
                <th className="p-4 text-left font-semibold text-gray-900 text-sm uppercase tracking-wide">⚖️ Balanced</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-25">
                <td className="p-4 font-semibold text-gray-900">Ginseng</td>
                <td className="p-4">
                  <span className="flex items-center text-green-700">
                    <span className="mr-2">✓</span>
                    <span>Energizing & warming</span>
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center text-red-700">
                    <span className="mr-2">⚠</span>
                    <span>May overstimulate</span>
                  </span>
                </td>
                <td className="p-4 text-gray-700">Generally well-tolerated</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-25">
                <td className="p-4 font-semibold text-gray-900">Chamomile</td>
                <td className="p-4">
                  <span className="flex items-center text-red-700">
                    <span className="mr-2">⚠</span>
                    <span>May be too cooling</span>
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center text-green-700">
                    <span className="mr-2">✓</span>
                    <span>Calming & cooling</span>
                  </span>
                </td>
                <td className="p-4 text-gray-700">Generally well-tolerated</td>
              </tr>
              <tr className="hover:bg-gray-25">
                <td className="p-4 font-semibold text-gray-900">Echinacea</td>
                <td className="p-4">
                  <span className="flex items-center text-green-700">
                    <span className="mr-2">✓</span>
                    <span>Immune boosting</span>
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center text-red-700">
                    <span className="mr-2">⚠</span>
                    <span>May cause inflammation</span>
                  </span>
                </td>
                <td className="p-4 text-gray-700">Good for short-term use</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3-Step Process */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Your 3-Step Process</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Constitution Test</h3>
                <p className="text-gray-700 leading-relaxed">Understand whether you have a cold, hot, or balanced constitution.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Personalized Recommendations</h3>
                <p className="text-gray-700 leading-relaxed">Receive herbs that match your body type with proper dosages.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Your Results</h3>
                <p className="text-gray-700 leading-relaxed">Monitor your energy, sleep, mood, and symptoms over 2-4 weeks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Science Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">The Science Behind It</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Traditional Chinese Medicine</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            For over 2,000 years, Chinese medicine has used systematic pattern recognition to match herbs to individual body types. This isn't folklore—it's a codified system taught in universities and practiced by licensed professionals worldwide.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-3xl font-bold text-green-700">85%</div>
              <div className="text-sm text-green-600 font-medium">success rate with personalized herbs</div>
            </div>
            <div className="text-gray-400 font-bold text-lg">vs</div>
            <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-3xl font-bold text-gray-500">35%</div>
              <div className="text-sm text-gray-600 font-medium">success with random selection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Examples */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Real Examples</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🛡️ Immune Herbs (Echinacea & Elderberry)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-lg mr-2">✓</span>
                  <div>
                    <strong className="text-green-700 block mb-1">Works well for cold types:</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">People who feel cold often and have low energy get an immune boost.</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-red-600 text-lg mr-2">⚠</span>
                  <div>
                    <strong className="text-red-700 block mb-1">May not suit hot types:</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">People who are already warm and energetic might feel overstimulated.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">😌 Stress Relief Herbs (Valerian & Chamomile)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-green-600 text-lg mr-2">✓</span>
                  <div>
                    <strong className="text-green-700 block mb-1">Great for "wired but tired" types:</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">People with racing thoughts who can't relax find these very calming.</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-red-600 text-lg mr-2">⚠</span>
                  <div>
                    <strong className="text-red-700 block mb-1">Too sedating for low-energy types:</strong>
                    <p className="text-gray-700 text-sm leading-relaxed">People who are already sluggish may feel excessively drowsy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">How to Get Started</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Take a Constitution Test</h3>
                <p className="text-gray-700 leading-relaxed">Find out if you have a cold, hot, or balanced constitution so you know which herbs will work for you.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Quality Supplements</h3>
                <p className="text-gray-700 leading-relaxed">Look for standardized extracts from reputable brands with third-party testing. Start with single herbs, not complex formulas.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 mt-1">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Systematically</h3>
                <p className="text-gray-700 leading-relaxed">Try one herb for 2-4 weeks, keep a daily journal of how you feel, and pay attention to timing and dosage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Herbs?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            Take our TCM Constitution Test to understand your unique body type and get personalized herb recommendations. It's free and takes just 5 minutes.
          </p>
          
          <Link
            href="/constitution-test"
            className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Start Constitution Test →
          </Link>
        </div>
      </div>

      {/* Tips Section */}
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Pro Tip</h3>
              <p className="text-blue-800 leading-relaxed">
                Start with single herbs rather than complex formulas. This makes it easier to identify what works for your body type.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Note</h3>
              <p className="text-yellow-800 leading-relaxed">
                Even natural supplements can have side effects if they don't match your constitution. Always start with small doses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
