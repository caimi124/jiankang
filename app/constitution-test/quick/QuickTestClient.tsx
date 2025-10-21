'use client'

import React, { useState } from 'react'
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Zap,
  Heart,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { 
  quickQuestions, 
  quickScoreOptions, 
  calculateQuickConstitution,
  quickConstitutionInfo,
  type QuickConstitutionType 
} from '../questions-quick'

export default function QuickTestClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0))
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const progress = ((currentQuestion + 1) / quickQuestions.length) * 100

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)

    // 自动进入下一题
    setTimeout(() => {
      if (currentQuestion < quickQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // 计算结果
        const calculatedResult = calculateQuickConstitution(newAnswers)
        setResult(calculatedResult)
        setShowResult(true)
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(Array(10).fill(0))
    setResult(null)
    setShowResult(false)
    setEmail('')
    setSubscribed(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          source: 'quick-constitution-test',
          constitutionType: result?.primary
        })
      })

      if (response.ok) {
        setSubscribed(true)
      } else {
        alert('订阅失败，请稍后重试')
      }
    } catch (error) {
      console.error('订阅错误:', error)
      alert('订阅失败，请稍后重试')
    }
  }

  if (showResult && result) {
    const primaryInfo = quickConstitutionInfo[result.primary as QuickConstitutionType]
    const secondaryInfo = result.secondary ? quickConstitutionInfo[result.secondary as QuickConstitutionType] : null

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 结果标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <span className="text-6xl">{primaryInfo.emoji}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Constitution Type
            </h1>
            <p className="text-xl text-gray-600">
              {primaryInfo.name}
            </p>
          </div>

          {/* 主要体质 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Primary Constitution</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Confidence:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.confidence === 'high' ? 'bg-green-100 text-green-800' :
                  result.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {result.confidence.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              {primaryInfo.tagline}
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Quick Action Steps:
              </h3>
              <ul className="space-y-2">
                {primaryInfo.quickFix.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 flex items-center mt-6">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Top Recommended Herbs:
              </h3>
              <div className="flex flex-wrap gap-2">
                {primaryInfo.topHerbs.map((herb, index) => (
                  <Link
                    key={index}
                    href={`/herbs/${herb.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-full text-sm font-medium transition-colors"
                  >
                    {herb}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 次要体质 */}
          {secondaryInfo && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secondary Constitution: {secondaryInfo.name}
              </h3>
              <p className="text-gray-700 mb-4">{secondaryInfo.tagline}</p>
              <div className="flex flex-wrap gap-2">
                {secondaryInfo.topHerbs.map((herb, index) => (
                  <span key={index} className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm">
                    {herb}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 推荐完整测试 */}
          {result.recommendFullTest && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">
                    Want More Accurate Results?
                  </h3>
                  <p className="text-yellow-800 mb-4">
                    Your results show mixed patterns. Take our comprehensive 35-question test for a more detailed analysis and personalized herb recommendations.
                  </p>
                  <Link
                    href="/constitution-test"
                    className="inline-flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Take Full Test (5 min)
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter订阅 */}
          {!subscribed ? (
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white mb-6">
              <h3 className="text-2xl font-bold mb-3">
                Get Your Personalized Herb Guide
              </h3>
              <p className="text-green-50 mb-6">
                Subscribe to receive a detailed PDF guide with herb recommendations, dosage info, and lifestyle tips tailored to your {primaryInfo.name}.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Free Guide
                </button>
              </form>
              <p className="text-xs text-green-100 mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-green-900">Successfully Subscribed!</h3>
                  <p className="text-green-800">Check your email for your personalized herb guide.</p>
                </div>
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retake Test
            </button>
            <Link
              href="/herb-finder"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Heart className="w-5 h-5 mr-2" />
              Find More Herbs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 测试进行中界面
  const question = quickQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quickQuestions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="w-4 h-4 mr-2" />
            <span>{question.category}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {question.text}
          </h2>

          {/* 答案选项 - 中性设计，避免评判感 */}
          <div className="space-y-3">
            {quickScoreOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all group ${
                  answers[currentQuestion] === option.value
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  {/* 单选圆圈 - 中性设计 */}
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 transition-colors ${
                    answers[currentQuestion] === option.value
                      ? 'border-green-600 bg-white'
                      : 'border-gray-300 bg-white group-hover:border-gray-400'
                  }`}>
                    {answers[currentQuestion] === option.value && (
                      <div className="w-3 h-3 rounded-full bg-green-600 animate-scale-in" />
                    )}
                  </div>
                  
                  {/* 选项文字 */}
                  <div className="flex-1 text-left">
                    <div className="text-lg font-semibold text-gray-900">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {option.description}
                    </div>
                  </div>

                  {/* 频率指示器 - 视觉化但不评判 */}
                  <div className="flex items-center gap-1 ml-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-6 rounded-full transition-all ${
                          i <= option.value
                            ? answers[currentQuestion] === option.value
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                            : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Previous
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ⚡ Quick Test • 2 minutes
            </p>
          </div>

          <div className="w-24" /> {/* 占位符保持居中 */}
        </div>
      </div>
    </div>
  )
}
