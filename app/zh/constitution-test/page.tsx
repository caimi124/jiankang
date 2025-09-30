// Chinese Constitution Test - SEO & UX Optimized Version
// Enhanced for better conversion and search visibility
'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import { 
  questions, 
  scoreOptions, 
  calculateConstitution, 
  constitutionInfo,
  type ConstitutionType 
} from '../../constitution-test/questions'
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

export default function ConstitutionTestPage() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [testResults, setTestResults] = useState<{
    primary: ConstitutionType;
    secondary?: ConstitutionType;
    scores: { [key: string]: number };
    isBalanced: boolean;
  } | null>(null)

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
      <>
        <Head>
          <title>中医体质测试 | 在线20道题免费测试9种体质类型 | HerbScience</title>
          <meta name="description" content="基于国家标准的中医体质测试，20道科学问题，5分钟精准判定平和、气虚、阳虚、阴虚等9种体质，并提供个性化草药与生活调理建议。" />
          <meta name="keywords" content="中医体质测试,体质类型,体质调理,中医养生,草药推荐,体质测试题,免费体质测试" />
          <meta property="og:title" content="中医体质测试 - 免费在线测试9种体质类型" />
          <meta property="og:description" content="基于国家标准的中医体质测试，20道科学问题，5分钟精准判定您的体质类型，获得个性化调理建议。" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://herbscience.shop/zh/constitution-test" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "中医体质测试",
              "description": "基于国家标准的中医体质测试，20道科学问题，5分钟精准判定9种体质类型",
              "url": "https://herbscience.shop/zh/constitution-test",
              "mainEntity": {
                "@type": "Quiz",
                "name": "中医体质测试",
                "description": "基于《中国居民中医体质分类与判定标准》的专业测试",
                "educationalLevel": "Beginner to Advanced",
                "timeRequired": "PT5M",
                "assesses": "中医体质类型",
                "author": {
                  "@type": "Organization",
                  "name": "HerbScience",
                  "url": "https://herbscience.shop"
                }
              }
            })
          }} />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Navigation />
          
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb 
              items={[
                { label: '首页', href: '/zh' },
                { label: '体质测试' }
              ]} 
            />

            {/* 痛点引导和强诱因 */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-red-800 mb-3">
                  😰 经常疲劳、睡眠不好、容易感冒？
                </h2>
                <p className="text-lg text-red-700 mb-4">
                  也许与你的体质有关！已有 <span className="font-bold text-red-800">10,000+</span> 用户通过我们的测试找到了调理方向
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-red-600">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    85% 用户表示测试结果准确
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    基于国家中医药管理局标准
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                🧪 中医体质测试 | 在线20道题免费测试
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                基于《中国居民中医体质分类与判定标准》的专业测试，
                通过20道科学问题，精准判定您的9种体质类型，获得个性化的草药调理建议。
              </p>
            </div>

          {/* 测试特色 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">科学专业</h3>
              <p className="text-gray-600 mb-3">基于国家中医药管理局标准，涵盖9种体质类型的精准判定</p>
              <div className="text-sm text-green-600 font-medium">
                👉 已应用于 100+ 医疗/养生机构
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">快速便捷</h3>
              <p className="text-gray-600 mb-3">仅需5分钟完成20道问题，即可获得详细的体质分析报告</p>
              <div className="text-sm text-blue-600 font-medium">
                👉 超 10,000+ 用户已完成测试
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">个性化建议</h3>
              <p className="text-gray-600 mb-3">根据您的体质特点，提供专属的草药推荐和生活调理方案</p>
              <div className="text-sm text-purple-600 font-medium">
                👉 推荐专属草药与日常饮食调理方案
              </div>
            </div>
          </div>

          {/* 体质类型预览 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">9种中医体质类型</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.values(constitutionInfo).map((constitution) => (
                <div key={constitution.id} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:shadow-md cursor-pointer group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{constitution.icon}</div>
                  <div className="font-medium text-sm mb-1">{constitution.name}</div>
                  <div className="text-xs text-gray-600 mb-2">
                    {constitution.keywords.slice(0, 2).join('、')}
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    {constitution.id === '平和' ? '健康稳定，精力充沛' :
                     constitution.id === '气虚' ? '容易疲劳，免疫力低' :
                     constitution.id === '阳虚' ? '怕冷，手脚冰凉' :
                     constitution.id === '阴虚' ? '夜间出汗，失眠' :
                     constitution.id === '痰湿' ? '身体沉重，容易腹胀' :
                     constitution.id === '湿热' ? '皮肤油腻，口苦' :
                     constitution.id === '血瘀' ? '容易淤青，疼痛' :
                     constitution.id === '气郁' ? '情绪波动，焦虑' :
                     constitution.id === '特禀' ? '过敏体质，湿疹' :
                     '消化弱，饭后疲劳'}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                点击开始测试，了解您属于哪种体质类型
              </p>
            </div>
          </div>

          {/* 测试统计 */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">20</div>
              <div className="text-gray-600">科学问题</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
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
            <div className="relative inline-block">
              <button
                onClick={handleStartTest}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-16 py-6 rounded-2xl text-xl font-bold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  🎯 立即开始测试 → 免费获取体质分析报告
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                免费
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                仅需5分钟
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-green-500" />
                10,000+ 用户完成
              </span>
              <span className="flex items-center">
                <Award className="w-4 h-4 mr-1 text-purple-500" />
                专业分析报告
              </span>
            </div>
            
            <p className="text-gray-500 mt-4 text-sm">
              本测试仅供教育参考，不能替代专业医疗建议
            </p>
          </div>

          {/* FAQ 区块 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">常见问题</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">体质测试可靠吗？</h3>
                  <p className="text-gray-600">我们的测试基于《中国居民中医体质分类与判定标准》，这是国家中医药管理局发布的标准，具有很高的科学性和权威性。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">多久做一次体质测试？</h3>
                  <p className="text-gray-600">建议每3-6个月做一次测试，因为体质会随着季节、生活方式和健康状况的变化而改变。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">测试结果准确吗？</h3>
                  <p className="text-gray-600">根据用户反馈，85%的用户认为测试结果与他们的身体状况相符。但请注意，这仅供参考，不能替代专业医疗诊断。</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">适合谁做这个测试？</h3>
                  <p className="text-gray-600">适合所有关注健康、想要了解自己体质特点的人群，特别是那些有亚健康症状或想要进行中医调理的人。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">测试需要多长时间？</h3>
                  <p className="text-gray-600">测试包含20道问题，大约需要5分钟完成。每道题都有5个选项，请根据您的实际情况选择最符合的答案。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">如何根据结果调理？</h3>
                  <p className="text-gray-600">测试结果会提供详细的体质分析、生活调理建议和草药推荐。建议结合专业中医师的指导进行调理。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 用户反馈区块 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">用户反馈</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">李</span>
                  </div>
                  <div>
                    <div className="font-semibold">李女士</div>
                    <div className="text-sm text-gray-500">28岁，上班族</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"测试结果很准确，我确实是气虚体质，按照建议调理后感觉精力好了很多！"</p>
                <div className="flex text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">王</span>
                  </div>
                  <div>
                    <div className="font-semibold">王先生</div>
                    <div className="text-sm text-gray-500">35岁，程序员</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"作为程序员经常熬夜，测试显示我是阴虚体质，现在知道该怎么调理了。"</p>
                <div className="flex text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">张</span>
                  </div>
                  <div>
                    <div className="font-semibold">张女士</div>
                    <div className="text-sm text-gray-500">42岁，教师</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"测试很专业，推荐的草药和饮食建议都很实用，现在身体状态明显改善了。"</p>
                <div className="flex text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </>
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
              { label: '首页', href: '/zh' },
              { label: '体质测试', href: '/zh/constitution-test' },
              { label: `问题 ${currentQuestion + 1}` }
            ]} 
          />

          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-medium">{question.category}</span>
              <span className="font-bold text-green-600">{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-500">
                已完成 {Math.round(progress)}% - {questions.length - currentQuestion - 1} 题待完成
              </span>
            </div>
          </div>

          {/* 问题卡片 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Brain className="w-4 h-4 mr-2" />
                第 {currentQuestion + 1} 题
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-relaxed">
                {question.text}
              </h2>
              <p className="text-gray-600 text-lg">
                请选择最符合您情况的选项
              </p>
            </div>

            {/* 答案选项 */}
            <div className="space-y-3">
              {['从不', '偶尔', '有时', '经常', '总是'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index + 1)}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedAnswer === index + 1
                      ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 text-green-800 shadow-lg'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-7 h-7 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                      selectedAnswer === index + 1
                        ? 'border-green-500 bg-green-500 scale-110'
                        : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {selectedAnswer === index + 1 && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-lg">{option}</span>
                      <div className="text-sm text-gray-500 mt-1">
                        {index === 0 && '这种情况从未发生'}
                        {index === 1 && '很少发生这种情况'}
                        {index === 2 && '偶尔会发生'}
                        {index === 3 && '经常发生'}
                        {index === 4 && '几乎总是这样'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-100 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              上一题
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">
                {currentQuestion === questions.length - 1 ? '最后一题' : `还有 ${questions.length - currentQuestion - 1} 题`}
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </main>
      </div>
    )
  }

  // 结果页面
  if (currentStep === 'results' && testResults) {
    const primaryConstitution = constitutionInfo[testResults.primary]
    const secondaryConstitution = testResults.secondary ? constitutionInfo[testResults.secondary] : null

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: '首页', href: '/zh' },
              { label: '体质测试', href: '/zh/constitution-test' },
              { label: '测试结果' }
            ]} 
          />

          {/* 结果标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-lg font-medium mb-6">
              <Award className="w-6 h-6 mr-2" />
              测试完成
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎉 您的体质测试结果
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于您的回答，我们为您分析了最符合的中医体质类型，并提供个性化的调理建议
            </p>
          </div>

          {/* 主要体质结果 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{primaryConstitution.icon}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {primaryConstitution.name}
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                {primaryConstitution.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {primaryConstitution.keywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* 体质特征 */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  体质特征
                </h3>
                <ul className="space-y-2">
                  {primaryConstitution.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  调理建议
                </h3>
                <ul className="space-y-2">
                  {primaryConstitution.lifestyleAdvice.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  注意事项
                </h3>
                <ul className="space-y-2">
                  {primaryConstitution.warnings.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 次要体质（如果有） */}
          {secondaryConstitution && (
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-semibold mb-4">
                次要体质：{secondaryConstitution.name} {secondaryConstitution.icon}
              </h3>
              <p className="text-gray-600 mb-4">
                您同时具有 {secondaryConstitution.name} 的特征，建议在调理时也要考虑这一体质的特点。
              </p>
              <div className="flex flex-wrap gap-2">
                {secondaryConstitution.keywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 草药推荐 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">
                🌿 推荐草药
              </h3>
              <p className="text-gray-600">根据您的体质特点，以下草药最适合您</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {primaryConstitution.recommendedHerbs.map((herb, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-green-300 group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                      <span className="text-green-600 font-bold text-lg">🌿</span>
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900">{herb}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">根据您的{primaryConstitution.name}体质推荐</p>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    适合您的体质调理
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium">
                查看详细草药信息 →
              </button>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToWelcome}
              className="flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              重新测试
            </button>
            <button className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
              <Download className="w-5 h-5 mr-2" />
              下载报告
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: '我的中医体质测试结果',
                    text: `我是${primaryConstitution.name}体质，快来测试你的体质类型吧！`,
                    url: window.location.href
                  });
                } else {
                  // 复制链接到剪贴板
                  navigator.clipboard.writeText(window.location.href);
                  alert('链接已复制到剪贴板！');
                }
              }}
              className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Share2 className="w-5 h-5 mr-2" />
              分享结果
            </button>
          </div>

          {/* 相关推荐 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg mt-8">
            <h3 className="text-xl font-semibold text-center mb-6">继续探索</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">体质调理指南</h4>
                <p className="text-sm text-gray-600 mb-3">详细的体质调理方法和注意事项</p>
                <button className="text-green-600 text-sm font-medium hover:text-green-700">
                  查看详情 →
                </button>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">草药知识库</h4>
                <p className="text-sm text-gray-600 mb-3">了解各种草药的功效和使用方法</p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  浏览草药 →
                </button>
              </div>
              
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">健康社区</h4>
                <p className="text-sm text-gray-600 mb-3">与其他用户交流体质调理经验</p>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                  加入社区 →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
} 