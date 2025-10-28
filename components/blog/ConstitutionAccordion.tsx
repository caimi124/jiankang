'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ConstitutionItem {
  icon: string;
  title: string;
  subtitle: string;
  symptoms: string;
  why: string;
  dosage: string;
  preparation?: string;
  caution?: boolean;
}

interface Props {
  constitutions: ConstitutionItem[];
  type?: 'recommended' | 'caution';
}

/**
 * 中医体质手风琴组件
 * 可折叠的体质指南，减少视觉负担
 * 提升移动端体验
 */
export function ConstitutionAccordion({ constitutions, type = 'recommended' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 默认展开第一个
  
  const bgColor = type === 'recommended' 
    ? 'from-green-50 to-emerald-50' 
    : 'from-orange-50 to-red-50';
    
  const borderColor = type === 'recommended'
    ? 'border-green-500'
    : 'border-orange-500';
    
  const textColor = type === 'recommended'
    ? 'text-green-600'
    : 'text-orange-600';
  
  return (
    <div className="space-y-4 my-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">
          {type === 'recommended' ? '✅' : '⚠️'}
        </span>
        <h3 className="text-xl font-bold text-gray-900">
          {type === 'recommended' 
            ? 'Best for These Constitutions' 
            : 'Use Cautiously If You Have'}
        </h3>
      </div>
      
      {constitutions.map((item, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div
            key={index}
            className={`
              border-2 rounded-xl overflow-hidden 
              transition-all duration-300
              ${isOpen ? `${borderColor} shadow-lg` : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            {/* 可点击的标题 */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`
                w-full px-5 md:px-6 py-4 md:py-5
                flex items-center justify-between gap-4
                bg-white hover:bg-gray-50 transition-colors
                text-left
              `}
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <span className="text-3xl md:text-4xl flex-shrink-0">
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              
              <ChevronDown
                className={`
                  w-5 h-5 md:w-6 md:h-6 ${textColor} flex-shrink-0
                  transform transition-transform duration-300
                  ${isOpen ? 'rotate-180' : 'rotate-0'}
                `}
              />
            </button>
            
            {/* 可展开的内容 */}
            <div
              className={`
                grid transition-all duration-300 ease-in-out
                ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
              `}
            >
              <div className="overflow-hidden">
                <div className={`px-5 md:px-6 py-4 md:py-5 bg-gradient-to-br ${bgColor} border-t-2 ${borderColor}`}>
                  <div className="space-y-4">
                    {/* 症状 */}
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`font-semibold ${textColor} flex-shrink-0`}>
                          📋 Symptoms:
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {item.symptoms}
                      </p>
                    </div>
                    
                    {/* 为什么有效 */}
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`font-semibold ${textColor} flex-shrink-0`}>
                          ✨ Why it helps:
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {item.why}
                      </p>
                    </div>
                    
                    {/* 用量 */}
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`font-semibold ${textColor} flex-shrink-0`}>
                          💊 Dosage:
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {item.dosage}
                      </p>
                    </div>
                    
                    {/* 制作方法（可选） */}
                    {item.preparation && (
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <span className={`font-semibold ${textColor} flex-shrink-0`}>
                            🍳 Best preparation:
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {item.preparation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* 底部提示 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700 flex items-start gap-2">
          <span className="text-lg flex-shrink-0">💡</span>
          <span>
            <strong>Not sure about your constitution?</strong>{' '}
            <a 
              href="/constitution-test" 
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Take our free TCM Constitution Test
            </a>
            {' '}to discover your body type and get personalized recommendations.
          </span>
        </p>
      </div>
    </div>
  );
}

