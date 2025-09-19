'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PersonalizedRecommendations() {
  const [selectedGoal, setSelectedGoal] = useState('')
  
  const healthGoals = [
    {
      id: 'stress',
      icon: '😌',
      title: 'Stress Management',
      description: 'Natural ways to reduce stress and anxiety',
      herbs: ['Ashwagandha', 'Rhodiola', 'Holy Basil'],
      color: 'blue'
    },
    {
      id: 'energy',
      icon: '⚡',
      title: 'Energy & Vitality',
      description: 'Boost natural energy without caffeine crashes',
      herbs: ['Ginseng', 'Cordyceps', 'Maca Root'],
      color: 'orange'
    },
    {
      id: 'sleep',
      icon: '😴',
      title: 'Better Sleep',
      description: 'Improve sleep quality naturally',
      herbs: ['Valerian', 'Passionflower', 'Chamomile'],
      color: 'purple'
    },
    {
      id: 'immunity',
      icon: '🛡️',
      title: 'Immune Support',
      description: 'Strengthen your natural defenses',
      herbs: ['Echinacea', 'Elderberry', 'Astragalus'],
      color: 'green'
    },
    {
      id: 'focus',
      icon: '🧠',
      title: 'Mental Clarity',
      description: 'Enhance focus and cognitive function',
      herbs: ['Ginkgo', 'Bacopa', 'Lion&apos;s Mane'],
      color: 'teal'
    },
    {
      id: 'digestion',
      icon: '🌱',
      title: 'Digestive Health',
      description: 'Support healthy digestion',
      herbs: ['Ginger', 'Peppermint', 'Fennel'],
      color: 'emerald'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 border-blue-200 hover:border-blue-300',
      orange: 'from-orange-500 to-orange-600 border-orange-200 hover:border-orange-300',
      purple: 'from-purple-500 to-purple-600 border-purple-200 hover:border-purple-300',
      green: 'from-green-500 to-green-600 border-green-200 hover:border-green-300',
      teal: 'from-teal-500 to-teal-600 border-teal-200 hover:border-teal-300',
      emerald: 'from-emerald-500 to-emerald-600 border-emerald-200 hover:border-emerald-300'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.green
  }

  const selectedGoalData = healthGoals.find(goal => goal.id === selectedGoal)

    return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What&apos;s Your Health Goal Today?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized herb recommendations based on your specific health objectives. 
            Our AI analyzes your goals to suggest the most effective natural solutions.
          </p>
        </div>

        {/* Health Goal Selection - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {healthGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id === selectedGoal ? '' : goal.id)}
              className={`p-4 rounded-xl border transition-all text-left hover:shadow-md ${
                selectedGoal === goal.id 
                  ? 'border-green-400 bg-green-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{goal.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-gray-600 text-sm">{goal.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Simplified Recommendations */}
        {selectedGoalData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Recommended for {selectedGoalData.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {selectedGoalData.herbs.map((herb, index) => (
                <Link 
                  key={index}
                  href={`/herbs/${herb.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full text-green-700 font-medium text-sm transition-colors"
                >
                  🌿 {herb}
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link 
                href="/constitution-test"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Get Personal Plan →
              </Link>
            </div>
          </div>
        )}

        {/* CTA when no goal selected */}
        {!selectedGoal && (
          <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want Even More Personalized Recommendations?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Take our comprehensive Traditional Chinese Medicine constitution assessment 
              to get recommendations tailored to your unique body type and health patterns.
            </p>
            <Link 
              href="/constitution-test"
              className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
            >
              <span className="mr-2">🧠</span>
              Take Constitution Assessment
              <span className="ml-2">→</span>
            </Link>
          </div>
        )}

        {/* Core Actions - 聚焦核心功能 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/herb-finder" className="group bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-green-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 mb-2">Browse Herb Database</h4>
              <p className="text-gray-600 text-sm">Explore 500+ herbs with detailed information, benefits, and safety guidelines</p>
            </div>
          </Link>

          <Link href="/blog" className="group bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 mb-2">Read Latest Research</h4>
              <p className="text-gray-600 text-sm">Evidence-based articles on herbs, traditional medicine, and modern science</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
} 