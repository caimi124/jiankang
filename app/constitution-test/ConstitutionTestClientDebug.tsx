'use client'

import React, { useState, useEffect } from 'react'
import { questions, scoreOptions, calculateConstitution, constitutionInfo, type ConstitutionType } from './questions'

/**
 * 🔬 Constitution Test 调试版本
 * 专门用于定位"Something went wrong!"错误的根本原因
 * 包含详细的控制台输出和错误追踪
 */

export default function ConstitutionTestClientDebug() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  // 调试日志函数
  const debugLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8)
    const logMessage = `[${timestamp}] ${message}`
    console.log(logMessage, data || '')
    setDebugInfo(prev => [...prev, logMessage + (data ? ` ${JSON.stringify(data)}` : '')])
  }

  useEffect(() => {
    debugLog('🚀 ConstitutionTestClientDebug 组件初始化')
    debugLog('📊 Questions 数据', { length: questions?.length, firstQuestion: questions?.[0]?.text?.slice(0, 50) })
    debugLog('📋 ConstitutionInfo 数据', { keys: Object.keys(constitutionInfo || {}), sample: constitutionInfo?.['平和']?.name })
  }, [])

  const handleStartTest = () => {
    debugLog('▶️ 开始测试')
    setCurrentStep('test')
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(0))
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (score: number) => {
    debugLog(`✏️ 选择答案`, { question: currentQuestion, score })
    setSelectedAnswer(score)
    
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = score
    setAnswers(newAnswers)
    
    debugLog(`📝 更新答案数组`, { 
      answeredCount: newAnswers.filter(a => a >= 1 && a <= 5).length,
      totalQuestions: questions.length
    })
    
    // 自动跳转到下一题
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        debugLog('🏁 所有问题已完成，跳转到结果页面')
        setCurrentStep('results')
      }
    }, 500)
  }

  // 结果页面处理（带详细调试）
  if (currentStep === 'results') {
    debugLog('🎯 进入结果页面')
    
    try {
      // 步骤1: 验证输入数据
      debugLog('1️⃣ 验证输入数据')
      const answeredCount = answers.filter(answer => answer >= 1 && answer <= 5).length
      const minRequiredAnswers = Math.max(3, Math.floor(questions.length * 0.5))
      
      debugLog('📊 数据验证结果', {
        answeredCount,
        minRequiredAnswers,
        totalQuestions: questions.length,
        answersArray: answers
      })

      if (answeredCount < minRequiredAnswers) {
        debugLog('❌ 答案数量不足')
        throw new Error(`需要至少回答${minRequiredAnswers}个问题，当前只回答了${answeredCount}个`)
      }

      // 步骤2: 验证questions和constitutionInfo
      debugLog('2️⃣ 验证数据源')
      if (!Array.isArray(answers)) {
        debugLog('❌ answers不是数组')
        throw new Error('Answers is not an array')
      }
      if (!questions || questions.length === 0) {
        debugLog('❌ questions数据无效')
        throw new Error('Questions array is empty or undefined')
      }
      if (!constitutionInfo || typeof constitutionInfo !== 'object') {
        debugLog('❌ constitutionInfo数据无效')
        throw new Error('Constitution info database is not available')
      }

      debugLog('✅ 数据源验证通过')

      // 步骤3: 计算体质结果
      debugLog('3️⃣ 开始计算体质结果')
      const result = calculateConstitution(answers)
      debugLog('🧮 计算完成', result)

      // 步骤4: 验证计算结果
      debugLog('4️⃣ 验证计算结果')
      if (!result || !result.primary) {
        debugLog('❌ 计算结果无效', result)
        throw new Error('Invalid constitution calculation result')
      }

      debugLog('✅ 计算结果验证通过')

      // 步骤5: 获取体质信息
      debugLog('5️⃣ 获取体质信息')
      const primaryInfo = constitutionInfo[result.primary]
      if (!primaryInfo) {
        debugLog('❌ 找不到主要体质信息', { 
          primary: result.primary, 
          availableTypes: Object.keys(constitutionInfo) 
        })
        throw new Error(`找不到体质类型"${result.primary}"的信息`)
      }

      debugLog('✅ 体质信息获取成功', {
        name: primaryInfo.name,
        englishName: primaryInfo.englishName,
        hasDescription: !!primaryInfo.description
      })

      // 步骤6: 渲染结果页面
      debugLog('6️⃣ 开始渲染结果页面')

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="max-w-4xl mx-auto">
            {/* 调试信息面板 */}
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <h3 className="font-bold text-yellow-800 mb-2">🔬 调试信息面板</h3>
              <div className="text-sm text-yellow-700 max-h-40 overflow-y-auto">
                {debugInfo.slice(-10).map((info, index) => (
                  <div key={index} className="mb-1">{info}</div>
                ))}
              </div>
            </div>

            {/* 成功的结果页面 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                  🎉 测试成功完成！
                </h1>
                <p className="text-xl text-gray-700">
                  您的体质类型: <strong>{primaryInfo.name}</strong>
                </p>
                <p className="text-lg text-gray-600">
                  {primaryInfo.englishName}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">体质特征</h3>
                  <p className="text-blue-700">{primaryInfo.description}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">推荐草药</h3>
                  <div className="space-y-2">
                    {primaryInfo.recommendedHerbs?.slice(0, 4).map((herb, index) => (
                      <div key={index} className="text-green-700">
                        🌿 {herb}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    debugLog('🔄 重新开始测试')
                    setCurrentStep('welcome')
                    setCurrentQuestion(0)
                    setAnswers(new Array(questions.length).fill(0))
                    setSelectedAnswer(null)
                    setDebugInfo([])
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  重新测试
                </button>
              </div>
            </div>
          </div>
        </div>
      )

    } catch (error) {
      debugLog('❌ 结果页面渲染错误', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      })

      // 显示详细的错误信息
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🚨</div>
                <h1 className="text-2xl font-bold text-red-600 mb-4">调试模式 - 发现错误！</h1>
                
                <div className="text-left bg-red-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-red-800 mb-2">错误详情:</h3>
                  <p className="text-red-700 font-mono text-sm mb-2">
                    {error instanceof Error ? error.message : String(error)}
                  </p>
                  {error instanceof Error && error.stack && (
                    <details className="mt-2">
                      <summary className="text-red-600 cursor-pointer">查看错误堆栈</summary>
                      <pre className="text-xs text-red-600 mt-2 overflow-x-auto">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>

                <div className="text-left bg-yellow-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-yellow-800 mb-2">调试日志:</h3>
                  <div className="text-sm text-yellow-700 max-h-60 overflow-y-auto">
                    {debugInfo.map((info, index) => (
                      <div key={index} className="mb-1 font-mono">{info}</div>
                    ))}
                  </div>
                </div>

                <div className="text-left bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-blue-800 mb-2">当前状态:</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• 答案数量: {answers.filter(a => a >= 1 && a <= 5).length}/{questions.length}</li>
                    <li>• Questions 可用: {questions ? '✅' : '❌'}</li>
                    <li>• ConstitutionInfo 可用: {constitutionInfo ? '✅' : '❌'}</li>
                    <li>• ConstitutionInfo 类型数: {Object.keys(constitutionInfo || {}).length}</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    debugLog('🔄 重置测试')
                    setCurrentStep('welcome')
                    setCurrentQuestion(0)
                    setAnswers(new Array(questions.length).fill(0))
                    setSelectedAnswer(null)
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  重新开始
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  // 欢迎页面
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🔬 Constitution Test 调试版本
            </h1>
            <p className="text-gray-600 mb-6">
              这是专门用于调试的版本，包含详细的错误追踪和日志输出。
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-blue-800 mb-2">初始化状态检查:</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Questions 数量: {questions?.length || 0}</li>
                <li>• ConstitutionInfo 类型: {Object.keys(constitutionInfo || {}).length}</li>
                <li>• 计算函数: {typeof calculateConstitution === 'function' ? '✅' : '❌'}</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              开始调试测试
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 测试页面
  if (currentStep === 'test') {
    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* 进度指示器 */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-600 mt-2">
              问题 {currentQuestion + 1} / {questions.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ.text}
            </h2>

            <div className="space-y-3">
              {scoreOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-gray-600 ml-2">- {option.description}</span>
                </button>
              ))}
            </div>

            {/* 调试信息 */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                调试: 分类={currentQ.category}, 影响={Object.keys(currentQ.affects).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ConstitutionTestClientDebug
