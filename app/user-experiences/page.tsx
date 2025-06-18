'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Star, ThumbsUp, MessageCircle, Shield, User, Calendar, AlertTriangle } from 'lucide-react'

export default function UserExperiencesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [helpfulClicks, setHelpfulClicks] = useState<{[key: number]: boolean}>({})
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    herb: '',
    condition: '',
    rating: 5,
    experience: '',
    duration: '',
    sideEffects: '',
    wouldRecommend: true
  })

  const userReviews = [
    {
      id: 1,
      name: "Sarah M.",
      location: "California, USA",
      herb: "Ashwagandha",
      condition: "Stress & Anxiety",
      rating: 5,
      duration: "3 months",
      date: "2024-01-15",
      verified: true,
      helpful: 124,
      review: "After struggling with work stress for months, I started taking ashwagandha based on this site's recommendations. The dosage calculator was incredibly helpful - I started with a lower dose and gradually increased. Within 2 weeks, I noticed better sleep and less anxiety during meetings. The safety checker confirmed it was safe with my blood pressure medication.",
      beforeAfter: {
        before: "Constant anxiety, poor sleep, difficulty concentrating",
        after: "Calmer mindset, better sleep quality, improved focus at work"
      },
      sideEffects: "None experienced",
      wouldRecommend: true
    },
    {
      id: 2,
      name: "Michael R.",
      location: "London, UK",
      herb: "Turmeric & Ginger",
      condition: "Joint Pain",
      rating: 4,
      duration: "6 months",
      date: "2024-01-10",
      verified: true,
      helpful: 89,
      review: "I've been dealing with knee pain from running for years. The symptom finder suggested turmeric with black pepper and ginger. I was skeptical at first, but the evidence-based approach convinced me. After 6 months, my morning stiffness is gone and I can run pain-free again. The knowledge center helped me understand why these herbs work.",
      beforeAfter: {
        before: "Daily knee pain, morning stiffness, limited running",
        after: "95% reduction in pain, running 5K again, better mobility"
      },
      sideEffects: "Mild stomach upset first week (took with food after)",
      wouldRecommend: true
    },
    {
      id: 3,
      name: "Dr. Jennifer L.",
      location: "Toronto, Canada",
      herb: "Rhodiola & Ginseng",
      condition: "Mental Fatigue",
      rating: 5,
      duration: "4 months",
      date: "2024-01-08",
      verified: true,
      helpful: 156,
      review: "As a physician working long hours, I needed evidence-based solutions for mental fatigue. This platform's research citations and safety profiles impressed me. The combination of rhodiola and ginseng has significantly improved my mental clarity and energy levels without the jitters from caffeine.",
      beforeAfter: {
        before: "Afternoon crashes, mental fog, relying on caffeine",
        after: "Sustained energy, clear thinking, reduced caffeine dependency"
      },
      sideEffects: "None",
      wouldRecommend: true
    },
    {
      id: 4,
      name: "Emma K.",
      location: "Sydney, Australia",
      herb: "Reishi Mushroom",
      condition: "Sleep Issues",
      rating: 4,
      duration: "2 months",
      date: "2024-01-05",
      verified: true,
      helpful: 67,
      review: "The AI constitution test identified me as having 'liver qi stagnation' and recommended reishi mushroom. I was curious about the TCM approach. While it took about 3 weeks to notice changes, my sleep quality has improved dramatically. I now fall asleep faster and wake up more refreshed.",
      beforeAfter: {
        before: "Taking 2+ hours to fall asleep, frequent waking",
        after: "Asleep within 30 minutes, deeper sleep, more energy"
      },
      sideEffects: "Slight drowsiness first few days",
      wouldRecommend: true
    }
  ]

  const successMetrics = [
    { number: "89%", label: "Report Positive Results", icon: "📈" },
    { number: "2-4", label: "Weeks Average to See Benefits", icon: "⏱️" },
    { number: "94%", label: "Would Recommend to Friends", icon: "👥" },
    { number: "12+", label: "Months Average Usage", icon: "📅" }
  ]

  const commonConditions = [
    { condition: "Stress & Anxiety", users: 1204, avgRating: 4.3 },
    { condition: "Sleep Issues", users: 987, avgRating: 4.1 },
    { condition: "Digestive Health", users: 756, avgRating: 4.2 },
    { condition: "Energy & Fatigue", users: 623, avgRating: 4.0 },
    { condition: "Joint Health", users: 445, avgRating: 4.4 },
    { condition: "Cognitive Function", users: 378, avgRating: 4.2 }
  ]

  const handleHelpfulClick = (reviewId: number) => {
    setHelpfulClicks(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加提交评论到后端的逻辑
    alert('Thank you for your review! It will be published after verification.')
    setShowReviewForm(false)
    setNewReview({
      name: '',
      email: '',
      herb: '',
      condition: '',
      rating: 5,
      experience: '',
      duration: '',
      sideEffects: '',
      wouldRecommend: true
    })
  }

  const filteredReviews = userReviews.filter(review => {
    if (selectedFilter === 'all') return true
    return review.condition.toLowerCase().includes(selectedFilter.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'User Experiences', href: '/user-experiences' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Real User Experiences
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verified stories from our community of herb users. See how others have used herbal supplements to improve their health and wellbeing.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Community Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-3xl font-bold text-green-600 mb-1">{metric.number}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Conditions */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Most Reviewed Conditions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonConditions.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{item.condition}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{item.avgRating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.users} user reviews</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Conditions</option>
                <option value="stress">Stress & Anxiety</option>
                <option value="sleep">Sleep Issues</option>
                <option value="energy">Energy & Fatigue</option>
                <option value="joint">Joint Health</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredReviews.length} verified reviews
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl shadow-lg p-8">
                {/* Review Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        {review.verified && (
                          <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                            <Shield className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">Verified</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{review.location}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {review.date}
                    </div>
                  </div>
                </div>

                {/* Condition and Herb */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-1">Condition</h4>
                    <p className="text-blue-700">{review.condition}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-1">Herb Used</h4>
                    <p className="text-green-700">{review.herb}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-purple-800 mb-1">Duration</h4>
                    <p className="text-purple-700">{review.duration}</p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{review.review}</p>
                </div>

                {/* Before/After */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-red-800 mb-2">Before</h4>
                    <p className="text-red-700 text-sm">{review.beforeAfter.before}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-2">After</h4>
                    <p className="text-green-700 text-sm">{review.beforeAfter.after}</p>
                  </div>
                </div>

                {/* Side Effects & Recommendation */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Side Effects</h4>
                    <p className="text-gray-700 text-sm">{review.sideEffects}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Would Recommend?</h4>
                    <p className="text-gray-700 text-sm">
                      {review.wouldRecommend ? '✅ Yes, absolutely' : '❌ No'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleHelpfulClick(review.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        helpfulClicks[review.id] 
                          ? 'text-green-600' 
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">
                        Helpful ({review.helpful + (helpfulClicks[review.id] ? 1 : 0)})
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Comment</span>
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    This review has been verified by our medical team
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Experience CTA */}
          <div className="mt-12 bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Help others by sharing your herbal supplement journey. Your story could help someone make an informed decision about their health.
            </p>
            <button 
              onClick={() => setShowReviewForm(true)}
              className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Review Form Modal */}
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-screen overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Share Your Experience</h2>
                  <button 
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={newReview.email}
                        onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Herb/Supplement *
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.herb}
                        onChange={(e) => setNewReview({...newReview, herb: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Turmeric, Ashwagandha"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Condition Treated *
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.condition}
                        onChange={(e) => setNewReview({...newReview, condition: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Anxiety, Joint Pain"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Overall Rating *
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= newReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Experience *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.experience}
                      onChange={(e) => setNewReview({...newReview, experience: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      placeholder="Tell us about your experience with this herb..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration of Use
                      </label>
                      <input
                        type="text"
                        value={newReview.duration}
                        onChange={(e) => setNewReview({...newReview, duration: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., 3 months"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Side Effects
                      </label>
                      <input
                        type="text"
                        value={newReview.sideEffects}
                        onChange={(e) => setNewReview({...newReview, sideEffects: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="None or describe any side effects"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={newReview.wouldRecommend}
                        onChange={(e) => setNewReview({...newReview, wouldRecommend: e.target.checked})}
                        className="w-5 h-5 text-green-600"
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        I would recommend this herb to others
                      </span>
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  User experiences are individual and may not reflect typical results. These reviews are for educational purposes only and should not replace professional medical advice. Always consult with healthcare providers before starting any herbal supplement regimen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}