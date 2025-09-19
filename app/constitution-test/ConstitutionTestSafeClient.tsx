'use client'

import React, { useState, useEffect } from 'react'
import { questions, scoreOptions, calculateConstitution, constitutionInfo, type ConstitutionType } from './questions'

// 安全包装器组件，用于捕获和处理所有潜在错误
export default function ConstitutionTestSafeClient() {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 全局错误处理函数
  const handleError = (error: any, context: string) => {
    console.error(`Error in ${context}:`, error)
    setErrorMessage(`Error in ${context}: ${error.message || 'Unknown error'}`)
    setHasError(true)
  }

  // 安全的localStorage操作
  const safeLocalStorage = {
    getItem: (key: string) => {
      try {
        if (typeof window === 'undefined') return null
        const item = localStorage.getItem(key)
        return item && item.trim() !== '' ? item : null
      } catch (error) {
        console.warn(`Failed to get localStorage item ${key}:`, error)
        return null
      }
    },
    setItem: (key: string, value: string) => {
      try {
        if (typeof window === 'undefined') return false
        localStorage.setItem(key, value)
        return true
      } catch (error) {
        console.warn(`Failed to set localStorage item ${key}:`, error)
        return false
      }
    },
    removeItem: (key: string) => {
      try {
        if (typeof window === 'undefined') return false
        localStorage.removeItem(key)
        return true
      } catch (error) {
        console.warn(`Failed to remove localStorage item ${key}:`, error)
        return false
      }
    }
  }

  // 安全的JSON解析
  const safeJSONParse = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      return { success: true, data: parsed }
    } catch (error) {
      return { success: false, error }
    }
  }

  // 如果发生错误，显示错误页面
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">程序异常</h1>
            <p className="text-gray-600 mb-6">
              抱歉，体质测试遇到了技术问题。我们正在努力修复。
              {process.env.NODE_ENV === 'development' && (
                <><br/><span className="text-xs text-red-500">{errorMessage}</span></>
              )}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setHasError(false)
                  setErrorMessage('')
                  // 清理可能损坏的数据
                  safeLocalStorage.removeItem('constitutionTestHistory')
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                重新开始
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 在正常组件外层包装错误边界
  return (
    <ErrorBoundaryWrapper onError={handleError}>
      <ConstitutionTestClientWrapped
        safeLocalStorage={safeLocalStorage}
        safeJSONParse={safeJSONParse}
        onError={handleError}
      />
    </ErrorBoundaryWrapper>
  )
}

// 错误边界包装器
class ErrorBoundaryWrapper extends React.Component<{
  children: React.ReactNode
  onError: (error: any, context: string) => void
}> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error, 'React Error Boundary')
  }

  render() {
    return this.props.children
  }
}

// 主要组件（精简版，只包含核心功能）
function ConstitutionTestClientWrapped({
  safeLocalStorage,
  safeJSONParse,
  onError
}: {
  safeLocalStorage: any
  safeJSONParse: any
  onError: (error: any, context: string) => void
}) {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // 安全的初始化
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // 检查URL参数
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('start') === 'true') {
          setCurrentStep('test')
          try {
            window.history.replaceState({}, '', '/constitution-test')
          } catch (historyError) {
            console.warn('Failed to update URL history:', historyError)
          }
        }
      }
    } catch (error) {
      onError(error, 'initialization')
    }
  }, [onError])

  const handleStartTest = () => {
    try {
      setCurrentStep('test')
      setCurrentQuestion(0)
      setAnswers(new Array(questions.length).fill(0))
      setSelectedAnswer(null)
    } catch (error) {
      onError(error, 'start test')
    }
  }

  const handleAnswerSelect = (score: number) => {
    try {
      setSelectedAnswer(score)
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = score
      setAnswers(newAnswers)

      // 自动进入下一题
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
        } else {
          setCurrentStep('results')
        }
      }, 1000)
    } catch (error) {
      onError(error, 'answer selection')
    }
  }

  const handleBackToWelcome = () => {
    try {
      setCurrentStep('welcome')
      setCurrentQuestion(0)
      setAnswers(new Array(questions.length).fill(0))
      setSelectedAnswer(null)
    } catch (error) {
      onError(error, 'back to welcome')
    }
  }

  // 欢迎页面
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">中医体质测试</h1>
            <p className="text-xl text-gray-600 mb-8">发现您的体质类型，获得个性化健康建议</p>
            <button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
            >
              开始测试
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 测试页面
  if (currentStep === 'test') {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">进度</span>
              <span className="text-sm text-green-600">{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {question.text}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {scoreOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedAnswer === option.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 结果页面
  if (currentStep === 'results') {
    try {
      const result = calculateConstitution(answers)
      const primaryInfo = constitutionInfo[result.primary]

      if (!primaryInfo) {
        throw new Error('Constitution information not found')
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">{primaryInfo.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {primaryInfo.englishName}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {primaryInfo.description}
              </p>

              <button
                onClick={handleBackToWelcome}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                重新测试
              </button>
            </div>
          </div>
        </div>
      )
    } catch (error) {
      onError(error, 'results calculation')
      return null
    }
  }

  return null
}