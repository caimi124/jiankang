'use client'

import { useState } from 'react'
import { Play, Pause, RotateCcw, ArrowRight, Zap, Target, Shield } from 'lucide-react'

interface AnimationStep {
  id: number
  title: string
  description: string
  visual: string
  duration: number
}

const steps: AnimationStep[] = [
  {
    id: 1,
    title: "Herb Ingestion",
    description: "You take the herbal supplement or tea",
    visual: "🫖",
    duration: 1000
  },
  {
    id: 2,
    title: "Digestive Processing",
    description: "Your gut microbiome breaks down the plant compounds",
    visual: "🦠",
    duration: 1500
  },
  {
    id: 3,
    title: "Bloodstream Absorption",
    description: "Active compounds enter your bloodstream",
    visual: "🩸",
    duration: 1200
  },
  {
    id: 4,
    title: "Cellular Interaction",
    description: "Compounds interact with your body's systems",
    visual: "⚡",
    duration: 1800
  },
  {
    id: 5,
    title: "Constitution Response",
    description: "Your unique body type determines the effect",
    visual: "🎯",
    duration: 1000
  }
]

export default function HerbActionMechanism() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedMechanism, setSelectedMechanism] = useState<'absorption' | 'metabolism' | 'response'>('absorption')

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    
    const animate = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setIsAnimating(false)
        return
      }
      
      setCurrentStep(stepIndex)
      setTimeout(() => animate(stepIndex + 1), steps[stepIndex].duration)
    }
    
    animate(0)
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setCurrentStep(0)
  }

  const mechanisms = {
    absorption: {
      title: "Absorption Varies by Person",
      icon: <Target className="w-6 h-6" />,
      description: "Your gut health, genetics, and current medications affect how well you absorb herbal compounds.",
      factors: [
        "Gut microbiome composition",
        "Digestive enzyme levels", 
        "Food timing and interactions",
        "Genetic absorption variants"
      ]
    },
    metabolism: {
      title: "Metabolism Speed Differs",
      icon: <Zap className="w-6 h-6" />,
      description: "Some people process herbs quickly, others slowly. This affects dosage and timing.",
      factors: [
        "Liver enzyme activity",
        "Age and body weight",
        "Overall metabolic rate",
        "Other supplements/medications"
      ]
    },
    response: {
      title: "Constitutional Response",
      icon: <Shield className="w-6 h-6" />,
      description: "Your body's baseline state determines whether an herb helps, harms, or has no effect.",
      factors: [
        "Current energy levels",
        "Hot vs cold constitution",
        "Stress and inflammation",
        "Existing health conditions"
      ]
    }
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How Herbs Work in Your Body
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding the journey from plant to effect helps explain why results vary between individuals.
        </p>
      </div>

      {/* Animated Process Flow */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-100">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
            Interactive Process Animation
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              {isAnimating ? 'Playing...' : 'Start Animation'}
            </button>
            <button
              onClick={resetAnimation}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Animation Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div 
                className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-500 ${
                  currentStep === index && isAnimating
                    ? 'border-green-500 bg-white shadow-lg scale-105'
                    : currentStep > index
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className={`text-4xl mb-3 transition-transform duration-300 ${
                  currentStep === index && isAnimating ? 'animate-bounce' : ''
                }`}>
                  {step.visual}
                </div>
                <div className="text-sm font-semibold text-gray-900 text-center mb-2">
                  {step.title}
                </div>
                <div className="text-xs text-gray-600 text-center leading-tight">
                  {step.description}
                </div>
              </div>
              
              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRight className={`w-4 h-4 ${
                    currentStep > index ? 'text-green-500' : 'text-gray-300'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mechanism Details */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h3 className="text-xl font-bold mb-2">Why Results Vary: The Science</h3>
          <p className="text-blue-100">
            Three key factors determine how herbs affect you personally
          </p>
        </div>

        {/* Mechanism Tabs */}
        <div className="flex border-b border-gray-200">
          {Object.entries(mechanisms).map(([key, mechanism]) => (
            <button
              key={key}
              onClick={() => setSelectedMechanism(key as any)}
              className={`flex-1 flex items-center justify-center p-4 font-medium transition-colors ${
                selectedMechanism === key
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {mechanism.icon}
              <span className="ml-2 hidden sm:inline">{mechanism.title}</span>
            </button>
          ))}
        </div>

        {/* Mechanism Content */}
        <div className="p-6">
          {(() => {
            const mechanism = mechanisms[selectedMechanism]
            return (
              <div>
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 mr-3">
                    {mechanism.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {mechanism.title}
                  </h4>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {mechanism.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mechanism.factors.map((factor, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-4">💡</div>
          <div>
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">Key Insight</h4>
            <p className="text-yellow-700 leading-relaxed">
              This is why <strong>constitution testing</strong> is so valuable—it helps predict how your unique 
              biological profile will respond to specific herbs, saving you time and money on trial and error.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
