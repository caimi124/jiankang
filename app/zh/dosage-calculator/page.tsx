'use client'

import React, { useState } from 'react'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'

export default function DosageCalculator() {
  const [formData, setFormData] = useState({
    herb: '',
    weight: '',
    age: '',
    condition: '',
    severity: 'mild'
  })

  const [result, setResult] = useState<any>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    // 模拟剂量计算逻辑
    const baseAmount = 200 // 基础剂量200mg
    const weightFactor = parseFloat(formData.weight) / 70 // 70kg为标准体重
    const ageFactor = parseInt(formData.age) > 65 ? 0.8 : 1 // 老年人减量
    const severityFactor = {
      'mild': 1,
      'moderate': 1.2,
      'severe': 1.5
    }[formData.severity] || 1

    const calculatedDose = Math.round(baseAmount * weightFactor * ageFactor * severityFactor)
    
    setResult({
      dose: calculatedDose,
      frequency: '每日2-3次',
      duration: '建议连续使用4-6周',
      notes: [
        '请在餐后服用以减少胃部不适',
        '如有不适请立即停止使用',
        '孕妇和哺乳期妇女请咨询医生',
        '此计算结果仅供参考，请咨询专业医师'
      ]
    })
  }

  return (
    <div>
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: '剂量计算器' }
        ]} 
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                📊 草药剂量计算器
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                根据您的个人情况，为您推荐合适的草药剂量。安全、科学、个性化。
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      选择草药 *
                    </label>
                    <select
                      value={formData.herb}
                      onChange={(e) => setFormData({...formData, herb: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">请选择草药</option>
                      <option value="turmeric">姜黄</option>
                      <option value="ginseng">人参</option>
                      <option value="ginger">生姜</option>
                      <option value="chamomile">洋甘菊</option>
                      <option value="echinacea">紫锥菊</option>
                      <option value="licorice">甘草</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      体重 (kg) *
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="例如：65"
                      min="30"
                      max="200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      年龄 *
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="例如：35"
                      min="18"
                      max="100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      症状严重程度
                    </label>
                    <select
                      value={formData.severity}
                      onChange={(e) => setFormData({...formData, severity: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="mild">轻度</option>
                      <option value="moderate">中度</option>
                      <option value="severe">重度</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主要症状或需求
                  </label>
                  <textarea
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="请描述您希望改善的症状或健康需求..."
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 重要提示：</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• 此计算器仅提供参考建议，不能替代专业医疗建议</li>
                    <li>• 首次使用前请咨询医生或药师</li>
                    <li>• 如有过敏史或正在服用其他药物，请告知医生</li>
                    <li>• 孕妇、哺乳期妇女和儿童请谨慎使用</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  📊 计算推荐剂量
                </button>
              </form>

              {/* Results */}
              {result && (
                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                    <span className="mr-2">✅</span>
                    剂量建议
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-green-600">{result.dose}mg</div>
                      <div className="text-sm text-gray-600">单次剂量</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-lg font-bold text-blue-600">{result.frequency}</div>
                      <div className="text-sm text-gray-600">服用频率</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-lg font-bold text-purple-600">{result.duration}</div>
                      <div className="text-sm text-gray-600">建议周期</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">📋 使用注意事项：</h4>
                    <ul className="space-y-2">
                      {result.notes.map((note: string, index: number) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              📚 剂量指南
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  剂量原则
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 从最小有效剂量开始</li>
                  <li>• 根据效果逐步调整</li>
                  <li>• 考虑个体差异</li>
                  <li>• 定期评估效果</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🕐</span>
                  服用时间
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 多数草药餐后服用</li>
                  <li>• 安神类睡前服用</li>
                  <li>• 提神类上午服用</li>
                  <li>• 空腹服用需谨慎</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  安全提醒
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 注意药物相互作用</li>
                  <li>• 观察不良反应</li>
                  <li>• 定期检查身体状况</li>
                  <li>• 遵循专业建议</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}