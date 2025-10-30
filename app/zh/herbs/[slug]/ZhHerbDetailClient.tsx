'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import AccordionSection from '@/components/AccordionSection'
import MedicalReviewBanner from '@/components/MedicalReviewBanner'
import ScientificReferences from '@/components/ScientificReferences'
import RelatedHerbsSection from '@/components/RelatedHerbsSection'
import { 
  Heart, Shield, Brain, Zap, AlertTriangle, Clock, 
  Star, Users, BookOpen, FlaskConical, Pill, Leaf,
  CheckCircle, XCircle, AlertCircle, ArrowRight,
  Share2, Bookmark, Download, Mail, Eye, Award,
  Coffee, Beaker, Target, Activity, ChevronDown
} from 'lucide-react'

// 草药数据类型定义
interface HerbData {
  id: string
  name: string
  chinese_name?: string
  latin_name: string
  slug: string
  overview: string
  benefits: string[]
  active_compounds: string
  traditional_uses: string
  suitable_for: string[]
  not_suitable_for: string[]
  dosage_forms: {
    form: string
    dosage: string
    usage: string
  }[]
  safety_warnings: string[]
  interactions: string[]
  scientific_evidence: string
  constitution_match: {
    type: string
    suitable: 'yes' | 'warning' | 'no'
    description: string
  }[]
  pairs_well_with: string[]
  user_stories: {
    quote: string
    author: string
    location: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  seo_keywords: string[]
  evidence_level: 'Strong' | 'Moderate' | 'Limited'
  category: string
  properties: string[]
}

interface ZhHerbDetailClientProps {
  herbData: HerbData
  slug: string
}

// 中文翻译映射
const translations = {
  evidenceLevel: {
    'Strong': '强',
    'Moderate': '中等',
    'Limited': '有限'
  },
  safetyLevel: {
    'Generally Recognized as Safe (GRAS)': '普遍认为安全（GRAS）',
    'Safe for most adults in typical amounts': '大多数成人在典型剂量下安全'
  },
  evidenceDescription: {
    'Strong': '多项高质量研究支持',
    'Moderate': '部分研究证据支持',
    'Limited': '主要基于传统使用'
  },
  tabs: {
    'overview': '概述',
    'benefits': '功效与用途',
    'safety': '安全性与剂量',
    'science': '科学证据',
    'traditional': '传统应用',
    'faq': '常见问题'
  }
}

export default function ZhHerbDetailClient({ herbData, slug }: ZhHerbDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)
  const [relatedHerbs, setRelatedHerbs] = useState<string[]>([])
  const [relatedArticles, setRelatedArticles] = useState<{ title: string; href: string }[]>([])

