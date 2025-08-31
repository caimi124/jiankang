import { Star, Activity, Target, CheckCircle } from 'lucide-react'

interface HerbBenefitsProps {
  herbData: any
}

export function HerbBenefits({ herbData }: HerbBenefitsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-2 text-green-600" />
        Modern Uses & Benefits
      </h3>
      
      <div className="space-y-6">
        {/* 主要功效 */}
        {herbData.primaryEffects && herbData.primaryEffects.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-green-500" />
              Primary Benefits
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {herbData.primaryEffects.map((effect: string, index: number) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{effect}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 现代应用 */}
        {herbData.modernApplications && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2 text-blue-500" />
              Contemporary Applications
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {herbData.modernApplications}
            </p>
          </div>
        )}

        {/* 适用症状 */}
        {herbData.applicableSymptoms && herbData.applicableSymptoms.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-purple-500" />
              Suitable for Symptoms
            </h4>
            <div className="flex flex-wrap gap-2">
              {herbData.applicableSymptoms.map((symptom: string, index: number) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 适用体质 */}
        {herbData.tcmConstitution && herbData.tcmConstitution.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2 text-amber-500" />
              Suitable Constitution Types
            </h4>
            <div className="flex flex-wrap gap-2">
              {herbData.tcmConstitution.map((constitution: string, index: number) => (
                <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  {constitution}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 如果没有数据，显示占位符 */}
        {!herbData.primaryEffects && !herbData.modernApplications && 
         !herbData.applicableSymptoms && !herbData.tcmConstitution && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>Benefits information not available</p>
            <p className="text-sm text-gray-400 mt-2">
              This section will display health benefits and modern applications when available
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
