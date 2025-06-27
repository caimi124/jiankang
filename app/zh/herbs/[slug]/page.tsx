import React from 'react'
import { notFound } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Breadcrumb from '../../../../components/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { getHerbByIdFromNotion, getAllHerbsFromNotion } from '@/lib/notion-herbs-api'
import type { NotionHerb } from '@/lib/notion-herbs-api'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Leaf, 
  Heart, 
  Target,
  Clock,
  Scale,
  Info,
  ExternalLink,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'

interface HerbDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// 根据slug查找草药
async function getHerbBySlug(slug: string): Promise<NotionHerb | null> {
  try {
    // 首先获取所有草药
    const herbs = await getAllHerbsFromNotion()
    
    // 根据slug匹配草药
    const herb = herbs.find(h => {
      const herbSlug = h.name_en.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      return herbSlug === slug
    })
    
    return herb || null
  } catch (error) {
    console.error('Error fetching herb by slug:', error)
    return null
  }
}

// 生成元数据
export async function generateMetadata({ params }: HerbDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const herb = await getHerbBySlug(resolvedParams.slug)
  
  if (!herb) {
    return {
      title: '草药未找到 - 草药科学',
      description: '您请求的草药在我们的数据库中找不到。'
    }
  }

  return {
    title: `${herb.name_cn} (${herb.name_en}) - 传统中医草药 | 草药科学`,
    description: herb.description_short || herb.description_detail || `了解${herb.name_cn}，一种具有经证实健康益处的传统中草药。`,
    keywords: [
      herb.name_cn,
      herb.name_en,
      '传统中医',
      '中草药',
      '自然健康',
      ...herb.efficacy
    ].join(', '),
    openGraph: {
      title: `${herb.name_cn} - 传统中医草药`,
      description: herb.description_short || `发现${herb.name_cn}的功效`,
      type: 'article',
      images: [
        {
          url: herb.image_url || `/herbs/${herb.name_en.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          width: 1200,
          height: 630,
          alt: `${herb.name_cn} - ${herb.name_en}`
        }
      ]
    }
  }
}

// 静态路径生成
export async function generateStaticParams() {
  try {
    const herbs = await getAllHerbsFromNotion()
    
    return herbs.map((herb) => ({
      slug: herb.name_en.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function HerbDetailPage({ params }: HerbDetailPageProps) {
  const resolvedParams = await params
  const herb = await getHerbBySlug(resolvedParams.slug)

  if (!herb) {
    notFound()
  }

  const getSafetyBadge = (level: string) => {
    switch (level) {
      case 'high':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">普遍安全</span>
          </div>
        )
      case 'medium':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            <Shield className="h-4 w-4" />
            <span className="font-medium">谨慎使用</span>
          </div>
        )
      case 'low':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-full">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">高度谨慎</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
            <Info className="h-4 w-4" />
            <span className="font-medium">未知</span>
          </div>
        )
    }
  }

  const getQualityStars = (score: number) => {
    const stars = Math.round(score / 20) // 转换为5星制
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: '首页', href: '/zh' },
              { label: '草药查找器', href: '/zh/herb-finder' },
              { label: herb.name_cn, href: `/zh/herbs/${resolvedParams.slug}` }
            ]}
          />

          {/* 返回按钮 */}
          <div className="mb-6">
            <Link href="/zh/herb-finder">
              <Button variant="secondary" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>返回草药查找器</span>
              </Button>
            </Link>
          </div>

          {/* 头部信息 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 左侧：图片 */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={herb.image_url || '/hero-bg.svg'}
                    alt={herb.name_cn}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                {/* 快速信息卡片 */}
                <div className="space-y-6">
                  {/* 标题和名称 */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{herb.name_cn}</h1>
                    <h2 className="text-xl text-gray-600 mb-1">{herb.name_en}</h2>
                    <p className="text-lg text-gray-500 italic">{herb.latin_name}</p>
                  </div>

                  {/* 评级和安全性 */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">质量评级：</span>
                      <div className="flex items-center space-x-1">
                        {getQualityStars(herb.quality_score)}
                        <span className="text-sm text-gray-500 ml-2">({herb.quality_score}/100)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">安全等级：</span>
                      {getSafetyBadge(herb.safety_level)}
                    </div>
                  </div>

                  {/* 主要功效 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">主要功效</h3>
                    <div className="flex flex-wrap gap-2">
                      {herb.efficacy.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 快速链接 */}
                  <div className="flex space-x-3">
                    <Link href={`/zh/ingredient-checker?search=${encodeURIComponent(herb.name_cn)}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Shield className="h-4 w-4 mr-2" />
                        安全性检查
                      </Button>
                    </Link>
                    <Link href="/zh/constitution-test">
                      <Button variant="secondary">
                        <Target className="h-4 w-4 mr-2" />
                        体质测试
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 详细信息区域 */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 详细描述 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  关于 {herb.name_cn}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {herb.description_detail || herb.description_short || '详细信息即将更新。'}
                </p>
              </div>

              {/* 传统应用 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">传统用途</h3>
                <p className="text-gray-700 leading-relaxed">
                  {herb.traditional_use || herb.description_detail || '传统用途信息即将更新。'}
                </p>
              </div>

              {/* 现代应用 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">现代应用</h3>
                <p className="text-gray-700 leading-relaxed">
                  {herb.modern_applications || herb.description_detail || '现代应用研究即将更新。'}
                </p>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 使用指南 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  使用指南
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">推荐剂量：</h4>
                    <p className="text-gray-600 text-sm">{herb.dosage}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">体质类型：</h4>
                    <p className="text-gray-600 text-sm">{herb.constitution_type}</p>
                  </div>
                </div>
              </div>

              {/* 安全信息 */}
              {herb.safety_notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    安全信息
                  </h3>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    {herb.safety_notes}
                  </p>
                </div>
              )}

              {/* 相关链接 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">相关资源</h3>
                <div className="space-y-3">
                  <Link 
                    href={`/zh/ingredient-checker?search=${encodeURIComponent(herb.name_cn)}`}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>安全性分析</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    href="/zh/constitution-test"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Target className="h-4 w-4" />
                    <span>体质测试</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    href="/zh/herb-finder"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Leaf className="h-4 w-4" />
                    <span>探索更多草药</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* 免责声明 */}
              <div className="bg-gray-100 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-2">重要提醒</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  此信息仅供教育目的，不作为医疗建议。
                  在使用任何草药补充剂之前，请咨询合格的医疗专业人员。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}