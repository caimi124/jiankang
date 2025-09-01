'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface HerbFAQProps {
  herbData: {
    faqs?: any[]
  }
}

export function HerbFAQ({ herbData }: HerbFAQProps) {
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          常见问题
        </h3>
        <p className="text-gray-600 mb-4">用户关心的问题与解答</p>
        {herbData.faqs && herbData.faqs.length > 0 ? (
          <div className="space-y-4">
            {herbData.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaqs.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openFaqs.includes(index) && (
                  <div className="px-4 pb-3">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">暂无常见问题</p>
            <p className="text-sm text-gray-400 mt-2">
              如果您有相关问题，欢迎联系我们
            </p>
          </div>
        )}
      </div>

      {/* 通用FAQ */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-purple-800">通用问题</h3>
        <div className="space-y-4">
          <div className="border-b border-purple-200 pb-4 last:border-b-0">
            <h4 className="font-semibold text-purple-800 mb-2">
              如何选择合适的草药？
            </h4>
            <p className="text-sm text-purple-700">
              建议根据个人体质、症状和需求来选择。可以咨询专业中医师进行体质辨识，
              或使用我们的体质测试工具来获得个性化推荐。
            </p>
          </div>
          
          <div className="border-b border-purple-200 pb-4 last:border-b-0">
            <h4 className="font-semibold text-purple-800 mb-2">
              草药可以长期服用吗？
            </h4>
            <p className="text-sm text-purple-700">
              大多数草药不建议长期服用，建议按照疗程使用。长期使用前请咨询专业医师，
              定期评估效果和安全性。
            </p>
          </div>
          
          <div className="border-b border-purple-200 pb-4 last:border-b-0">
            <h4 className="font-semibold text-purple-800 mb-2">
              草药与西药可以同时服用吗？
            </h4>
            <p className="text-sm text-purple-700">
              不建议同时服用，可能存在相互作用。建议间隔2-4小时服用，
              或在专业医师指导下使用。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">
              出现不良反应怎么办？
            </h4>
            <p className="text-sm text-purple-700">
              如出现过敏、恶心、头晕等不适症状，请立即停止使用并就医。
              保存好使用记录，便于医生诊断。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