  // 获取体质匹配图标
  const getConstitutionIcon = (suitable: string) => {
    switch (suitable) {
      case 'yes': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'no': return <XCircle className="w-5 h-5 text-red-500" />
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  // 获取证据等级颜色
  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Limited': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // 数据驱动的相关草药/文章匹配
  useEffect(() => {
    const matchKeywords = new Set([
      ...(herbData?.benefits || []),
      ...(herbData?.properties || []),
      ...(herbData?.seo_keywords || []),
    ].map(k => k.toLowerCase()))

    // 相关草药推荐
    const candidates = ['生姜','姜黄','人参','薄荷','洋甘菊','肉桂','紫锥菊','南非醉茄']
    const scored = candidates
      .filter(name => name !== herbData?.chinese_name && name !== herbData?.name?.toLowerCase())
      .map(name => {
        const nameKeywords = new Set(
          name === '生姜' ? ['恶心','消化','循环','温性'] :
          name === '姜黄' ? ['炎症','疼痛','关节','抗氧化'] :
          name === '人参' ? ['能量','专注力','疲劳'] :
          name === '薄荷' ? ['肠胃','痉挛','消化','凉性'] :
          name === '洋甘菊' ? ['睡眠','焦虑','镇静'] :
          name === '肉桂' ? ['代谢','血糖','温性'] :
          name === '紫锥菊' ? ['免疫','感冒','感染'] :
          name === '南非醉茄' ? ['压力','焦虑','睡眠'] : []
        )
        let overlap = 0
        nameKeywords.forEach((k) => { if (matchKeywords.has(k)) overlap += 1 })
        return { name, score: overlap }
      })
      .filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 3)

    setRelatedHerbs(scored.map(s => s.name))

    // 相关文章
    const articleBank = [
      { title: '消化健康草药：肠胃问题的自然疗法', href: '/zh/blog/digestive-health-herbs-zh' , tags: ['消化','生姜','薄荷']},
      { title: '改善睡眠的最佳草药：对失眠真正有效的方法', href: '/zh/blog/herbs-for-sleep-insomnia-zh', tags: ['睡眠','洋甘菊','焦虑']},
      { title: '隐藏的危险：5种需要避免的草药-药物组合', href: '/zh/blog/herb-drug-interactions-zh', tags: ['安全','相互作用']},
      { title: '缓解焦虑的最佳草药：处方药的天然替代品', href: '/zh/blog/herbs-for-anxiety-natural-alternatives-zh', tags: ['焦虑','南非醉茄']},
    ]
    const related = articleBank
      .map(a => ({ a, score: a.tags.reduce((acc, t) => acc + (matchKeywords.has(t) ? 1 : 0), 0) }))
      .filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 3)
      .map(x => ({ title: x.a.title, href: x.a.href }))
    setRelatedArticles(related)
  }, [herbData])

