'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Breadcrumb from '../../components/Breadcrumb'
import DosageCalculator from '../../components/DosageCalculator'
import { Calculator, Shield, Info, AlertTriangle, ArrowRight, Heart, Sparkles } from 'lucide-react'

export default function DosageCalculatorClient() {
  const [hasCalculated, setHasCalculated] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dosage Calculator', href: '/dosage-calculator' }
            ]} 
          />

          {/* ⚠️ 增强的医学免责声明横幅 - 置顶显示 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-8 rounded-r-xl shadow-md">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2 text-lg">⚠️ Important Medical Disclaimer</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  This calculator provides <strong>educational guidance only</strong> from a licensed pharmacist. 
                  Individual needs vary significantly. <strong>Always consult your healthcare provider</strong> before 
                  starting any herbal supplement, especially if you have health conditions, take medications, 
                  or are pregnant/breastfeeding. Start with lower doses and monitor your response.
                </p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4 shadow-lg">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Personalized Herbal Dosage Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Get customized dosage recommendations based on your age, weight, health conditions, and experience level with herbal supplements
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-700">
              <Shield className="w-4 h-4" />
              <span>Created by Licensed Pharmacist • Evidence-Based • Free Forever</span>
            </div>
          </div>

          {/* Main Calculator */}
          <DosageCalculator />

          {/* 🔗 内部链接CTA区域 - 计算后显示 */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-lg p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Want More Personalized Guidance?
            </h3>
            <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
              Get even more specific recommendations by discovering your TCM body constitution and finding herbs that match your unique profile.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/constitution-test"
                className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Find Your Body Type</h4>
                <p className="text-sm text-gray-600 text-center mb-3">
                  Take our free TCM constitution test for personalized herb matching
                </p>
                <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Take Test</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link 
                href="/herb-finder"
                className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Info className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Explore All Herbs</h4>
                <p className="text-sm text-gray-600 text-center mb-3">
                  Browse our complete database with safety info and evidence
                </p>
                <div className="flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Browse Herbs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link 
                href="/blog"
                className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Learn More</h4>
                <p className="text-sm text-gray-600 text-center mb-3">
                  Read expert articles on herbs, dosages, and safety guidelines
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Read Blog</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

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

          {/* Herb-Specific Tips with internal links */}
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Herb Dosage Tips</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-800 mb-3">🌿 Ashwagandha</h4>
                <ul className="text-gray-700 text-sm space-y-1 mb-3">
                  <li>• Best taken with food to reduce stomach upset</li>
                  <li>• Take in evening for sleep benefits</li>
                  <li>• Start with 300mg, can increase to 600mg</li>
                  <li>• Effects typically seen in 2-4 weeks</li>
                </ul>
                <Link href="/herbs/ashwagandha" className="text-sm text-green-600 hover:text-green-700 font-semibold hover:underline">
                  → Learn more about Ashwagandha
                </Link>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-800 mb-3">🌿 Turmeric</h4>
                <ul className="text-gray-700 text-sm space-y-1 mb-3">
                  <li>• Take with black pepper for better absorption</li>
                  <li>• Best absorbed with a fatty meal</li>
                  <li>• 500-1000mg daily for inflammation</li>
                  <li>• May take 4-8 weeks for joint benefits</li>
                </ul>
                <Link href="/herbs/turmeric" className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                  → Learn more about Turmeric
                </Link>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-800 mb-3">🌿 Ginseng</h4>
                <ul className="text-gray-700 text-sm space-y-1 mb-3">
                  <li>• Take in morning to avoid sleep interference</li>
                  <li>• Cycle on/off (2 weeks on, 1 week off)</li>
                  <li>• 200-400mg daily, standardized extract</li>
                  <li>• Energy effects may be felt immediately</li>
                </ul>
                <Link href="/herbs/ginseng" className="text-sm text-red-600 hover:text-red-700 font-semibold hover:underline">
                  → Learn more about Ginseng
                </Link>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-800 mb-3">🌿 Rhodiola</h4>
                <ul className="text-gray-700 text-sm space-y-1 mb-3">
                  <li>• Best taken on empty stomach in morning</li>
                  <li>• Start with 200mg, can increase to 600mg</li>
                  <li>• Take 30 minutes before breakfast</li>
                  <li>• Effects on fatigue seen in 1-2 weeks</li>
                </ul>
                <Link href="/herbs/rhodiola-crenulata" className="text-sm text-purple-600 hover:text-purple-700 font-semibold hover:underline">
                  → Learn more about Rhodiola
                </Link>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer - 底部重复强调 */}
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

