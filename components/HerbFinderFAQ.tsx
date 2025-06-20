'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  isOpen?: boolean
}

interface HerbFinderFAQProps {
  language: 'en' | 'zh'
}

const faqDataEn: FAQItem[] = [
  {
    question: "How do I search for herbs based on my symptoms?",
    answer: "Use our enhanced search bar to type your symptoms like 'sleep problems', 'anxiety', or 'low energy'. You can also click on the category buttons above the search bar for quick filtering by health concerns."
  },
  {
    question: "What do the safety levels mean?",
    answer: "High Safety: Generally safe for most people with minimal side effects. Medium Safety: Safe when used properly but may have interactions or contraindications. Use with Caution: Requires professional guidance due to potential risks or strong effects."
  },
  {
    question: "How are herbs matched to constitution types?",
    answer: "Our system uses Traditional Chinese Medicine (TCM) principles to match herbs with constitution types like Qi deficiency, Yang deficiency, etc. Each herb is categorized based on its traditional therapeutic properties and modern research."
  },
  {
    question: "Can I combine multiple herbs together?",
    answer: "While many herbs can be safely combined, we strongly recommend consulting with a qualified healthcare practitioner or TCM doctor before combining herbs, especially if you have medical conditions or take medications."
  },
  {
    question: "Are these herbs suitable for pregnant or nursing women?",
    answer: "Many herbs have specific contraindications for pregnancy and nursing. Always check the contraindications section for each herb and consult your healthcare provider before use during pregnancy or breastfeeding."
  },
  {
    question: "How accurate is the herb information in your database?",
    answer: "Our database contains information from traditional sources and modern research. However, this is for educational purposes only and should not replace professional medical advice. Always consult qualified practitioners."
  }
]

const faqDataZh: FAQItem[] = [
  {
    question: "如何根据症状搜索草药？",
    answer: "使用我们的增强搜索功能，输入症状如'失眠问题'、'焦虑'或'体力不足'。您也可以点击搜索栏上方的分类按钮，快速按健康问题筛选。"
  },
  {
    question: "安全等级是什么意思？",
    answer: "高安全性：大多数人可安全使用，副作用极小。中等安全性：正确使用时安全，但可能有相互作用或禁忌症。需谨慎使用：由于潜在风险或强效作用，需要专业指导。"
  },
  {
    question: "草药如何匹配体质类型？",
    answer: "我们的系统基于中医理论，将草药与气虚质、阳虚质等体质类型匹配。每种草药都根据其传统治疗特性和现代研究进行分类。"
  },
  {
    question: "可以同时使用多种草药吗？",
    answer: "虽然许多草药可以安全组合，但我们强烈建议在组合使用草药前咨询合格的医疗从业者或中医师，特别是如果您有疾病或正在服用药物。"
  },
  {
    question: "这些草药适合孕妇或哺乳期妇女使用吗？",
    answer: "许多草药对怀孕和哺乳有特定禁忌症。请务必查看每种草药的禁忌事项部分，并在怀孕或哺乳期间使用前咨询您的医疗提供者。"
  },
  {
    question: "数据库中的草药信息有多准确？",
    answer: "我们的数据库包含来自传统资源和现代研究的信息。但这仅用于教育目的，不能替代专业医疗建议。请务必咨询合格的从业者。"
  }
]

export default function HerbFinderFAQ({ language }: HerbFinderFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([])
  const faqData = language === 'zh' ? faqDataZh : faqDataEn

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
          </h3>
          <p className="text-gray-600">
            {language === 'zh' 
              ? '关于草药搜索和使用的常见问题解答' 
              : 'Common questions about herb search and usage'
            }
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 pr-4">{item.question}</h4>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-2">
              {language === 'zh' ? '还有其他问题？' : 'Still have questions?'}
            </h4>
            <p className="text-blue-700 text-sm">
              {language === 'zh' 
                ? '建议咨询合格的中医师或医疗专业人员，获得个性化的草药建议。' 
                : 'We recommend consulting with qualified TCM practitioners or healthcare professionals for personalized herbal advice.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
