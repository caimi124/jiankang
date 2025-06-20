'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
import HerbRecommendations from '../../../components/HerbRecommendations'
import { herbRecommendationEngine } from '../../../lib/herbs-recommendation'
import type { Herb } from '../../../lib/herbs-recommendation'
import { CheckCircle, Brain, ArrowLeft, ArrowRight, Star, Heart, Zap, Shield, Leaf, Mail, Download, Eye, Users, Award, Clock, FileText, Lightbulb } from 'lucide-react'

export default function ConstitutionTest() {
  const [currentQuestion, setCurrentQuestion] = useState(-1) // Start with welcome screen
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [herbRecommendations, setHerbRecommendations] = useState<{
    primary: Herb[]
    secondary: Herb[]
    all: Herb[]
  }>({ primary: [], secondary: [], all: [] })
  const [isLoadingHerbs, setIsLoadingHerbs] = useState(false)
  const [showDemoResults, setShowDemoResults] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  // 中医体质测试问题
  const questions = [
    {
      id: 1,
      category: "能量活力",
      question: "您如何描述自己的自然能量水平？",
      subtitle: "请考虑您在休息充足和健康状态下的基本能量",
      options: [
        { 
          text: "精力旺盛，天生积极主动", 
          score: { fire: 3, earth: 1, metal: 2, water: 0, wood: 2 }
        },
        { 
          text: "能量稳定，全天持续保持", 
          score: { fire: 1, earth: 3, metal: 2, water: 2, wood: 1 }
        },
        { 
          text: "能量平和，偏好轻柔的活动", 
          score: { fire: 0, earth: 2, metal: 3, water: 3, wood: 0 }
        },
        { 
          text: "能量多变，常常突然爆发", 
          score: { fire: 2, earth: 0, metal: 1, water: 1, wood: 3 }
        }
      ]
    },
    {
      id: 2,
      category: "身体偏好",
      question: "您偏好什么样的气候和环境？",
      subtitle: "考虑在什么环境中您感觉最舒适和有活力",
      options: [
        { 
          text: "温暖阳光的环境，喜欢热闹活动", 
          score: { fire: 3, earth: 2, metal: 0, water: 0, wood: 1 }
        },
        { 
          text: "温度适中稳定，感觉舒适", 
          score: { fire: 1, earth: 3, metal: 2, water: 1, wood: 1 }
        },
        { 
          text: "凉爽清新的环境，空气新鲜", 
          score: { fire: 0, earth: 1, metal: 3, water: 2, wood: 2 }
        },
        { 
          text: "安静祥和的地方，靠近水或自然", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 3 }
        }
      ]
    },
    {
      id: 3,
      category: "睡眠恢复",
      question: "您通常如何睡眠和恢复？",
      subtitle: "思考您的自然睡眠模式和恢复需求",
      options: [
        { 
          text: "入睡快，睡眠浅，早起", 
          score: { fire: 3, earth: 1, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "需要规律，深度睡眠，缓慢清醒", 
          score: { fire: 1, earth: 3, metal: 2, water: 2, wood: 0 }
        },
        { 
          text: "浅眠者，喜欢凉爽房间，醒来精神", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "深度睡眠，需要大量休息，起床慢", 
          score: { fire: 0, earth: 2, metal: 1, water: 3, wood: 0 }
        }
      ]
    },
    {
      id: 4,
      category: "情绪模式",
      question: "您通常如何处理压力和情绪？",
      subtitle: "考虑您的自然情绪反应和应对方式",
      options: [
        { 
          text: "情绪强烈，反应迅速，然后转移", 
          score: { fire: 3, earth: 0, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "情绪稳定，关心他人，寻求和谐", 
          score: { fire: 1, earth: 3, metal: 1, water: 1, wood: 0 }
        },
        { 
          text: "控制情绪，分析情况，有条理方法", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "情绪深沉，内省，需要时间处理", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 1 }
        }
      ]
    },
    {
      id: 5,
      category: "社交沟通",
      question: "您喜欢如何进行社交互动？",
      subtitle: "思考您的自然沟通风格和社交能量",
      options: [
        { 
          text: "外向，喜欢成为注意焦点，从人群中获得能量", 
          score: { fire: 3, earth: 2, metal: 0, water: 0, wood: 1 }
        },
        { 
          text: "温暖关怀，喜欢帮助他人，偏好小团体", 
          score: { fire: 1, earth: 3, metal: 1, water: 1, wood: 0 }
        },
        { 
          text: "专业礼貌，偏好有结构的互动", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "安静深思，偏好一对一或独处", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 2 }
        }
      ]
    },
    {
      id: 6,
      category: "身体体质",
      question: "什么最能描述您的身体构造和倾向？",
      subtitle: "考虑您的自然体型和身体特征",
      options: [
        { 
          text: "瘦长结实，体温偏高，动作敏捷", 
          score: { fire: 3, earth: 0, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "结实体格，肌肉紧实，力量稳定", 
          score: { fire: 1, earth: 3, metal: 2, water: 1, wood: 0 }
        },
        { 
          text: "精致特征，姿态良好，动作精确", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "圆润体型，动作缓慢，耐力持久", 
          score: { fire: 0, earth: 2, metal: 1, water: 3, wood: 0 }
        }
      ]
    }
  ]

  // 中医体质类型定义
  const constitutionTypes = [
    {
      type: 'fire',
      name: '火性体质',
      subtitle: '精力充沛 • 热情创造 • 积极主动',
      description: '您天生精力旺盛，性格温热，喜欢活跃的环境。火性体质的人通常具有创造力，热情洋溢，是天生的领导者。',
      characteristics: [
        '天生高能量和热情',
        '温暖有魅力的个性',
        '创造性和创新思维',
        '天然的领导品质'
      ],
      wellnessAdvice: [
        '用冷静的练习平衡激烈的活动',
        '包含冥想来平静心境',
        '保持水分充足，避免过热',
        '练习压力管理技巧'
      ],
      recommendedSupplements: [
        { name: '五味子', benefit: '平静过度的火能量', timing: '晚间' },
        { name: '白芍', benefit: '平衡情绪强度', timing: '下午' },
        { name: '菊花', benefit: '清凉镇静', timing: '按需' }
      ],
      lifestyle: [
        '定期运动，包含冷却元素（游泳、瑜伽）',
        '稳定的睡眠时间（火性体质常熬夜）',
        '正念和冥想练习',
        '平衡工作生活界限'
      ],
      nutrition: {
        include: ['黄瓜、西瓜、绿茶等清凉食物', '含复合碳水化合物的均衡餐食'],
        limit: ['过度辛辣食物', '过多咖啡因', '过量酒精']
      },
      score: 0,
      color: 'from-red-500 to-orange-500',
      icon: <Zap className="w-8 h-8" />
    },
    {
      type: 'earth',
      name: '土性体质', 
      subtitle: '稳定踏实 • 关怀温暖 • 中庸平和',
      description: '您具有稳定、踏实的性格，是天生的照顾者。土性体质的人通常富有同情心，喜欢培养他人。',
      characteristics: [
        '情绪稳定可靠',
        '天生的培养和支持他人',
        '实用和务实的方法',
        '强烈的责任感'
      ],
      wellnessAdvice: [
        '包含温和的体力活动',
        '注重消化健康',
        '保持规律的饮食时间',
        '为自己留出培养时间'
      ],
      recommendedSupplements: [
        { name: '党参', benefit: '支持消化和能量', timing: '饭前' },
        { name: '茯苓', benefit: '健脾除湿', timing: '早晨' },
        { name: '山药', benefit: '滋养脾胃', timing: '与餐食' }
      ],
      lifestyle: [
        '规律的日常作息',
        '接地气的活动（园艺、散步）',
        '社区参与和服务',
        '稳定的进餐时间'
      ],
      nutrition: {
        include: ['温热的熟食', '根茎类蔬菜', '温和的香料'],
        limit: ['过度的冷饮', '生冷食物', '不规律饮食']
      },
      score: 0,
      color: 'from-yellow-500 to-amber-500',
      icon: <Heart className="w-8 h-8" />
    },
    {
      type: 'metal',
      name: '金性体质',
      subtitle: '条理清晰 • 精致优雅 • 有序规整',
      description: '您具有精致、有条理的性格特征。金性体质的人通常注重细节，喜欢结构和秩序。',
      characteristics: [
        '注重细节和精确性',
        '有组织和有效率',
        '高个人标准',
        '重视质量胜过数量'
      ],
      wellnessAdvice: [
        '包含深呼吸练习',
        '保持干净整洁的环境',
        '定期进行呼吸系统护理',
        '允许弹性和自发性'
      ],
      recommendedSupplements: [
        { name: '百合', benefit: '滋润肺部', timing: '晚间' },
        { name: '沙参', benefit: '养阴润燥', timing: '下午' },
        { name: '麦冬', benefit: '清热生津', timing: '任何时间' }
      ],
      lifestyle: [
        '规律的呼吸练习',
        '整洁有序的生活空间',
        '质量时间进行反思',
        '接触新鲜空气和自然'
      ],
      nutrition: {
        include: ['梨、百合、白萝卜等润肺食物', '适量乳制品'],
        limit: ['过度辛辣食物', '过度干燥食物', '吸烟']
      },
      score: 0,
      color: 'from-gray-400 to-slate-500',
      icon: <Shield className="w-8 h-8" />
    }
  ]

  // 演示结果
  const demoResult = {
    type: 'fire',
    name: '火性体质',
    subtitle: '精力充沛 • 热情创造 • 积极主动',
    description: '您天生精力旺盛，性格温热，喜欢活跃的环境。火性体质的人通常具有创造力，热情洋溢，是天生的领导者。',
    characteristics: [
      '天生高能量和热情',
      '温暖有魅力的个性',
      '创造性和创新思维',
      '天然的领导品质'
    ],
    wellnessAdvice: [
      '用冷静的练习平衡激烈的活动',
      '包含冥想来平静心境',
      '保持水分充足，避免过热',
      '练习压力管理技巧'
    ],
    recommendedSupplements: [
      { name: '五味子', benefit: '平静过度的火能量', timing: '晚间' },
      { name: '白芍', benefit: '平衡情绪强度', timing: '下午' },
      { name: '菊花', benefit: '清凉镇静', timing: '按需' }
    ],
    lifestyle: [
      '定期运动，包含冷却元素（游泳、瑜伽）',
      '稳定的睡眠时间（火性体质常熬夜）',
      '正念和冥想练习',
      '平衡工作生活界限'
    ],
    nutrition: {
      include: ['黄瓜、西瓜、绿茶等清凉食物', '含复合碳水化合物的均衡餐食'],
      limit: ['过度辛辣食物', '过多咖啡因', '过量酒精']
    },
    score: 78,
    color: 'from-red-500 to-orange-500',
    icon: <Zap className="w-8 h-8" />
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex]
    setAnswers(newAnswers)
    setSelectedAnswer(optionIndex)

    setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
    } else {
        setIsLoading(true)
        setTimeout(() => {
          calculateResults(newAnswers)
          setIsLoading(false)
          setShowResults(true)
          setShowEmailCapture(true)
        }, 3000)
      }
    }, 600)
  }

  const calculateResults = (allAnswers: number[]) => {
    const scores = { fire: 0, earth: 0, metal: 0, water: 0, wood: 0 }
    
    allAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex]
      const selectedOption = question.options[answerIndex]
      
      Object.entries(selectedOption.score).forEach(([element, points]) => {
        scores[element as keyof typeof scores] += points
      })
    })

    const maxScore = Math.max(...Object.values(scores))
    constitutionTypes.forEach(type => {
      const elementScore = scores[type.type as keyof typeof scores]
      type.score = Math.round((elementScore / maxScore) * 100)
    })

    constitutionTypes.sort((a, b) => b.score - a.score)
  }

  const resetTest = () => {
    setCurrentQuestion(-1)
    setAnswers([])
    setShowResults(false)
    setIsLoading(false)
    setSelectedAnswer(null)
    setShowDemoResults(false)
    setShowEmailCapture(false)
    setEmailSubmitted(false)
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const newAnswers = [...answers]
      newAnswers.pop()
      setAnswers(newAnswers)
    }
  }

  const startTest = () => {
    setCurrentQuestion(0)
    setShowDemoResults(false)
  }

  const showDemo = () => {
    setShowDemoResults(true)
  }

  const backToWelcome = () => {
    setShowDemoResults(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
    
    setTimeout(() => {
      setShowEmailCapture(false)
    }, 2000)
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

  // 增强版欢迎界面
  if (currentQuestion === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb 
          items={[
                { label: '首页', href: '/zh' },
                { label: '体质测试', href: '/zh/constitution-test' }
              ]} 
            />

            {/* 主标题区域 */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8 shadow-lg animate-pulse">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                🧪 发现您的草药体质
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                回答6个快速问题，了解您基于传统草药医学的体质类型。<br/>
                我们将为您匹配最适合的草药 — 科学且天然。
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-lg text-gray-700 mb-12">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>2 分钟</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>10,000+ 人已完成</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>科学支持</span>
                </div>
              </div>
            </div>

            {/* 您将获得什么 */}
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-5xl mx-auto mb-12 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">✅ 您将发现什么</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ 个性化草药推荐</h3>
                  <p className="text-gray-600 text-sm">发现哪些草药最适合您的独特体质</p>
                </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ 了解您身体的平衡状态</h3>
                  <p className="text-gray-600 text-sm">理解您的自然优势和需要支持的领域</p>
                </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ 免费体质报告（PDF下载）</h3>
                  <p className="text-gray-600 text-sm">获得完整分析的精美可分享格式</p>
                </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ 获得安全的科学支持建议</h3>
                  <p className="text-gray-600 text-sm">为您的健康目标</p>
                </div>
              </div>
            </div>

            {/* 测试详情 */}
            <div className="bg-indigo-50 rounded-2xl p-8 max-w-3xl mx-auto mb-12 border border-indigo-100">
              <h3 className="text-xl font-semibold text-indigo-900 mb-6 text-center">📋 测试详情</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-indigo-800">6个综合问题</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-indigo-800">3-5分钟完成</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-indigo-800">基于证据的方法</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-indigo-800">即时个性化结果</span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="text-center space-y-6">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={startTest}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105 inline-flex items-center"
                >
                  开始您的测试
                  <ArrowRight className="w-6 h-6 ml-3" />
                </button>
                <button
                  onClick={showDemo}
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  查看示例结果
                </button>
              </div>
              
              <p className="text-gray-500 text-sm">
                此测试仅供教育目的，不能替代专业医疗建议
              </p>
            </div>

            {/* SEO内容 - 我们分析什么 */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">什么是草药体质？</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  在草药医学中，您的体质反映了身体在能量、湿度、温度和压力反应方面的平衡。
                  理解它有助于我们根据数千年的传统智慧结合现代科学理解为您的体质类型推荐最佳草药。
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">草药体质类型</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      火性体质
                    </h4>
                    <p className="text-red-700 text-sm">高能量，热情，创造性。可能受益于清凉镇静的草药。</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      土性体质
                    </h4>
                    <p className="text-yellow-700 text-sm">稳定，培养，以地为中心。受益于消化和接地草药。</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      金性体质
                    </h4>
                    <p className="text-gray-700 text-sm">有条理，精致，精确。受益于呼吸和免疫支持草药。</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🌿 连接到我们的草药数据库</h3>
                <p className="text-gray-700 text-center mb-6">
                  您的体质结果自动连接到我们包含1,000+种草药的综合草药数据库，
                  让您能够探索每种推荐植物的详细信息。
                </p>
                <div className="flex justify-center">
                  <a
                    href="/zh/herb-finder"
                    className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    探索草药数据库
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // 演示结果界面
  if (showDemoResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb 
          items={[
                { label: '首页', href: '/zh' },
                { label: '体质测试', href: '/zh/constitution-test' }
              ]} 
            />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
              <div className="flex items-center">
                <Eye className="w-6 h-6 text-amber-600 mr-3" />
                <div>
                  <h4 className="text-amber-800 font-semibold">示例结果预览</h4>
                  <p className="text-amber-700 text-sm">这是您个性化结果的示例。</p>
                </div>
              </div>
              </div>

            {/* 演示结果显示 */}
            <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border border-gray-100">
              <div className="text-center mb-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${demoResult.color} rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg`}>
                  <div className="text-white">{demoResult.icon}</div>
                  </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{demoResult.name}</h2>
                <p className="text-xl text-gray-600 mb-6">{demoResult.subtitle}</p>
                <div className={`w-32 h-32 bg-gradient-to-br ${demoResult.color} rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg`}>
                  <span className="text-4xl font-bold text-white">{demoResult.score}%</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">{demoResult.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    天然优势
                  </h3>
                  <ul className="space-y-2">
                    {demoResult.characteristics.slice(0, 3).map((char, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                    <Heart className="w-5 h-5 text-blue-600 mr-2" />
                    健康指导
                  </h3>
                  <ul className="space-y-2">
                    {demoResult.wellnessAdvice.slice(0, 3).map((advice, index) => (
                    <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{advice}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-6">您的实际结果将包括详细的补充剂推荐、生活方式指导和来自我们数据库的个性化草药匹配。</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={startTest}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    开始真实测试
                  </button>
                <button
                    onClick={backToWelcome}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                    返回概览
                </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // 问题界面
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb 
        items={[
              { label: '首页', href: '/zh' },
              { label: '体质测试', href: '/zh/constitution-test' }
            ]} 
          />

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-600 font-medium">
                问题 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-lg text-gray-600 font-medium">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% 完成
              </span>
                </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            <div className="mb-8">
              <span className="bg-indigo-100 text-indigo-800 text-sm px-4 py-2 rounded-full font-medium">
                {questions[currentQuestion].category}
              </span>
        </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {questions[currentQuestion].question}
            </h2>
            
            {questions[currentQuestion].subtitle && (
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {questions[currentQuestion].subtitle}
              </p>
            )}

            <div className="space-y-4 mb-10">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-6 border-2 rounded-2xl transition-all duration-300 group transform hover:scale-102 ${
                    selectedAnswer === index 
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                      : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 border-2 rounded-full mr-6 flex-shrink-0 transition-colors ${
                      selectedAnswer === index
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300 group-hover:border-indigo-500'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
              </div>
                    <span className={`text-lg leading-relaxed transition-colors ${
                      selectedAnswer === index
                        ? 'text-indigo-900 font-medium'
                        : 'text-gray-700 group-hover:text-indigo-900'
                    }`}>{option.text}</span>
          </div>
                </button>
            ))}
          </div>

            <div className="flex justify-between items-center">
            <button 
                onClick={goBack}
                disabled={currentQuestion === 0}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                上一个
            </button>
              
              <div className="text-gray-500 text-center">
                <Lightbulb className="w-5 h-5 inline mr-2" />
                选择最符合您的选项
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 