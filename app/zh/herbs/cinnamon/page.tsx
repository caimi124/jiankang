import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Shield, AlertTriangle, CheckCircle, Info, Thermometer, Droplets, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: '肉桂 (Cinnamon) - 完整草药指南 | 草药科学',
  description: '肉桂（Cinnamomum cassia）完整指南 - 温性草药，用于血糖支持、循环改善、疼痛缓解和女性健康。传统用途、剂量和安全信息。',
  keywords: '肉桂, cinnamon, Cinnamomum cassia, 血糖, 循环, 疼痛缓解, 女性健康, 温性草药, 中医, 传统中医',
  openGraph: {
    title: '肉桂 (Cinnamon) - 完整草药指南',
    description: '温性草药，用于血糖支持、循环改善和疼痛缓解。完整指南包含剂量、安全性和传统用途。',
    type: 'article'
  },
}

export default function CinnamonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* 主要区域 */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-8 h-8 text-amber-200" />
                <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                  温性草药
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                肉桂 <span className="text-amber-200">(Cinnamon)</span>
              </h1>
              <p className="text-xl text-amber-100 mb-2">
                <em>Cinnamomum cassia</em>
              </p>
              <p className="text-lg leading-relaxed mb-8">
                一种经过时间考验的温性草药，在各种文化中都被用来改善血液循环、
                调节血糖和支持月经舒适。在中医中被重视为能够"温阳"和祛除内寒的草药。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">血糖支持</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">疼痛缓解</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">女性健康</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">血液循环</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Thermometer className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-center">
          <Link 
            href="/zh/herb-finder" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ← 返回草药查找器
          </Link>
        </div>
      </div>
    </div>
  )
} 