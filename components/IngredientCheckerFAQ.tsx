'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: 'safety',
    question: 'How accurate is the herbal ingredient safety checker?',
    answer: 'Our ingredient checker uses a comprehensive database of over 1,000 herbs with scientific research backing. We analyze safety based on peer-reviewed studies, traditional use data, and regulatory guidelines from FDA, EMA, and WHO. The accuracy rate is approximately 95% for common ingredients, though we always recommend consulting healthcare professionals for personalized advice.'
  },
  {
    category: 'usage',
    question: 'What format should I use when entering supplement ingredients?',
    answer: 'You can enter ingredients in several formats: 1) Common names (e.g., "Ginkgo biloba, Turmeric, Ashwagandha"), 2) With dosages (e.g., "Ginseng 500mg, Rhodiola 300mg"), 3) Copy-paste directly from supplement labels, or 4) Upload a clear photo of the ingredient list. Our AI can recognize most standard formats and will parse the information automatically.'
  },
  {
    category: 'interactions',
    question: 'Can this tool detect dangerous drug interactions with herbs?',
    answer: 'Yes, our system checks for interactions with over 200 common medications including blood thinners, diabetes drugs, blood pressure medications, antidepressants, and more. We categorize interactions as High Risk (avoid combination), Moderate Risk (consult doctor), or Low Risk (monitor symptoms). However, this should supplement, not replace, professional medical advice.'
  },
  {
    category: 'pregnancy',
    question: 'Is it safe to use herbal supplements during pregnancy?',
    answer: 'Many herbs are contraindicated during pregnancy and breastfeeding. Our checker specifically flags pregnancy safety concerns and provides guidance based on safety categories: Safe, Likely Safe, Possibly Unsafe, and Unsafe. We strongly recommend all pregnant or nursing women consult their healthcare provider before taking any herbal supplements.'
  },
  {
    category: 'dosage',
    question: 'How do I know if my supplement dosage is safe?',
    answer: 'Our system compares your supplement dosages against established safe ranges from clinical studies and regulatory guidelines. We indicate if dosages are: Within Safe Range, Above Recommended (but tolerable), or Potentially Dangerous. Factors like body weight, age, health conditions, and concurrent medications all affect safe dosage levels.'
  },
  {
    category: 'quality',
    question: 'What makes some herbal supplements higher quality than others?',
    answer: 'Quality factors include: 1) Third-party testing for purity and potency, 2) Standardized extracts with verified active compounds, 3) Good Manufacturing Practices (GMP) certification, 4) Transparent labeling with exact ingredient amounts, 5) Absence of contaminants like heavy metals or pesticides. Our database includes quality grades (A+ to C-) based on these criteria.'
  }
]

const zhFaqData: FAQItem[] = [
  {
    category: 'safety',
    question: '草药成分安全检查器的准确性如何？',
    answer: '我们的成分检查器使用包含1000多种草药的综合数据库，以科学研究为支撑。我们基于同行评议研究、传统使用数据以及FDA、EMA和WHO的监管指南来分析安全性。对于常见成分的准确率约为95%，但我们始终建议咨询医疗专业人士获取个性化建议。'
  },
  {
    category: 'usage',
    question: '输入补充剂成分时应该使用什么格式？',
    answer: '您可以使用多种格式输入成分：1）常见名称（如"银杏叶、姜黄、印度人参"），2）包含剂量（如"人参500mg、红景天300mg"），3）直接从补充剂标签复制粘贴，或4）上传成分清单的清晰照片。我们的AI能识别大多数标准格式并自动解析信息。'
  },
  {
    category: 'interactions',
    question: '这个工具能检测草药与药物的危险相互作用吗？',
    answer: '是的，我们的系统检查与200多种常见药物的相互作用，包括抗凝药、糖尿病药物、降压药、抗抑郁药等。我们将相互作用分为高风险（避免组合）、中等风险（咨询医生）或低风险（监测症状）。但这应该补充而非替代专业医疗建议。'
  },
  {
    category: 'pregnancy',
    question: '怀孕期间使用草药补充剂安全吗？',
    answer: '许多草药在怀孕和哺乳期间是禁忌的。我们的检查器专门标记怀孕安全问题，并基于安全类别提供指导：安全、可能安全、可能不安全、不安全。我们强烈建议所有孕妇或哺乳期妇女在服用任何草药补充剂前咨询医疗提供者。'
  },
  {
    category: 'dosage',
    question: '如何知道我的补充剂剂量是否安全？',
    answer: '我们的系统将您的补充剂剂量与临床研究和监管指南建立的安全范围进行比较。我们指示剂量是否：在安全范围内、高于推荐（但可耐受）或潜在危险。体重、年龄、健康状况和并发药物等因素都会影响安全剂量水平。'
  },
  {
    category: 'quality',
    question: '什么使某些草药补充剂质量更高？',
    answer: '质量因素包括：1）第三方纯度和效价测试，2）含有验证活性化合物的标准化提取物，3）良好生产规范（GMP）认证，4）透明标签显示确切成分含量，5）无重金属或农药等污染物。我们的数据库基于这些标准包含质量等级（A+到C-）。'
  }
]

export function IngredientCheckerFAQ({ isZh = false }: { isZh?: boolean }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const faqItems = isZh ? zhFaqData : faqData

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isZh ? '💡 常见问题解答' : '💡 Frequently Asked Questions'}
        </h2>
        <p className="text-lg text-gray-600">
          {isZh 
            ? '关于草药成分安全检查的常见问题，帮助您更好地了解我们的服务' 
            : 'Common questions about herbal ingredient safety checking to help you understand our service better'
          }
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
              {openItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openItems.has(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-2xl text-center">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          {isZh ? '还有其他问题？' : 'Still have questions?'}
        </h3>
        <p className="text-blue-700 mb-4">
          {isZh 
            ? '我们的专家团队随时为您提供个性化建议和专业指导'
            : 'Our expert team is here to provide personalized advice and professional guidance'
          }
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
          {isZh ? '📧 联系专家' : '📧 Contact Expert'}
        </button>
      </div>
    </div>
  )
}

export default IngredientCheckerFAQ 