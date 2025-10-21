'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Users, Star, Shield } from 'lucide-react'

export default function QuizLandingClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* 主要内容卡片 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Logo/图标 */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
            <span className="text-4xl">🌿</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your Perfect Herbs in 2 Minutes
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Stop guessing. Discover which herbs actually work for YOUR body type.
          </p>

          {/* 主CTA按钮 */}
          <Link
            href="/constitution-test/quick"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-xl mb-8"
          >
            <Clock className="w-6 h-6" />
            Start Free Quiz
            <ArrowRight className="w-6 h-6" />
          </Link>

          {/* 免费标签 */}
          <div className="inline-block mb-8">
            <div className="px-6 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-full">
              <span className="text-yellow-800 font-semibold">✨ 100% Free • No Email Required</span>
            </div>
          </div>

          {/* 社交证明 */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-sm text-gray-600 mb-6">Trusted by thousands worldwide</p>
            
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {/* 用户数 */}
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">12,000+</div>
                <div className="text-xs text-gray-600">Happy Users</div>
              </div>

              {/* 评分 */}
              <div className="flex flex-col items-center">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>

              {/* 成功率 */}
              <div className="flex flex-col items-center">
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-xs text-gray-600">See Results</div>
              </div>
            </div>
          </div>
        </div>

        {/* 次要信息 - 简洁版 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Based on 3,000 years of Traditional Chinese Medicine</span>
          </div>
        </div>

        {/* 问题预览 - 增加信任感 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Quick Look at What We'll Ask:
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span>How's your energy level throughout the day?</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span>How well do you sleep at night?</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span>Any digestive issues?</span>
            </div>
            <div className="text-sm text-gray-500 text-center mt-4">
              + 7 more simple questions
            </div>
          </div>
        </div>

        {/* 结果预览 - 展示价值 */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-3">
            What You'll Get:
          </h3>
          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <span>Your unique body type (Constitution)</span>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <span>3 personalized action steps</span>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <span>Top 3-4 herbs perfect for YOU</span>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <span>FREE downloadable health guide</span>
            </div>
          </div>
        </div>

        {/* 最后的CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/constitution-test/quick"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all shadow-xl"
          >
            Yes, I Want My Personalized Results
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            Takes less than 2 minutes • 100% Free
          </p>
        </div>

        {/* 底部信任标识 */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>🔒 Your privacy is protected. We never share your data.</p>
        </div>
      </div>
    </div>
  )
}

