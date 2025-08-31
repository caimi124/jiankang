'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  FlaskConical, 
  Shield, 
  FileText, 
  Users, 
  HelpCircle,
  Leaf,
  Activity,
  AlertTriangle,
  Clock,
  Star
} from 'lucide-react'

interface HerbDetailTabsProps {
  herbData: any
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function HerbDetailTabs({ herbData, activeTab = 'overview', onTabChange }: HerbDetailTabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Basic information and active compounds'
    },
    {
      id: 'benefits',
      label: 'Modern Uses & Benefits',
      icon: <Activity className="w-4 h-4" />,
      description: 'Contemporary applications and health benefits'
    },
    {
      id: 'safety',
      label: 'Safety & Dosage',
      icon: <Shield className="w-4 h-4" />,
      description: 'Usage guidelines and safety warnings'
    },
    {
      id: 'research',
      label: 'Scientific Evidence',
      icon: <FlaskConical className="w-4 h-4" />,
      description: 'Research support and evidence levels'
    },
    {
      id: 'traditional',
      label: 'Traditional Use',
      icon: <Leaf className="w-4 h-4" />,
      description: 'TCM perspective and constitution matching'
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: <HelpCircle className="w-4 h-4" />,
      description: 'Common questions and answers'
    }
  ]

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Basic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Chinese Name</h4>
                  <p className="text-gray-900">{herbData.chineseName || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Latin Name</h4>
                  <p className="text-gray-900 italic">{herbData.latinName || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-900 leading-relaxed">
                    {herbData.description || herbData.overview || 'Description not available'}
                  </p>
                </div>
              </div>
            </div>

            {herbData.activeCompounds && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
                  Active Compounds
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(herbData.activeCompounds) 
                    ? herbData.activeCompounds.map((compound: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {compound}
                        </span>
                      ))
                    : <span className="text-gray-500">No active compounds data available</span>
                  }
                </div>
              </div>
            )}
          </div>
        )

      case 'benefits':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                Modern Applications
              </h3>
              <div className="space-y-4">
                {herbData.modernApplications ? (
                  <p className="text-gray-900 leading-relaxed">{herbData.modernApplications}</p>
                ) : herbData.primaryEffects ? (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Primary Benefits</h4>
                    <ul className="space-y-2">
                      {Array.isArray(herbData.primaryEffects) && herbData.primaryEffects.map((effect: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Star className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-900">{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500">Modern applications data not available</p>
                )}
              </div>
            </div>
          </div>
        )

      case 'safety':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-amber-600" />
                Safety Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Safety Level</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      herbData.safetyLevel === 'high' ? 'bg-green-100 text-green-800' :
                      herbData.safetyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {herbData.safetyLevel === 'high' ? 'High Safety' :
                       herbData.safetyLevel === 'medium' ? 'Moderate Safety' :
                       'Use with Caution'}
                    </span>
                  </div>
                </div>

                {herbData.dosage && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Recommended Dosage</h4>
                    <p className="text-gray-900">{herbData.dosage}</p>
                  </div>
                )}

                {herbData.contraindications && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Contraindications</h4>
                    <p className="text-gray-900">{herbData.contraindications}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 'research':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FlaskConical className="w-5 h-5 mr-2 text-purple-600" />
              Scientific Evidence
            </h3>
            <div className="text-center py-8">
              <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Research data not available</p>
              <p className="text-sm text-gray-400 mt-2">
                This section will display scientific studies and evidence levels when available
              </p>
            </div>
          </div>
        )

      case 'traditional':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-600" />
              Traditional Use
            </h3>
            <div className="space-y-4">
              {herbData.traditionalUse ? (
                <p className="text-gray-900 leading-relaxed">{herbData.traditionalUse}</p>
              ) : (
                <p className="text-gray-500">Traditional use information not available</p>
              )}
            </div>
          </div>
        )

      case 'faq':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
              Frequently Asked Questions
            </h3>
            <div className="text-center py-8">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">FAQ data not available</p>
              <p className="text-sm text-gray-400 mt-2">
                Common questions and answers will appear here
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  )
}
