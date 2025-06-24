import React from 'react'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Breadcrumb from '../../../components/Breadcrumb'
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
      title: 'Herb Not Found - HerbScience',
      description: 'The requested herb could not be found in our database.'
    }
  }

  return {
    title: `${herb.name_en} (${herb.name_cn}) - Traditional Chinese Medicine | HerbScience`,
    description: herb.description_short || herb.description_detail || `Learn about ${herb.name_en}, a traditional Chinese herb with proven health benefits.`,
    keywords: [
      herb.name_en,
      herb.name_cn,
      'traditional chinese medicine',
      'herbs',
      'natural health',
      ...herb.efficacy
    ].join(', '),
    openGraph: {
      title: `${herb.name_en} - Traditional Chinese Medicine`,
      description: herb.description_short || `Discover the benefits of ${herb.name_en}`,
      type: 'article',
      images: [
        {
          url: herb.image_url || `/herbs/${herb.name_en.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          width: 1200,
          height: 630,
          alt: `${herb.name_en} - ${herb.name_cn}`
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
            <span className="font-medium">Generally Safe</span>
          </div>
        )
      case 'medium':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Use with Caution</span>
          </div>
        )
      case 'low':
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-full">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">High Caution</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
            <Info className="h-4 w-4" />
            <span className="font-medium">Unknown</span>
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
              { label: 'Home', href: '/' },
              { label: 'Herb Finder', href: '/herb-finder' },
              { label: herb.name_en, href: `/herb-finder/${resolvedParams.slug}` }
            ]}
          />

          {/* 返回按钮 */}
          <div className="mb-6">
            <Link href="/herb-finder">
              <Button variant="secondary" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Herb Finder</span>
              </Button>
            </Link>
          </div>

          {/* 头部信息 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 左侧：图片 */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={herb.image_url || `/herbs/${herb.name_en.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={`${herb.name_en} - ${herb.name_cn}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 快速信息卡片 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <Scale className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-blue-600 font-medium">Quality Score</p>
                    <p className="text-lg font-bold text-blue-800">{herb.quality_score}/100</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <Heart className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-green-600 font-medium">Popularity</p>
                    <p className="text-lg font-bold text-green-800">{herb.popularity_score}/100</p>
                  </div>
                </div>
              </div>

              {/* 右侧：基本信息 */}
              <div className="space-y-6">
                {/* 标题和名称 */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{herb.name_en}</h1>
                  <h2 className="text-xl text-gray-600 mb-1">{herb.name_cn}</h2>
                  <p className="text-lg text-gray-500 italic">{herb.latin_name}</p>
                </div>

                {/* 评级和安全性 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Quality Rating:</span>
                    <div className="flex items-center space-x-1">
                      {getQualityStars(herb.quality_score)}
                      <span className="text-sm text-gray-500 ml-2">({herb.quality_score}/100)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Safety Level:</span>
                    {getSafetyBadge(herb.safety_level)}
                  </div>
                </div>

                {/* 主要功效 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Benefits</h3>
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
                  <Link href={`/ingredient-checker?search=${encodeURIComponent(herb.name_en)}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Check Safety
                    </Button>
                  </Link>
                  <Link href="/constitution-test">
                    <Button variant="secondary">
                      <Target className="h-4 w-4 mr-2" />
                      Find Your Type
                    </Button>
                  </Link>
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
                  About {herb.name_en}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {herb.description_detail || herb.description_short || 'Detailed information coming soon.'}
                </p>
              </div>

              {/* 传统应用 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Traditional Uses</h3>
                <p className="text-gray-700 leading-relaxed">
                  {herb.traditional_use || herb.description_detail || 'Traditional use information coming soon.'}
                </p>
              </div>

              {/* 现代应用 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Applications</h3>
                <p className="text-gray-700 leading-relaxed">
                  {herb.modern_applications || herb.description_detail || 'Modern application research coming soon.'}
                </p>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-6">
              {/* 使用指南 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  Usage Guidelines
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">Recommended Dosage:</h4>
                    <p className="text-gray-600 text-sm">{herb.dosage}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Constitution Type:</h4>
                    <p className="text-gray-600 text-sm">{herb.constitution_type}</p>
                  </div>
                </div>
              </div>

              {/* 安全信息 */}
              {herb.safety_notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Safety Information
                  </h3>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    {herb.safety_notes}
                  </p>
                </div>
              )}

              {/* 相关链接 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <Link 
                    href={`/ingredient-checker?search=${encodeURIComponent(herb.name_en)}`}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Safety Analysis</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    href="/constitution-test"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Target className="h-4 w-4" />
                    <span>Constitution Test</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <Link 
                    href="/herb-finder"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Leaf className="h-4 w-4" />
                    <span>Explore More Herbs</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* 免责声明 */}
              <div className="bg-gray-100 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-2">Important Notice</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  This information is for educational purposes only and not intended as medical advice. 
                  Consult with a qualified healthcare provider before using any herbal supplements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 