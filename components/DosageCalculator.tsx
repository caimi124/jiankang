'use client'

import { useState } from 'react'
import { Calculator, AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface HerbData {
  name: string
  standardDosage: {
    min: number
    max: number
    unit: string
  }
  weightAdjustment: boolean
  ageConsiderations: {
    elderly: number // multiplier
    young: number // multiplier
  }
  contraindications: string[]
  notes: string
}

interface UserProfile {
  weight: number
  age: number
  gender: 'male' | 'female' | 'other'
  healthConditions: string[]
  medications: string[]
  experience: 'beginner' | 'intermediate' | 'advanced'
}

export default function DosageCalculator() {
  const [selectedHerb, setSelectedHerb] = useState<string>('')
  const [userProfile, setUserProfile] = useState<UserProfile>({
    weight: 0,
    age: 0,
    gender: 'other',
    healthConditions: [],
    medications: [],
    experience: 'beginner'
  })
  const [calculation, setCalculation] = useState<any>(null)
  const [showWarnings, setShowWarnings] = useState<string[]>([])

  const herbs: Record<string, HerbData> = {
    'ashwagandha': {
      name: 'Ashwagandha',
      standardDosage: { min: 300, max: 600, unit: 'mg' },
      weightAdjustment: true,
      ageConsiderations: { elderly: 0.75, young: 0.8 },
      contraindications: ['pregnancy', 'autoimmune disorders', 'sedatives'],
      notes: 'Best taken with food to reduce stomach upset'
    },
    'turmeric': {
      name: 'Turmeric (Curcumin)',
      standardDosage: { min: 500, max: 1000, unit: 'mg' },
      weightAdjustment: true,
      ageConsiderations: { elderly: 0.8, young: 0.9 },
      contraindications: ['blood thinners', 'gallstones', 'diabetes medications'],
      notes: 'Take with black pepper for better absorption'
    },
    'ginseng': {
      name: 'Ginseng',
      standardDosage: { min: 200, max: 400, unit: 'mg' },
      weightAdjustment: false,
      ageConsiderations: { elderly: 0.7, young: 0.8 },
      contraindications: ['blood pressure medications', 'diabetes medications', 'blood thinners'],
      notes: 'Avoid taking in the evening as it may affect sleep'
    },
    'rhodiola': {
      name: 'Rhodiola',
      standardDosage: { min: 200, max: 600, unit: 'mg' },
      weightAdjustment: true,
      ageConsiderations: { elderly: 0.8, young: 0.9 },
      contraindications: ['bipolar disorder', 'anxiety medications'],
      notes: 'Best taken on an empty stomach in the morning'
    }
  }

  const calculateDosage = () => {
    if (!selectedHerb || !userProfile.weight || !userProfile.age) return

    const herb = herbs[selectedHerb]
    let adjustedMin = herb.standardDosage.min
    let adjustedMax = herb.standardDosage.max
    const warnings: string[] = []

    // Weight adjustment (for herbs that require it)
    if (herb.weightAdjustment) {
      const weightFactor = userProfile.weight / 70 // 70kg as reference weight
      adjustedMin *= weightFactor
      adjustedMax *= weightFactor
    }

    // Age adjustments
    if (userProfile.age >= 65) {
      adjustedMin *= herb.ageConsiderations.elderly
      adjustedMax *= herb.ageConsiderations.elderly
      warnings.push('Reduced dosage recommended for seniors')
    } else if (userProfile.age < 18) {
      warnings.push('This calculator is designed for adults. Consult a pediatrician for children.')
      return
    } else if (userProfile.age < 25) {
      adjustedMin *= herb.ageConsiderations.young
      adjustedMax *= herb.ageConsiderations.young
    }

    // Experience level adjustment
    if (userProfile.experience === 'beginner') {
      adjustedMin *= 0.5 // Start with lower dose
      adjustedMax *= 0.7
      warnings.push('Start with a lower dose as a beginner and gradually increase')
    }

    // Check contraindications
    herb.contraindications.forEach(contraindication => {
      if (userProfile.healthConditions.includes(contraindication) || 
          userProfile.medications.includes(contraindication)) {
        warnings.push(`⚠️ CAUTION: May interact with ${contraindication}`)
      }
    })

    // Gender considerations (for certain herbs)
    if (selectedHerb === 'ashwagandha' && userProfile.gender === 'female') {
      warnings.push('May affect menstrual cycle - monitor closely')
    }

    setCalculation({
      recommendedMin: Math.round(adjustedMin),
      recommendedMax: Math.round(adjustedMax),
      unit: herb.standardDosage.unit,
      frequency: 'twice daily',
      duration: 'Start with 2-4 weeks, then assess',
      notes: herb.notes
    })

    setShowWarnings(warnings)
  }

  const resetCalculator = () => {
    setSelectedHerb('')
    setUserProfile({
      weight: 0,
      age: 0,
      gender: 'other',
      healthConditions: [],
      medications: [],
      experience: 'beginner'
    })
    setCalculation(null)
    setShowWarnings([])
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Personalized Dosage Calculator
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Herb Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Herb
            </label>
            <select
              value={selectedHerb}
              onChange={(e) => setSelectedHerb(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Choose an herb...</option>
              {Object.entries(herbs).map(([key, herb]) => (
                <option key={key} value={key}>{herb.name}</option>
              ))}
            </select>
          </div>

          {/* User Profile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={userProfile.weight || ''}
                onChange={(e) => setUserProfile(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="70"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={userProfile.age || ''}
                onChange={(e) => setUserProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={userProfile.experience}
              onChange={(e) => setUserProfile(prev => ({ ...prev, experience: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="beginner">Beginner (new to herbs)</option>
              <option value="intermediate">Intermediate (some experience)</option>
              <option value="advanced">Advanced (experienced user)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Health Conditions (select any that apply)
            </label>
            <div className="space-y-2">
              {['pregnancy', 'autoimmune disorders', 'diabetes', 'high blood pressure', 'anxiety', 'depression'].map(condition => (
                <label key={condition} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userProfile.healthConditions.includes(condition)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserProfile(prev => ({ 
                          ...prev, 
                          healthConditions: [...prev.healthConditions, condition] 
                        }))
                      } else {
                        setUserProfile(prev => ({ 
                          ...prev, 
                          healthConditions: prev.healthConditions.filter(c => c !== condition) 
                        }))
                      }
                    }}
                    className="mr-2 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={calculateDosage}
            disabled={!selectedHerb || !userProfile.weight || !userProfile.age}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Dosage
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {calculation ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">
                  Recommended Dosage
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="text-2xl font-bold text-green-800">
                  {calculation.recommendedMin} - {calculation.recommendedMax} {calculation.unit}
                </div>
                <div className="text-sm text-green-700">
                  <strong>Frequency:</strong> {calculation.frequency}
                </div>
                <div className="text-sm text-green-700">
                  <strong>Duration:</strong> {calculation.duration}
                </div>
                {calculation.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <strong>Note:</strong> {calculation.notes}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                Fill in your details and select an herb to get personalized dosage recommendations
              </p>
            </div>
          )}

          {/* Warnings */}
          {showWarnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">
                  Important Considerations
                </h3>
              </div>
              <ul className="space-y-2">
                {showWarnings.map((warning, index) => (
                  <li key={index} className="text-sm text-yellow-800 flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <strong>Medical Disclaimer:</strong> This calculator provides general guidance only. 
                Always consult with a healthcare professional before starting any herbal supplement, 
                especially if you have health conditions or take medications.
              </div>
            </div>
          </div>

          {calculation && (
            <button
              onClick={resetCalculator}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Calculate Another Herb
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 