'use client'

import React, { useState, useEffect } from 'react'
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
  Share2,
  Play,
  BarChart3,
  Activity,
  Target
} from 'lucide-react'

import { questions, scoreOptions, calculateConstitution, constitutionInfo, type ConstitutionType } from './questions'

// Custom animations for enhanced UX
const customAnimations = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fade-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`

export default function ConstitutionTestClient() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false)

  // 检查URL参数，如果有start=true则自动开始测试
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('start') === 'true') {
        setCurrentStep('test')
        // 清除URL参数
        window.history.replaceState({}, '', '/constitution-test')
      }
      
    }
  }, [])

  const handleStartTest = () => {
    try {
      setCurrentStep('test')
      setCurrentQuestion(0)
      setAnswers(new Array(questions.length).fill(0))
      setSelectedAnswer(null)
    } catch (error) {
      // 强制刷新页面并添加参数
      window.location.href = '/constitution-test?start=true'
    }
  }

  const handleAnswerSelect = (score: number) => {
    // console.log(`[ConstitutionTest] 选择答案: ${score}`)
    setSelectedAnswer(score)
    
    // 更新答案数组
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = score
    setAnswers(newAnswers)
    
    // 如果开启自动跳转，延迟一下给用户视觉反馈后自动跳转
    if (autoAdvance) {
      setIsAutoAdvancing(true)
      setTimeout(() => {
        setIsAutoAdvancing(false)
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          // console.log(`[ConstitutionTest] 自动进入下一题: ${currentQuestion + 1}`)
        } else {
          setCurrentStep('results')
          // console.log('[ConstitutionTest] 测试完成，显示结果')
        }
      }, 1200) // 1.2s延迟给用户看到选择的反馈
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      // console.log('[ConstitutionTest] 未选择答案，无法继续')
      return
    }

    // console.log(`[ConstitutionTest] 手动提交答案: ${selectedAnswer} for question ${currentQuestion}`)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      // console.log(`[ConstitutionTest] 手动进入下一题: ${currentQuestion + 1}`)
    } else {
      setCurrentStep('results')
      // console.log('[ConstitutionTest] 测试完成，显示结果')
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

  // 结果页面错误边界处理
  if (currentStep === 'results') {
    try {
      // 检查是否所有问题都已回答
      const answeredCount = answers.filter(answer => answer >= 1 && answer <= 5).length;
      const minRequiredAnswers = Math.max(3, Math.floor(questions.length * 0.5)); // 至少50%的问题
      
      console.log('[ConstitutionTest] 进入结果页面:', {
        answeredCount,
        minRequiredAnswers,
        totalQuestions: questions.length,
        answers: answers.slice(0, 5) // 只显示前5个答案用于调试
      });

      if (answeredCount < minRequiredAnswers) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
            <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
            <Navigation />
            
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h1 className="text-2xl font-bold text-yellow-600 mb-4">请完成更多题目</h1>
                <p className="text-gray-600 mb-6">
                  为了获得准确的体质分析，请至少回答 {minRequiredAnswers} 个问题。<br/>
                  您已回答: {answeredCount} / {questions.length}
                </p>
                <button
                  onClick={() => setCurrentStep('test')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  继续测试
                </button>
              </div>
            </main>
          </div>
        )
      }

      console.log('[ConstitutionTest] 开始计算体质结果...');
      const result = calculateConstitution(answers)
      console.log('[ConstitutionTest] 计算结果:', result);
      
      const primaryInfo = constitutionInfo[result.primary]
      const secondaryInfo = result.secondary ? constitutionInfo[result.secondary] : null

      console.log('[ConstitutionTest] 主要体质信息:', primaryInfo ? '存在' : '不存在');
      console.log('[ConstitutionTest] 次要体质信息:', secondaryInfo ? '存在' : '不存在');

      // Error handling - if primaryInfo is undefined, show error
      if (!primaryInfo) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
            <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
            <Navigation />
            
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-red-600 mb-4">计算错误</h1>
                <p className="text-gray-600 mb-6">
                  抱歉，体质计算出现问题。调试信息：<br/>
                  Primary: {result.primary}<br/>
                  Scores: {JSON.stringify(result.scores)}<br/>
                  Available types: {Object.keys(constitutionInfo).join(', ')}
                </p>
                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  重新测试
                </button>
              </div>
            </main>
          </div>
        )
      }

      console.log('[ConstitutionTest] 准备渲染结果页面...');

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
          <Navigation />
          
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Constitution Test', href: '/constitution-test' },
                { label: '测试结果' }
              ]} 
            />

            {/* 其余的结果页面内容会在这里继续... */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">{primaryInfo.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{primaryInfo.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{primaryInfo.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">详细分析</h2>
                <p className="text-gray-700">{primaryInfo.modernInterpretation}</p>
              </div>

              <button
                onClick={() => setCurrentStep('welcome')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                重新测试
              </button>
            </div>
          </main>
        </div>
      )

    } catch (error) {
      console.error('[ConstitutionTest] 结果页面渲染错误:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
          <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
          <Navigation />
          
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">系统错误</h1>
              <p className="text-gray-600 mb-6">
                抱歉，系统在处理您的测试结果时出现了问题。<br/>
                错误信息: {error instanceof Error ? error.message : '未知错误'}
              </p>
              <button
                onClick={() => setCurrentStep('welcome')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                重新开始
              </button>
            </div>
          </main>
        </div>
      )
    }
  }

  // 欢迎页面
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Test' }
            ]} 
          />

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Activity className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Traditional Chinese Medicine Constitution Test
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover your unique body constitution with our comprehensive assessment based on traditional Chinese medicine principles. 
              Get personalized herbal recommendations and lifestyle guidance tailored to your constitutional type.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5-10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>{questions.length} questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Personalized results</span>
              </div>
            </div>
          </div>

          {/* Test Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Evidence-Based Assessment</h3>
              <p className="text-gray-600 leading-relaxed">Based on Traditional Chinese Medicine principles and modern clinical research, covering 9 distinct constitution types</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quick & Convenient</h3>
              <p className="text-gray-600 leading-relaxed">Complete the assessment in just a few minutes and receive your detailed constitutional analysis immediately</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Personalized Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">Get customized herbal suggestions, dietary advice, and lifestyle modifications based on your unique constitution</p>
            </div>
          </div>

          {/* Start Test Button */}
          <div className="text-center space-y-6">
            <button
              onClick={handleStartTest}
              className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-16 py-5 rounded-2xl text-xl font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300/50 relative overflow-hidden"
              type="button"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Play className="w-6 h-6" />
                Start Constitution Assessment
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            {/* Fallback link for accessibility */}
            <div className="text-center">
              <a
                href="/constitution-test?start=true"
                className="text-blue-600 hover:text-blue-800 underline text-sm transition-colors duration-200"
              >
                Alternative: Start test via link
              </a>
            </div>

            {/* Disclaimers and info */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">Important Information:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• This assessment is for educational purposes only</li>
                      <li>• Results should not replace professional medical advice</li>
                      <li>• Consult with qualified TCM practitioners for personalized treatment</li>
                      <li>• Takes approximately 5-10 minutes to complete</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
        <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
        <Navigation />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Test', href: '/constitution-test' },
              { label: `问题 ${currentQuestion + 1}` }
            ]} 
          />

          {/* Enhanced Progress Bar with Animation */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">测试进度</span>
              <span className="text-sm font-semibold text-green-600">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500">
                {Math.round(progress)}% 完成 • 预计还需 {Math.ceil((questions.length - currentQuestion - 1) * 0.5)} 分钟
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
            {/* 问题类别 */}
            <div className="text-center mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg transform transition-all duration-200 hover:scale-105">
                {question.category}
              </span>
            </div>

            {/* 问题 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {currentQuestion + 1}
                </div>
                <div className="h-px bg-gradient-to-r from-green-500 to-blue-500 w-16"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* Enhanced Answer Options */}
            <div className="space-y-3 mb-8">
              {scoreOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300/50 transform hover:scale-[1.02] relative overflow-hidden ${
                    selectedAnswer === option.value
                      ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 shadow-lg'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50 hover:shadow-md'
                  }`}
                  type="button"
                  aria-label={`选择答案：${option.label} - ${option.description}`}
                  aria-pressed={selectedAnswer === option.value}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {selectedAnswer === option.value && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-pulse"></div>
                  )}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        selectedAnswer === option.value
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 group-hover:border-green-400'
                      }`}>
                        {selectedAnswer === option.value && (
                          <CheckCircle className="w-4 h-4 text-white animate-bounce" />
                        )}
                      </div>
                      <div>
                        <div className={`font-semibold transition-colors duration-200 ${
                          selectedAnswer === option.value ? 'text-green-700' : 'text-gray-800'
                        }`}>
                          {option.label}
                        </div>
                        <div className={`text-sm transition-colors duration-200 ${
                          selectedAnswer === option.value ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {option.description}
                        </div>
                      </div>
                    </div>
                    {selectedAnswer === option.value && (
                      <div className="flex items-center gap-2 text-green-600">
                        <span className="text-sm font-medium">已选择</span>
                        <CheckCircle className="w-6 h-6 animate-pulse" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Auto-advance feedback overlay */}
            {isAutoAdvancing && (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-6 py-3 shadow-lg animate-fade-in">
                  <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-green-700 font-medium">
                    {currentQuestion === questions.length - 1 ? '正在生成您的体质报告...' : '正在进入下一题...'}
                  </span>
                </div>
              </div>
            )}

            {/* Enhanced Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
                上一题
              </button>

              <div className="text-center">
                {autoAdvance && !isAutoAdvancing && selectedAnswer !== null && (
                  <div className="text-sm text-green-600 font-medium animate-bounce">
                    选择完成！即将自动进入下一题
                  </div>
                )}
                {!autoAdvance && (
                  <div className="text-xs text-gray-500">
                    手动模式：请点击"下一题"继续
                  </div>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null || isAutoAdvancing}
                className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 relative overflow-hidden ${
                  selectedAnswer === null || isAutoAdvancing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 focus:ring-green-300/50 hover:shadow-lg transform hover:scale-105'
                }`}
                type="button"
                aria-label={currentQuestion === questions.length - 1 ? '查看测试结果' : '进入下一题'}
              >
                {!isAutoAdvancing && (
                  <>
                    <span className="relative z-10">
                      {currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-[2px] transition-transform duration-200" />
                  </>
                )}
                {isAutoAdvancing && (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>处理中...</span>
                  </>
                )}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
