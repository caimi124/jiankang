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
      herbs: ['Ginkgo', 'Bacopa', 'Lion\'s Mane'],
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
            What's Your Health Goal Today?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized herb recommendations based on your specific health objectives. 
            Our AI analyzes your goals to suggest the most effective natural solutions.
          </p>
        </div>

        {/* Health Goal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {healthGoals.map((goal) => (
                  <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id === selectedGoal ? '' : goal.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                selectedGoal === goal.id 
                  ? `border-${goal.color}-400 bg-${goal.color}-50 shadow-lg` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(goal.color)} rounded-xl flex items-center justify-center text-white text-xl shadow-md`}>
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
                  <p className="text-gray-600 text-sm">{goal.description}</p>
                  {selectedGoal === goal.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-2">Recommended herbs:</p>
                      <div className="flex flex-wrap gap-1">
                        {goal.herbs.map((herb, index) => (
                          <span key={index} className={`text-xs px-2 py-1 bg-${goal.color}-100 text-${goal.color}-700 rounded-full`}>
                            {herb}
                          </span>
                ))}
              </div>
            </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Recommendations */}
        {selectedGoalData && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 bg-gradient-to-br ${getColorClasses(selectedGoalData.color)} rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg`}>
                {selectedGoalData.icon}
      </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Personalized Plan for {selectedGoalData.title}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Based on traditional use and modern research, here are the most effective herbs for your goal.
              </p>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {selectedGoalData.herbs.map((herb, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{herb}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {herb === 'Ashwagandha' && 'Adaptogenic herb that helps reduce cortisol levels'}
                    {herb === 'Rhodiola' && 'Arctic root that enhances stress resilience'}
                    {herb === 'Ginseng' && 'Traditional energy booster and cognitive enhancer'}
                    {herb === 'Valerian' && 'Natural sleep aid used for centuries'}
                    {herb === 'Echinacea' && 'Purple flower that supports immune function'}
                    {herb === 'Ginkgo' && 'Ancient tree extract for memory and focus'}
                    {herb === 'Ginger' && 'Warming spice that soothes digestion'}
                    {!['Ashwagandha', 'Rhodiola', 'Ginseng', 'Valerian', 'Echinacea', 'Ginkgo', 'Ginger'].includes(herb) && 'Powerful natural remedy with proven benefits'}
                  </p>
                  <Link 
                    href={`/herbs/${herb.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Learn More →
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link 
                href="/constitution-test"
                className={`inline-flex items-center bg-gradient-to-r ${getColorClasses(selectedGoalData.color)} text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all`}
              >
                <span className="mr-2">🎯</span>
                Get Detailed Personal Plan
                <span className="ml-2">→</span>
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

        {/* Quick Actions */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/herb-finder" className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-green-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-xl">🔍</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-green-700">Find Herbs by Symptom</h4>
                <p className="text-gray-600 text-sm">Search our database</p>
              </div>
            </div>
          </Link>

          <Link href="/ingredient-checker" className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">Check Safety</h4>
                <p className="text-gray-600 text-sm">Analyze interactions</p>
              </div>
            </div>
          </Link>

          <Link href="/dosage-calculator" className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-purple-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-xl">⚖️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700">Calculate Dosage</h4>
                <p className="text-gray-600 text-sm">Get proper amounts</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
} 