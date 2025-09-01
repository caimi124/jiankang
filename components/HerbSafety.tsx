'use client'

import React from 'react'
import { AlertTriangle, Shield, XCircle, Info } from 'lucide-react'

interface HerbSafetyProps {
  herbData: {
    safetyLevel?: string
    contraindications?: string[]
    dosage?: string
  }
}

export function HerbSafety({ herbData }: HerbSafetyProps) {
  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSafetyText = (level: string) => {
    switch (level) {
      case 'high':
        return '高安全性 - 适合大多数人群使用'
      case 'medium':
        return '中等安全性 - 需要谨慎使用'
      case 'low':
        return '需谨慎使用 - 建议在专业指导下使用'
      default:
        return '安全性未知 - 建议咨询专业人士'
    }
  }

  return (
    <div className="space-y-6">
      {/* 安全等级 */}
      {herbData.safetyLevel && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            安全等级
          </h3>
          <p className="text-gray-600 mb-4">使用安全性评估</p>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getSafetyColor(herbData.safetyLevel)}`}>
            <Shield className="w-4 h-4" />
            <span className="font-medium">{getSafetyText(herbData.safetyLevel)}</span>
          </div>
        </div>
      )}

      {/* 推荐剂量 */}
      {herbData.dosage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-green-600" />
            推荐剂量
          </h3>
          <p className="text-gray-600 mb-4">安全使用指导</p>
          <p className="text-gray-700 leading-relaxed">
            {herbData.dosage}
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>重要提醒：</strong>以上剂量仅供参考，具体使用请咨询专业医师或中医师。
            </p>
          </div>
        </div>
      )}

      {/* 禁忌症 */}
      {herbData.contraindications && herbData.contraindications.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            禁忌症
          </h3>
          <p className="text-gray-600 mb-4">不适合使用的情况</p>
          <div className="space-y-3">
            {herbData.contraindications.map((contraindication, index) => (
              <div key={index} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{contraindication}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>警告：</strong>如果您属于以上禁忌人群，请勿使用本品，并咨询专业医师。
            </p>
          </div>
        </div>
      )}

      {/* 通用安全提醒 */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-800">
          <AlertTriangle className="w-5 h-5" />
          安全提醒
        </h3>
        <div className="space-y-2 text-orange-800">
          <p>• 草药使用前请咨询专业医师或中医师</p>
          <p>• 孕妇、哺乳期妇女、儿童使用前必须咨询医生</p>
          <p>• 如出现不适症状，请立即停止使用并就医</p>
          <p>• 本网站信息仅供参考，不能替代专业医疗建议</p>
        </div>
      </div>
    </div>
  )
}
