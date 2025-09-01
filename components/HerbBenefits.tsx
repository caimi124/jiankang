'use client'

import React from 'react'
import { CheckCircle, Target, Zap } from 'lucide-react'

interface HerbBenefitsProps {
  herbData: {
    primaryEffects?: string[]
    activeCompounds?: string[]
    traditionalUse?: string
    modernApplications?: string
  }
}

export function HerbBenefits({ herbData }: HerbBenefitsProps) {
  return (
    <div className="space-y-6">
      {/* 主要功效 */}
      {herbData.primaryEffects && herbData.primaryEffects.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            主要功效
          </h3>
          <p className="text-gray-600 mb-4">传统与现代应用效果</p>
          <div className="grid gap-3">
            {herbData.primaryEffects.map((effect, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{effect}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 活性成分 */}
      {herbData.activeCompounds && herbData.activeCompounds.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            活性成分
          </h3>
          <p className="text-gray-600 mb-4">主要化学成分与作用机制</p>
          <div className="flex flex-wrap gap-2">
            {herbData.activeCompounds.map((compound, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {compound}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 传统用法 */}
      {herbData.traditionalUse && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">传统用法</h3>
          <p className="text-gray-600 mb-4">古代医学理论与实践经验</p>
          <p className="text-gray-700 leading-relaxed">
            {herbData.traditionalUse}
          </p>
        </div>
      )}

      {/* 现代应用 */}
      {herbData.modernApplications && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">现代应用</h3>
          <p className="text-gray-600 mb-4">当代研究与临床应用</p>
          <p className="text-gray-700 leading-relaxed">
            {herbData.modernApplications}
          </p>
        </div>
      )}
    </div>
  )
}
