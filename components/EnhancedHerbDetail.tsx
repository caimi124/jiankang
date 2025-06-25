'use client'

import { useState } from 'react'
import { 
  Heart, Shield, Brain, FlaskConical, BookOpen, Users,
  CheckCircle, XCircle, AlertCircle, ChefHat, Lightbulb,
  FileText, Target, Activity, Clock
} from 'lucide-react'

interface EnhancedHerbDetailProps {
  herbData: {
    id: string
    name: string
    chineseName: string
    latinName: string
    briefDescription: string
    dosage: string
    usage: string
    safetyLevel: 'high' | 'medium' | 'low'
    precautions: string
    medicalCaseAnalysis: string
    wellnessRecipes: string
    practicalTips: string
    applicableSymptoms: string[]
    applicableDiseases: string[]
    contraindicationGroups: string[]
    contraindicationDetails: string
    tcmConstitution: string[]
    effectCategories: string[]
  }
}

export default function EnhancedHerbDetail({ herbData }: EnhancedHerbDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'high': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'low': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 草药标题区域 */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{herbData.name}</h1>
            <p className="text-green-100 text-xl mb-2">{herbData.chineseName}</p>
            <p className="text-green-200 italic">{herbData.latinName}</p>
          </div>
          <div className="flex items-center gap-3">
            {getSafetyIcon(herbData.safetyLevel)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSafetyColor(herbData.safetyLevel)}`}>
              安全等级: {herbData.safetyLevel === 'high' ? '高' : herbData.safetyLevel === 'medium' ? '中' : '低'}
            </span>
          </div>
        </div>
        <p className="text-green-100 mt-4 text-lg">{herbData.briefDescription}</p>
      </div>

      {/* 快速信息卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-gray-900">主要功效</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {herbData.effectCategories.map((effect, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {effect}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-8 h-8 text-green-600" />
            <h3 className="font-semibold text-gray-900">适用症状</h3>
          </div>
          <div className="text-sm text-gray-600">
            {herbData.applicableSymptoms.slice(0, 3).map((symptom, index) => (
              <div key={index}>• {symptom}</div>
            ))}
            {herbData.applicableSymptoms.length > 3 && (
              <div>...等 {herbData.applicableSymptoms.length} 种症状</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <h3 className="font-semibold text-gray-900">体质匹配</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {herbData.tcmConstitution.map((constitution, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                {constitution}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-8 h-8 text-orange-600" />
            <h3 className="font-semibold text-gray-900">用法用量</h3>
          </div>
          <div className="text-sm text-gray-600">
            <div><strong>剂量:</strong> {herbData.dosage}</div>
            <div><strong>用法:</strong> {herbData.usage}</div>
          </div>
        </div>
      </div>

      {/* 标签导航 */}
      <div className="bg-white rounded-2xl shadow-xl mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8 overflow-x-auto">
            {[
              { id: 'overview', label: '综合信息', icon: BookOpen },
              { id: 'safety', label: '安全信息', icon: Shield }
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

        {/* 标签内容 */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">适用疾病</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {herbData.applicableDiseases.map((disease, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800">{disease}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">禁忌人群</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{herbData.contraindicationDetails}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {herbData.contraindicationGroups.map((group, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        ⚠️ {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-red-900">安全注意事项</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-red-800 mb-2">禁忌人群</h4>
                    <p className="text-red-700">{herbData.contraindicationDetails}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-800 mb-2">注意事项</h4>
                    <p className="text-red-700">{herbData.precautions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-green-900">安全建议</h3>
                </div>
                <ul className="space-y-2 text-green-800">
                  <li>• 首次使用前咨询专业中医师</li>
                  <li>• 按照推荐剂量使用，不要超量</li>
                  <li>• 如出现不适症状，立即停用并就医</li>
                  <li>• 孕妇、哺乳期妇女、儿童使用前需医师指导</li>
                  <li>• 与其他药物同时使用前咨询医师</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 