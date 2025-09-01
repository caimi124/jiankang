'use client'

import React from 'react'
import { BookOpen, Clock, Thermometer, Droplets } from 'lucide-react'

interface HerbUsageProps {
  herbData: {
    dosage?: string
    traditionalUse?: string
    modernApplications?: string
  }
}

export function HerbUsage({ herbData }: HerbUsageProps) {
  return (
    <div className="space-y-6">
      {/* 推荐剂量 */}
      {herbData.dosage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            推荐剂量
          </h3>
          <p className="text-gray-600 mb-4">安全使用指导</p>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {herbData.dosage}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">使用建议</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 建议从小剂量开始</li>
                  <li>• 观察身体反应</li>
                  <li>• 如有不适立即停止</li>
                  <li>• 长期使用需咨询医师</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">最佳时间</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 空腹或饭后1-2小时</li>
                  <li>• 避免与西药同时服用</li>
                  <li>• 保持规律服用时间</li>
                  <li>• 根据个人情况调整</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 传统用法 */}
      {herbData.traditionalUse && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            传统用法
          </h3>
          <p className="text-gray-600 mb-4">古代医学理论与实践经验</p>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {herbData.traditionalUse}
            </p>
            
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">传统智慧</h4>
              <p className="text-sm text-amber-700">
                传统中医理论强调"辨证论治"，使用草药需要根据个人体质、症状和季节来调整。
                建议在专业中医师指导下使用，以达到最佳效果。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 现代应用 */}
      {herbData.modernApplications && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-purple-600" />
            现代应用
          </h3>
          <p className="text-gray-600 mb-4">当代研究与临床应用</p>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {herbData.modernApplications}
            </p>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">现代研究</h4>
              <p className="text-sm text-purple-700">
                现代医学研究正在不断验证传统草药的功效，但同时也发现了新的应用领域和注意事项。
                建议结合传统智慧和现代医学指导来使用。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 使用注意事项 */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-800">
          <Clock className="w-5 h-5" />
          使用注意事项
        </h3>
        <div className="space-y-3 text-orange-800">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>首次使用建议从小剂量开始，观察身体反应</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>孕妇、哺乳期妇女、儿童使用前必须咨询医生</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>如正在服用其他药物，请咨询医生避免相互作用</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>如出现过敏反应或不适症状，请立即停止使用并就医</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>长期使用建议定期咨询专业医师</span>
          </div>
        </div>
      </div>
    </div>
  )
}
