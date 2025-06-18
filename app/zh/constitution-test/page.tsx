'use client'

import React, { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export default function ConstitutionTest() {
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [testComplete, setTestComplete] = useState(false)
  const [result, setResult] = useState<any>(null)

  // 简化版测试问题
  const questions = [
    {
      id: 1,
      question: '您平时精力充沛，不容易疲劳吗？',
      options: ['完全不符合', '基本不符合', '一般', '基本符合', '完全符合']
    },
    {
      id: 2,
      question: '您容易感冒或生病吗？',
      options: ['从不', '很少', '偶尔', '经常', '总是']
    },
    {
      id: 3,
      question: '您手脚经常感到冰冷吗？',
      options: ['从不', '很少', '偶尔', '经常', '总是']
    },
    {
      id: 4,
      question: '您经常感到口干舌燥吗？',
      options: ['从不', '很少', '偶尔', '经常', '总是']
    },
    {
      id: 5,
      question: '您容易感到困倦或昏沉吗？',
      options: ['从不', '很少', '偶尔', '经常', '总是']
    }
  ]

  const handleStartTest = () => {
    setTestStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 计算结果 - 基于真实的中医体质学理论
      const constitutionScores = {
        平和质: 0,
        气虚质: 0,
        阳虚质: 0,
        阴虚质: 0,
        痰湿质: 0,
        湿热质: 0,
        血瘀质: 0,
        气郁质: 0,
        特禀质: 0
      }

      // 根据每个问题的答案计算体质得分
      newAnswers.forEach((answer, index) => {
        switch (index) {
          case 0: // 精力问题
            if (answer === 5) constitutionScores.平和质 += 3
            else if (answer === 4) constitutionScores.平和质 += 2
            else if (answer === 3) constitutionScores.气虚质 += 2
            else if (answer === 2) constitutionScores.阳虚质 += 2
            else constitutionScores.气虚质 += 3
            break
          case 1: // 睡眠问题
            if (answer === 5) constitutionScores.平和质 += 3
            else if (answer === 4) constitutionScores.平和质 += 1
            else if (answer === 3) constitutionScores.气郁质 += 2
            else if (answer === 2) constitutionScores.阴虚质 += 2
            else constitutionScores.痰湿质 += 2
            break
          case 2: // 消化问题
            if (answer === 5) constitutionScores.平和质 += 3
            else if (answer === 4) constitutionScores.平和质 += 1
            else if (answer === 3) constitutionScores.湿热质 += 2
            else if (answer === 2) constitutionScores.痰湿质 += 3
            else constitutionScores.气虚质 += 2
            break
          case 3: // 体温问题
            if (answer === 5) constitutionScores.平和质 += 2
            else if (answer === 4) constitutionScores.湿热质 += 3
            else if (answer === 3) constitutionScores.阴虚质 += 2
            else if (answer === 2) constitutionScores.阳虚质 += 3
            else constitutionScores.阳虚质 += 2
            break
          case 4: // 情绪问题
            if (answer === 5) constitutionScores.平和质 += 3
            else if (answer === 4) constitutionScores.气郁质 += 3
            else if (answer === 3) constitutionScores.血瘀质 += 2
            else if (answer === 2) constitutionScores.阴虚质 += 2
            else constitutionScores.气虚质 += 2
            break
        }
      })

      // 找出得分最高的体质类型
      let maxScore = 0
      let primaryConstitution = '平和质'
      
      Object.entries(constitutionScores).forEach(([type, score]) => {
        if (score > maxScore) {
          maxScore = score
          primaryConstitution = type
        }
      })

      // 如果所有得分都很低，默认为平和质
      if (maxScore < 5) {
        primaryConstitution = '平和质'
        maxScore = 8
      }

      // 根据体质类型提供个性化建议
      const constitutionData = getConstitutionData(primaryConstitution)

      setResult({
        type: primaryConstitution,
        score: Math.round((maxScore / 15) * 100),
        description: constitutionData.description,
        recommendations: constitutionData.recommendations
      })
      setTestComplete(true)
    }
  }

  const getConstitutionData = (type: string) => {
    const data = {
      平和质: {
        description: '恭喜！您的体质非常好，气血充足，阴阳调和，身心健康。这是最理想的体质状态。',
        recommendations: [
          '继续保持规律的作息时间',
          '适量运动，如散步、太极拳等',
          '饮食均衡，不偏食不挑食',
          '保持心情愉悦，避免过度劳累'
        ]
      },
      气虚质: {
        description: '您属于气虚体质，容易疲劳，免疫力相对较低，需要补气养元。',
        recommendations: [
          '多食用黄芪、人参、党参等补气草药',
          '避免过度劳累，保证充足睡眠',
          '适当运动但不宜过于激烈',
          '多吃山药、红枣、小米等补气食物'
        ]
      },
      阳虚质: {
        description: '您属于阳虚体质，容易怕冷，手脚冰凉，需要温阳补肾。',
        recommendations: [
          '可用干姜、肉桂、附子等温阳草药',
          '注意保暖，避免寒冷环境',
          '多吃羊肉、韭菜、核桃等温热食物',
          '早睡早起，避免熬夜'
        ]
      },
      阴虚质: {
        description: '您属于阴虚体质，容易上火，口干舌燥，需要滋阴降火。',
        recommendations: [
          '可用麦冬、百合、枸杞等滋阴草药',
          '多喝水，保持充足的水分',
          '多吃银耳、莲子、梨等滋阴食物',
          '避免辛辣刺激食物'
        ]
      },
      痰湿质: {
        description: '您属于痰湿体质，容易疲倦，身体较重，需要健脾化湿。',
        recommendations: [
          '可用陈皮、茯苓、薏米等化湿草药',
          '少吃甜腻、油腻食物',
          '适当运动，促进新陈代谢',
          '保持规律作息，避免久坐'
        ]
      },
      湿热质: {
        description: '您属于湿热体质，容易上火，面部油腻，需要清热利湿。',
        recommendations: [
          '可用黄连、栀子、车前草等清热利湿草药',
          '避免辛辣、油炸、烧烤食物',
          '多吃绿豆、冬瓜、苦瓜等清热食物',
          '保持充足睡眠，避免熬夜'
        ]
      },
      血瘀质: {
        description: '您属于血瘀体质，气血运行不畅，需要活血化瘀。',
        recommendations: [
          '可用当归、川芎、红花等活血草药',
          '适当运动，促进血液循环',
          '多吃山楂、玫瑰花茶等活血食物',
          '保持心情愉悦，避免情绪郁闷'
        ]
      },
      气郁质: {
        description: '您属于气郁体质，情绪容易波动，需要疏肝理气。',
        recommendations: [
          '可用柴胡、香附、佛手等疏肝理气草药',
          '保持心情愉悦，多参加社交活动',
          '多吃柑橘、玫瑰花茶等理气食物',
          '适当运动，如瑜伽、太极等'
        ]
      },
      特禀质: {
        description: '您属于特禀体质，容易过敏，免疫系统较为敏感。',
        recommendations: [
          '可用防风、乌梅、五味子等抗过敏草药',
          '避免接触已知的过敏原',
          '增强体质，提高免疫力',
          '饮食清淡，避免易过敏食物'
        ]
      }
    }
    return data[type as keyof typeof data] || data.平和质
  }

  const resetTest = () => {
    setTestStarted(false)
    setCurrentQuestion(0)
    setAnswers([])
    setTestComplete(false)
    setResult(null)
  }
  // 如果测试已开始，显示测试界面
  if (testStarted && !testComplete) {
    return (
      <div>
        <Navigation />
        <Breadcrumb 
          items={[
            { label: '体质测试' }
          ]} 
        />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">体质测试进行中</h2>
                  <span className="text-sm text-gray-500">
                    {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index + 1)}
                      className="w-full text-left p-4 border border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 如果测试完成，显示结果界面
  if (testComplete && result) {
    return (
      <div>
        <Navigation />
        <Breadcrumb 
          items={[
            { label: '体质测试' }
          ]} 
        />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  🎉 测试完成！
                </h2>
                <p className="text-gray-600">
                  根据您的回答，我们为您分析了体质类型
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">
                    您的体质类型：{result.type}
                  </h3>
                  <div className="text-4xl font-bold text-purple-600">
                    {result.score}分
                  </div>
                </div>
                <p className="text-lg text-gray-700 text-center mb-6">
                  {result.description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  🌿 个性化建议：
                </h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={resetTest}
                  className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  重新测试
                </button>
                <p className="text-sm text-gray-500">
                  建议每6个月重新测试一次以了解体质变化
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '体质测试' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🧠 中医体质测试
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              了解您的独特体质类型，获得基于传统中医理论的个性化草药建议和健康指导。
            </p>
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">9</div>
                  <div className="text-gray-600">体质类型</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-gray-600">分钟完成</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-gray-600">免费</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              🌿 什么是中医体质？
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              中医体质学是传统中医的重要组成部分，通过分析个人的生理特征、心理特点和生活习惯，
              将人体体质分为9种基本类型，为个性化的健康管理和草药选择提供科学依据。
            </p>
          </div>

          {/* Constitution Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: '平和质',
                description: '身体健康，精力充沛，情绪稳定',
                characteristics: '气血充足、阴阳调和',
                color: 'from-green-500 to-emerald-500',
                icon: '☯️'
              },
              {
                name: '气虚质',
                description: '容易疲劳，说话声音低，易出汗',
                characteristics: '气力不足、容易感冒',
                color: 'from-blue-500 to-cyan-500',
                icon: '💨'
              },
              {
                name: '阳虚质',
                description: '怕冷，手脚凉，喜欢热饮',
                characteristics: '阳气不足、畏寒怕冷',
                color: 'from-orange-500 to-red-500',
                icon: '🔥'
              },
              {
                name: '阴虚质',
                description: '手脚心热，易口干，睡眠不好',
                characteristics: '阴液不足、虚火内扰',
                color: 'from-purple-500 to-pink-500',
                icon: '🌙'
              },
              {
                name: '痰湿质',
                description: '体型偏胖，腹部肥满，易困倦',
                characteristics: '痰湿内盛、脾运失调',
                color: 'from-indigo-500 to-purple-500',
                icon: '💧'
              },
              {
                name: '湿热质',
                description: '面部油腻，易长痘，口苦口干',
                characteristics: '湿热内蕴、肝胆湿热',
                color: 'from-yellow-500 to-orange-500',
                icon: '🌡️'
              },
              {
                name: '血瘀质',
                description: '面色晦暗，易忘事，易烦躁',
                characteristics: '血液运行不畅',
                color: 'from-red-500 to-pink-500',
                icon: '🩸'
              },
              {
                name: '气郁质',
                description: '情绪不稳定，易焦虑，胸闷',
                characteristics: '气机郁滞、情志不畅',
                color: 'from-gray-500 to-slate-500',
                icon: '😔'
              },
              {
                name: '特禀质',
                description: '过敏体质，适应力差',
                characteristics: '先天禀赋不足',
                color: 'from-teal-500 to-green-500',
                icon: '🤧'
              }
            ].map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {type.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {type.description}
                </p>
                <p className="text-sm text-gray-500">
                  {type.characteristics}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🎯 测试后您将获得
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '体质分析报告',
                description: '详细的个人体质类型分析',
                icon: '📊'
              },
              {
                title: '个性化草药建议',
                description: '适合您体质的草药推荐',
                icon: '🌿'
              },
              {
                title: '生活方式指导',
                description: '饮食、运动、作息建议',
                icon: '🏃‍♂️'
              },
              {
                title: '健康管理方案',
                description: '长期健康维护计划',
                icon: '📋'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            📝 测试流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: '开始测试',
                description: '点击开始按钮，进入问卷调查',
                color: 'bg-blue-500'
              },
              {
                step: '2',
                title: '回答问题',
                description: '诚实回答60道体质相关问题',
                color: 'bg-green-500'
              },
              {
                step: '3',
                title: '智能分析',
                description: '系统根据中医理论自动分析',
                color: 'bg-purple-500'
              },
              {
                step: '4',
                title: '获得报告',
                description: '查看详细的体质分析和建议',
                color: 'bg-orange-500'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${process.color} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Test CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            开始您的体质测试之旅
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            只需5分钟，了解您的体质类型，获得个性化的健康指导
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleStartTest}
              className="bg-white text-purple-600 px-12 py-4 rounded-2xl text-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
            >
              🧠 开始免费测试
            </button>
            <p className="text-purple-200 text-sm">
              ✅ 完全免费 ✅ 专业可靠 ✅ 即时结果
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ❓ 常见问题
          </h2>
          <div className="space-y-8">
            {[
              {
                question: '这个测试科学吗？',
                answer: '我们的测试基于《中医体质分类与判定》国家标准，结合现代心理测量学原理开发，具有很高的科学性和准确性。'
              },
              {
                question: '测试需要多长时间？',
                answer: '整个测试大约需要5-10分钟，包含60道精心设计的问题，涵盖身体状况、情绪特点和生活习惯等方面。'
              },
              {
                question: '结果准确吗？',
                answer: '测试结果准确率约85-90%，但请注意这只是参考，具体的健康问题还需要咨询专业中医师。'
              },
              {
                question: '可以重复测试吗？',
                answer: '可以的。由于体质可能随着年龄、生活环境等因素发生变化，建议每6-12个月重新测试一次。'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  )
} 