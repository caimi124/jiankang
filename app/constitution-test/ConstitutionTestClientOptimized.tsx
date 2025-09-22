'use client'

import React, { useState, useEffect } from 'react'
import { questions, scoreOptions, calculateConstitution, constitutionInfo, type ConstitutionType } from './questions'

/**
 * 🌿 TCM Constitution Test - Optimized Production Version
 * A beautiful, user-friendly Traditional Chinese Medicine constitution assessment
 * with enhanced UX, progress tracking, and comprehensive results
 */

export default function ConstitutionTestClientOptimized() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleStartTest = () => {
    setCurrentStep('test')
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(0))
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (score: number) => {
    if (isAnimating) return

    setSelectedAnswer(score)
    setIsAnimating(true)

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = score
    setAnswers(newAnswers)

    // Smooth transition to next question or results
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setCurrentStep('results')
      }
      setIsAnimating(false)
    }, 600)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0 && !isAnimating) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const handleRestartTest = () => {
    setCurrentStep('welcome')
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(0))
    setSelectedAnswer(null)
    setIsAnimating(false)
  }

  // Progress percentage
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Welcome Screen
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                <span className="text-3xl text-white">🌿</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Discover Your <span className="text-green-600">TCM Constitution</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Uncover your unique Traditional Chinese Medicine body type with our comprehensive assessment.
                Get personalized health insights, dietary recommendations, and herbal suggestions tailored to your constitution.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Assessment</h3>
                <p className="text-gray-600">Only 20 thoughtfully crafted questions based on official TCM standards</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Results</h3>
                <p className="text-gray-600">Detailed constitution analysis with lifestyle and dietary recommendations</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Herbal Guidance</h3>
                <p className="text-gray-600">Receive curated herb recommendations based on your unique constitution</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin?</h2>
              <p className="text-gray-600 mb-6">
                The assessment takes about 5-10 minutes. Answer honestly for the most accurate results.
              </p>
              <button
                onClick={handleStartTest}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Your Assessment
              </button>
              <p className="text-sm text-gray-500 mt-4">
                ✨ Free • No Registration Required • Instant Results
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Test Screen
  if (currentStep === 'test') {
    const currentQ = questions[currentQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {currentQ.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {currentQ.text}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {scoreOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerSelect(option.value)}
                    disabled={isAnimating}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === option.value
                        ? 'border-green-500 bg-green-50 shadow-md transform scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:transform hover:scale-[1.01]'
                    } ${isAnimating ? 'pointer-events-none opacity-70' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-4 flex-shrink-0 ${
                        selectedAnswer === option.value
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === option.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0 || isAnimating}
                className="flex items-center px-6 py-3 text-gray-600 bg-white/80 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="text-sm text-gray-500">
                {selectedAnswer && !isAnimating && "Great! Moving to next question..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Results Screen
  if (currentStep === 'results') {
    try {
      const result = calculateConstitution(answers)
      const primaryInfo = constitutionInfo[result.primary]

      if (!result || !primaryInfo) {
        throw new Error('Unable to calculate constitution results')
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Results Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                  <span className="text-3xl text-white">🎉</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Your TCM Constitution
                </h1>
                <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{primaryInfo.name}</h2>
                  <p className="text-xl font-medium">{primaryInfo.englishName}</p>
                </div>
              </div>

              {/* Constitution Overview */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">About Your Constitution</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {primaryInfo.description}
                </p>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">Modern Interpretation</h4>
                  <p className="text-blue-700">{primaryInfo.modernInterpretation}</p>
                </div>
              </div>

              {/* Characteristics & Lifestyle */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    Key Characteristics
                  </h3>
                  <ul className="space-y-3">
                    {primaryInfo.characteristics.map((characteristic, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{characteristic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-2xl mr-2">🎯</span>
                    Lifestyle Advice
                  </h3>
                  <ul className="space-y-3">
                    {primaryInfo.lifestyleAdvice.map((advice, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dietary Recommendations */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-2">🥗</span>
                  Dietary Recommendations
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">✅ Include in Your Diet</h4>
                    <div className="space-y-2">
                      {primaryInfo.dietaryRecommendations.include.map((food, index) => (
                        <div key={index} className="text-green-700 flex items-center">
                          <span className="mr-2">🌟</span>
                          {food}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">⚠️ Limit or Avoid</h4>
                    <div className="space-y-2">
                      {primaryInfo.dietaryRecommendations.avoid.map((food, index) => (
                        <div key={index} className="text-red-700 flex items-center">
                          <span className="mr-2">⚡</span>
                          {food}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Herbs */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-2">🌿</span>
                  Recommended Herbs
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {primaryInfo.recommendedHerbs?.slice(0, 6).map((herb, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🌱</div>
                      <div className="font-medium text-green-800">{herb}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  * Always consult with a qualified TCM practitioner before starting any herbal regimen.
                </p>
              </div>

              {/* Actions */}
              <div className="text-center space-y-4">
                <button
                  onClick={handleRestartTest}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Take Test Again
                </button>
                <p className="text-sm text-gray-600">
                  Share your results with friends or consult a TCM practitioner for personalized guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    } catch (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We encountered an issue while calculating your results. Please try taking the test again.
            </p>
            <button
              onClick={handleRestartTest}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      )
    }
  }

  return null
}