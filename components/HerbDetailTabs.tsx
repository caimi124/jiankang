'use client'

import React, { useState } from 'react'
import { Leaf, Shield, BookOpen, AlertTriangle, FlaskConical, Users } from 'lucide-react'

interface HerbDetailTabsProps {
  herbData: {
    title: string
    chineseName?: string
    latinName?: string
    description?: string
    primaryEffects?: string[]
    activeCompounds?: string[]
    dosage?: string
    safetyLevel?: string
    contraindications?: string[]
    traditionalUse?: string
    modernApplications?: string
    research?: any[]
    faqs?: any[]
  }
}

export function HerbDetailTabs({ herbData }: HerbDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="w-full">
      {/* 标签页导航 */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'overview' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Leaf className="h-4 w-4" />
          <span className="hidden sm:inline">概述</span>
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'benefits' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">功效</span>
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'safety' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span className="hidden sm:inline">安全</span>
        </button>
        <button
          onClick={() => setActiveTab('usage')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'usage' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">用法</span>
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'research' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FlaskConical className="h-4 w-4" />
          <span className="hidden sm:inline">研究</span>
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'faq' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">问答</span>
        </button>
      </div>

      {/* 标签页内容 */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">草药概述</h3>
            <div className="space-y-3">
              {herbData.chineseName && (
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">中文名</span>
                  <span className="text-lg font-medium">{herbData.chineseName}</span>
                </div>
              )}
              {herbData.latinName && (
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">拉丁名</span>
                  <span className="text-sm italic">{herbData.latinName}</span>
                </div>
              )}
              <p className="text-gray-700 leading-relaxed">
                {herbData.description || '暂无描述'}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'benefits' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">主要功效</h3>
            <p className="text-gray-600 mb-4">传统与现代应用</p>
            <div className="space-y-4">
              {herbData.primaryEffects && herbData.primaryEffects.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">主要功效</h4>
                  <ul className="space-y-2">
                    {herbData.primaryEffects.map((effect, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {herbData.activeCompounds && herbData.activeCompounds.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">活性成分</h4>
                  <div className="flex flex-wrap gap-2">
                    {herbData.activeCompounds.map((compound, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        {compound}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'safety' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">安全信息</h3>
            <p className="text-gray-600 mb-4">使用注意事项</p>
            <div className="space-y-4">
              {herbData.safetyLevel && (
                <div>
                  <h4 className="font-semibold mb-2">安全等级</h4>
                  <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    herbData.safetyLevel === 'high' ? 'bg-green-100 text-green-800 border-green-200' :
                    herbData.safetyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">
                      {herbData.safetyLevel === 'high' ? '高安全性' :
                       herbData.safetyLevel === 'medium' ? '中等安全性' : '需谨慎使用'}
                    </span>
                  </span>
                </div>
              )}
              
              {herbData.contraindications && herbData.contraindications.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">禁忌症</h4>
                  <ul className="space-y-2">
                    {herbData.contraindications.map((contraindication, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{contraindication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">使用方法</h3>
            <p className="text-gray-600 mb-4">剂量与用法指导</p>
            <div className="space-y-4">
              {herbData.dosage && (
                <div>
                  <h4 className="font-semibold mb-2">推荐剂量</h4>
                  <p className="text-gray-700">{herbData.dosage}</p>
                </div>
              )}
              
              {herbData.traditionalUse && (
                <div>
                  <h4 className="font-semibold mb-2">传统用法</h4>
                  <p className="text-gray-700">{herbData.traditionalUse}</p>
                </div>
              )}
              
              {herbData.modernApplications && (
                <div>
                  <h4 className="font-semibold mb-2">现代应用</h4>
                  <p className="text-gray-700">{herbData.modernApplications}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'research' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">科学研究</h3>
            <p className="text-gray-600 mb-4">临床研究与证据</p>
            {herbData.research && herbData.research.length > 0 ? (
              <div className="space-y-4">
                {herbData.research.map((study, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">{study.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{study.summary}</p>
                    {study.link && (
                      <a 
                        href={study.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        查看研究 →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">暂无相关研究数据</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">常见问题</h3>
            <p className="text-gray-600 mb-4">用户关心的问题</p>
            {herbData.faqs && herbData.faqs.length > 0 ? (
              <div className="space-y-4">
                {herbData.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">暂无常见问题</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
