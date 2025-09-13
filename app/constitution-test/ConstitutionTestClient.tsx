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
  return summaries[constitutionType] || 'You have a unique constitution that requires personalized attention.'
}

// 支持函数：获取健康洞察
const getHealthInsights = (constitutionType: string) => {
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
  return insights[constitutionType] || 'Your constitution requires personalized care and attention.'
}

// 支持函数：获取作息建议
const getRestRecommendations = (constitutionType: string) => {
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
  return restAdvice[constitutionType] || 'Maintain regular sleep schedule and stress management practices.'
}

// 支持函数：获取草药益处
const getHerbBenefit = (herb: string, constitutionType: string) => {
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
  return benefits[constitutionType]?.[herb] || 'Supports your constitutional balance naturally'
}

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

  // CTA 按钮处理函数
  const handleHerbClick = (herb: string) => {
    // 尝试跳转到对应的草药详情页面
    const herbSlugMap: Record<string, string> = {
      '黄芪': 'astragalus',
      '党参': 'codonopsis',
      '人参': 'ginseng',
      '白术': 'atractylodes',
      '附子': 'aconite',
      '干姜': 'dried-ginger',
      '肉桂': 'cinnamon',
      '鹿茸': 'deer-antler',
      '枸杞': 'goji-berry',
      '百合': 'lily-bulb',
      '沙参': 'adenophora',
      '麦冬': 'ophiopogon',
      '陈皮': 'tangerine-peel',
      '茯苓': 'poria',
      '半夏': 'pinellia',
      '薏苡仁': 'coix-seed',
      '连翘': 'forsythia',
      '金银花': 'honeysuckle',
      '栀子': 'gardenia',
      '黄连': 'coptis',
      '当归': 'angelica',
      '川芎': 'ligusticum',
      '红花': 'carthamus',
      '丹参': 'salvia',
      '柴胡': 'bupleurum',
      '香附': 'cyperus',
      '薄荷': 'mint',
      '玫瑰花': 'rose',
      '防风': 'saposhnikovia',
      '白芍': 'white-peony',
      '甘草': 'licorice',
      '乌梅': 'dark-plum'
    }
    
    const slug = herbSlugMap[herb] || herb.toLowerCase().replace(/\s+/g, '-')
    window.open(`/herbs/${slug}`, '_blank')
  }

  const handleSubscribeClick = () => {
    // 实现订阅功能 - 可以跳转到邮件订阅页面或显示模态框
    window.open('/subscribe?source=constitution-test', '_blank')
  }

  const handleShareResults = () => {
    // 实现分享功能
    if (navigator.share) {
      navigator.share({
        title: 'My TCM Constitution Test Results',
        text: 'I just discovered my Traditional Chinese Medicine constitution type!',
        url: window.location.href
      })
    } else {
      // 后备分享方案 - 复制链接
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard! Share with your friends.')
    }
  }

  const handleDownloadReport = () => {
    // 实现下载报告功能 - 简单的打印对话框
    window.print()
  }

  const handleBookConsultation = () => {
    // 跳转到咨询预约页面
    window.open('/consultation?source=constitution-test', '_blank')
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

            {/* 🎯 简短总结（吸睛） */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className={`bg-gradient-to-r ${getConstitutionGradient(primaryInfo.id)} px-8 py-12 text-center text-white relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <div className="text-8xl mb-6">{primaryInfo.icon}</div>
                  <h1 className="text-4xl font-bold mb-4">{primaryInfo.englishName}</h1>
                  <div className="text-2xl font-light mb-6 max-w-3xl mx-auto leading-relaxed">
                    {getEngineeredSummary(primaryInfo.id)}
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
                  {primaryInfo.characteristics?.map((trait, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{trait}</p>
                    </div>
                  ))}
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
                
                {primaryInfo.warnings?.length > 0 && (
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
                  <p className="text-gray-700 text-sm">{getHealthInsights(primaryInfo.id)}</p>
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
                        {primaryInfo.dietaryRecommendations?.include?.map((food, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <h4 className="font-semibold text-red-900 mb-2">❌ Avoid:</h4>
                      <div className="flex flex-wrap gap-2">
                        {primaryInfo.dietaryRecommendations?.avoid?.map((food, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {food}
                          </span>
                        ))}
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
                      {primaryInfo.lifestyleAdvice?.map((advice, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-800 text-sm text-left">{advice}</p>
                        </div>
                      ))}
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
                    <p className="text-purple-800">{getRestRecommendations(primaryInfo.id)}</p>
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
                {primaryInfo.recommendedHerbs?.slice(0, 3).map((herb, index) => (
                  <div key={index} className="group cursor-pointer transform transition-all duration-200 hover:scale-105">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Leaf className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{herb}</h3>
                        <p className="text-gray-600 text-sm mb-4">{getHerbBenefit(herb, primaryInfo.id)}</p>
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
              </div>

              <div className="text-center mt-8">
                <button 
                  onClick={() => window.open('/herb-finder?constitution=' + encodeURIComponent(primaryInfo.id), '_blank')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-medium"
                >
                  <Search className="w-5 h-5" />
                  Explore All Compatible Herbs
                </button>
              </div>
            </div>

            {/* 🎯 行动引导（转化）- CTA按钮组 */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-center text-white mb-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Your Wellness Journey Starts Now</h2>
                <p className="text-xl text-white/90 mb-8">Transform your health with personalized guidance based on your unique constitution</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => window.open('/herb-finder?recommended=true&constitution=' + encodeURIComponent(primaryInfo.id), '_blank')}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">🌿</div>
                    <h3 className="font-bold text-lg mb-2">View Your Herbs</h3>
                    <p className="text-sm text-white/80">Discover herbs perfectly matched to your constitution</p>
                  </button>
                  
                  <button 
                    onClick={() => handleSubscribeClick()}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">📧</div>
                    <h3 className="font-bold text-lg mb-2">Get Personalized Tips</h3>
                    <p className="text-sm text-white/80">Weekly wellness advice tailored to your body type</p>
                  </button>
                  
                  <button 
                    onClick={() => handleShareResults()}
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="text-3xl mb-3">📱</div>
                    <h3 className="font-bold text-lg mb-2">Share Results</h3>
                    <p className="text-sm text-white/80">Help friends discover their constitution too</p>
                  </button>
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

            {/* 🔄 重新测试和其他操作 */}
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <button
                onClick={handleBackToWelcome}
                className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200" />
                <span className="font-medium">Retake Test</span>
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
