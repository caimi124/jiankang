'use client'

import React from 'react'
import { Leaf, Star, Shield } from 'lucide-react'

interface HerbHeroProps {
  herbData: {
    title: string
    chineseName?: string
    latinName?: string
    description?: string
    category?: string
    safetyLevel?: string
    featuredImage?: string
  }
}

export function HerbHero({ herbData }: HerbHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
      
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* 图片区域 */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-lg shadow-md flex items-center justify-center">
              {herbData.featuredImage ? (
                <img 
                  src={herbData.featuredImage} 
                  alt={herbData.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Leaf className="w-12 h-12 lg:w-16 lg:h-16 text-green-600" />
              )}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {herbData.title}
              </h1>
              
              {herbData.chineseName && (
                <p className="text-lg text-gray-700">
                  {herbData.chineseName}
                </p>
              )}
              
              {herbData.latinName && (
                <p className="text-sm text-gray-500 italic">
                  {herbData.latinName}
                </p>
              )}
            </div>

            {/* 标签区域 */}
            <div className="flex flex-wrap gap-2">
              {herbData.category && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  {herbData.category}
                </span>
              )}
              
              {herbData.safetyLevel && (
                <span className={`px-2 py-1 rounded text-sm flex items-center gap-1 ${
                  herbData.safetyLevel === 'high' ? 'bg-green-100 text-green-800' :
                  herbData.safetyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  <Shield className="w-3 h-3" />
                  {herbData.safetyLevel === 'high' ? '高安全性' :
                   herbData.safetyLevel === 'medium' ? '中等安全性' : '需谨慎使用'}
                </span>
              )}
              
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                <Star className="w-3 h-3" />
                传统草药
              </span>
            </div>

            {/* 描述 */}
            {herbData.description && (
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                {herbData.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
