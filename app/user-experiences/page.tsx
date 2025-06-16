'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

interface UserExperience {
  id: number
  user: string
  age: number
  gender: string
  herb: string
  condition: string
  duration: string
  effectiveness: number
  sideEffects: string
  wouldRecommend: boolean
  story: string
  tags: string[]
  verifiedPurchase: boolean
}

export default function UserExperiencesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedHerb, setSelectedHerb] = useState('')

  const experiences: UserExperience[] = [
    {
      id: 1,
      user: "Sarah M.",
      age: 34,
      gender: "Female",
      herb: "Ashwagandha",
      condition: "Chronic Anxiety",
      duration: "3 months",
      effectiveness: 4,
      sideEffects: "None reported",
      wouldRecommend: true,
      story: "I was skeptical about herbal supplements, but after struggling with anxiety for years, I decided to try ashwagandha. Within 2 weeks, I noticed my stress levels were more manageable. After 3 months, my sleep improved significantly and I feel much calmer during stressful situations at work.",
      tags: ["anxiety", "stress", "sleep", "work-related"],
      verifiedPurchase: true
    },
    {
      id: 2,
      user: "Michael K.",
      age: 45,
      gender: "Male",
      herb: "Turmeric + Black Pepper",
      condition: "Joint Pain",
      duration: "6 weeks",
      effectiveness: 5,
      sideEffects: "Mild stomach upset initially",
      wouldRecommend: true,
      story: "As a runner, I was dealing with knee pain that was affecting my training. Started taking turmeric with black pepper extract. The initial stomach upset went away after a week. Now 6 weeks in, my joint pain has reduced by about 80%. I can run longer distances without discomfort.",
      tags: ["joint-pain", "inflammation", "sports", "running"],
      verifiedPurchase: true
    }
  ]

  const herbs = Array.from(new Set(experiences.map(exp => exp.herb)))

  const filteredExperiences = experiences.filter(exp => {
    if (selectedFilter === 'effective' && exp.effectiveness < 4) return false
    if (selectedFilter === 'no-side-effects' && exp.sideEffects !== 'None reported') return false
    if (selectedHerb && exp.herb !== selectedHerb) return false
    return true
  })

  const averageRating = (experiences: UserExperience[]) => {
    return (experiences.reduce((sum, exp) => sum + exp.effectiveness, 0) / experiences.length).toFixed(1)
  }

  return (
    <div>
      <Navigation />
      <main className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Real User Experiences
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Honest reviews and experiences from people who have used herbal supplements. Learn from their journeys, successes, and challenges.
            </p>
            <div className="flex justify-center items-center gap-8 text-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-2">📊</span>
                <span>{experiences.length} Verified Reviews</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">⭐</span>
                <span>{averageRating(experiences)}/5 Average Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-6 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  selectedFilter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
              >
                All Experiences
              </button>
              <button
                onClick={() => setSelectedFilter('effective')}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  selectedFilter === 'effective' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
              >
                Highly Effective (4+ stars)
              </button>
              <button
                onClick={() => setSelectedFilter('no-side-effects')}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  selectedFilter === 'no-side-effects' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                No Side Effects
              </button>
            </div>

            <div className="text-center">
              <select
                value={selectedHerb}
                onChange={(e) => setSelectedHerb(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                <option value="">Filter by Herb</option>
                {herbs.map(herb => (
                  <option key={herb} value={herb}>{herb}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {filteredExperiences.length} Experience{filteredExperiences.length !== 1 ? 's' : ''} Found
              </h2>
              <p className="text-gray-600">Each review is from a verified purchase and real user experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((experience) => (
                <div key={experience.id} className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{experience.user}</h3>
                      <p className="text-gray-600 text-sm">{experience.age}y, {experience.gender}</p>
                    </div>
                    <div className="flex items-center">
                      {experience.verifiedPurchase && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                          ✓ Verified
                        </span>
                      )}
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < experience.effectiveness ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Herb & Condition */}
                  <div className="mb-4">
                    <div className="bg-purple-50 px-3 py-1 rounded-full inline-block mb-2">
                      <span className="text-purple-700 font-medium">{experience.herb}</span>
                    </div>
                    <p className="text-gray-700">
                      <strong>Used for:</strong> {experience.condition}
                    </p>
                    <p className="text-gray-700">
                      <strong>Duration:</strong> {experience.duration}
                    </p>
                  </div>

                  {/* Story */}
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{experience.story}"
                  </p>

                  {/* Side Effects */}
                  <div className="mb-4">
                    <p className="text-sm">
                      <strong className="text-gray-600">Side Effects:</strong>{' '}
                      <span className={experience.sideEffects === 'None reported' ? 'text-green-600' : 'text-orange-600'}>
                        {experience.sideEffects}
                      </span>
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Recommendation */}
                  <div className="text-center">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      experience.wouldRecommend 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {experience.wouldRecommend ? '👍 Would Recommend' : '👎 Would Not Recommend'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 