import { Shield, AlertTriangle, Clock, Info, XCircle } from 'lucide-react'

interface HerbSafetyProps {
  herbData: any
}

export function HerbSafety({ herbData }: HerbSafetyProps) {
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
      case 'low': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-2 text-amber-600" />
        Safety & Dosage
      </h3>
      
      <div className="space-y-6">
        {/* 安全等级 */}
        {herbData.safetyLevel && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-amber-500" />
              Safety Level
            </h4>
            <div className="flex items-center gap-3">
              {getSafetyIcon(herbData.safetyLevel)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSafetyColor(herbData.safetyLevel)}`}>
                {herbData.safetyLevel === 'high' ? 'High Safety' :
                 herbData.safetyLevel === 'medium' ? 'Moderate Safety' :
                 'Use with Caution'}
              </span>
            </div>
          </div>
        )}

        {/* 用量指南 */}
        {herbData.dosage && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              Recommended Dosage
            </h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.dosage}</p>
            </div>
          </div>
        )}

        {/* 禁忌症 */}
        {herbData.contraindications && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              Contraindications
            </h4>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.contraindications}</p>
            </div>
          </div>
        )}

        {/* 注意事项 */}
        {herbData.precautions && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2 text-blue-500" />
              Precautions
            </h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.precautions}</p>
            </div>
          </div>
        )}

        {/* 药物相互作用 */}
        {herbData.drugInteractions && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
              Drug Interactions
            </h4>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.drugInteractions}</p>
            </div>
          </div>
        )}

        {/* 如果没有数据，显示占位符 */}
        {!herbData.safetyLevel && !herbData.dosage && 
         !herbData.contraindications && !herbData.precautions && !herbData.drugInteractions && (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>Safety information not available</p>
            <p className="text-sm text-gray-400 mt-2">
              This section will display safety warnings and dosage guidelines when available
            </p>
          </div>
        )}

        {/* 通用安全提醒 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-2">Important Safety Notice</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                This information is for educational purposes only and is not intended as medical advice. 
                Always consult with qualified healthcare professionals before using any herbal supplements, 
                especially if you have medical conditions or take medications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
