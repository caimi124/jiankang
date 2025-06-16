'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import { Brain, Users, Heart, Leaf, Shield, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  options: Array<{
    text: string
    score: {
      yang: number
      yin: number
      qi: number
      blood: number
      phlegm: number
      heat: number
    }
  }>
}

interface ConstitutionResult {
  type: string
  name: string
  chineseName: string
  description: string
  characteristics: string[]
  commonSymptoms: string[]
  recommendedHerbs: Array<{
    name: string
    chineseName: string
    benefits: string
    dosage: string
  }>
  lifestyle: string[]
  foods: {
    beneficial: string[]
    avoid: string[]
  }
  score: number
}

export default function ConstitutionTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Array<number>>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      category: "Energy & Vitality",
      question: "How would you describe your overall energy levels?",
      options: [
        { 
          text: "High energy, always active and restless", 
          score: { yang: 3, yin: 0, qi: 2, blood: 1, phlegm: 0, heat: 2 }
        },
        { 
          text: "Moderate energy, occasional fatigue", 
          score: { yang: 1, yin: 1, qi: 1, blood: 1, phlegm: 1, heat: 1 }
        },
        { 
          text: "Low energy, often tired and need rest", 
          score: { yang: 0, yin: 3, qi: 0, blood: 2, phlegm: 2, heat: 0 }
        },
        { 
          text: "Energy fluctuates dramatically", 
          score: { yang: 2, yin: 2, qi: 0, blood: 0, phlegm: 1, heat: 1 }
        }
      ]
    },
    {
      id: 2,
      category: "Body Temperature",
      question: "How do you usually feel about temperature?",
      options: [
        { 
          text: "Always feel hot, prefer cold environments", 
          score: { yang: 3, yin: 0, qi: 1, blood: 1, phlegm: 0, heat: 3 }
        },
        { 
          text: "Usually comfortable with room temperature", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Often feel cold, need warm clothes", 
          score: { yang: 0, yin: 3, qi: 1, blood: 2, phlegm: 2, heat: 0 }
        },
        { 
          text: "Temperature sensitivity varies", 
          score: { yang: 1, yin: 2, qi: 1, blood: 1, phlegm: 2, heat: 1 }
        }
      ]
    },
    {
      id: 3,
      category: "Sleep Patterns",
      question: "How is your sleep quality?",
      options: [
        { 
          text: "Light sleeper, wake up easily, vivid dreams", 
          score: { yang: 2, yin: 1, qi: 0, blood: 0, phlegm: 0, heat: 2 }
        },
        { 
          text: "Generally sleep well, 7-8 hours", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Heavy sleeper, hard to wake up, need lots of sleep", 
          score: { yang: 0, yin: 2, qi: 1, blood: 3, phlegm: 3, heat: 0 }
        },
        { 
          text: "Insomnia, difficult to fall asleep", 
          score: { yang: 3, yin: 0, qi: 0, blood: 1, phlegm: 0, heat: 3 }
        }
      ]
    },
    {
      id: 4,
      category: "Digestion",
      question: "How is your appetite and digestion?",
      options: [
        { 
          text: "Strong appetite, eat quickly, sometimes indigestion", 
          score: { yang: 3, yin: 0, qi: 1, blood: 1, phlegm: 1, heat: 2 }
        },
        { 
          text: "Normal appetite, good digestion", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Poor appetite, slow digestion, feel heavy after eating", 
          score: { yang: 0, yin: 2, qi: 0, blood: 1, phlegm: 3, heat: 0 }
        },
        { 
          text: "Irregular appetite, sensitive stomach", 
          score: { yang: 1, yin: 2, qi: 1, blood: 0, phlegm: 2, heat: 1 }
        }
      ]
    },
    {
      id: 5,
      category: "Emotions",
      question: "How would you describe your emotional tendencies?",
      options: [
        { 
          text: "Outgoing, optimistic, sometimes impulsive", 
          score: { yang: 3, yin: 0, qi: 2, blood: 1, phlegm: 0, heat: 2 }
        },
        { 
          text: "Generally calm and balanced", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Quiet, introverted, sometimes melancholy", 
          score: { yang: 0, yin: 3, qi: 1, blood: 2, phlegm: 2, heat: 0 }
        },
        { 
          text: "Moody, easily stressed or anxious", 
          score: { yang: 2, yin: 1, qi: 0, blood: 0, phlegm: 1, heat: 2 }
        }
      ]
    },
    {
      id: 6,
      category: "Physical Characteristics",
      question: "How would you describe your physical build?",
      options: [
        { 
          text: "Lean, muscular, strong bones", 
          score: { yang: 3, yin: 0, qi: 2, blood: 2, phlegm: 0, heat: 1 }
        },
        { 
          text: "Medium build, proportionate", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Soft build, tend to gain weight easily", 
          score: { yang: 0, yin: 2, qi: 1, blood: 3, phlegm: 3, heat: 0 }
        },
        { 
          text: "Thin, delicate frame", 
          score: { yang: 1, yin: 3, qi: 0, blood: 1, phlegm: 0, heat: 1 }
        }
      ]
    },
    {
      id: 7,
      category: "Stress Response",
      question: "How do you typically respond to stress?",
      options: [
        { 
          text: "Get angry or irritated quickly", 
          score: { yang: 3, yin: 0, qi: 0, blood: 1, phlegm: 0, heat: 3 }
        },
        { 
          text: "Stay calm and think things through", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Withdraw and avoid confrontation", 
          score: { yang: 0, yin: 3, qi: 1, blood: 1, phlegm: 2, heat: 0 }
        },
        { 
          text: "Feel anxious and worry excessively", 
          score: { yang: 1, yin: 2, qi: 0, blood: 0, phlegm: 1, heat: 2 }
        }
      ]
    },
    {
      id: 8,
      category: "Exercise Preference",
      question: "What type of physical activity do you prefer?",
      options: [
        { 
          text: "High-intensity, competitive sports", 
          score: { yang: 3, yin: 0, qi: 2, blood: 1, phlegm: 0, heat: 2 }
        },
        { 
          text: "Moderate exercise like walking or swimming", 
          score: { yang: 1, yin: 1, qi: 2, blood: 2, phlegm: 1, heat: 1 }
        },
        { 
          text: "Gentle activities like yoga or tai chi", 
          score: { yang: 0, yin: 3, qi: 1, blood: 2, phlegm: 2, heat: 0 }
        },
        { 
          text: "I prefer mental activities over physical", 
          score: { yang: 1, yin: 2, qi: 0, blood: 1, phlegm: 2, heat: 1 }
        }
      ]
    }
  ]

  const constitutionTypes: ConstitutionResult[] = [
    {
      type: "yang",
      name: "Yang Constitution",
      chineseName: "阳性体质",
      description: "Strong, energetic, heat-loving constitution with robust metabolism and strong digestive fire.",
      characteristics: [
        "High energy and vitality",
        "Strong appetite and fast metabolism",
        "Prefers cool environments",
        "Quick to anger but also quick to forgive",
        "Strong immune system"
      ],
      commonSymptoms: [
        "Restlessness and hyperactivity",
        "Tendency to overheat",
        "High blood pressure",
        "Insomnia from overactivity",
        "Digestive issues from eating too fast"
      ],
      recommendedHerbs: [
        {
          name: "Chrysanthemum",
          chineseName: "菊花 (Ju Hua)",
          benefits: "Cools heat, calms the liver, improves vision",
          dosage: "3-6g daily as tea"
        },
        {
          name: "Gardenia",
          chineseName: "栀子 (Zhi Zi)",
          benefits: "Clears heat and irritability, calms the mind",
          dosage: "6-10g daily in decoction"
        },
        {
          name: "Rehmannia (Raw)",
          chineseName: "生地黄 (Sheng Di Huang)",
          benefits: "Nourishes yin, cools blood, reduces inflammation",
          dosage: "10-15g daily"
        }
      ],
      lifestyle: [
        "Practice calming activities like meditation",
        "Avoid overexertion and excessive heat",
        "Get adequate sleep (7-8 hours)",
        "Practice patience and emotional regulation"
      ],
      foods: {
        beneficial: ["Green leafy vegetables", "Cooling fruits", "Green tea", "Tofu", "Fish"],
        avoid: ["Spicy foods", "Alcohol", "Red meat in excess", "Coffee", "Hot peppers"]
      },
      score: 0
    },
    {
      type: "yin",
      name: "Yin Constitution",
      chineseName: "阴性体质",
      description: "Cool, calm constitution with slower metabolism and tendency toward coldness and moisture.",
      characteristics: [
        "Calm and peaceful temperament",
        "Prefers warm environments",
        "Slower metabolism",
        "Good endurance but low explosive energy",
        "Thoughtful and introspective"
      ],
      commonSymptoms: [
        "Feeling cold easily",
        "Low energy and fatigue",
        "Digestive weakness",
        "Fluid retention",
        "Depression or melancholy"
      ],
      recommendedHerbs: [
        {
          name: "Ginseng",
          chineseName: "人参 (Ren Shen)",
          benefits: "Tonifies qi, strengthens spleen, boosts energy",
          dosage: "3-9g daily"
        },
        {
          name: "Astragalus",
          chineseName: "黄芪 (Huang Qi)",
          benefits: "Boosts immune system, increases energy, strengthens organs",
          dosage: "9-30g daily"
        },
        {
          name: "Cinnamon",
          chineseName: "肉桂 (Rou Gui)",
          benefits: "Warms the body, strengthens kidneys, improves circulation",
          dosage: "1-3g daily"
        }
      ],
      lifestyle: [
        "Regular gentle exercise",
        "Keep warm, especially hands and feet",
        "Maintain regular sleep schedule",
        "Practice energizing activities like qigong"
      ],
      foods: {
        beneficial: ["Warming spices", "Cooked foods", "Ginger tea", "Lamb", "Warm grains"],
        avoid: ["Raw cold foods", "Ice drinks", "Excessive dairy", "Sugar", "Cold fruits"]
      },
      score: 0
    },
    {
      type: "qi_stagnation",
      name: "Qi Stagnation",
      chineseName: "气郁体质",
      description: "Blocked energy flow leading to emotional stress, irregular symptoms, and tension.",
      characteristics: [
        "Mood swings and emotional instability",
        "Symptoms that come and go",
        "Feeling of tightness or pressure",
        "Stress-sensitive",
        "Irregular appetite and sleep"
      ],
      commonSymptoms: [
        "Anxiety and depression",
        "Digestive issues with stress",
        "Headaches and muscle tension",
        "Irregular menstruation",
        "Feeling of lump in throat"
      ],
      recommendedHerbs: [
        {
          name: "Bupleurum",
          chineseName: "柴胡 (Chai Hu)",
          benefits: "Moves qi, relieves stress, harmonizes emotions",
          dosage: "3-12g daily"
        },
        {
          name: "Rose Flower",
          chineseName: "玫瑰花 (Mei Gui Hua)",
          benefits: "Regulates qi, lifts mood, helps with PMS",
          dosage: "3-6g daily as tea"
        },
        {
          name: "Citrus Peel",
          chineseName: "陈皮 (Chen Pi)",
          benefits: "Regulates qi, improves digestion, reduces bloating",
          dosage: "3-9g daily"
        }
      ],
      lifestyle: [
        "Regular exercise to move qi",
        "Stress management techniques",
        "Creative and expressive activities",
        "Regular schedule and routine"
      ],
      foods: {
        beneficial: ["Citrus fruits", "Green vegetables", "Herbal teas", "Light meals", "Nuts"],
        avoid: ["Heavy greasy foods", "Excessive alcohol", "Irregular eating", "Processed foods"]
      },
      score: 0
    },
    {
      type: "blood_stasis",
      name: "Blood Stasis",
      chineseName: "血瘀体质",
      description: "Poor circulation leading to pain, dark complexion, and cardiovascular concerns.",
      characteristics: [
        "Dark or purplish complexion",
        "Fixed, stabbing pains",
        "Poor circulation",
        "Dark spots or easy bruising",
        "Memory issues"
      ],
      commonSymptoms: [
        "Chronic pain that's fixed in location",
        "Cardiovascular problems",
        "Varicose veins",
        "Dark menstrual blood with clots",
        "Cold hands and feet"
      ],
      recommendedHerbs: [
        {
          name: "Dan Shen",
          chineseName: "丹参 (Dan Shen)",
          benefits: "Improves circulation, reduces blood stasis, protects heart",
          dosage: "9-15g daily"
        },
        {
          name: "Safflower",
          chineseName: "红花 (Hong Hua)",
          benefits: "Activates blood circulation, reduces pain and swelling",
          dosage: "3-9g daily"
        },
        {
          name: "Turmeric",
          chineseName: "姜黄 (Jiang Huang)",
          benefits: "Anti-inflammatory, improves circulation, reduces pain",
          dosage: "3-9g daily"
        }
      ],
      lifestyle: [
        "Regular aerobic exercise",
        "Avoid sitting for long periods",
        "Heat therapy for circulation",
        "Stress reduction"
      ],
      foods: {
        beneficial: ["Dark berries", "Garlic", "Onions", "Green tea", "Fish"],
        avoid: ["Fried foods", "Excessive salt", "Cold foods", "Refined sugars"]
      },
      score: 0
    }
  ]

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate results
      calculateResults(newAnswers)
    }
  }

  const calculateResults = (allAnswers: number[]) => {
    setIsLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const scores = {
        yang: 0,
        yin: 0,
        qi: 0,
        blood: 0,
        phlegm: 0,
        heat: 0
      }

      // Calculate scores based on answers
      allAnswers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex]
        const selectedOption = question.options[answerIndex]
        
        Object.keys(scores).forEach(key => {
          scores[key as keyof typeof scores] += selectedOption.score[key as keyof typeof selectedOption.score]
        })
      })

      // Determine primary constitution type
      let primaryType = 'yang'
      let maxScore = scores.yang

      if (scores.yin > maxScore) {
        primaryType = 'yin'
        maxScore = scores.yin
      }
      if (scores.qi < 8) { // Low qi indicates qi stagnation
        primaryType = 'qi_stagnation'
        maxScore = 24 - scores.qi // Inverse score for qi stagnation
      }
      if (scores.blood < 8) { // Low blood circulation indicates blood stasis
        primaryType = 'blood_stasis'
        maxScore = 24 - scores.blood
      }

      // Update constitution results with calculated scores
      const updatedResults = constitutionTypes.map(type => ({
        ...type,
        score: type.type === primaryType ? Math.round((maxScore / 24) * 100) : 0
      }))

      // Sort by score
      updatedResults.sort((a, b) => b.score - a.score)

      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setIsLoading(false)
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const newAnswers = [...answers]
      newAnswers.pop()
      setAnswers(newAnswers)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Brain className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Constitution</h2>
            <p className="text-gray-600 mb-6">Our AI is processing your responses using Traditional Chinese Medicine principles...</p>
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const primaryResult = constitutionTypes.find(type => type.score > 0) || constitutionTypes[0]
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Constitution Test', href: '/constitution-test' }
              ]} 
            />

            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Constitution Analysis</h1>
              <p className="text-xl text-gray-600">Based on Traditional Chinese Medicine principles</p>
            </div>

            {/* Primary Result */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-600 mb-2">{primaryResult.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{primaryResult.chineseName}</p>
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">{primaryResult.score}%</span>
                </div>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">{primaryResult.description}</p>
              </div>

              {/* Characteristics */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Constitution Characteristics</h3>
                  <ul className="space-y-2">
                    {primaryResult.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Common Symptoms to Watch</h3>
                  <ul className="space-y-2">
                    {primaryResult.commonSymptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommended Herbs */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <Leaf className="w-6 h-6 text-green-600 mr-3" />
                Recommended Herbs for Your Constitution
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {primaryResult.recommendedHerbs.map((herb, index) => (
                  <div key={index} className="bg-green-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-green-800 mb-2">{herb.name}</h4>
                    <p className="text-sm text-green-700 italic mb-3">{herb.chineseName}</p>
                    <p className="text-gray-700 text-sm mb-3">{herb.benefits}</p>
                    <div className="bg-white p-2 rounded-lg">
                      <span className="text-xs text-green-600 font-medium">Recommended Dosage:</span>
                      <p className="text-xs text-gray-600">{herb.dosage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle & Diet */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Heart className="w-6 h-6 text-red-600 mr-3" />
                  Lifestyle Recommendations
                </h3>
                <ul className="space-y-3">
                  {primaryResult.lifestyle.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Dietary Guidelines</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">✅ Beneficial Foods</h4>
                    <div className="flex flex-wrap gap-2">
                      {primaryResult.foods.beneficial.map((food, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">❌ Foods to Limit</h4>
                    <div className="flex flex-wrap gap-2">
                      {primaryResult.foods.avoid.map((food, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="space-x-4">
                <button
                  onClick={resetTest}
                  className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  Retake Test
                </button>
                <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Find My Herbs
                </button>
              </div>
              
              {/* Disclaimer */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h4>
                    <p className="text-yellow-700 text-sm leading-relaxed">
                      This constitution analysis is based on Traditional Chinese Medicine theory and is for educational purposes only. 
                      Results should not replace professional medical diagnosis or treatment. Always consult with qualified healthcare 
                      practitioners before starting any herbal regimen, especially if you have health conditions or take medications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Test', href: '/constitution-test' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Constitution Analysis</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover your Traditional Chinese Medicine constitution type and get personalized herb recommendations
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <div className="text-sm text-purple-600 font-medium mb-2">
                {questions[currentQuestion].category}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-6 text-left bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 rounded-2xl transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 group-hover:text-purple-900">{option.text}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {currentQuestion > 0 && (
            <div className="text-center">
              <button
                onClick={goBack}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          )}

          {/* Info */}
          <div className="text-center mt-8">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">5,000+ Analyzed</h3>
                <p className="text-sm text-gray-600">Constitutions analyzed monthly</p>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">AI-Powered</h3>
                <p className="text-sm text-gray-600">Based on 3,000 years of TCM wisdom</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
                <p className="text-sm text-gray-600">Your data stays completely private</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
</rewritten_file>