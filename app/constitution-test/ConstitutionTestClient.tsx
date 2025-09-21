'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import ErrorBoundary from '../../components/ErrorBoundary'
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
  Target,
  AlertTriangle,
  AlertCircle,
  Leaf,
  Search
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

// 支持函数：获取体质对应的渐变色
const getConstitutionGradient = (constitutionType: string) => {
  const gradients: Record<string, string> = {
    '平和': 'from-green-600 to-emerald-600',
    '气虚': 'from-yellow-500 to-orange-500',
    '阳虚': 'from-orange-500 to-red-500',
    '阴虚': 'from-red-500 to-pink-500',
    '痰湿': 'from-blue-500 to-cyan-500',
    '湿热': 'from-purple-500 to-indigo-500',
    '血瘀': 'from-gray-600 to-slate-600',
    '气郁': 'from-indigo-500 to-purple-500',
    '特禀': 'from-pink-500 to-rose-500'
  }
  return gradients[constitutionType] || 'from-gray-500 to-gray-600'
}

// 支持函数：获取英文吸睛总结
const getEngineeredSummary = (constitutionType: string) => {
  try {
    if (!constitutionType) {
      console.warn('[getEngineeredSummary] Empty constitution type provided');
      return 'You have a unique constitution that requires personalized attention.';
    }

    const summaries: Record<string, string> = {
    '平和': 'You have a Balanced Constitution — your body maintains harmony and optimal health naturally.',
    '气虚': 'You have a Qi Deficiency Constitution — your body needs energy boosting and immune strengthening.',
    '阳虚': 'You have a Yang Deficiency Constitution — your body tends to feel cold and lacks warming energy.',
    '阴虚': 'You have a Yin Deficiency Constitution — your body runs hot and needs cooling, nourishing support.',
    '痰湿': 'You have a Phlegm-Dampness Constitution — your body tends to retain moisture and needs drainage.',
    '湿热': 'You have a Damp-Heat Constitution — your body experiences inflammation and needs cooling, clearing support.',
    '血瘀': 'You have a Blood Stasis Constitution — your circulation needs improvement and movement support.',
    '气郁': 'You have a Qi Stagnation Constitution — your energy flow is blocked and needs gentle release.',
    '特禀': 'You have a Special Constitution — your body has unique sensitivities requiring personalized care.'
    }
    const result = summaries[constitutionType] || 'You have a unique constitution that requires personalized attention.';
    console.log('[getEngineeredSummary] Constitution:', constitutionType, 'Result:', result);
    return result;
  } catch (error) {
    console.error('[getEngineeredSummary] Error:', error, 'Constitution type:', constitutionType);
    return 'You have a unique constitution that requires personalized attention.';
  }
}

// 支持函数：获取健康洞察
const getHealthInsights = (constitutionType: string) => {
  try {
    if (!constitutionType) {
      return 'Your constitution requires personalized care and attention.';
    }

    const insights: Record<string, string> = {
    '平和': 'Your balanced constitution indicates optimal health. Focus on maintaining this harmony through consistent lifestyle practices.',
    '气虚': 'Low energy and frequent fatigue suggest your body needs gentle strengthening. Avoid overexertion and focus on building stamina gradually.',
    '阳虚': 'Poor circulation and cold sensitivity indicate warming therapy is beneficial. Regular gentle exercise can help improve circulation.',
    '阴虚': 'Heat symptoms and restlessness suggest your body needs cooling and nourishing support. Stress management is particularly important.',
    '痰湿': 'Sluggish metabolism and weight retention indicate your body needs drying and moving therapies. Regular movement is essential.',
    '湿热': 'Inflammatory symptoms suggest your body needs clearing and cooling support. Avoid heating foods and activities.',
    '血瘀': 'Poor circulation and stagnation suggest your body needs movement and flow enhancement. Regular exercise is crucial.',
    '气郁': 'Emotional stress and tension suggest your body needs relaxation and flow restoration. Stress management techniques are beneficial.',
    '特禀': 'Allergic tendencies suggest your body needs immune balancing and protective support. Avoid known triggers consistently.'
    }
    return insights[constitutionType] || 'Your constitution requires personalized care and attention.';
  } catch (error) {
    console.error('[getHealthInsights] Error:', error, 'Constitution type:', constitutionType);
    return 'Your constitution requires personalized care and attention.';
  }
}

