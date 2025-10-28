'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * 智能CTA组件
 * 根据用户滚动进度显示不同的行动号召
 * 提升转化率
 */
export function SmartCTA() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollPercent(percent);
      setIsVisible(percent > 10); // 滚动10%后显示
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 根据滚动进度选择CTA内容
  const getCTAContent = () => {
    if (scrollPercent < 25) {
      return {
        icon: '🤔',
        title: 'Not Sure Your Constitution Type?',
        description: 'Take our 5-minute TCM test to discover your body type',
        buttonText: 'Take Free Test',
        gradient: 'from-blue-500 to-indigo-500'
      };
    } else if (scrollPercent < 50) {
      return {
        icon: '💚',
        title: 'Want Personalized Onion Recommendations?',
        description: 'Get customized dosage based on YOUR constitution',
        buttonText: 'Get My Recommendations',
        gradient: 'from-green-500 to-emerald-500'
      };
    } else if (scrollPercent < 75) {
      return {
        icon: '🎯',
        title: 'Ready to Optimize Your Heart Health?',
        description: 'Discover which herbs work best for your body type',
        buttonText: 'Start Constitution Test',
        gradient: 'from-emerald-500 to-teal-500'
      };
    } else {
      return {
        icon: '🌟',
        title: 'Loved This Article?',
        description: 'Get personalized herb recommendations for YOUR constitution',
        buttonText: 'Complete Your Profile',
        gradient: 'from-teal-500 to-cyan-500'
      };
    }
  };
  
  const cta = getCTAContent();
  
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40 px-4 pb-4
        transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`
          bg-gradient-to-r ${cta.gradient}
          rounded-2xl shadow-2xl p-5 md:p-6 text-white
          backdrop-blur-sm bg-opacity-95
        `}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-3xl md:text-4xl flex-shrink-0">
                {cta.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base md:text-lg mb-1 line-clamp-1">
                  {cta.title}
                </h4>
                <p className="text-xs md:text-sm opacity-90 line-clamp-1">
                  {cta.description}
                </p>
              </div>
            </div>
            
            <Link
              href="/constitution-test"
              className="
                bg-white text-gray-900 px-6 md:px-8 py-3 rounded-lg 
                font-semibold text-sm md:text-base
                hover:shadow-xl transform hover:scale-105 
                transition-all duration-200
                whitespace-nowrap flex-shrink-0
                w-full sm:w-auto text-center
              "
            >
              {cta.buttonText} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

