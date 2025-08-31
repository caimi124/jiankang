import { FlaskConical, FileText, ExternalLink, Star, AlertCircle } from 'lucide-react'

interface HerbResearchProps {
  herbData: any
}

export function HerbResearch({ herbData }: HerbResearchProps) {
  const getEvidenceLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'strong': return 'bg-green-100 text-green-800 border-green-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'limited': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'insufficient': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEvidenceLevelIcon = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'strong': return <Star className="w-4 h-4 text-green-600" />
      case 'moderate': return <Star className="w-4 h-4 text-yellow-600" />
      case 'limited': return <Star className="w-4 h-4 text-orange-600" />
      case 'insufficient': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <FlaskConical className="w-6 h-6 mr-2 text-purple-600" />
        Scientific Evidence
      </h3>
      
      <div className="space-y-6">
        {/* 证据等级 */}
        {herbData.evidenceLevel && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Evidence Level
            </h4>
            <div className="flex items-center gap-3">
              {getEvidenceLevelIcon(herbData.evidenceLevel)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEvidenceLevelColor(herbData.evidenceLevel)}`}>
                {herbData.evidenceLevel}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {herbData.evidenceLevel === 'Strong' && 'Well-established scientific evidence supports this use'}
              {herbData.evidenceLevel === 'Moderate' && 'Some scientific evidence supports this use'}
              {herbData.evidenceLevel === 'Limited' && 'Limited scientific evidence available'}
              {herbData.evidenceLevel === 'Insufficient' && 'Insufficient scientific evidence available'}
            </p>
          </div>
        )}

        {/* 研究摘要 */}
        {herbData.studies && herbData.studies.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              Research Studies
            </h4>
            <div className="space-y-4">
              {herbData.studies.map((study: any, index: number) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{study.title}</h5>
                  {study.summary && (
                    <p className="text-gray-700 text-sm mb-3">{study.summary}</p>
                  )}
                  {study.evidenceLevel && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEvidenceLevelColor(study.evidenceLevel)}`}>
                        {study.evidenceLevel}
                      </span>
                    </div>
                  )}
                  {study.link && (
                    <a 
                      href={study.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Study
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 临床试验 */}
        {herbData.clinicalTrials && herbData.clinicalTrials.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FlaskConical className="w-4 h-4 mr-2 text-green-500" />
              Clinical Trials
            </h4>
            <div className="space-y-3">
              {herbData.clinicalTrials.map((trial: any, index: number) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{trial.title}</h5>
                  {trial.description && (
                    <p className="text-gray-700 text-sm mb-2">{trial.description}</p>
                  )}
                  {trial.participants && (
                    <p className="text-gray-600 text-xs">Participants: {trial.participants}</p>
                  )}
                  {trial.link && (
                    <a 
                      href={trial.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-800 text-sm"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Trial
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 如果没有数据，显示占位符 */}
        {!herbData.evidenceLevel && !herbData.studies && !herbData.clinicalTrials && (
          <div className="text-center py-8 text-gray-500">
            <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>Research data not available</p>
            <p className="text-sm text-gray-400 mt-2">
              This section will display scientific studies and evidence levels when available
            </p>
          </div>
        )}

        {/* 证据等级说明 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-gray-800 mb-3">Understanding Evidence Levels</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-gray-700"><strong>Strong:</strong> Well-established evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-700"><strong>Moderate:</strong> Some evidence available</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-gray-700"><strong>Limited:</strong> Limited evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-gray-700"><strong>Insufficient:</strong> Not enough evidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* 免责声明 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-2">Research Disclaimer</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                Scientific evidence levels are based on available research and may change as new studies emerge. 
                Always consult healthcare professionals for personalized medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