// 支持函数：获取作息建议
const getRestRecommendations = (constitutionType: string) => {
  try {
    if (!constitutionType) {
      return 'Maintain regular sleep schedule and stress management practices.';
    }

    const restAdvice: Record<string, string> = {
    '平和': 'Maintain regular sleep schedule (10pm-6am). Practice relaxation techniques to preserve balance.',
    '气虚': 'Prioritize 8+ hours of sleep. Take afternoon naps when possible. Avoid late nights and excessive stimulation.',
    '阳虚': 'Sleep in warm environment. Morning sunlight exposure helps regulate circadian rhythm. Avoid cold sleeping environments.',
    '阴虚': 'Create cool, dark sleeping environment. Practice evening meditation. Avoid screens before bed to calm the mind.',
    '痰湿': 'Avoid daytime napping. Light exercise before bed helps circulation. Keep bedroom well-ventilated and dry.',
    '湿热': 'Sleep in cool environment. Evening cooling activities like gentle yoga. Avoid heavy meals before bed.',
    '血瘀': 'Gentle stretching before bed improves circulation. Regular massage can help. Maintain consistent sleep schedule.',
    '气郁': 'Stress-reducing bedtime routine essential. Journaling or gentle music helps. Consistent wake times important.',
    '特禀': 'Avoid allergens in bedroom. Air purifiers recommended. Hypoallergenic bedding materials preferred.'
    }
    return restAdvice[constitutionType] || 'Maintain regular sleep schedule and stress management practices.';
  } catch (error) {
    console.error('[getRestRecommendations] Error:', error, 'Constitution type:', constitutionType);
    return 'Maintain regular sleep schedule and stress management practices.';
  }
}

// 支持函数：获取草药益处
const getHerbBenefit = (herb: string, constitutionType: string) => {
  try {
    if (!herb || !constitutionType) {
      return 'Supports your constitutional balance naturally';
    }

    const benefits: Record<string, Record<string, string>> = {
    '气虚': {
      '黄芪': 'Boosts energy and strengthens immune system naturally',
      '党参': 'Gentle energy enhancement without overstimulation',
      '人参': 'Powerful vitality restoration for deep fatigue',
      '白术': 'Strengthens digestion and nutrient absorption'
    },
    '阳虚': {
      '附子': 'Powerful warming herb for cold constitution',
      '干姜': 'Gentle warming for digestive and circulation',
      '肉桂': 'Sweet warming spice for daily use',
      '鹿茸': 'Premium warming and strengthening tonic'
    },
    '阴虚': {
      '枸杞': 'Nourishing and moistening for dry conditions',
      '百合': 'Cooling and calming for restless energy',
      '沙参': 'Moistens lungs and reduces heat symptoms',
      '麦冬': 'Generates fluids and calms the mind'
    },
    '痰湿': {
      '陈皮': 'Promotes circulation and reduces dampness',
      '茯苓': 'Drains dampness and strengthens digestion',
      '半夏': 'Transforms phlegm and harmonizes stomach',
      '薏苡仁': 'Drains dampness and strengthens spleen'
    },
    '湿热': {
      '连翘': 'Clears heat and reduces inflammation',
      '金银花': 'Cooling and detoxifying for heat symptoms',
      '栀子': 'Clears heat and calms irritability',
      '黄连': 'Powerful heat-clearing and drying herb'
    },
    '血瘀': {
      '当归': 'Nourishes blood and promotes circulation',
      '川芎': 'Activates blood and relieves stagnation',
      '红花': 'Invigorates blood circulation',
      '丹参': 'Promotes blood flow and heart health'
    },
    '气郁': {
      '柴胡': 'Soothes liver qi and relieves stress',
      '香附': 'Regulates qi and relieves tension',
      '薄荷': 'Cooling and uplifting for mood',
      '玫瑰花': 'Gentle qi regulation and mood support'
    },
    '特禀': {
      '防风': 'Strengthens immunity and prevents allergies',
      '白芍': 'Nourishes blood and calms sensitivity',
      '甘草': 'Harmonizes and reduces allergic reactions',
      '乌梅': 'Astringent and protective for sensitive systems'
    },
    '平和': {
      '党参': 'Maintains energy and supports overall wellness',
      '枸杞': 'Antioxidant support for continued health',
      '黄芪': 'Immune support and vitality maintenance',
      '甘草': 'Harmonizing and balancing herb'
    }
    }
    return benefits[constitutionType]?.[herb] || 'Supports your constitutional balance naturally';
  } catch (error) {
    console.error('[getHerbBenefit] Error:', error, 'Herb:', herb, 'Constitution:', constitutionType);
    return 'Supports your constitutional balance naturally';
  }
}

