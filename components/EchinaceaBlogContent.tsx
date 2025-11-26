'use client'

import Link from 'next/link'
import { ShieldCheck, Zap, Users, FlaskConical, AlertTriangle, CheckCircle2, XCircle, AlertCircle, Sparkles, BookOpen, Calendar, Clock } from 'lucide-react'

export default function EchinaceaBlogContent() {
  return (
    <div className="max-w-none">
      {/* 引言段落 - 视觉增强 */}
      <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
            <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Your Smart Guide to Echinacea
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Echinacea</strong> is a popular <strong>herbal supplement</strong> known for <strong>immune support</strong>. But generic advice like "take echinacea for a cold" often leads to guessing. This practical guide shows exactly <em>when</em> and <em>how</em> to use <strong>echinacea tablets</strong>, <strong>echinacea tincture</strong>, <strong>capsules</strong>, or <strong>drops</strong> — and how to personalize your plan using <strong>Traditional Chinese Medicine (TCM)</strong> body types to reduce side effects and get better results.
            </p>
          </div>
        </div>
      </div>

      {/* TCM体质个性化部分 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-300" />
          </div>
          Why Personalization Matters (TCM Body Types)
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Not everyone responds to an <strong>echinacea supplement</strong> the same way. In TCM, your <strong>constitution</strong> guides herb selection:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Yang-deficient */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                <span className="text-2xl">❄️</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                Yang-Deficient
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              (cold, low energy)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              May do better with gentle warming support; pair echinacea with ginger tea and avoid long-term use.
            </p>
          </div>

          {/* Yin-deficient */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-lg">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">
                Yin-Deficient
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              (dry, warm, irritable)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Often responds well to short-term <strong>echinacea immune support</strong>, especially at the first sign of a cold.
            </p>
          </div>

          {/* Balanced */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                Balanced
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              (harmonious constitution)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Generally safe for short-term prevention during seasonal stress.
            </p>
          </div>
        </div>
      </div>

      {/* 使用场景卡片 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          When & How to Use Echinacea
        </h2>

        <div className="space-y-6">
          {/* Scenario 1: Early Cold */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 px-6 py-4 border-b border-red-200 dark:border-red-700">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 dark:bg-red-800 p-2 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  1) Early Cold or Flu Symptoms
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <p className="text-sm italic">Scenario: scratchy throat, sneezing, fatigue</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Action Plan:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Start echinacea at the very first sign to potentially shorten illness duration.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                      🍵 Echinacea Tea or Liquid Tincture
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      2–3 times daily at first symptoms
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                      💊 Echinacea Tablets or Capsules
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      300–500 mg, 2–3 times daily for 5–10 days
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                      TCM Tip:
                    </h5>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      Dry/warm constitutions respond best. Cold, fatigued types can pair with warm ginger tea.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                      Practical Tip:
                    </h5>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Begin immediately — waiting until a full-blown cold develops is less effective.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 2: High-Stress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 px-6 py-4 border-b border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  2) High-Stress Lifestyle
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <p className="text-sm italic">Scenario: long work hours, travel, poor sleep, or seasonal stress</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Action Plan:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Use an <strong>echinacea supplement</strong> preventively for <strong>1–2 weeks</strong> during peak stress.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Short-term <strong>echinacea capsules</strong> or <strong>tincture</strong> daily for 1–2 weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Pair with vitamin C, good sleep, and hydration
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                      TCM Tip:
                    </h5>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      Stress often creates Qi deficiency (low energy). If cold hands/feet, combine with Qi-tonifying herbs like <em>Astragalus</em>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 3: School Season */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 px-6 py-4 border-b border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  3) School Season (Kids)
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <p className="text-sm italic">Scenario: school/daycare exposure</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Use pediatric <strong>echinacea drops</strong> according to label at first sniffles
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Combine with elderberry syrup for added immune support
                  </span>
                </li>
              </ul>

              <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                      TCM Tip:
                    </h5>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      Children with sensitive digestion may need smaller doses or alternatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 4: Smart Combinations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-4 border-b border-green-200 dark:border-green-700">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                  <FlaskConical className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  4) Smart Combinations
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Goal: boost immunity without overload
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🫐 Elderberry Combo
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Elderberry + echinacea tincture for seasonal protection
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ⚡ Zinc Boost
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Zinc + echinacea tablets for short-term boost
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🍊 Vitamin C Support
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vitamin C + echinacea capsules for daily resilience
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                      TCM Tip:
                    </h5>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      Avoid long-term daily use. Cycle herbs based on constitution to prevent imbalance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 安全性和副作用 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <div className="bg-red-100 dark:bg-red-800 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
          </div>
          5) Safety & Side Effects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Avoid If:
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Autoimmune disorders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Severe Asteraceae allergies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Pronounced Yang-deficient cold constitution</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Possible Side Effects:
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Mild GI upset</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Rash</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>Headache</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Special Groups:
              </h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Pregnancy & breastfeeding:</strong> Consult a healthcare provider before use.
            </p>
          </div>
        </div>
      </div>

      {/* 快速参考表格 - 优化版 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Reference Guide
        </h2>
        
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <table className="w-full border-collapse bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50">
                <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Scenario
                </th>
                <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Form
                </th>
                <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Timing
                </th>
                <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  TCM Tip
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">Early cold</span>
                  </div>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  Tea, <strong>tincture</strong>, <strong>capsules</strong>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  First sign, 2–3×/day
                </td>
                <td className="p-4 text-sm text-purple-700 dark:text-purple-300">
                  Dry/warm constitution responds best
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">Stress & fatigue</span>
                  </div>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  <strong>Capsules</strong>, <strong>tincture</strong>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  1–2 weeks
                </td>
                <td className="p-4 text-sm text-purple-700 dark:text-purple-300">
                  Combine with Qi-tonifying support if cold/low energy
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">Children</span>
                  </div>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  Pediatric <strong>drops</strong>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  First sniffle
                </td>
                <td className="p-4 text-sm text-purple-700 dark:text-purple-300">
                  Watch digestive sensitivity
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">Seasonal prevention</span>
                  </div>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  <strong>Capsules</strong>, tablets, <strong>tincture</strong>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  Short cycles
                </td>
                <td className="p-4 text-sm text-purple-700 dark:text-purple-300">
                  Cycle based on constitution
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Takeaways - 视觉增强 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Key Takeaways
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 shadow-sm">
            <div className="bg-green-100 dark:bg-green-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Right Timing
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Use echinacea at the <strong>right time</strong>: first symptoms or seasonal stress
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700 shadow-sm">
            <div className="bg-blue-100 dark:bg-blue-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FlaskConical className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Right Form
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Pick the form that fits your lifestyle: <strong>tablets</strong>, <strong>tincture</strong>, <strong>capsules</strong>, or <strong>drops</strong>
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700 shadow-sm">
            <div className="bg-purple-100 dark:bg-purple-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Personalized Approach
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Let <strong>TCM body type</strong> guide dosing and duration to improve results and reduce side effects
            </p>
          </div>
        </div>
      </div>

      {/* CTA - 优化版 */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-2xl p-8 text-center shadow-xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop Guessing. Start Personalizing.
          </h2>
          <p className="text-lg text-green-50 mb-6 leading-relaxed">
            Use <em>personalized</em> echinacea plans — grounded in TCM — to support immunity safely and effectively.
          </p>
          
          <Link
            href="/constitution-test"
            className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Take TCM Constitution Test →
          </Link>
          
          <p className="text-sm text-green-100 mt-4">
            Free • 5 minutes • Instant personalized results
          </p>
        </div>
      </div>
    </div>
  )
}
