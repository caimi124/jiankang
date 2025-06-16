'use client'

import { useState, useEffect } from 'react'
import { Heart, BookOpen, Clock, TrendingUp, X } from 'lucide-react'

interface UserPreference {
  id: string
  type: 'herb' | 'condition' | 'goal'
  name: string
  timestamp: Date
}

interface RecommendedItem {
  id: string
  title: string
  type: 'herb' | 'article' | 'condition'
  description: string
  relevanceScore: number
  evidence: 'Strong' | 'Moderate' | 'Limited'
  image?: string
  url: string
}

export default function PersonalizedRecommendations() {
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([])
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Simulated user preferences (in real app, this would come from user account/localStorage)
  useEffect(() => {
    const savedPreferences = localStorage.getItem('herbscience_preferences')
    const savedFavorites = localStorage.getItem('herbscience_favorites')
    
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences))
    } else {
      setShowOnboarding(true)
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Generate recommendations based on user preferences
  useEffect(() => {
    if (userPreferences.length > 0) {
      generateRecommendations()
    }
  }, [userPreferences])

  const mockRecommendations: RecommendedItem[] = [
    {
      id: '1',
      title: 'Ashwagandha for Stress Relief',
      type: 'herb',
      description: 'Based on your interest in anxiety management, this adaptogenic herb may help reduce cortisol levels.',
      relevanceScore: 95,
      evidence: 'Strong',
      url: '/herbs/ashwagandha'
    },
    {
      id: '2',
      title: 'Sleep Hygiene with Herbal Support',
      type: 'article',
      description: 'Since you\'ve shown interest in sleep aids, this comprehensive guide covers natural sleep solutions.',
      relevanceScore: 88,
      evidence: 'Strong',
      url: '/articles/sleep-hygiene-herbs'
    },
    {
      id: '3',
      title: 'Rhodiola vs Ginseng Comparison',
      type: 'article',
      description: 'Comparing two powerful adaptogens for energy and mental clarity.',
      relevanceScore: 82,
      evidence: 'Moderate',
      url: '/articles/rhodiola-vs-ginseng'
    }
  ]

  const generateRecommendations = () => {
    // In a real app, this would use AI/ML to generate personalized recommendations
    // For now, we'll use mock data filtered by user preferences
    const filtered = mockRecommendations.filter(item => {
      return userPreferences.some(pref => 
        item.description.toLowerCase().includes(pref.name.toLowerCase()) ||
        item.title.toLowerCase().includes(pref.name.toLowerCase())
      )
    })
    
    setRecommendations(filtered.length > 0 ? filtered : mockRecommendations.slice(0, 3))
  }

  const addToFavorites = (itemId: string) => {
    const newFavorites = [...favorites, itemId]
    setFavorites(newFavorites)
    localStorage.setItem('herbscience_favorites', JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (itemId: string) => {
    const newFavorites = favorites.filter(id => id !== itemId)
    setFavorites(newFavorites)
    localStorage.setItem('herbscience_favorites', JSON.stringify(newFavorites))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'herb': return '🌿'
      case 'article': return '📄'
      case 'condition': return '🎯'
      default: return '📋'
    }
  }

  const getEvidenceBadge = (evidence: string) => {
    const colors = {
      'Strong': 'bg-green-100 text-green-800',
      'Moderate': 'bg-yellow-100 text-yellow-800',
      'Limited': 'bg-gray-100 text-gray-800'
    }
    return colors[evidence as keyof typeof colors] || colors.Limited
  }

  const onboardingQuestions = [
    {
      question: "What health goals are you interested in?",
      options: ["Stress Relief", "Better Sleep", "Energy Boost", "Immune Support", "Digestive Health", "Mental Clarity"]
    },
    {
      question: "Have you used herbal supplements before?",
      options: ["Never used them", "Occasional use", "Regular user", "Very experienced"]
    },
    {
      question: "What concerns you most about herbal supplements?",
      options: ["Safety & Side Effects", "Effectiveness", "Interactions with Medications", "Quality & Purity"]
    }
  ]

  const handleOnboardingComplete = (selections: string[]) => {
    const newPreferences: UserPreference[] = selections.map((selection, index) => ({
      id: `pref_${index}_${Date.now()}`,
      type: 'goal',
      name: selection,
      timestamp: new Date()
    }))
    
    setUserPreferences(newPreferences)
    localStorage.setItem('herbscience_preferences', JSON.stringify(newPreferences))
    setShowOnboarding(false)
  }

  if (showOnboarding) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Personalize Your Experience</h2>
            <button 
              onClick={() => setShowOnboarding(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-8">
            Help us provide better recommendations by answering a few quick questions.
          </p>

          {onboardingQuestions.map((q, qIndex) => (
            <div key={qIndex} className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">{q.question}</h3>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => {
                      if (qIndex === onboardingQuestions.length - 1) {
                        handleOnboardingComplete([option])
                      }
                    }}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Recommended for You
            </h2>
            <p className="text-gray-600">
              Based on your interests and browsing history
            </p>
          </div>
          <button
            onClick={() => setShowOnboarding(true)}
            className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Update Preferences</span>
          </button>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEvidenceBadge(item.evidence)}`}>
                        {item.evidence} Evidence
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        favorites.includes(item.id) 
                          ? removeFromFavorites(item.id)
                          : addToFavorites(item.id)
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.includes(item.id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {item.relevanceScore}% match
                    </div>
                    <a
                      href={item.url}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No recommendations yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start exploring our content to get personalized recommendations
            </p>
            <button
              onClick={() => setShowOnboarding(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Set Your Preferences
            </button>
          </div>
        )}
      </div>
    </section>
  )
} 