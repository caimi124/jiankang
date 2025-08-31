import { Clock, ChefHat, FlaskConical, BookOpen, Info } from 'lucide-react'

interface HerbUsageProps {
  herbData: any
}

export function HerbUsage({ herbData }: HerbUsageProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
        Usage & Preparation
      </h3>
      
      <div className="space-y-6">
        {/* 用量指南 */}
        {herbData.dosage && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              Recommended Dosage
            </h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.dosage}</p>
            </div>
          </div>
        )}

        {/* 用法说明 */}
        {herbData.usage && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
              How to Use
            </h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.usage}</p>
            </div>
          </div>
        )}

        {/* 制备方法 */}
        {herbData.preparation && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <ChefHat className="w-4 h-4 mr-2 text-purple-500" />
              Preparation Methods
            </h4>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.preparation}</p>
            </div>
          </div>
        )}

        {/* 剂型 */}
        {herbData.dosageForms && herbData.dosageForms.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FlaskConical className="w-4 h-4 mr-2 text-amber-500" />
              Available Forms
            </h4>
            <div className="flex flex-wrap gap-2">
              {herbData.dosageForms.map((form: string, index: number) => (
                <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  {form}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 使用频率 */}
        {herbData.frequency && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Frequency of Use
            </h4>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.frequency}</p>
            </div>
          </div>
        )}

        {/* 最佳服用时间 */}
        {herbData.bestTime && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-teal-500" />
              Best Time to Take
            </h4>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{herbData.bestTime}</p>
            </div>
          </div>
        )}

        {/* 如果没有数据，显示占位符 */}
        {!herbData.dosage && !herbData.usage && !herbData.preparation && 
         !herbData.dosageForms && !herbData.frequency && !herbData.bestTime && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>Usage information not available</p>
            <p className="text-sm text-gray-400 mt-2">
              This section will display dosage guidelines and preparation methods when available
            </p>
          </div>
        )}

        {/* 通用使用提醒 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Usage Tips</h4>
              <ul className="text-blue-700 text-sm leading-relaxed space-y-1">
                <li>• Start with the lowest recommended dose</li>
                <li>• Take with food if stomach upset occurs</li>
                <li>• Store in a cool, dry place away from direct sunlight</li>
                <li>• Consult healthcare provider for long-term use</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
