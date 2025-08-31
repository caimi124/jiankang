import { Leaf, Star, Shield, AlertTriangle } from 'lucide-react'

interface HerbHeroProps {
  title?: string
  chineseName?: string
  latinName?: string
  description?: string
  primaryEffects?: string[]
  activeCompounds?: string[]
  safetyLevel?: string
  category?: string
  constitutionType?: string
  herbData?: any
}

export function HerbHero({ 
  title, 
  chineseName, 
  latinName, 
  description, 
  primaryEffects, 
  activeCompounds, 
  safetyLevel, 
  category, 
  constitutionType,
  herbData 
}: HerbHeroProps) {
  // 优先使用直接传入的props，如果没有则使用herbData
  const herbTitle = title || herbData?.title || herbData?.name || 'Herb Name'
  const herbChineseName = chineseName || herbData?.chineseName
  const herbLatinName = latinName || herbData?.latinName
  const herbDescription = description || herbData?.description
  const herbPrimaryEffects = primaryEffects || herbData?.primaryEffects
  const herbActiveCompounds = activeCompounds || herbData?.activeCompounds
  const herbSafetyLevel = safetyLevel || herbData?.safetyLevel
  const herbCategory = category || herbData?.category
  const herbConstitutionType = constitutionType || herbData?.constitutionType

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'high': return <Shield className="w-5 h-5 text-green-600" />
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'low': return <AlertTriangle className="w-5 h-5 text-red-600" />
      default: return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 mb-8 border border-green-200">
      <div className="max-w-4xl mx-auto">
        {/* 草药标题区域 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6 shadow-lg">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {herbTitle}
          </h1>
          {herbChineseName && (
            <p className="text-2xl text-green-700 mb-2 font-medium">
              {herbChineseName}
            </p>
          )}
          {herbLatinName && (
            <p className="text-lg text-gray-600 italic mb-4">
              {herbLatinName}
            </p>
          )}
          
          {/* 安全等级标签 */}
          {herbSafetyLevel && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 bg-white/80 backdrop-blur-sm">
              {getSafetyIcon(herbSafetyLevel)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSafetyColor(herbSafetyLevel)}`}>
                {herbSafetyLevel === 'high' ? 'High Safety' :
                 herbSafetyLevel === 'medium' ? 'Moderate Safety' :
                 'Use with Caution'}
              </span>
            </div>
          )}
        </div>

        {/* 描述 */}
        {herbDescription && (
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {herbDescription}
            </p>
          </div>
        )}

        {/* 快速信息卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 主要功效 */}
          {herbPrimaryEffects && herbPrimaryEffects.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-green-600" />
                <h3 className="font-semibold text-gray-900">Primary Benefits</h3>
              </div>
              <div className="space-y-2">
                {herbPrimaryEffects.slice(0, 3).map((effect: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{effect}</span>
                  </div>
                ))}
                {herbPrimaryEffects.length > 3 && (
                  <p className="text-gray-500 text-sm mt-2">
                    +{herbPrimaryEffects.length - 3} more benefits
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 活性成分 */}
          {herbActiveCompounds && herbActiveCompounds.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-8 h-8 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Active Compounds</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {herbActiveCompounds.slice(0, 4).map((compound: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {compound}
                  </span>
                ))}
                {herbActiveCompounds.length > 4 && (
                  <span className="text-gray-500 text-xs">
                    +{herbActiveCompounds.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 分类信息 */}
          {herbCategory && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Category</h3>
              </div>
              <div className="space-y-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {herbCategory}
                </span>
                {herbConstitutionType && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Constitution:</span> {herbConstitutionType}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
