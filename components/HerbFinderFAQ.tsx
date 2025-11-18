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
    question: "How do I find herbs by symptoms?",
    answer: "Use our Herb Finder search bar to type your specific symptoms like 'sleep problems', 'stress and anxiety', 'low energy', or 'digestive issues'. You can also click on the Popular Categories buttons for quick filtering by common health concerns like Sleep Support, Immune Boost, or Digestive Health."
  },
  {
    question: "What are the best herbs for stress and anxiety?",
    answer: "Popular herbs for stress and anxiety include Ashwagandha, Holy Basil (Tulsi), Rhodiola, and Ginseng. These adaptogenic herbs help your body manage stress responses. Use our Herb Finder to filter by 'stress relief' or search for 'anxiety' to see all options with safety information and personalized recommendations."
  },
  {
    question: "How do I find safe herbal supplements?",
    answer: "Our Herb Finder includes safety ratings for each herb. Filter by 'High Safety' to see herbs that are generally safe for most people. Each herb page includes detailed safety information, potential side effects, drug interactions, and contraindications. We recommend consulting healthcare professionals before starting any herbal supplement."
  },
  {
    question: "Can I search herbs by body constitution or body type?",
    answer: "Yes! Our Herb Finder allows you to filter herbs by TCM body constitution types including Qi deficiency, Yang deficiency, Yin deficiency, and more. First, take our free TCM Constitution Test to discover your body type, then use the 'Constitution Type' filter to find herbs specifically suited to your body's needs."
  },
  {
    question: "What herbs are good for sleep support?",
    answer: "Common herbs for sleep support include Valerian Root, Chamomile, Ashwagandha, and Holy Basil. Search 'sleep' in our Herb Finder or click the 'Sleep & Relaxation' category button to see all herbs that help with insomnia, relaxation, and sleep quality improvement."
  },
  {
    question: "Which herbs help boost the immune system?",
    answer: "Immune-boosting herbs include Ginseng, Astragalus, Echinacea, and Reishi Mushroom. Use our Herb Finder to filter by 'Immune Support' category or search for 'immune' to find herbs that strengthen your body's natural defenses with detailed dosage and safety information."
  },
  {
    question: "How are herbs matched to constitution types?",
    answer: "Our system uses Traditional Chinese Medicine (TCM) principles to match herbs with constitution types like Qi deficiency, Yang deficiency, Yin deficiency, etc. Each herb is categorized based on its traditional therapeutic properties and modern research to provide personalized herbal recommendations."
  },
  {
    question: "Are these herbs suitable for pregnant or nursing women?",
    answer: "Many herbs have specific contraindications for pregnancy and nursing. Always check the contraindications section for each herb and consult your healthcare provider before using any herbal supplements during pregnancy or breastfeeding."
  },
  {
    question: "How do I use the Herb Finder search tool?",
    answer: "Simply type your symptoms, health goals, or herb names into the search bar (e.g., 'energy', 'digestion', 'turmeric'). Use the Advanced Filters to narrow results by constitution type, primary benefit, or safety level. Click on any herb card to see detailed information including benefits, dosage, safety, and scientific research."
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'zh' ? '草药搜索常见问题' : 'Herb Finder FAQ - Common Questions About Finding Herbs'}
          </h2>
          <p className="text-gray-600">
            {language === 'zh' 
              ? '关于如何使用草药搜索器、找到安全草药、体质匹配的常见问题' 
              : 'Find answers about using our Herb Finder, safe herbal supplements, and personalized recommendations'
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
