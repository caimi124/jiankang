'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { questions, scoreOptions, calculateConstitution, constitutionInfo, type ConstitutionType } from './questions'

// 延迟加载Header组件
const Header = dynamic(() => import('../../components/Header'), {
  ssr: false,
  loading: () => (
    <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 h-20" />
  )
})

const adviceFailScenarios: Record<ConstitutionType, string[]> = {
  '平和': [
    '跟风补“更强的补品”反而打破你原本的平衡。',
    '一次叠加太多 adaptogen，让身体进入过度刺激。'
  ],
  '气虚': [
    '直接上高剂量提神补剂，未补气先透支。',
    '长时间喝冰冷排毒饮，脾胃更无力。'
  ],
  '阳虚': [
    '照搬“清热排毒”饮食，越喝越冷。',
    '冬天坚持生冷沙拉，反而拉肚子。'
  ],
  '阴虚': [
    '再用辛辣或咖啡提神，只会更燥更难睡。',
    '晚上服用温热类补品，让夜间盗汗加剧。'
  ],
  '痰湿': [
    '补品越浓越腻，最后全部堆成湿困。',
    '久坐少动再喝甜补汤，身重更明显。'
  ],
  '湿热': [
    '热毒型体质硬吃大补，长痘、口苦更严重。',
    '晚上熬夜再吃温阳补剂，睡眠完全崩盘。'
  ],
  '血瘀': [
    '简单补血不通络，症状反复卡在同一处。',
    '忽略循环问题，只加营养，瘀堵更明显。'
  ],
  '气郁': [
    '强行提神不疏肝，越补越胸闷。',
    '长期焦虑再服温热补药，火气上冲。'
  ],
  '特禀': [
    '没有做敏感性筛查就乱补，过敏反应频发。',
    '忽视过敏史尝试新粉末，皮疹瞬间爆发。'
  ],
  '脾虚': [
    '生冷代餐让脾胃更弱，补品无法吸收。',
    '餐后马上吃油腻补品，胀气反复。'
  ]
}

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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl border border-gray-100">
            <p className="text-sm uppercase tracking-[0.3em] text-green-600">
              This is not a quiz.
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-gray-900">
              This is a personal assessment.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              It explains why common supplement advice stops working for you and why “再加一种补充剂”不会解决问题。
            </p>
            <button
              onClick={handleStartTest}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-green-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700"
            >
              Start the assessment
            </button>
            <p className="mt-3 text-xs text-gray-500">Free · No login · Instant results</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-green-700">How we assess</p>
              <h2 className="mt-3 text-xl font-semibold text-gray-900">不止于“答题”</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li>35 个生活与体感指标，源自官方体质判定标准。</li>
                <li>评分按倾向加权，输出中文原名 + 现代解释。</li>
                <li>记下“你常见的失灵场景”，方便后续比对。</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-green-700">How to interpret</p>
              <h2 className="mt-3 text-xl font-semibold text-gray-900">结果会指向下一步</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li>一句话告诉你“为什么别人有效、我没感觉”。</li>
                <li>推荐下一步：去 Herb Finder 验证，或预约更深入拆解。</li>
                <li>保留体质记录，未来新增内容都以此为核心。</li>
              </ul>
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
        <Header />

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

      const scenarioList = adviceFailScenarios[result.primary] || []
      const herbFinderLink = `/herb-finder?constitution=${encodeURIComponent(primaryInfo.name)}`

      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow border border-gray-100">
              <p className="text-xs uppercase tracking-[0.3em] text-green-600">Constitution description</p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-900">{primaryInfo.name}</h2>
              <p className="text-sm text-gray-500">{primaryInfo.englishName}</p>
              <p className="mt-4 text-gray-700">{primaryInfo.description}</p>
              <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-green-900">
                {primaryInfo.modernInterpretation}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow border border-gray-100">
              <p className="text-xs uppercase tracking-[0.3em] text-green-600">When advice fails</p>
              <h3 className="mt-3 text-2xl font-semibold text-gray-900">常见的“补不上”情境</h3>
              <ul className="mt-5 space-y-3 text-gray-700">
                {scenarioList.map((scenario, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">Next steps</p>
              <h3 className="mt-3 text-2xl font-semibold">让判断开始发挥作用</h3>
              <p className="mt-3 text-white/80">
                选择一个动作，验证你刚得到的体质结果。
              </p>
              <div className="mt-6 flex flex-col gap-4 md:flex-row">
                <Link
                  href={herbFinderLink}
                  className="flex-1 rounded-2xl bg-white px-6 py-4 text-center text-gray-900 font-semibold shadow hover:bg-gray-100 transition"
                >
                  See herbs that align with your constitution
                </Link>
                <button
                  type="button"
                  className="flex-1 rounded-2xl border border-white/40 px-6 py-4 text-center text-white/80 font-semibold cursor-not-allowed"
                  title="Coming soon"
                >
                  Book a deeper breakdown (coming soon)
                </button>
              </div>
              <button
                onClick={handleRestartTest}
                className="mt-6 text-sm text-white/80 underline-offset-4 hover:underline"
              >
                Retake the assessment
              </button>
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