  const displayName = herbData.chinese_name || herbData.name

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: '首页', href: '/zh' },
            { label: '草药数据库', href: '/zh/herb-finder' },
            { label: displayName }
          ]} 
        />

        {/* Medical Review Banner */}
        <MedicalReviewBanner 
          reviewerName="曾楚平 (Zeng Chuping)"
          reviewerTitle="执业药剂师 & 中医专家"
          reviewerCredentials="南方医科大学毕业"
          lastUpdated={new Date()}
          reviewerLink="/zh/about"
        />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{displayName}</h1>
                  <p className="text-green-100 text-lg italic mb-4">{herbData.latin_name}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {herbData.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEvidenceColor(herbData.evidence_level)}`}>
                      {translations.evidenceLevel[herbData.evidence_level]} 证据
                    </span>
                    {herbData.properties?.map((prop, idx) => (
                      <span key={idx} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-3 rounded-full transition-colors ${
                      bookmarked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="px-8 py-6 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">安全等级</p>
                  <p className="font-semibold text-gray-900">普遍认为安全（GRAS）</p>
                  <p className="text-xs text-gray-500">大多数成人在典型剂量下安全</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FlaskConical className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">证据质量</p>
                  <p className="font-semibold text-gray-900">{translations.evidenceLevel[herbData.evidence_level]}</p>
                  <p className="text-xs text-gray-500">{translations.evidenceDescription[herbData.evidence_level]}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">主要用途</p>
                  <p className="font-semibold text-gray-900">{herbData.benefits?.length || 0} 种科学支持的益处</p>
                  <p className="text-xs text-gray-500">现代与传统应用</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">重要提示</p>
                  <p className="font-semibold text-gray-900">{herbData.safety_warnings?.length || 0} 项安全注意事项</p>
                  <p className="text-xs text-gray-500">请咨询医疗保健提供者</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8 overflow-x-auto">
              {[
                { id: 'overview', label: '概述', icon: Eye },
                { id: 'benefits', label: '功效与用途', icon: Heart },
                { id: 'safety', label: '安全性与剂量', icon: Shield },
                { id: 'science', label: '科学证据', icon: FlaskConical },
                { id: 'traditional', label: '传统应用', icon: BookOpen },
                { id: 'faq', label: '常见问题', icon: Users }
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">什么是{displayName}？</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{herbData.overview}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-blue-600" />
                      关键活性成分
                    </h3>
                    <p className="text-gray-700">{herbData.active_compounds}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      主要特性
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {herbData.properties?.map((prop, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* How to Use Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-green-600" />
                    如何使用{displayName}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <p className="font-medium text-gray-900">早晨例行</p>
                        <p className="text-gray-700 text-sm">早餐后饮用草药茶，帮助消化并促进循环</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <p className="font-medium text-gray-900">饭前服用</p>
                        <p className="text-gray-700 text-sm">在用餐前15-30分钟服用，以优化消化益处</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <p className="font-medium text-gray-900">冬季养生</p>
                        <p className="text-gray-700 text-sm">与柠檬和蜂蜜结合，制作温暖的冬季滋补饮品</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">科学支持的益处与现代应用</h2>
                  <div className="grid gap-4">
                    {herbData.benefits?.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800 font-medium mb-2">{benefit}</p>
                          <p className="text-sm text-gray-600">传统和现代研究都支持这一益处</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    谁应该考虑使用{displayName}？
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-800 mb-3">✅ 适用人群：</h4>
                      <ul className="space-y-2">
                        {herbData.suitable_for?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-3">❌ 应避免使用的人群：</h4>
                      <ul className="space-y-2">
                        {herbData.not_suitable_for?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">剂量与安全指南</h2>
                  <div className="grid gap-6">
                    {herbData.dosage_forms?.map((form, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Pill className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">{form.form}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-600">推荐剂量：</span>
                            <p className="text-gray-800">{form.dosage}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">使用说明：</span>
                            <p className="text-gray-800">{form.usage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    重要安全警告
                  </h3>
                  <div className="space-y-3">
                    {herbData.safety_warnings?.map((warning, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{warning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    潜在药物相互作用
                  </h3>
                  <div className="grid gap-3">
                    {herbData.interactions?.map((interaction, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{interaction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'science' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FlaskConical className="w-6 h-6 text-blue-600" />
                    科学证据与研究
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-gray-800 leading-relaxed">{herbData.scientific_evidence}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">证据质量评级</h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getEvidenceColor(herbData.evidence_level)}`}>
                      {translations.evidenceLevel[herbData.evidence_level]} 证据
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          herbData.evidence_level === 'Strong' ? 'bg-green-500 w-full' :
                          herbData.evidence_level === 'Moderate' ? 'bg-yellow-500 w-2/3' :
                          'bg-gray-400 w-1/3'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {translations.evidenceDescription[herbData.evidence_level]}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'traditional' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    中医传统视角
                  </h2>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <p className="text-gray-800 leading-relaxed">{herbData.traditional_uses}</p>
                  </div>
                </div>

                {/* 体质匹配 */}
                {herbData.constitution_match && herbData.constitution_match.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-blue-600" />
                      {displayName}适合您的体质吗？
                    </h3>
                    <div className="bg-white rounded-lg p-6 mb-6">
                      <p className="text-gray-800 leading-relaxed mb-4">
                        在中医传统中，草药在与个人体质匹配时效果最佳。{displayName}在特定体质模式下表现优异，但在某些情况下需要谨慎使用。
                      </p>
                      <p className="text-gray-700 text-sm">
                        <span className="font-medium">💡 为什么这很重要：</span> 了解您的体质有助于最大化益处、预防不良反应，并确保您为身体的独特需求选择正确的草药。
                      </p>
                    </div>
                    <div className="space-y-4">
                      {herbData.constitution_match.map((match, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
                          match.suitable === 'yes' ? 'border-green-300 bg-green-50' :
                          match.suitable === 'warning' ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'
                        }`}>
                          {getConstitutionIcon(match.suitable)}
                          <div>
                            <p className="font-medium text-gray-900">{match.type}</p>
                            <p className="text-sm text-gray-600">{match.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-100 rounded-lg p-4 mt-6">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-medium">🔍 不确定您的体质？</span> 我们的免费2分钟评估将帮助您发现独特的体质类型，并获得针对您需求的个性化草药建议。
                      </p>
                      <Link
                        href="/zh/constitution-test"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Brain className="w-4 h-4" />
                        进行免费体质测试
                      </Link>
                    </div>
                  </div>
                )}

                {/* 常见配伍 */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    常见草药配伍
                  </h3>
                  <div className="grid gap-4">
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">生姜 + 薄荷</h4>
                          <p className="text-gray-700 text-sm mb-2">强效组合，缓解恶心并支持消化</p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">最适合：</span> 晕动症、孕吐、胃部不适
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">生姜 + 肉桂</h4>
                          <p className="text-gray-700 text-sm mb-2">温性混合物，促进循环和代谢</p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">最适合：</span> 手脚冰冷、循环不良、冬季养生
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">生姜 + 姜黄</h4>
                          <p className="text-gray-700 text-sm mb-2">抗炎强力组合，支持关节和肌肉</p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">最适合：</span> 运动恢复、关节不适、整体抗炎
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
                  <p className="text-gray-600 mb-8">获取关于{displayName}安全性、用法和有效性的最常见问题的答案。</p>
                </div>

                {herbData.faqs && herbData.faqs.length > 0 ? (
                  <div className="space-y-6">
                    {herbData.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-start gap-3">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">问</div>
                          <span className="text-lg">{faq.question}</span>
                        </h3>
                        <div className="ml-9">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">答</div>
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">常见问题即将推出</h3>
                    <p className="text-gray-600 mb-6">我们正在收集关于{displayName}的最常见问题。</p>
                    <Link
                      href="/zh/constitution-test"
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <Brain className="w-4 h-4" />
                      进行体质测试
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Links Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">相关指南与工具</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((a, idx) => (
              <Link key={idx} href={a.href} className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600">根据您的兴趣推荐阅读</p>
                <span className="inline-block mt-3 text-green-600 text-sm">阅读文章 →</span>
              </Link>
            ))}
            <Link href={`/zh/herb-finder?search=${encodeURIComponent(displayName)}`} className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">查找相关草药</h3>
              <p className="text-sm text-gray-600">查看具有相似益处和安全性的草药</p>
              <span className="inline-block mt-3 text-green-600 text-sm">打开草药查找器 →</span>
            </Link>
            <Link href="/zh/constitution-test" className="block p-6 bg-gray-50 rounded-xl border hover:border-green-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">体质测试</h3>
              <p className="text-sm text-gray-600">发现{displayName}是否适合您的体质</p>
              <span className="inline-block mt-3 text-green-600 text-sm">开始测试 →</span>
            </Link>
          </div>
        </div>

        {/* Scientific References */}
        <div className="mb-8">
          <ScientificReferences herbName={displayName} />
        </div>

        {/* Related Herbs Section */}
        <div className="mb-8">
          <RelatedHerbsSection currentSlug={slug} count={3} />
        </div>

        {/* Enhanced Professional CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">准备好体验{displayName}的益处了吗？</h2>
              <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg">
                加入数千名通过循证草药医学改变健康的用户。获取个性化建议、专家指导和优质草药来源。
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Brain className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">个性化评估</h3>
                  <p className="text-green-100 text-sm">发现您的独特体质，获取定制草药建议</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">安全指导</h3>
                  <p className="text-green-100 text-sm">专家剂量计算和相互作用检查</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <Award className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">可信来源</h3>
                  <p className="text-green-100 text-sm">经过审查的供应商和质量测试的草药产品</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/zh/constitution-test" 
                  className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Brain className="w-5 h-5" />
                  进行免费体质测试
                </Link>
                <Link 
                  href="/zh/dosage-calculator" 
                  className="bg-green-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-900 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Pill className="w-5 h-5" />
                  计算安全剂量
                </Link>
                <Link
                  href="/zh/herb-finder"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Leaf className="w-5 h-5" />
                  探索更多草药
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-green-100">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  提供免费咨询
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  科学支持的建议
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  加入50,000+用户
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

