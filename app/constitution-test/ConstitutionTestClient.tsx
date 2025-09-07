'use client'

import React, { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Heart, 
  Brain,
  Shield,
  Clock,
  Users,
  Award,
  Download,
  Share2
} from 'lucide-react'

import { questions, scoreOptions, calculateConstitution, constitutionInfo, type ConstitutionType } from './questions'

export default function ConstitutionTestClient() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // 检查URL参数，如果有start=true则自动开始测试
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('start') === 'true') {
        console.log('[ConstitutionTest] URL参数检测到start=true，自动开始测试')
        setCurrentStep('test')
        // 清除URL参数
        window.history.replaceState({}, '', '/constitution-test')
      }
      
      // 添加调试脚本
      const script = document.createElement('script')
      script.src = '/debug-buttons.js'
      document.head.appendChild(script)
    }
  }, [])

  const handleStartTest = () => {
    console.log('[ConstitutionTest] 开始测试按钮被点击')
    try {
      setCurrentStep('test')
      setCurrentQuestion(0)
      setAnswers(new Array(questions.length).fill(0))
      setSelectedAnswer(null)
      console.log('[ConstitutionTest] 状态已更新为测试模式')
    } catch (error) {
      console.error('[ConstitutionTest] 状态更新错误:', error)
      // 强制刷新页面并添加参数
      window.location.href = '/constitution-test?start=true'
    }
  }

  const handleAnswerSelect = (score: number) => {
    console.log(`[ConstitutionTest] 选择答案: ${score}`)
    setSelectedAnswer(score)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      console.log('[ConstitutionTest] 未选择答案，无法继续')
      return
    }

    console.log(`[ConstitutionTest] 提交答案: ${selectedAnswer} for question ${currentQuestion}`)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      console.log(`[ConstitutionTest] 进入下一题: ${currentQuestion + 1}`)
    } else {
      setCurrentStep('results')
      console.log('[ConstitutionTest] 测试完成，显示结果')
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const handleBackToWelcome = () => {
    setCurrentStep('welcome')
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(0))
    setSelectedAnswer(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 欢迎页面
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Test' }
            ]} 
          />

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🧪 中医体质测试
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于《中国居民中医体质分类与判定标准》的专业测试，
              通过{questions.length}道科学问题，精准判定您的体质类型，获得个性化的草药调理建议。
            </p>
          </div>

          {/* 测试特色 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">科学专业</h3>
              <p className="text-gray-600">基于国家中医药管理局标准，涵盖9种体质类型的精准判定</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">快速便捷</h3>
              <p className="text-gray-600">仅需几分钟完成问题，即可获得详细的体质分析报告</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">个性化建议</h3>
              <p className="text-gray-600">根据您的体质特点，提供专属的草药推荐和生活调理方案</p>
            </div>
          </div>

          {/* 开始测试按钮 - 使用多种方式 */}
          <div className="text-center space-y-4">
            {/* 方式1: React按钮 */}
            <button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
              type="button"
            >
              🎯 开始体质测试 (React按钮)
            </button>
            
            {/* 方式2: HTML链接伪装成按钮 */}
            <a
              href="/constitution-test?start=true"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-lg"
            >
              🔄 开始体质测试 (HTML链接)
            </a>

            {/* 方式3: 内联JavaScript */}
            <div
              onClick={() => window.location.href = '/constitution-test?start=true'}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-lg cursor-pointer"
            >
              ⚡ 开始体质测试 (内联JS)
            </div>

            {/* 方式4: 纯HTML按钮带onclick */}
            <button
              onClick={() => {
                console.log('🚀 纯HTML按钮点击')
                window.location.href = '/constitution-test?start=true'
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-lg"
            >
              🔥 开始体质测试 (纯HTML)
            </button>
            
            <p className="text-gray-500 text-sm">
              ⚠️ 如果上面所有按钮都不工作，可能是JavaScript被完全禁用<br/>
              本测试仅供教育参考，不能替代专业医疗建议
            </p>
          </div>
        </main>
      </div>
    )
  }

  // 测试进行中
  if (currentStep === 'test') {
    const question = questions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Test', href: '/constitution-test' },
              { label: `问题 ${currentQuestion + 1}` }
            ]} 
          />

          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">测试进度</span>
              <span className="text-sm text-gray-600">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* 问题类别 */}
            <div className="text-center mb-6">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {question.category}
              </span>
            </div>

            {/* 问题 */}
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              {question.text}
            </h2>

            {/* 答案选项 */}
            <div className="space-y-4 mb-8">
              {scoreOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 ${
                    selectedAnswer === option.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  type="button"
                  aria-label={`选择答案：${option.label} - ${option.description}`}
                  aria-pressed={selectedAnswer === option.value}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                    {selectedAnswer === option.value && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                上一题
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-4 ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 focus:ring-green-300'
                }`}
                type="button"
                aria-label={currentQuestion === questions.length - 1 ? '查看测试结果' : '进入下一题'}
              >
                {currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // 结果页面
  if (currentStep === 'results') {
    const result = calculateConstitution(answers)
    const primaryInfo = constitutionInfo[result.primary]
    const secondaryInfo = result.secondary ? constitutionInfo[result.secondary] : null

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Test', href: '/constitution-test' },
              { label: '测试结果' }
            ]} 
          />

          {/* 主要体质结果 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{primaryInfo.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {primaryInfo.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {primaryInfo.englishName}
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {primaryInfo.keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {primaryInfo.description}
              </p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleBackToWelcome}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              重新测试
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              下载报告
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
              <Share2 className="w-5 h-5" />
              分享结果
            </button>
          </div>
        </main>
      </div>
    )
  }

  return null
}
