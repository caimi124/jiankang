'use client'

import React from 'react'
import { FlaskConical, ExternalLink, BookOpen } from 'lucide-react'

interface HerbResearchProps {
  herbData: {
    research?: any[]
  }
}

export function HerbResearch({ herbData }: HerbResearchProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-blue-600" />
          科学研究
        </h3>
        <p className="text-gray-600 mb-4">临床研究与科学证据</p>
        {herbData.research && herbData.research.length > 0 ? (
          <div className="space-y-6">
            {herbData.research.map((study, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">{study.title}</h4>
                  <p className="text-sm text-gray-600">{study.summary}</p>
                  
                  <div className="flex items-center gap-2">
                    {study.evidenceLevel && (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs border">
                        证据等级: {study.evidenceLevel}
                      </span>
                    )}
                    
                    {study.link && (
                      <a 
                        href={study.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        查看研究
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">暂无相关研究数据</p>
            <p className="text-sm text-gray-400 mt-2">
              我们正在持续收集和更新相关研究信息
            </p>
          </div>
        )}
      </div>

      {/* 研究说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">关于研究证据</h3>
        <div className="space-y-3 text-blue-800">
          <p className="text-sm">
            本页面展示的研究数据来自公开发表的科学文献，包括：
          </p>
          <ul className="text-sm space-y-1 ml-4">
            <li>• 临床研究论文</li>
            <li>• 药理学研究</li>
            <li>• 传统医学文献</li>
            <li>• 安全性评估报告</li>
          </ul>
          <p className="text-sm mt-3">
            <strong>重要提醒：</strong>研究结果仅供参考，不能替代专业医疗建议。
            具体使用请咨询专业医师。
          </p>
        </div>
      </div>
    </div>
  )
}
