'use client'

import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import DosageCalculator from '../../components/DosageCalculator'
import { Calculator, Shield, Info, AlertTriangle } from 'lucide-react'

export default function DosageCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dosage Calculator', href: '/dosage-calculator' }
            ]} 
          />

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Personalized Dosage Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get customized dosage recommendations based on your age, weight, health conditions, and experience level with herbal supplements
            </p>
          </div>

          {/* Main Calculator */}
          <DosageCalculator />

          {/* Educational Content */}
          <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Understanding Dosage Guidelines</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Individual Factors</h3>
                <p className="text-gray-600">
                  Age, weight, metabolism, and health conditions all affect how your body processes herbal supplements. Our calculator takes these into account.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Start Low, Go Slow</h3>
                <p className="text-gray-600">
                  We recommend starting with lower doses to assess tolerance, especially for beginners. You can gradually increase as needed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Evidence-Based</h3>
                <p className="text-gray-600">
                  Our dosage recommendations are based on clinical research, traditional use patterns, and established safety guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Important Guidelines */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-3" />
              Important Dosage Guidelines
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">General Principles</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• Always start with the lowest recommended dose</li>
                  <li>• Take herbs consistently at the same time each day</li>
                  <li>• Allow 2-8 weeks to assess effectiveness</li>
                  <li>• Keep a supplement diary to track effects</li>
                  <li>• Take with or without food as directed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Special Considerations</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• Seniors may need reduced doses</li>
                  <li>• Pregnancy/breastfeeding requires special caution</li>
                  <li>• Some herbs are best taken on empty stomach</li>
                  <li>• Timing matters - energizing herbs in morning</li>
                  <li>• Consider herb-drug interactions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Herb-Specific Tips */}
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Herb Dosage Tips</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">🌿 Ashwagandha</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Best taken with food to reduce stomach upset</li>
                  <li>• Take in evening for sleep benefits</li>
                  <li>• Start with 300mg, can increase to 600mg</li>
                  <li>• Effects typically seen in 2-4 weeks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">🌿 Turmeric</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Take with black pepper for better absorption</li>
                  <li>• Best absorbed with a fatty meal</li>
                  <li>• 500-1000mg daily for inflammation</li>
                  <li>• May take 4-8 weeks for joint benefits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">🌿 Ginseng</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Take in morning to avoid sleep interference</li>
                  <li>• Cycle on/off (2 weeks on, 1 week off)</li>
                  <li>• 200-400mg daily, standardized extract</li>
                  <li>• Energy effects may be felt immediately</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">🌿 Rhodiola</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Best taken on empty stomach in morning</li>
                  <li>• Start with 200mg, can increase to 600mg</li>
                  <li>• Take 30 minutes before breakfast</li>
                  <li>• Effects on fatigue seen in 1-2 weeks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  This dosage calculator provides general guidelines based on research and traditional use. Individual needs may vary significantly. 
                  These recommendations do not replace professional medical advice. Always consult with qualified healthcare practitioners before 
                  starting any herbal supplement regimen, especially if you have health conditions, take medications, or are pregnant or breastfeeding. 
                  Start with lower doses regardless of calculations and monitor your body's response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}