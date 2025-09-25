'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react'

interface ChartData {
  herb: string
  icon: string
  coldConstitution: {
    effectiveness: number
    reaction: 'positive' | 'negative' | 'neutral'
    description: string
  }
  hotConstitution: {
    effectiveness: number
    reaction: 'positive' | 'negative' | 'neutral'
    description: string
  }
  balanced: {
    effectiveness: number
    reaction: 'positive' | 'negative' | 'neutral'
    description: string
  }
}

const herbData: ChartData[] = [
  {
    herb: 'Ginseng',
    icon: '🫘',
    coldConstitution: {
      effectiveness: 90,
      reaction: 'positive',
      description: 'Excellent for boosting energy and warming the body'
    },
    hotConstitution: {
      effectiveness: 25,
      reaction: 'negative',
      description: 'May cause overstimulation and heat symptoms'
    },
    balanced: {
      effectiveness: 75,
      reaction: 'positive',
      description: 'Generally well-tolerated with moderate benefits'
    }
  },
  {
    herb: 'Chamomile',
    icon: '🌸',
    coldConstitution: {
      effectiveness: 30,
      reaction: 'negative',
      description: 'Too cooling, may worsen cold symptoms'
    },
    hotConstitution: {
      effectiveness: 85,
      reaction: 'positive',
      description: 'Perfect for calming and cooling excess heat'
    },
    balanced: {
      effectiveness: 70,
      reaction: 'positive',
      description: 'Good for general relaxation and sleep'
    }
  },
  {
    herb: 'Echinacea',
    icon: '🟣',
    coldConstitution: {
      effectiveness: 80,
      reaction: 'positive',
      description: 'Boosts weak immunity effectively'
    },
    hotConstitution: {
      effectiveness: 40,
      reaction: 'negative',
      description: 'May increase inflammation in hot types'
    },
    balanced: {
      effectiveness: 65,
      reaction: 'positive',
      description: 'Good for short-term immune support'
    }
  },
  {
    herb: 'Valerian',
    icon: '🌿',
    coldConstitution: {
      effectiveness: 35,
      reaction: 'negative',
      description: 'Too sedating for low-energy types'
    },
    hotConstitution: {
      effectiveness: 85,
      reaction: 'positive',
      description: 'Excellent for calming overactive minds'
    },
    balanced: {
      effectiveness: 70,
      reaction: 'positive',
      description: 'Effective for occasional sleep issues'
    }
  }
]

const constitutionTypes = [
  { key: 'coldConstitution', name: 'Cold Constitution', icon: '❄️', color: 'blue' },
  { key: 'hotConstitution', name: 'Hot Constitution', icon: '🔥', color: 'red' },
  { key: 'balanced', name: 'Balanced', icon: '⚖️', color: 'green' }
]

export default function HerbEffectivenessChart() {
  const [selectedHerb, setSelectedHerb] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ herb: string; type: string } | null>(null)

  const getReactionIcon = (reaction: 'positive' | 'negative' | 'neutral') => {
    switch (reaction) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getEffectivenessColor = (effectiveness: number, reaction: string) => {
    if (reaction === 'negative') return 'bg-red-100 text-red-800'
    if (effectiveness >= 80) return 'bg-green-100 text-green-800'
    if (effectiveness >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500' },
      red: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500' },
      green: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500' }
    }
    return colorMap[color as keyof typeof colorMap][type]
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Herb Effectiveness by Constitution Type
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how the same herbs work differently for different body types. Click on any herb for detailed information.
        </p>
      </div>

      {/* Interactive Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <th className="p-4 text-left font-semibold">Herb</th>
                {constitutionTypes.map((type) => (
                  <th key={type.key} className="p-4 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">{type.icon}</span>
                      <span>{type.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {herbData.map((herb) => (
                <tr 
                  key={herb.herb}
                  className={`border-b border-gray-100 transition-colors ${
                    selectedHerb === herb.herb ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedHerb(selectedHerb === herb.herb ? null : herb.herb)}
                >
                  <td className="p-4">
                    <div className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-3">{herb.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{herb.herb}</div>
                        <div className="text-sm text-gray-500">Click for details</div>
                      </div>
                    </div>
                  </td>
                  {constitutionTypes.map((type) => {
                    const data = herb[type.key as keyof ChartData] as any
                    return (
                      <td
                        key={type.key}
                        className="p-4 text-center cursor-pointer"
                        onMouseEnter={() => setHoveredCell({ herb: herb.herb, type: type.key })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEffectivenessColor(data.effectiveness, data.reaction)}`}>
                            {data.effectiveness}%
                          </div>
                          <div className="flex items-center">
                            {getReactionIcon(data.reaction)}
                          </div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Information */}
      {selectedHerb && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          {(() => {
            const herb = herbData.find(h => h.herb === selectedHerb)!
            return (
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{herb.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{herb.herb}</h3>
                    <p className="text-blue-600">Detailed effectiveness breakdown</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {constitutionTypes.map((type) => {
                    const data = herb[type.key as keyof ChartData] as any
                    return (
                      <div 
                        key={type.key}
                        className={`bg-white rounded-xl p-6 border-2 ${
                          data.reaction === 'positive' ? 'border-green-200' : 
                          data.reaction === 'negative' ? 'border-red-200' : 'border-gray-200'
                        }`}
                      >
                        <div className="text-center mb-4">
                          <span className="text-3xl">{type.icon}</span>
                          <h4 className="font-semibold text-gray-900 mt-2">{type.name}</h4>
                        </div>
                        
                        <div className="text-center mb-4">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getEffectivenessColor(data.effectiveness, data.reaction)}`}>
                            {getReactionIcon(data.reaction)}
                            <span className="ml-2">{data.effectiveness}%</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm text-center leading-relaxed">
                          {data.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredCell && (
        <div className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none"
             style={{ 
               left: '50%', 
               top: '50%', 
               transform: 'translate(-50%, -50%)'
             }}>
          <Info className="w-4 h-4 inline mr-1" />
          Click for detailed breakdown
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="font-semibold text-green-800">Positive Effect</div>
          <div className="text-sm text-green-600">Works well for this constitution</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
          <TrendingDown className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <div className="font-semibold text-red-800">Negative Effect</div>
          <div className="text-sm text-red-600">May cause adverse reactions</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
          <Minus className="w-6 h-6 text-gray-500 mx-auto mb-2" />
          <div className="font-semibold text-gray-800">Neutral Effect</div>
          <div className="text-sm text-gray-600">Minimal impact</div>
        </div>
      </div>
    </div>
  )
}
