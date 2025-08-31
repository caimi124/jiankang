'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, Info } from 'lucide-react'

interface HerbFAQProps {
  herbData: any
}

export function HerbFAQ({ herbData }: HerbFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  // 默认FAQ问题
  const defaultFAQs = [
    {
      question: "What are the main benefits of this herb?",
      answer: "This herb is traditionally used for various health purposes. Please refer to the benefits section above for detailed information about its specific uses and effects."
    },
    {
      question: "Is this herb safe to use?",
      answer: "Safety depends on various factors including dosage, individual health conditions, and potential interactions. Always consult with healthcare professionals before use, especially if you have medical conditions or take medications."
    },
    {
      question: "How should I take this herb?",
      answer: "Dosage and preparation methods vary. Please refer to the safety and usage sections above for specific guidelines. Start with the lowest recommended dose and consult healthcare providers for long-term use."
    },
    {
      question: "Are there any side effects?",
      answer: "Potential side effects may occur, especially with improper use or in sensitive individuals. Common side effects include digestive upset, allergic reactions, or interactions with medications. Monitor your response and stop use if adverse effects occur."
    },
    {
      question: "Can I take this herb with my medications?",
      answer: "Herb-drug interactions are possible and can be serious. Always inform your healthcare provider about all supplements and herbs you're taking. Some herbs may interfere with medications or affect their effectiveness."
    },
    {
      question: "How long does it take to see results?",
      answer: "Effects vary by individual and condition. Some people may notice benefits within days, while others may take weeks or months. Herbal remedies often work gradually and consistently rather than providing immediate relief."
    }
  ]

  // 使用数据中的FAQ或默认FAQ
  const faqs = herbData.faqs && herbData.faqs.length > 0 ? herbData.faqs : defaultFAQs

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-4">
        {faqs.map((faq: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {openItems.has(index) && (
              <div className="px-4 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 如果没有FAQ数据，显示提示 */}
      {!herbData.faqs && (
        <div className="mt-6 text-center py-4 text-gray-500">
          <Info className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm">These are general FAQ questions. Specific questions about this herb will appear here when available.</p>
        </div>
      )}

      {/* 联系信息 */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Need More Information?</h4>
            <p className="text-blue-700 text-sm leading-relaxed">
              If you have specific questions about this herb that aren't answered here, 
              please consult with qualified healthcare professionals, herbalists, or traditional medicine practitioners. 
              They can provide personalized advice based on your individual health needs and circumstances.
            </p>
          </div>
        </div>
      </div>

      {/* 免责声明 */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-amber-800 mb-2">Important Notice</h4>
            <p className="text-amber-700 text-sm leading-relaxed">
              The information provided in these FAQs is for educational purposes only and should not replace 
              professional medical advice. Always consult healthcare providers for diagnosis, treatment, and 
              personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