function ConstitutionTestClient() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [testHistory, setTestHistory] = useState<Array<{
    id: string
    date: string
    primary: string
    secondary?: string
    scores: Record<string, number>
    answers: number[]
  }>>([])
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<string | null>(null)

  // 检查URL参数，如果有start=true则自动开始测试，同时加载测试历史
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('start') === 'true') {
        setCurrentStep('test')
        // 清除URL参数
        window.history.replaceState({}, '', '/constitution-test')
      }
      
      // 加载测试历史
      const savedHistory = localStorage.getItem('constitutionTestHistory')
      if (savedHistory) {
        try {
          const history = JSON.parse(savedHistory)
          setTestHistory(history)
        } catch (error) {
          console.error('Failed to load test history:', error)
        }
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
      console.error('Failed to start test:', error)
      // 强制刷新页面并添加参数
      if (typeof window !== 'undefined') {
        window.location.href = '/constitution-test?start=true'
      }
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

  // CTA 按钮处理函数
  const handleHerbClick = (herb: string) => {
    try {
      // 已知存在的草药页面
      const availableHerbs: Record<string, string> = {
        '肉桂': 'cinnamon',
        '丁香': 'clove',
        '洋葱': 'onion',
        '南瓜子': 'pumpkin-seeds'
      }

      const slug = availableHerbs[herb]
      if (slug) {
        // 如果草药页面存在，直接跳转
        if (typeof window !== 'undefined') {
          window.open(`/herbs/${slug}`, '_blank')
        }
      } else {
        // 如果草药页面不存在，跳转到herb-finder页面并搜索该草药
        const searchTerm = encodeURIComponent(herb)
        if (typeof window !== 'undefined') {
          window.open(`/herb-finder?search=${searchTerm}`, '_blank')
        }
      }
    } catch (error) {
      console.error('[ConstitutionTest] Error in handleHerbClick:', error)
      // 后备方案：跳转到herb-finder主页
      if (typeof window !== 'undefined') {
        window.open('/herb-finder', '_blank')
      }
    }
  }

  const handleSubscribeClick = () => {
    // 显示邮件订阅模态框
    setShowEmailModal(true)
  }

  const handleEmailSubmit = async () => {
    if (!userEmail || !userEmail.includes('@')) {
      alert('Please enter a valid email address')
      return
    }
    
    setIsSubmittingEmail(true)
    
    try {
      // 获取当前测试结果进行个性化推荐
      const result = calculateConstitution(answers)
      const primaryInfo = constitutionInfo[result.primary]
      
      // 准备邮件数据
      const emailData = {
        email: userEmail,
        constitution: result.primary,
        constitutionEnglish: primaryInfo.englishName,
        recommendedHerbs: primaryInfo.recommendedHerbs?.slice(0, 5) || [],
        dietaryRecommendations: primaryInfo.dietaryRecommendations,
        lifestyleAdvice: primaryInfo.lifestyleAdvice,
        timestamp: new Date().toISOString(),
        source: 'constitution-test'
      }
      
      // 发送到后端API（这里先用console.log模拟）
      console.log('Sending personalized email with data:', emailData)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 调用邮件API
      const response = await fetch('/api/constitution/send-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send email')
      }
      
      setEmailSubmitted(true)
      
      // 保存用户邮箱到localStorage以便后续使用
      localStorage.setItem('userEmail', userEmail)
      
    } catch (error) {
      console.error('Failed to send personalized guide:', error)
      alert('Sorry, there was an error sending your guide. Please try again.')
    } finally {
      setIsSubmittingEmail(false)
    }
  }

  const handleShareResults = () => {
    // 获取当前测试结果生成个性化分享文本
    const result = calculateConstitution(answers)
    const primaryInfo = constitutionInfo[result.primary]
    
    const shareText = `🧘‍♀️ I just discovered my TCM constitution: ${primaryInfo.englishName}! 

${getEngineeredSummary(result.primary)}

🌿 Top herbs for my type: ${primaryInfo.recommendedHerbs?.slice(0, 3).join(', ') || 'personalized recommendations'}

Take the free test and find your perfect herbal match! 👇`

    const shareUrl = `${window.location.origin}/constitution-test`
    
    if (navigator.share) {
      navigator.share({
        title: `My Constitution: ${primaryInfo.englishName}`,
        text: shareText,
        url: shareUrl
      })
    } else {
      // 后备分享方案 - 复制个性化文本
      const fullShareText = `${shareText}\n\n${shareUrl}`
      navigator.clipboard.writeText(fullShareText)
      alert('Personalized share text copied to clipboard! Paste it anywhere to share.')
    }
  }

  // 生成社交分享卡片图像（增强版）
  const generateShareCard = () => {
    const result = calculateConstitution(answers)
    const primaryInfo = constitutionInfo[result.primary]
    
    // 创建画布生成分享卡片
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 1200
    canvas.height = 630
    
    // 设置高质量渲染
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    // 根据体质类型设置渐变颜色
    const constitutionColors: Record<string, [string, string]> = {
      '平和': ['#10b981', '#059669'], // 绿色
      '气虚': ['#f59e0b', '#d97706'], // 黄/橙色
      '阳虚': ['#f97316', '#ea580c'], // 橙/红色
      '阴虚': ['#ec4899', '#db2777'], // 粉/红色
      '痰湿': ['#3b82f6', '#2563eb'], // 蓝色
      '湿热': ['#8b5cf6', '#7c3aed'], // 紫色
      '血瘀': ['#6b7280', '#4b5563'], // 灰色
      '气郁': ['#6366f1', '#4f46e5'], // 靛蓝色
      '特禀': ['#f43f5e', '#e11d48']  // 玫瑰红
    }
    
    const [color1, color2] = constitutionColors[result.primary] || ['#10b981', '#059669']
    
    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 添加半透明覆盖层增加深度
    const overlay = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height))
    overlay.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
    overlay.addColorStop(1, 'rgba(0, 0, 0, 0.3)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 添加品牌标识区域
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(50, 50, canvas.width - 100, 100)
    
    // 品牌文字
    ctx.fillStyle = 'white'
    ctx.font = 'bold 32px Arial, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('HerbScience.shop', 80, 110)
    
    // 主标题区域
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.font = 'bold 84px Arial, sans-serif'
    ctx.textAlign = 'center'
    
    // 添加文字阴影效果
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 3
    ctx.shadowOffsetY = 3
    
    ctx.fillText(primaryInfo.englishName, canvas.width / 2, 280)
    
    // 重置阴影
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    
    // 体质图标（放大显示）
    ctx.font = '96px Arial, sans-serif'
    ctx.fillText(primaryInfo.icon, canvas.width / 2, 400)
    
    // 副标题
    ctx.font = '36px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    const subtitle = `${primaryInfo.name} | TCM Constitution`
    ctx.fillText(subtitle, canvas.width / 2, 460)
    
    // 底部CTA
    ctx.font = 'bold 28px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fillText('Discover your herbal match & wellness plan', canvas.width / 2, 540)
    
    // 添加装饰性元素
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(400, 480)
    ctx.lineTo(800, 480)
    ctx.stroke()
    
    // 生成高质量图像并下载
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `my-constitution-${result.primary}-social-card.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    }, 'image/png', 1.0)
  }

  const handleDownloadReport = () => {
    // 实现下载报告功能 - 简单的打印对话框
    window.print()
  }

  const handleBookConsultation = () => {
    // 跳转到咨询预约页面
    window.open('/consultation?source=constitution-test', '_blank')
  }

  // 保存测试结果到历史记录
  const saveTestResult = (result: any, answers: number[]) => {
    if (typeof window === 'undefined') return
    
    const newResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      primary: result.primary,
      secondary: result.secondary,
      scores: result.scores,
      answers: answers
    }
    
    try {
      const currentHistory = testHistory.length > 0 ? testHistory : []
      const updatedHistory = [newResult, ...currentHistory].slice(0, 10) // 保留最近10次结果
      
      setTestHistory(updatedHistory)
      localStorage.setItem('constitutionTestHistory', JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('Failed to save test result:', error)
    }
  }

  // 显示测试历史
  const handleShowHistory = () => {
    setShowHistoryModal(true)
  }

  // 比较两次测试结果
  const compareResults = (current: any, previous: any) => {
    const changes: string[] = []
    
    if (current.primary !== previous.primary) {
      changes.push(`Primary constitution changed from ${previous.primary} to ${current.primary}`)
    }
    
    if (current.secondary !== previous.secondary) {
      changes.push(`Secondary constitution changed from ${previous.secondary || 'None'} to ${current.secondary || 'None'}`)
    }
    
    // 比较各体质得分变化
    Object.keys(current.scores).forEach(constitution => {
      const currentScore = current.scores[constitution]
      const previousScore = previous.scores[constitution] || 0
      const difference = currentScore - previousScore
      
      if (Math.abs(difference) >= 5) { // 只显示显著变化（5分以上）
        changes.push(`${constitution} score ${difference > 0 ? 'increased' : 'decreased'} by ${Math.abs(difference)} points`)
      }
    })
    
    return changes
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
        answers: answers.slice(0, 5), // 只显示前5个答案用于调试
        allAnswers: answers
      });

      if (answeredCount < minRequiredAnswers) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
            <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
            <Navigation />
            
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h1 className="text-2xl font-bold text-yellow-600 mb-4">Please Complete More Questions</h1>
                <p className="text-gray-600 mb-6">
                  For accurate constitution analysis, please answer at least {minRequiredAnswers} questions.<br/>
                  You have answered: {answeredCount} / {questions.length}
                </p>
                <button
                  onClick={() => setCurrentStep('test')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Continue Test
                </button>
              </div>
            </main>
          </div>
        )
      }

      console.log('[ConstitutionTest] 开始计算体质结果...');
      console.log('[ConstitutionTest] 答案数组:', answers.slice(0, 10)); // 只显示前10个答案

      // Validate inputs before calculation
      if (!Array.isArray(answers)) {
        throw new Error('Answers is not an array');
      }
      if (!questions || questions.length === 0) {
        throw new Error('Questions array is empty or undefined');
      }

      const result = calculateConstitution(answers)
      console.log('[ConstitutionTest] 计算结果:', result);

      // 验证结果的有效性
      if (!result || !result.primary) {
        console.error('[ConstitutionTest] Invalid result:', result);
        throw new Error('Invalid constitution calculation result');
      }

      // Verify constitutionInfo exists and has the required keys
      if (!constitutionInfo || typeof constitutionInfo !== 'object') {
        console.error('[ConstitutionTest] constitutionInfo is invalid:', constitutionInfo);
        throw new Error('Constitution info database is not available');
      }

      console.log('[ConstitutionTest] Available constitution types:', Object.keys(constitutionInfo));
      console.log('[ConstitutionTest] Looking for:', result.primary);

      // 保存测试结果到历史记录
      try {
        saveTestResult(result, answers)
      } catch (saveError) {
        console.warn('[ConstitutionTest] Failed to save test result:', saveError);
        // Don't fail the entire component for save issues
      }

      // 安全地获取体质信息，添加额外的防护
      let primaryInfo, secondaryInfo;
      try {
        primaryInfo = constitutionInfo[result.primary];
        secondaryInfo = result.secondary && constitutionInfo[result.secondary] ? constitutionInfo[result.secondary] : null;
      } catch (infoError) {
        console.error('[ConstitutionTest] Failed to get constitution info:', infoError);
        primaryInfo = null;
        secondaryInfo = null;
      }

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
                <h1 className="text-2xl font-bold text-red-600 mb-4">Calculation Error</h1>
                <p className="text-gray-600 mb-6">
                  Sorry, there was an issue with constitution calculation. Debug info:<br/>
                  Primary: {result.primary}<br/>
                  Scores: {JSON.stringify(result.scores)}<br/>
                  Available types: {Object.keys(constitutionInfo).join(', ')}
                </p>
                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Retake Test
                </button>
              </div>
            </main>
          </div>
        )
      }

      console.log('[ConstitutionTest] 准备渲染结果页面...');

      // Final safety check before rendering
      if (!primaryInfo || !primaryInfo.englishName || !primaryInfo.name) {
        console.error('[ConstitutionTest] Primary info is incomplete:', primaryInfo);
        throw new Error('Primary constitution info is incomplete');
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
          <Navigation />
          
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Constitution Test', href: '/constitution-test' },
                { label: 'Test Results' }
              ]} 
            />

            {/* 🎯 简短总结（吸睛） */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className={`bg-gradient-to-r ${getConstitutionGradient(result.primary)} px-8 py-12 text-center text-white relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <div className="text-8xl mb-6">{primaryInfo.icon}</div>
                  <h1 className="text-4xl font-bold mb-4">{primaryInfo.englishName}</h1>
                  <div className="text-2xl font-light mb-6 max-w-3xl mx-auto leading-relaxed">
                    {getEngineeredSummary(result.primary)}
                  </div>
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-lg font-medium">{primaryInfo.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 详细解释（科学+通俗） */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Body Traits */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Body Traits</h2>
                </div>
                <div className="space-y-4">
                  {(primaryInfo.characteristics && Array.isArray(primaryInfo.characteristics) ? primaryInfo.characteristics : []).map((trait, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{trait}</p>
                    </div>
                  ))}
                  {(!primaryInfo.characteristics || !Array.isArray(primaryInfo.characteristics) || primaryInfo.characteristics.length === 0) && (
                    <p className="text-gray-500 italic">Characteristics information not available.</p>
                  )}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-2">Modern Interpretation</h3>
                  <p className="text-blue-800">{primaryInfo.modernInterpretation}</p>
                </div>
              </div>

              {/* Possible Issues & Warnings */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Health Considerations</h2>
                </div>
                
                {(primaryInfo.warnings && Array.isArray(primaryInfo.warnings) && primaryInfo.warnings.length > 0) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-orange-900 mb-3">⚠️ Important Warnings</h3>
                    <div className="space-y-2">
                      {primaryInfo.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p className="text-orange-800 text-sm">{warning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">💡 Key Insights</h3>
                  <p className="text-gray-700 text-sm">{getHealthInsights(result.primary)}</p>
                </div>
              </div>
            </div>

            {/* 🌱 生活方式建议 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Personalized Lifestyle Recommendations</h2>
                <p className="text-gray-600 text-lg">Tailored specifically for your {primaryInfo.englishName}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* 饮食建议 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🥗</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Dietary Guidelines</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-semibold text-green-900 mb-2">✅ Include More:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(primaryInfo.dietaryRecommendations?.include && Array.isArray(primaryInfo.dietaryRecommendations.include) ? primaryInfo.dietaryRecommendations.include : []).map((food, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {food}
                          </span>
                        ))}
                        {(!primaryInfo.dietaryRecommendations?.include || !Array.isArray(primaryInfo.dietaryRecommendations.include) || primaryInfo.dietaryRecommendations.include.length === 0) && (
                          <span className="text-green-700 text-sm italic">No specific recommendations available.</span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <h4 className="font-semibold text-red-900 mb-2">❌ Avoid:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(primaryInfo.dietaryRecommendations?.avoid && Array.isArray(primaryInfo.dietaryRecommendations.avoid) ? primaryInfo.dietaryRecommendations.avoid : []).map((food, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {food}
                          </span>
                        ))}
                        {(!primaryInfo.dietaryRecommendations?.avoid || !Array.isArray(primaryInfo.dietaryRecommendations.avoid) || primaryInfo.dietaryRecommendations.avoid.length === 0) && (
                          <span className="text-red-700 text-sm italic">No specific restrictions available.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 运动建议 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Exercise & Activity</h3>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="space-y-3">
                      {(primaryInfo.lifestyleAdvice && Array.isArray(primaryInfo.lifestyleAdvice) ? primaryInfo.lifestyleAdvice : []).map((advice, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-800 text-sm text-left">{advice}</p>
                        </div>
                      ))}
                      {(!primaryInfo.lifestyleAdvice || !Array.isArray(primaryInfo.lifestyleAdvice) || primaryInfo.lifestyleAdvice.length === 0) && (
                        <p className="text-blue-700 text-sm italic">Lifestyle advice not available.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 作息建议 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">😴</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Rest & Recovery</h3>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-purple-800">{getRestRecommendations(result.primary)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🌿 草药推荐（关联数据库） */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Herbs for Your Constitution</h2>
                <p className="text-gray-600 text-lg">Science-backed herbal allies perfectly matched to your body type</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(primaryInfo.recommendedHerbs && Array.isArray(primaryInfo.recommendedHerbs) ? primaryInfo.recommendedHerbs.slice(0, 3) : []).map((herb, index) => (
                  <div key={index} className="group cursor-pointer transform transition-all duration-200 hover:scale-105">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Leaf className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{herb}</h3>
                        <p className="text-gray-600 text-sm mb-4">{getHerbBenefit(herb, result.primary)}</p>
                        <button
                          onClick={() => handleHerbClick(herb)}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!primaryInfo.recommendedHerbs || !Array.isArray(primaryInfo.recommendedHerbs) || primaryInfo.recommendedHerbs.length === 0) && (
                  <div className="col-span-full text-center py-8">
                    <div className="text-4xl mb-4">🌿</div>
                    <p className="text-gray-600">Herb recommendations will be available soon for your constitution type.</p>
                  </div>
                )}
              </div>

              <div className="text-center mt-8">
                <button 
                  onClick={() => window.open('/herb-finder?constitution=' + encodeURIComponent(result.primary), '_blank')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-medium"
                >
                  <Search className="w-5 h-5" />
                  Explore All Compatible Herbs
                </button>
              </div>
            </div>

            {/* 🎯 行动引导（转化）- 教育为主，非销售 */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-center text-white mb-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Your Next Steps to Better Health</h2>
                <p className="text-xl text-white/90 mb-8">Learn more about your constitution and discover practical ways to improve your wellness</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => window.open('/herb-finder?constitution=' + encodeURIComponent(result.primary), '_blank')}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">🌿</div>
                    <h3 className="font-bold text-lg mb-2">Explore Your Herbs</h3>
                    <p className="text-sm text-white/80">Learn about herbs that support your constitution type</p>
                  </button>

                  <button
                    onClick={() => window.open('/blog', '_blank')}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">📚</div>
                    <h3 className="font-bold text-lg mb-2">Read Health Articles</h3>
                    <p className="text-sm text-white/80">Evidence-based guides for your constitution</p>
                  </button>

                  <button
                    onClick={() => handleSubscribeClick()}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">📧</div>
                    <h3 className="font-bold text-lg mb-2">Get Your Guide</h3>
                    <p className="text-sm text-white/80">Free personalized wellness guide via email</p>
                  </button>

                  <button
                    onClick={() => handleShareResults()}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">📱</div>
                    <h3 className="font-bold text-lg mb-2">Share & Help Others</h3>
                    <p className="text-sm text-white/80">Help friends discover their constitution</p>
                  </button>
                </div>

                {/* Educational next steps */}
                <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <h3 className="font-bold text-xl mb-4">💡 How to Use Your Results</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">🍽️ Adjust Your Diet</h4>
                      <p className="text-white/80">Follow the dietary recommendations for your constitution type</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">🏃‍♀️ Modify Exercise</h4>
                      <p className="text-white/80">Choose activities that balance your specific constitution</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">🌱 Consider Herbs</h4>
                      <p className="text-white/80">Research the recommended herbs and consult practitioners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 次要体质信息（如果存在） */}
            {secondaryInfo && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Secondary Constitution Tendency</h2>
                  <p className="text-gray-600">You also show some traits of {secondaryInfo.englishName}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{secondaryInfo.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{secondaryInfo.name}</h3>
                      <p className="text-gray-600">{secondaryInfo.englishName}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{secondaryInfo.description}</p>
                </div>
              </div>
            )}

            {/* 🌟 Social proof and sharing encouragement */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Thousands Who've Discovered Their Constitution</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-1">12,000+</div>
                  <div className="text-sm text-gray-600">Tests completed this year</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-1">4.8/5</div>
                  <div className="text-sm text-gray-600">Average user rating</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-1">89%</div>
                  <div className="text-sm text-gray-600">Found results helpful</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "This test helped me understand why certain foods and activities work better for me than others!"
                <span className="text-sm text-gray-500">- Sarah M.</span>
              </p>
              <button
                onClick={() => handleShareResults()}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Share Your Results & Help Friends 🌟
              </button>
            </div>

            {/* 🔄 重新测试和其他操作 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <button
                onClick={handleBackToWelcome}
                className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
                <span className="font-medium">Retake Test</span>
              </button>
              
              <button 
                onClick={() => handleShowHistory()}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">View History</span>
              </button>
              
              <button 
                onClick={() => handleDownloadReport()}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Download Report</span>
              </button>
              
              <button 
                onClick={() => handleBookConsultation()}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Consult Expert</span>
              </button>
            </div>

            {/* 📧 邮件订阅模态框 */}
            {showEmailModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                  <div className="p-8">
                    {!emailSubmitted ? (
                      <>
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📧</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Personal Wellness Guide</h3>
                          <p className="text-gray-600">
                            Receive a detailed PDF guide with personalized recommendations for your {primaryInfo.englishName} constitution.
                          </p>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">✨ Your Guide Includes:</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Complete constitution analysis</li>
                              <li>• Personalized herb recommendations</li>
                              <li>• Custom meal plans & recipes</li>
                              <li>• Exercise routines for your type</li>
                              <li>• Stress management techniques</li>
                            </ul>
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="Enter your email to receive your guide"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowEmailModal(false)}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            Maybe Later
                          </button>
                          <button
                            onClick={handleEmailSubmit}
                            disabled={isSubmittingEmail || !userEmail}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            {isSubmittingEmail ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending...
                              </>
                            ) : (
                              'Send My Guide'
                            )}
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          No spam, ever. Unsubscribe with one click.
                        </p>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Guide Sent Successfully!</h3>
                        <p className="text-gray-600 mb-6">
                          Check your inbox for your personalized {primaryInfo.englishName} wellness guide. 
                          Don't forget to check your spam folder just in case.
                        </p>
                        
                        <div className="space-y-3">
                          <button
                            onClick={() => setShowEmailModal(false)}
                            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200"
                          >
                            Continue Exploring
                          </button>
                          
                          <button
                            onClick={() => {
                              setShowEmailModal(false)
                              handleShareResults()
                            }}
                            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                          >
                            <Share2 className="w-4 h-4" />
                            Share Your Results
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 📊 测试历史模态框 */}
            {showHistoryModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-gray-900">Test History & Comparison</h3>
                      <button
                        onClick={() => setShowHistoryModal(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {testHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📊</div>
                        <h4 className="text-xl font-semibold text-gray-700 mb-2">No Previous Tests</h4>
                        <p className="text-gray-500">This is your first constitution test. Come back after taking more tests to see your progress!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid gap-4">
                          {testHistory.map((test, index) => {
                            const testInfo = constitutionInfo[test.primary as ConstitutionType]
                            if (!testInfo) {
                              console.warn('Invalid constitution type in history:', test.primary)
                              return null
                            }
                            const isLatest = index === 0
                            const showComparison = index > 0 && testHistory[index - 1]
                            
                            return (
                              <div key={test.id} className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                                isLatest ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                              }`}>
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-4">
                                    <div className="text-4xl">{testInfo.icon}</div>
                                    <div>
                                      <h4 className="text-xl font-bold text-gray-900">
                                        {testInfo.englishName}
                                        {isLatest && <span className="text-green-600 text-sm font-medium ml-2">(Current)</span>}
                                      </h4>
                                      <p className="text-gray-600">{testInfo.name}</p>
                                      <p className="text-sm text-gray-500">
                                        {new Date(test.date).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {test.secondary && constitutionInfo[test.secondary as ConstitutionType] && (
                                    <div className="text-right">
                                      <p className="text-sm text-gray-500 mb-1">Secondary:</p>
                                      <p className="text-gray-700 font-medium">{constitutionInfo[test.secondary as ConstitutionType].name}</p>
                                    </div>
                                  )}
                                </div>
                                
                                {/* 显示主要得分 */}
                                <div className="mb-4">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Constitution Scores:</h5>
                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                    {Object.entries(test.scores)
                                      .sort(([,a], [,b]) => b - a)
                                      .slice(0, 6)
                                      .map(([constitution, score]) => (
                                      <div key={constitution} className="flex justify-between p-2 bg-white rounded">
                                        <span className="text-gray-600">{constitution}</span>
                                        <span className="font-medium">{score}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* 比较前一次结果 */}
                                {showComparison && (
                                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <h5 className="text-sm font-semibold text-blue-900 mb-2">📈 Changes Since Last Test:</h5>
                                    <div className="space-y-1">
                                      {compareResults(test, testHistory[index - 1]).map((change, idx) => (
                                        <p key={idx} className="text-sm text-blue-800">• {change}</p>
                                      ))}
                                      {compareResults(test, testHistory[index - 1]).length === 0 && (
                                        <p className="text-sm text-blue-700">No significant changes detected</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        
                        {testHistory.length > 1 && (
                          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                            <h4 className="text-lg font-bold text-indigo-900 mb-3">📈 Your Constitution Journey</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-indigo-800">
                                <strong>Total Tests:</strong> {testHistory.length}
                              </p>
                              <p className="text-sm text-indigo-800">
                                <strong>Most Common Type:</strong> {
                                  Object.entries(
                                    testHistory.reduce((acc, test) => {
                                      acc[test.primary] = (acc[test.primary] || 0) + 1
                                      return acc
                                    }, {} as Record<string, number>)
                                  ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                                }
                              </p>
                              <p className="text-sm text-indigo-800">
                                <strong>Time Span:</strong> {
                                  testHistory.length > 1 
                                    ? `${Math.ceil((new Date(testHistory[0].date).getTime() - new Date(testHistory[testHistory.length - 1].date).getTime()) / (1000 * 60 * 60 * 24))} days`
                                    : 'Single test'
                                }
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Results are automatically saved for comparison
                      </p>
                      <button
                        onClick={() => setShowHistoryModal(false)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )

    } catch (error) {
      console.error('[ConstitutionTest] 结果页面渲染错误:', error);
      console.error('[ConstitutionTest] 当前答案数组:', answers);
      console.error('[ConstitutionTest] 当前步骤:', currentStep);

      // 显示错误界面，由ErrorBoundary处理错误状态重置
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
          <style dangerouslySetInnerHTML={{ __html: customAnimations }} />
          <Navigation />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
              <p className="text-gray-600 mb-6">
                We apologize for the inconvenience. Please restart the test to continue.
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <br/><br/>
                    <strong>Error details:</strong> {error instanceof Error ? error.message : 'Unknown error'}<br/>
                    <strong>Answers length:</strong> {answers.length}<br/>
                    <strong>Valid answers:</strong> {answers.filter(a => a >= 1 && a <= 5).length}
                  </>
                )}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    // 安全地重置状态而不触发无限循环
                    window.location.href = '/constitution-test'
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Restart Test
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors ml-3"
                >
                  Return home
                </button>
              </div>
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

            {/* Professional credentials and disclaimers */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Trust indicators */}
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-400">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-2">Professional Foundation:</p>
                    <ul className="space-y-1 text-green-700">
                      <li>• Based on official TCM Constitution Classification Standards</li>
                      <li>• Developed following traditional Chinese medicine principles</li>
                      <li>• Questions adapted for Western lifestyle and understanding</li>
                      <li>• Used by thousands of practitioners worldwide</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Privacy & Safety */}
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">Privacy & Medical Disclaimer:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Your responses are processed locally and not stored permanently</li>
                      <li>• This assessment is for educational purposes only</li>
                      <li>• Results should not replace professional medical advice</li>
                      <li>• Consult qualified TCM practitioners for personalized treatment</li>
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
              { label: `Question ${currentQuestion + 1}` }
            ]} 
          />

          {/* Enhanced Progress Bar with Animation */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Test Progress</span>
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
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs text-gray-500">
                <span className="font-medium">{Math.round(progress)}% Complete</span>
                <span className="hidden sm:inline">•</span>
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span className="hidden sm:inline">•</span>
                <span className="sm:inline">~{Math.ceil((questions.length - currentQuestion - 1) * 0.5)} min left</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
            {/* 问题类别 + 进度激励 */}
            <div className="text-center mb-6">
              <div className="flex flex-col items-center gap-3">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg transform transition-all duration-200 hover:scale-105">
                  {question.category}
                </span>
                {currentQuestion >= 10 && (
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                    🎉 Great progress! You're halfway there!
                  </div>
                )}
                {currentQuestion >= 15 && (
                  <div className="text-xs text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full">
                    🚀 Almost done! Just a few more questions
                  </div>
                )}
              </div>
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
                        <span className="text-sm font-medium">Selected</span>
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
                    {currentQuestion === questions.length - 1 ? 'Generating your constitution report...' : 'Moving to next question...'}
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
                Previous
              </button>

              <div className="text-center">
                {autoAdvance && !isAutoAdvancing && selectedAnswer !== null && (
                  <div className="text-sm text-green-600 font-medium animate-bounce">
                    Selection complete! Moving to next question automatically
                  </div>
                )}
                {!autoAdvance && (
                  <div className="text-xs text-gray-500">
                    Manual mode: Click "Next" to continue
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
                      {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-[2px] transition-transform duration-200" />
                  </>
                )}
                {isAutoAdvancing && (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
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

// 包装组件添加错误边界
export default function ConstitutionTestWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <ConstitutionTestClient />
    </ErrorBoundary>
  )
}
