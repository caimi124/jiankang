'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import HerbRecommendations from '../../components/HerbRecommendations'
import { herbRecommendationEngine } from '../../lib/herbs-recommendation'
import type { Herb } from '../../lib/herbs-recommendation'
import { CheckCircle, Brain, ArrowLeft, ArrowRight, Star, Heart, Zap, Shield, Leaf, Mail, Download, Eye, Users, Award, Clock, FileText, Lightbulb } from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  subtitle?: string
  options: Array<{
    text: string
    score: {
      fire: number
      earth: number
      metal: number
      water: number
      wood: number
    }
  }>
}

interface ConstitutionResult {
  type: string
  name: string
  subtitle: string
  description: string
  characteristics: string[]
  wellnessAdvice: string[]
  recommendedSupplements: Array<{
    name: string
    benefit: string
    timing: string
  }>
  lifestyle: string[]
  nutrition: {
    include: string[]
    limit: string[]
  }
  score: number
  color: string
  icon: React.ReactNode
}

export default function ConstitutionTestPage() {
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

  const questions: Question[] = [
    {
      id: 1,
      category: "Energy & Vitality",
      question: "How would you describe your natural energy levels?",
      subtitle: "Think about your baseline energy when you're well-rested and healthy",
      options: [
        { 
          text: "High energy, naturally active and driven", 
          score: { fire: 3, earth: 1, metal: 2, water: 0, wood: 2 }
        },
        { 
          text: "Steady, consistent energy throughout the day", 
          score: { fire: 1, earth: 3, metal: 2, water: 2, wood: 1 }
        },
        { 
          text: "Calm energy, prefer gentle activities", 
          score: { fire: 0, earth: 2, metal: 3, water: 3, wood: 0 }
        },
        { 
          text: "Variable energy, tends to come in bursts", 
          score: { fire: 2, earth: 0, metal: 1, water: 1, wood: 3 }
        }
      ]
    },
    {
      id: 2,
      category: "Physical Preferences",
      question: "What type of climate and environment do you prefer?",
      subtitle: "Consider where you feel most comfortable and energized",
      options: [
        { 
          text: "Warm, sunny environments with lots of activity", 
          score: { fire: 3, earth: 2, metal: 0, water: 0, wood: 1 }
        },
        { 
          text: "Moderate, stable temperatures with comfort", 
          score: { fire: 1, earth: 3, metal: 2, water: 1, wood: 1 }
        },
        { 
          text: "Cool, crisp environments with fresh air", 
          score: { fire: 0, earth: 1, metal: 3, water: 2, wood: 2 }
        },
        { 
          text: "Quiet, peaceful places near water or nature", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 3 }
        }
      ]
    },
    {
      id: 3,
      category: "Sleep & Recovery",
      question: "How do you typically sleep and recover?",
      subtitle: "Think about your natural sleep patterns and recovery needs",
      options: [
        { 
          text: "Fall asleep quickly, sleep lightly, wake up early", 
          score: { fire: 3, earth: 1, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "Need routine, sleep deeply, wake up gradually", 
          score: { fire: 1, earth: 3, metal: 2, water: 2, wood: 0 }
        },
        { 
          text: "Light sleeper, prefer cool room, wake refreshed", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "Deep sleeper, need lots of rest, slow to wake", 
          score: { fire: 0, earth: 2, metal: 1, water: 3, wood: 0 }
        }
      ]
    },
    {
      id: 4,
      category: "Emotional Patterns",
      question: "How do you typically handle stress and emotions?",
      subtitle: "Consider your natural emotional responses and coping styles",
      options: [
        { 
          text: "Intense emotions, quick to react, then move on", 
          score: { fire: 3, earth: 0, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "Steady emotions, worry about others, seek harmony", 
          score: { fire: 1, earth: 3, metal: 1, water: 1, wood: 0 }
        },
        { 
          text: "Controlled emotions, analyze situations, structured approach", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "Deep emotions, introspective, need time to process", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 1 }
        }
      ]
    },
    {
      id: 5,
      category: "Social & Communication",
      question: "How do you prefer to interact socially?",
      subtitle: "Think about your natural communication style and social energy",
      options: [
        { 
          text: "Outgoing, enjoy being center of attention, energized by people", 
          score: { fire: 3, earth: 2, metal: 0, water: 0, wood: 1 }
        },
        { 
          text: "Warm and caring, enjoy helping others, prefer small groups", 
          score: { fire: 1, earth: 3, metal: 1, water: 1, wood: 0 }
        },
        { 
          text: "Professional and polite, prefer structured interactions", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "Quiet and thoughtful, prefer one-on-one or solitude", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 2 }
        }
      ]
    },
    {
      id: 6,
      category: "Physical Constitution",
      question: "What best describes your physical build and tendencies?",
      subtitle: "Consider your natural body type and physical characteristics",
      options: [
        { 
          text: "Lean and wiry, run warm, quick movements", 
          score: { fire: 3, earth: 0, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "Solid build, good muscle tone, steady strength", 
          score: { fire: 1, earth: 3, metal: 2, water: 1, wood: 0 }
        },
        { 
          text: "Refined features, good posture, precise movements", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "Soft features, retain water, prefer gentle movement", 
          score: { fire: 0, earth: 2, metal: 1, water: 3, wood: 0 }
        }
      ]
    },
    {
      id: 7,
      category: "Digestive Patterns",
      question: "How would you describe your appetite and digestion?",
      subtitle: "Think about your natural eating patterns and digestive comfort",
      options: [
        { 
          text: "Strong appetite, eat quickly, prefer variety", 
          score: { fire: 3, earth: 1, metal: 0, water: 0, wood: 2 }
        },
        { 
          text: "Regular appetite, enjoy comfort foods, eat socially", 
          score: { fire: 1, earth: 3, metal: 1, water: 1, wood: 0 }
        },
        { 
          text: "Moderate appetite, prefer simple foods, eat mindfully", 
          score: { fire: 0, earth: 1, metal: 3, water: 2, wood: 1 }
        },
        { 
          text: "Variable appetite, sensitive digestion, prefer warm foods", 
          score: { fire: 0, earth: 2, metal: 1, water: 3, wood: 1 }
        }
      ]
    },
    {
      id: 8,
      category: "Mental Focus",
      question: "How do you prefer to learn and process information?",
      subtitle: "Consider your natural thinking style and focus patterns",
      options: [
        { 
          text: "Quick learner, like challenges, think on your feet", 
          score: { fire: 3, earth: 0, metal: 1, water: 0, wood: 2 }
        },
        { 
          text: "Steady learner, like practical application, learn by doing", 
          score: { fire: 1, earth: 3, metal: 2, water: 1, wood: 0 }
        },
        { 
          text: "Detailed learner, like organization, methodical approach", 
          score: { fire: 0, earth: 1, metal: 3, water: 1, wood: 1 }
        },
        { 
          text: "Deep learner, like understanding concepts, reflective approach", 
          score: { fire: 0, earth: 1, metal: 1, water: 3, wood: 2 }
        }
      ]
    }
  ]

  const constitutionTypes: ConstitutionResult[] = [
    {
      type: "fire",
      name: "Dynamic Fire",
      subtitle: "The Energetic Leader",
      description: "You have a vibrant, high-energy constitution with natural leadership qualities. You thrive on activity, social interaction, and new challenges. Your dynamic nature brings joy and motivation to others.",
      characteristics: [
        "High energy and enthusiasm",
        "Natural leadership abilities",
        "Quick thinking and decision-making",
        "Enjoys social interaction and networking",
        "Thrives on variety and new experiences"
      ],
      wellnessAdvice: [
        "Maintain regular cardio exercise to channel your energy",
        "Practice stress management to avoid burnout",
        "Ensure adequate rest between high-intensity activities",
        "Stay hydrated, especially during active periods"
      ],
      recommendedSupplements: [
        {
          name: "Rhodiola Root",
          benefit: "Helps manage stress and maintain energy balance",
          timing: "Morning with breakfast"
        },
        {
          name: "Magnesium",
          benefit: "Supports muscle recovery and calm energy",
          timing: "Evening before bed"
        },
        {
          name: "B-Complex",
          benefit: "Sustains natural energy production",
          timing: "With morning meal"
        }
      ],
      lifestyle: [
        "Regular cardio exercise (running, cycling, dancing)",
        "Varied workout routines to maintain interest",
        "Social fitness activities like group classes",
        "Meditation or yoga for balance"
      ],
      nutrition: {
        include: ["Lean proteins", "Fresh fruits", "Cooling vegetables", "Green tea", "Omega-3 rich foods"],
        limit: ["Excessive caffeine", "Spicy foods", "Alcohol", "Processed sugars", "Heavy meals"]
      },
      score: 0,
      color: "from-red-400 to-orange-500",
      icon: <Zap className="w-8 h-8" />
    },
    {
      type: "earth",
      name: "Grounded Earth",
      subtitle: "The Nurturing Stabilizer",
      description: "You have a stable, nurturing constitution that provides strength and support to others. You excel at creating harmony, building relationships, and maintaining steady progress toward your goals.",
      characteristics: [
        "Naturally caring and supportive",
        "Excellent at building and maintaining relationships",
        "Steady, reliable energy and work ethic",
        "Good at mediating and creating harmony",
        "Practical approach to problem-solving"
      ],
      wellnessAdvice: [
        "Maintain regular meal times for digestive health",
        "Include strength training for muscle support",
        "Practice setting healthy boundaries",
        "Engage in grounding activities like gardening"
      ],
      recommendedSupplements: [
        {
          name: "Digestive Enzymes",
          benefit: "Supports healthy digestion and nutrient absorption",
          timing: "With main meals"
        },
        {
          name: "Probiotics",
          benefit: "Maintains healthy gut microbiome",
          timing: "Morning on empty stomach"
        },
        {
          name: "Iron (if needed)",
          benefit: "Supports energy and healthy blood",
          timing: "With vitamin C source"
        }
      ],
      lifestyle: [
        "Regular strength training and resistance exercises",
        "Walking in nature or hiking",
        "Cooking and sharing meals with others",
        "Community volunteer work"
      ],
      nutrition: {
        include: ["Whole grains", "Root vegetables", "Lean proteins", "Warming spices", "Herbal teas"],
        limit: ["Excessive dairy", "Cold foods", "Irregular eating", "Processed foods", "Emotional eating"]
      },
      score: 0,
      color: "from-yellow-400 to-amber-500",
      icon: <Heart className="w-8 h-8" />
    },
    {
      type: "metal",
      name: "Refined Metal",
      subtitle: "The Organized Achiever",
      description: "You have a precise, organized constitution with excellent attention to detail. You excel at creating systems, maintaining high standards, and achieving long-term goals through disciplined effort.",
      characteristics: [
        "Highly organized and methodical",
        "Excellent attention to detail",
        "Strong sense of quality and standards",
        "Natural ability to create efficient systems",
        "Values precision and excellence"
      ],
      wellnessAdvice: [
        "Maintain regular breathing exercises for lung health",
        "Include flexibility training to prevent rigidity",
        "Practice letting go of perfectionist tendencies",
        "Ensure adequate fresh air and clean environment"
      ],
      recommendedSupplements: [
        {
          name: "Vitamin C",
          benefit: "Supports immune function and antioxidant protection",
          timing: "Morning with breakfast"
        },
        {
          name: "NAC (N-Acetyl Cysteine)",
          benefit: "Supports respiratory health and detoxification",
          timing: "Between meals"
        },
        {
          name: "Zinc",
          benefit: "Supports immune function and healing",
          timing: "Evening with food"
        }
      ],
      lifestyle: [
        "Regular yoga or Pilates for flexibility",
        "Breathing exercises and meditation",
        "Organized fitness routines",
        "Time in clean, fresh air environments"
      ],
      nutrition: {
        include: ["White foods (garlic, onions, pears)", "Lung-supporting foods", "Light proteins", "Gentle spices", "Pure water"],
        limit: ["Dairy products", "Mucus-forming foods", "Excessive raw foods", "Heavy, greasy meals", "Artificial additives"]
      },
      score: 0,
      color: "from-gray-300 to-slate-400",
      icon: <Shield className="w-8 h-8" />
    },
    {
      type: "water",
      name: "Flowing Water",
      subtitle: "The Wise Contemplator",
      description: "You have a deep, reflective constitution with natural wisdom and resilience. You excel at long-term thinking, adapting to change, and providing thoughtful insights to complex situations.",
      characteristics: [
        "Deep thinking and philosophical nature",
        "Natural wisdom and good judgment",
        "Excellent long-term planning abilities",
        "Adaptable and resilient under pressure",
        "Values knowledge and understanding"
      ],
      wellnessAdvice: [
        "Maintain consistent sleep schedule for recovery",
        "Include gentle, flowing exercises",
        "Practice stress reduction techniques",
        "Ensure adequate rest and recovery time"
      ],
      recommendedSupplements: [
        {
          name: "Omega-3 Fatty Acids",
          benefit: "Supports brain health and cognitive function",
          timing: "With main meal"
        },
        {
          name: "Vitamin D",
          benefit: "Supports bone health and mood regulation",
          timing: "Morning with healthy fats"
        },
        {
          name: "Adaptogenic Herbs (Ashwagandha)",
          benefit: "Helps manage stress and support adrenal health",
          timing: "Evening before bed"
        }
      ],
      lifestyle: [
        "Swimming or water-based exercises",
        "Gentle yoga or tai chi",
        "Regular meditation practice",
        "Adequate sleep and rest periods"
      ],
      nutrition: {
        include: ["Dark leafy greens", "Nuts and seeds", "Kidney-supporting foods", "Warming soups", "Mineral-rich foods"],
        limit: ["Excessive salt", "Cold drinks", "Late-night eating", "Alcohol", "Overstimulating foods"]
      },
      score: 0,
      color: "from-blue-400 to-cyan-500",
      icon: <Brain className="w-8 h-8" />
    },
    {
      type: "wood",
      name: "Growing Wood",
      subtitle: "The Visionary Innovator",
      description: "You have a creative, growth-oriented constitution with natural vision and flexibility. You excel at seeing possibilities, adapting to change, and inspiring others with your innovative ideas.",
      characteristics: [
        "Creative and innovative thinking",
        "Natural vision for future possibilities",
        "Flexible and adaptable to change",
        "Strong sense of justice and fairness",
        "Enjoys growth and learning opportunities"
      ],
      wellnessAdvice: [
        "Include regular stretching and flexibility work",
        "Practice emotional regulation techniques",
        "Ensure regular movement to avoid stagnation",
        "Maintain work-life balance for optimal creativity"
      ],
      recommendedSupplements: [
        {
          name: "Milk Thistle",
          benefit: "Supports liver health and detoxification",
          timing: "Between meals"
        },
        {
          name: "B-Complex with Folate",
          benefit: "Supports nervous system and cellular growth",
          timing: "Morning with breakfast"
        },
        {
          name: "Turmeric",
          benefit: "Supports healthy inflammation response",
          timing: "With main meal"
        }
      ],
      lifestyle: [
        "Dynamic movement like dance or martial arts",
        "Regular stretching and flexibility training",
        "Creative activities and hobbies",
        "Time in nature for inspiration"
      ],
      nutrition: {
        include: ["Green vegetables", "Sour flavors", "Healthy fats", "Liver-supporting foods", "Fresh herbs"],
        limit: ["Excessive alcohol", "Fried foods", "Processed foods", "Irregular eating", "Excessive fats"]
      },
      score: 0,
      color: "from-green-400 to-emerald-500",
      icon: <Star className="w-8 h-8" />
    }
  ]

  // Demo result for preview
  const demoResult = {
    type: 'fire',
    name: 'Fire Constitution',
    subtitle: 'Energetic • Creative • Passionate',
    description: 'You have a naturally high energy, warm personality, and love being active. Fire types are often creative, enthusiastic leaders who thrive in dynamic environments.',
    characteristics: [
      'High natural energy and enthusiasm',
      'Warm and charismatic personality',
      'Creative and innovative thinking',
      'Natural leadership qualities'
    ],
    wellnessAdvice: [
      'Balance intense activity with cooling practices',
      'Include meditation to calm the mind',
      'Stay hydrated and avoid overheating',
      'Practice stress management techniques'
    ],
    recommendedSupplements: [
      { name: 'Schisandra Berry', benefit: 'Calms excess fire energy', timing: 'Evening' },
      { name: 'White Peony Root', benefit: 'Balances emotional intensity', timing: 'Afternoon' },
      { name: 'Chrysanthemum', benefit: 'Cooling and calming', timing: 'As needed' }
    ],
    lifestyle: [
      'Regular exercise with cooling elements (swimming, yoga)',
      'Consistent sleep schedule (fire types often stay up late)',
      'Mindfulness and meditation practices',
      'Balanced work-life boundaries'
    ],
    nutrition: {
      include: ['Cooling foods like cucumber, watermelon, green tea', 'Balanced meals with complex carbs', 'Anti-inflammatory herbs'],
      limit: ['Excessive spicy foods', 'Too much caffeine', 'Alcohol in excess']
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
          setShowEmailCapture(true) // Show email capture after results
        }, 3000)
    }
    }, 600)
  }

  const calculateResults = (allAnswers: number[]) => {
    setIsLoading(true)
    
    setTimeout(async () => {
      const scores = {
        fire: 0,
        earth: 0,
        metal: 0,
        water: 0,
        wood: 0
      }

      allAnswers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex]
        const selectedOption = question.options[answerIndex]
        
        Object.keys(scores).forEach(key => {
          scores[key as keyof typeof scores] += selectedOption.score[key as keyof typeof selectedOption.score]
        })
      })

      // Find primary constitution type
      let primaryType = 'earth' // default
      let maxScore = 0
      
      Object.entries(scores).forEach(([type, score]) => {
        if (score > maxScore) {
          maxScore = score
          primaryType = type
        }
      })

      // Get secondary constitution types
      const secondaryTypes = Object.entries(scores)
        .filter(([type, score]) => type !== primaryType && score > 5)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([type]) => type)

      // Update constitution results with calculated scores
      const updatedResults = constitutionTypes.map(type => ({
        ...type,
        score: type.type === primaryType ? Math.min(95, Math.max(75, Math.round((maxScore / 24) * 100))) : Math.round((scores[type.type as keyof typeof scores] / 24) * 100)
      }))

      // Sort by score
      updatedResults.sort((a, b) => b.score - a.score)

      // Get herb recommendations
      setIsLoadingHerbs(true)
      try {
        const recommendations = await herbRecommendationEngine.generatePersonalizedRecommendations(
          primaryType,
          secondaryTypes,
          ['stress', 'immunity', 'energy'], // Common health goals
          ['high', 'medium'] // Safety preference
        )
        
        setHerbRecommendations({
          primary: recommendations.primary,
          secondary: recommendations.secondary,
          all: recommendations.all
        })
      } catch (error) {
        console.error('Error loading herb recommendations:', error)
        setHerbRecommendations({ primary: [], secondary: [], all: [] })
      }
      setIsLoadingHerbs(false)

      setIsLoading(false)
      setShowResults(true)
    }, 2500)
  }

  const resetTest = () => {
    setCurrentQuestion(-1)
    setAnswers([])
    setShowResults(false)
    setIsLoading(false)
    setSelectedAnswer(null)
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
    
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
    
    // Simulate API call
    setTimeout(() => {
      setShowEmailCapture(false)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto">
            <div className="relative mb-8">
              <Brain className="w-20 h-20 text-indigo-600 mx-auto mb-4 animate-pulse" />
              <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-25"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyzing Your Constitution</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Our advanced assessment is processing your responses using principles from Traditional Chinese Medicine, adapted for modern wellness understanding...</p>
            <div className="w-80 bg-gray-200 rounded-full h-3 mx-auto mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full animate-pulse" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const primaryResult = constitutionTypes.find(type => type.score > 0) || constitutionTypes[0]
    const secondaryResults = constitutionTypes.filter(type => type.type !== primaryResult.type).slice(0, 2)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Constitution Assessment', href: '/constitution-test' }
              ]} 
            />

            {/* Email Capture Modal */}
            {showEmailCapture && !emailSubmitted && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Complete Report</h3>
                    <p className="text-gray-600">Download your detailed constitution analysis plus our "Top 10 Herbs for Your Type" guide</p>
                  </div>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 inline mr-2" />
                      Get My Report (Free)
                    </button>
                  </form>
                  
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowEmailCapture(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {emailSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h4 className="text-green-800 font-semibold">Report Sent!</h4>
                    <p className="text-green-700 text-sm">Check your email for your detailed constitution report and herb guide.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="text-center mb-16">
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${primaryResult.color} rounded-full mb-6 shadow-lg`}>
                <div className="text-white">{primaryResult.icon}</div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Wellness Constitution</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover your unique mind-body pattern and personalized wellness roadmap</p>
            </div>

            {/* Primary Result */}
            <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border border-gray-100">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{primaryResult.name}</h2>
                <p className="text-xl text-gray-600 mb-6">{primaryResult.subtitle}</p>
                <div className={`w-40 h-40 bg-gradient-to-br ${primaryResult.color} rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg`}>
                  <span className="text-5xl font-bold text-white">{primaryResult.score}%</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">{primaryResult.description}</p>
              </div>

              {/* Characteristics */}
              <div className="grid lg:grid-cols-2 gap-10 mb-10">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    Your Natural Strengths
                  </h3>
                  <ul className="space-y-4">
                    {primaryResult.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-lg">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                    <Heart className="w-6 h-6 text-blue-600 mr-3" />
                    Wellness Guidance
                  </h3>
                  <ul className="space-y-4">
                    {primaryResult.wellnessAdvice.map((advice, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-lg">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Database Connection CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-12 border border-emerald-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Your Recommended Herbs</h3>
                <p className="text-gray-700 mb-6">Access our comprehensive herb database to learn more about the plants that support your {primaryResult.name.toLowerCase()} constitution.</p>
                <a
                  href={`/herb-finder?constitution=${primaryResult.type}`}
                  className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Browse Herbs for Your Type
                </a>
              </div>
            </div>

            {/* Detailed Recommendations */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Supplements */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Zap className="w-6 h-6 text-purple-600 mr-3" />
                  Recommended Supplements
                </h3>
                <div className="space-y-6">
                  {primaryResult.recommendedSupplements.map((supplement, index) => (
                    <div key={index} className="bg-purple-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-purple-800 mb-2">{supplement.name}</h4>
                      <p className="text-gray-700 text-sm mb-2">{supplement.benefit}</p>
                      <p className="text-xs text-gray-600"><strong>Best Time:</strong> {supplement.timing}</p>
                      <a
                        href={`/herb-finder?search=${supplement.name.toLowerCase()}`}
                        className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium mt-2"
                      >
                        Learn More <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Star className="w-6 h-6 text-orange-600 mr-3" />
                  Ideal Lifestyle
                </h3>
                <ul className="space-y-4">
                  {primaryResult.lifestyle.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nutrition */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Heart className="w-6 h-6 text-green-600 mr-3" />
                  Nutrition Guide
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">Emphasize:</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{primaryResult.nutrition.include.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">Moderate:</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{primaryResult.nutrition.limit.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Types */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">Your Secondary Constitution Traits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {secondaryResults.map((result, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${result.color} rounded-full flex items-center justify-center mr-4`}>
                        <div className="text-white text-sm">{result.icon}</div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{result.name}</h4>
                        <p className="text-sm text-gray-600">{result.score}% match</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Herb Recommendations */}
            <div className="mb-12">
              {isLoadingHerbs ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
                  <div className="relative mb-6">
                    <Leaf className="w-16 h-16 text-green-600 mx-auto animate-pulse" />
                    <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Herb Recommendations</h3>
                  <p className="text-gray-600">Finding the perfect herbal supplements for your constitution...</p>
                </div>
              ) : (
                <HerbRecommendations 
                  herbs={herbRecommendations.all}
                  title="Personalized Herb Recommendations"
                  subtitle={`Based on your ${primaryResult.name} constitution type`}
                  showDetailed={true}
                  maxVisible={6}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={resetTest}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Take Assessment Again
              </button>
                <a
                  href="/herb-finder"
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg transform hover:scale-105 inline-flex items-center"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Explore All Herbs
                </a>
              </div>
              <p className="text-gray-600 text-sm">Share your results with your healthcare provider for personalized guidance</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Demo Results Screen
  if (showDemoResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Constitution Assessment', href: '/constitution-test' }
              ]} 
            />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
              <div className="flex items-center">
                <Eye className="w-6 h-6 text-amber-600 mr-3" />
                <div>
                  <h4 className="text-amber-800 font-semibold">Sample Result Preview</h4>
                  <p className="text-amber-700 text-sm">This is an example of what your personalized results will look like.</p>
                </div>
              </div>
            </div>

            {/* Demo Result Display */}
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
                    Natural Strengths
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
                    Wellness Guidance
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
                <p className="text-gray-600 mb-6">Your actual results will include detailed supplement recommendations, lifestyle guidance, and personalized herb matches from our database.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={startTest}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    Take Real Assessment
                  </button>
                  <button
                    onClick={backToWelcome}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Back to Overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Enhanced Welcome Screen
  if (currentQuestion === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Constitution Assessment', href: '/constitution-test' }
              ]} 
            />

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8 shadow-lg animate-pulse">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                🧪 Discover Your Herbal Constitution
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                Answer 8 quick questions to learn your body type according to traditional herbal medicine.<br/>
                We'll match you with herbs that best suit your needs — scientifically and naturally.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-lg text-gray-700 mb-12">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>2 minutes</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>10,000+ completed</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>Science-backed</span>
                </div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-5xl mx-auto mb-12 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">✅ What You'll Discover</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Personalized Herb Recommendations</h3>
                  <p className="text-gray-600 text-sm">Discover which herbs work best for your unique constitution</p>
                  </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Know Your Body's Imbalances</h3>
                  <p className="text-gray-600 text-sm">Understand your natural strengths and areas to support</p>
                  </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <FileText className="w-8 h-8 text-white" />
                    </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Free Constitution Report (PDF Download)</h3>
                  <p className="text-gray-600 text-sm">Get your complete analysis in a beautiful, shareable format</p>
                  </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Get Safe, Science-Backed Suggestions</h3>
                  <p className="text-gray-600 text-sm">for Your Health Goals</p>
                  </div>
                </div>
              </div>

            {/* Assessment Details */}
            <div className="bg-indigo-50 rounded-2xl p-8 max-w-3xl mx-auto mb-12 border border-indigo-100">
              <h3 className="text-xl font-semibold text-indigo-900 mb-6 text-center">📋 Assessment Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                    <span className="text-indigo-800">8 comprehensive questions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                    <span className="text-indigo-800">3-5 minutes to complete</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                    <span className="text-indigo-800">Evidence-based approach</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-indigo-800">Instant personalized results</span>
                  </div>
                </div>
              </div>

            {/* Action Buttons */}
            <div className="text-center space-y-6">
              <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={startTest}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105 inline-flex items-center"
              >
                Begin Your Assessment
                <ArrowRight className="w-6 h-6 ml-3" />
              </button>
                <button
                  onClick={showDemo}
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Show Example Result
                </button>
              </div>
              
              <p className="text-gray-500 text-sm">
                This assessment is for educational purposes and does not replace professional medical advice
              </p>
            </div>

            {/* SEO Content - What We Analyze */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Is Herbal Constitution?</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Your constitution, in herbal medicine, reflects your body's balance of energy, moisture, temperature, and stress response. 
                  Understanding it helps us recommend the best herbs for your body type, based on thousands of years of traditional wisdom 
                  combined with modern scientific understanding.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Herbal Constitutions</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Fire Type
                    </h4>
                    <p className="text-red-700 text-sm">High energy, passionate, creative. May benefit from cooling and calming herbs.</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Earth Type
                    </h4>
                    <p className="text-yellow-700 text-sm">Stable, nurturing, centered. Benefits from digestive and grounding herbs.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Metal Type
                    </h4>
                    <p className="text-gray-700 text-sm">Structured, refined, precise. Benefits from respiratory and immune-supporting herbs.</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Water Type
                    </h4>
                    <p className="text-blue-700 text-sm">Deep, introspective, adaptable. Benefits from kidney and adrenal-supporting herbs.</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                      <Leaf className="w-5 h-5 mr-2" />
                      Wood Type
                    </h4>
                    <p className="text-green-700 text-sm">Dynamic, ambitious, visionary. Benefits from liver-supporting and stress-reducing herbs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🌿 Connected to Our Herb Database</h3>
                <p className="text-gray-700 text-center mb-6">
                  Your constitution results automatically connect to our comprehensive herb database with over 1,000+ herbs, 
                  allowing you to explore detailed information about each recommended plant.
                </p>
                <div className="flex justify-center">
                  <a
                    href="/herb-finder"
                    className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    Explore Herb Database
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Question Screen (existing code with minor enhancements)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Constitution Assessment', href: '/constitution-test' }
            ]} 
          />

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-600 font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-lg text-gray-600 font-medium">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
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
                Previous
              </button>
              
              <div className="text-gray-500 text-center">
                <Lightbulb className="w-5 h-5 inline mr-2" />
                Choose the option that best describes you
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 