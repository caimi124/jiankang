// Constitution Test System - FORCE UPDATE: 2025-01-19 22:45:00
// CRITICAL: Website still shows 8 questions - forcing CDN refresh
// Expected: 20 questions TCM system should be live after this commit
// Force deployment: This should show 20 questions in Chinese, not 8 questions in English
'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { 
  questions, 
  scoreOptions, 
  calculateConstitution, 
  constitutionInfo,
  type ConstitutionType 
} from './questions'
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
  Share2,
  Zap,
  SkipForward
} from 'lucide-react'

export default function ConstitutionTestPage() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true)
  const [testResults, setTestResults] = useState<{
    primary: ConstitutionType;
    secondary?: ConstitutionType;
    scores: { [key: string]: number };
    isBalanced: boolean;
  } | null>(null)

  // 键盘支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentStep !== 'test') return
      
      // 数字键1-5选择答案
      if (e.key >= '1' && e.key <= '5') {
        const score = parseInt(e.key)
        setSelectedAnswer(score)
      }
      
      // 回车键确认并前进
      if (e.key === 'Enter' && selectedAnswer !== null) {
        handleNextQuestion()
      }
      
      // 空格键快速前进
      if (e.key === ' ' && selectedAnswer !== null) {
        e.preventDefault()
        handleNextQuestion()
      }
      
      // 方向键导航
      if (e.key === 'ArrowLeft') {
        handlePrevQuestion()
      }
      if (e.key === 'ArrowRight' && selectedAnswer !== null) {
        handleNextQuestion()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentStep, selectedAnswer])

  // 自动前进功能（选择答案后延迟自动前进）
  useEffect(() => {
    if (currentStep === 'test' && selectedAnswer !== null && autoAdvanceEnabled) {
      const timer = setTimeout(() => {
        handleNextQuestion()
      }, 800) // 800ms后自动前进
      
      return () => clearTimeout(timer)
    }
  }, [selectedAnswer, autoAdvanceEnabled, currentStep])

  const handleStartTest = () => {
    setCurrentStep('test')
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(0))
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (score: number) => {
    setSelectedAnswer(score)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 测试完成，计算结果
      const results = calculateConstitution(newAnswers)
      setTestResults(results)
      setCurrentStep('results')
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
    setTestResults(null)
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
              通过20道科学问题，精准判定您的9种体质类型，获得个性化的草药调理建议。
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
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">智能体验</h3>
              <p className="text-gray-600">支持键盘快捷键、自动前进，流畅的答题体验让测试更轻松</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">个性化建议</h3>
              <p className="text-gray-600">根据您的体质特点，提供专属的草药推荐和生活调理方案</p>
            </div>
          </div>

          {/* 快捷键提示 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">⌨️ 快捷键提示</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">1-5</div>
                <div className="text-gray-600">选择答案</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">回车</div>
                <div className="text-gray-600">确认答案</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">空格</div>
                <div className="text-gray-600">快速前进</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">方向键</div>
                <div className="text-gray-600">导航题目</div>
              </div>
            </div>
          </div>

          {/* 体质类型预览 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">9种中医体质类型</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {Object.values(constitutionInfo).map((constitution) => (
                <div key={constitution.id} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-2">{constitution.icon}</div>
                  <div className="font-medium text-sm">{constitution.name}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {constitution.keywords.slice(0, 2).join('、')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 测试统计 */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">20</div>
              <div className="text-gray-600">科学问题</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-gray-600">分钟完成</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">用户完成</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">9</div>
              <div className="text-gray-600">体质类型</div>
            </div>
          </div>

          {/* 开始测试按钮 */}
          <div className="text-center">
            <button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🎯 开始体质测试
            </button>
            <p className="text-gray-500 mt-4 text-sm">
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
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* 进度条 */}
            <div className="bg-white p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600">
                    问题 {currentQuestion + 1} / {questions.length}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setAutoAdvanceEnabled(!autoAdvanceEnabled)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        autoAdvanceEnabled 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <SkipForward className="w-3 h-3 inline mr-1" />
                      自动前进
                    </button>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {Math.round(progress)}% 完成
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 问题内容 */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {question.text}
                </h2>
                <p className="text-gray-600">
                  请根据您的实际情况选择最符合的答案
                </p>
              </div>

              {/* 答案选项 */}
              <div className="space-y-4 mb-8">
                {scoreOptions.map((option, index) => (
                  <button
                    key={option.score}
                    onClick={() => handleAnswerSelect(option.score)}
                    className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 hover:shadow-lg group ${
                      selectedAnswer === option.score
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                        selectedAnswer === option.score
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 group-hover:border-green-400'
                      }`}>
                        <span className="text-sm font-medium">
                          {selectedAnswer === option.score ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          selectedAnswer === option.score ? 'text-green-700' : 'text-gray-900'
                        }`}>
                          {option.text}
                        </div>
                        {selectedAnswer === option.score && autoAdvanceEnabled && (
                          <div className="text-sm text-green-600 mt-1">
                            即将自动前进...
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 ml-4">
                        快捷键: {index + 1}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* 导航按钮 */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                    currentQuestion === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  上一题
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    {selectedAnswer !== null ? (
                      autoAdvanceEnabled ? (
                        <span className="text-green-600">✨ 即将自动前进</span>
                      ) : (
                        <span>按回车键继续</span>
                      )
                    ) : (
                      '请选择一个答案'
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedAnswer === null
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? '完成测试' : '下一题'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // 结果页面
  if (currentStep === 'results' && testResults) {
    const primaryInfo = constitutionInfo[testResults.primary]
    const secondaryInfo = testResults.secondary ? constitutionInfo[testResults.secondary] : null

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

            {/* 次要体质提示 */}
            {secondaryInfo && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  兼夹体质：{secondaryInfo.name}
                </h3>
                <p className="text-yellow-700">
                  您同时具有{secondaryInfo.name}的特征，建议在调理时兼顾两种体质的特点。
                </p>
              </div>
            )}
          </div>

          {/* 详细分析 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* 现代医学解读 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                现代医学解读
              </h3>
              <p className="text-gray-700">{primaryInfo.modernInterpretation}</p>
            </div>

            {/* 体质特征 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                主要特征
              </h3>
              <ul className="space-y-2">
                {primaryInfo.characteristics.map((characteristic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{characteristic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 调理建议 */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* 生活建议 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                生活调理
              </h3>
              <ul className="space-y-3">
                {primaryInfo.lifestyleAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 饮食建议 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                饮食调理
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">适宜食物</h4>
                  <div className="flex flex-wrap gap-1">
                    {primaryInfo.dietaryRecommendations.include.map((food, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">避免食物</h4>
                  <div className="flex flex-wrap gap-1">
                    {primaryInfo.dietaryRecommendations.avoid.map((food, index) => (
                      <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 草药推荐 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                推荐草药
              </h3>
              <div className="space-y-3">
                {primaryInfo.recommendedHerbs.map((herb, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-3">
                    <div className="font-medium text-purple-800">{herb}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                查看草药详情
              </button>
            </div>
          </div>

          {/* 注意事项 */}
          {primaryInfo.warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-yellow-800 mb-4">注意事项</h3>
              <ul className="space-y-2">
                {primaryInfo.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-yellow-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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