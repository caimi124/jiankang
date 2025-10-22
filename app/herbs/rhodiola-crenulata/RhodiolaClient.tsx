'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  CheckCircle, 
  AlertTriangle, 
  Heart, 
  Brain,
  Activity,
  TrendingUp,
  Scale,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function RhodiolaClient() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - 强调核心价值 */}
      <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* 面包屑 */}
              <div className="flex items-center text-sm text-purple-100 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/herbs" className="hover:text-white">Herbs</Link>
                <span className="mx-2">/</span>
                <span>Rhodiola Crenulata</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Rhodiola Crenulata: Your Natural Energy & Stress Solution
              </h1>
              
              <p className="text-xl text-purple-100 mb-6">
                Also known as <strong>Arctic Root</strong> & <strong>Golden Root</strong>
              </p>

              <p className="text-lg text-purple-50 mb-8">
                Discover if this powerful adaptogen matches YOUR body type for maximum benefits with zero side effects.
              </p>

              {/* CTA按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/constitution-test/quick"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-xl"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Find Your Body Type (2 min)
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <a
                  href="#benefits"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-purple-700 transition-all"
                >
                  See Benefits Below
                </a>
              </div>

              {/* 社交证明 */}
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>12,000+ users trust us</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </div>

            {/* 关键卖点 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Rhodiola Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Brain className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block mb-1">Calm Focus Without Caffeine</strong>
                    <span className="text-purple-100">Supports mental clarity under stress</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Activity className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block mb-1">Natural Energy Boost</strong>
                    <span className="text-purple-100">No jitters or crashes</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block mb-1">Stress Resilience</strong>
                    <span className="text-purple-100">Balances cortisol levels naturally</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Scale className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div>
                    <strong className="block mb-1">Metabolism Support</strong>
                    <span className="text-purple-100">May help with stress-related weight gain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值主张 - 体质匹配 */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⚠️ Important: Is Rhodiola Right for YOUR Body Type?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Rhodiola is <strong>NOT for everyone</strong>. Based on Traditional Chinese Medicine, its stimulating nature works best for certain constitutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 强烈推荐 */}
            <div className="bg-green-100 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-bold text-green-900">✅ Perfect Match</h3>
              </div>
              <div className="space-y-3 text-green-900">
                <div>
                  <strong>Qi-Deficient</strong>
                  <p className="text-sm text-green-700">Always tired, low energy, frequent colds</p>
                </div>
                <div>
                  <strong>Phlegm-Damp</strong>
                  <p className="text-sm text-green-700">Slow metabolism, weight gain, fatigue</p>
                </div>
              </div>
            </div>

            {/* 有帮助 */}
            <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-blue-900">✓ Helpful</h3>
              </div>
              <div className="space-y-3 text-blue-900">
                <div>
                  <strong>Qi-Stagnation</strong>
                  <p className="text-sm text-blue-700">Stress, anxiety, mood swings</p>
                </div>
              </div>
            </div>

            {/* 谨慎使用 */}
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-lg font-bold text-yellow-900">⚠️ Use Caution</h3>
              </div>
              <div className="space-y-3 text-yellow-900">
                <div>
                  <strong>Yin-Deficient</strong>
                  <p className="text-sm text-yellow-700">Insomnia, night sweats, hot flashes</p>
                  <p className="text-xs text-yellow-600 mt-1">⚠️ Take only in morning, low dose</p>
                </div>
              </div>
            </div>

            {/* 不适合 */}
            <div className="bg-red-100 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-lg font-bold text-red-900">❌ Not Suitable</h3>
              </div>
              <div className="space-y-3 text-red-900">
                <div>
                  <strong>Yang-Excess / Heat Type</strong>
                  <p className="text-sm text-red-700">Easily irritated, red face, very hot body</p>
                  <p className="text-xs text-red-600 mt-1">❌ May cause overstimulation</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not Sure About Your Body Type?
              </h3>
              <p className="text-gray-700 mb-6">
                Take our free 2-minute quiz to discover your constitution and get personalized herb recommendations.
              </p>
              <Link
                href="/constitution-test/quick"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                <Brain className="w-5 h-5 mr-2" />
                Take Free Body Type Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - 基于KGR关键词优化 */}
      <section id="benefits" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rhodiola Crenulata Benefits: What Science Says
            </h2>
            <p className="text-xl text-gray-600">
              Research-backed benefits when matched to your body type
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8">
              <Brain className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Mental Clarity & Focus
              </h3>
              <p className="text-gray-700 mb-4">
                Rhodiola extract benefits include improved cognitive function under stress. Studies show it supports memory, concentration, and mental performance.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduces brain fog and mental fatigue</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Enhances learning and memory retention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Improves decision-making under pressure</span>
                </li>
              </ul>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8">
              <Activity className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Natural Energy Without Crash
              </h3>
              <p className="text-gray-700 mb-4">
                Unlike caffeine, Rhodiola root benefits include sustained energy by improving cellular ATP production and oxygen utilization.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Boosts physical stamina and endurance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduces fatigue during exercise</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Faster recovery after workouts</span>
                </li>
              </ul>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
              <Heart className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Stress & Anxiety Relief
              </h3>
              <p className="text-gray-700 mb-4">
                Rhodiola herb benefits include balanced cortisol levels and improved emotional resilience through HPA axis regulation.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduces stress hormone (cortisol) levels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Supports serotonin and dopamine balance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Improves mood and emotional stability</span>
                </li>
              </ul>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8">
              <Scale className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Weight Management Support
              </h3>
              <p className="text-gray-700 mb-4">
                Rhodiola weight loss benefits come from improved metabolism, reduced stress-eating, and enhanced fat oxidation during exercise.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Supports healthy metabolism</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduces stress-related emotional eating</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Improves exercise performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dosage Guide - 基于KGR关键词 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Take Rhodiola: Dosage Guide
            </h2>
            <p className="text-xl text-gray-600">
              Proper dosing for maximum benefits and safety
            </p>
          </div>

          {/* Dosage Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Form</th>
                    <th className="px-6 py-4 text-left">Recommended Dosage</th>
                    <th className="px-6 py-4 text-left">How to Take</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <strong>Extract (3% salidroside)</strong>
                    </td>
                    <td className="px-6 py-4">200-600 mg/day</td>
                    <td className="px-6 py-4">Start at 200mg for 1 week; increase gradually</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <strong>Dried Root</strong>
                    </td>
                    <td className="px-6 py-4">3-6 g/day</td>
                    <td className="px-6 py-4">Simmer 10-15 min in 250ml water</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <strong>Powder</strong>
                    </td>
                    <td className="px-6 py-4">½-1 tsp/day</td>
                    <td className="px-6 py-4">Mix in smoothies or warm beverages</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Best Practices */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Best Time to Take Rhodiola
              </h3>
              <ul className="space-y-2 text-green-900">
                <li>✓ <strong>Morning</strong> - Most effective, avoids sleep disruption</li>
                <li>✓ <strong>With breakfast</strong> - Better absorption with food</li>
                <li>✓ <strong>Pre-workout</strong> - Enhances performance</li>
                <li>✓ <strong>Cycle usage</strong> - 6-8 weeks on, 1 week off</li>
              </ul>
            </div>

            <div className="bg-red-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                What to Avoid
              </h3>
              <ul className="space-y-2 text-red-900">
                <li>✗ <strong>Late evening</strong> - May cause insomnia</li>
                <li>✗ <strong>On empty stomach</strong> - May cause nausea</li>
                <li>✗ <strong>High doses immediately</strong> - Start low</li>
                <li>✗ <strong>Continuous use</strong> - Always cycle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Side Effects & Safety - 基于KGR关键词 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rhodiola Side Effects & Safety
            </h2>
            <p className="text-xl text-gray-600">
              What you need to know before starting
            </p>
          </div>

          {/* Common Side Effects */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
              Possible Rhodiola Side Effects
            </h3>
            <p className="text-gray-700 mb-4">
              Rhodiola extract side effects are generally mild and occur mainly when dosage is too high or taken at wrong time:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <strong className="text-gray-900">Mild & Temporary:</strong>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>• Restlessness or jitteriness</li>
                  <li>• Dry mouth</li>
                  <li>• Dizziness</li>
                  <li>• Trouble sleeping (if taken late)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong className="text-gray-900">How to Prevent:</strong>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>✓ Start with lowest dose</li>
                  <li>✓ Take only in morning</li>
                  <li>✓ Eat with food</li>
                  <li>✓ Cycle usage properly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Who Should Not Take */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-red-600 mr-3" />
              Rhodiola Herb Side Effects: Who Should Avoid
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Pregnant or breastfeeding women</strong> - Safety not established
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>People taking antidepressants</strong> - May interact with SSRIs
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Yang-excess or Heat-type constitution</strong> - May cause overstimulation
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Severe anxiety or bipolar disorder</strong> - Consult doctor first
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - 基于KGR关键词 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Rhodiola
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does it take for Rhodiola to work?',
                a: 'Most users notice effects within 7-14 days, especially in focus and energy. For long-term stress relief and optimal benefits, use consistently for 4-6 weeks. Remember to cycle (6-8 weeks on, 1 week off).'
              },
              {
                q: 'Can I take Rhodiola every day?',
                a: 'Yes, Rhodiola is safe for daily use when cycled properly. Use for 6-8 weeks, then take a 1-week break to maintain effectiveness and prevent tolerance.'
              },
              {
                q: 'Does Rhodiola help with weight loss?',
                a: 'Rhodiola fat loss benefits come indirectly through: improved metabolism, reduced stress-related emotional eating, and enhanced exercise performance. It works best when combined with healthy diet and regular exercise.'
              },
              {
                q: 'What is the best time to take Rhodiola?',
                a: 'Morning is best as Rhodiola can mildly stimulate. Take with breakfast or post-workout snacks with healthy fats for better absorption. Avoid taking after 3 PM to prevent sleep disruption.'
              },
              {
                q: 'Rhodiola vs Ginseng: Which is better?',
                a: 'Rhodiola is more calming and less stimulating than Ginseng. Choose Rhodiola if you want focus without jitters. Choose Ginseng if you need stronger energy boost but can handle stimulation.'
              },
              {
                q: 'Is Rhodiola safe to take daily?',
                a: 'Yes, when cycled properly (6-8 weeks on, 1 week off). Rhodiola root side effects are minimal when used correctly. Start with low dose and increase gradually.'
              },
              {
                q: 'What are Rhodiola supplement benefits for energy?',
                a: 'Rhodiola benefits for energy include: improved cellular ATP production, better oxygen utilization, reduced fatigue, and sustained energy without crashes - unlike caffeine.'
              },
              {
                q: 'Best Rhodiola supplement: What to look for?',
                a: 'Look for: 3% salidroside standardization, organic/wildcrafted source, third-party tested, no fillers. Best rhodiola rosea supplement brands include those with full transparency on sourcing.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find if Rhodiola is Right for YOU?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Take our free 2-minute body type quiz to get personalized herb recommendations matched to your constitution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/constitution-test/quick"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-xl"
            >
              <Brain className="w-5 h-5 mr-2" />
              Take Free Body Type Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/herbs"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-purple-700 transition-all"
            >
              Explore More Herbs
            </Link>
          </div>

          <p className="mt-8 text-sm text-purple-200">
            💚 Join 12,000+ people using herbs the RIGHT way - matched to their body type
          </p>
        </div>
      </section>
    </div>
  )
}

