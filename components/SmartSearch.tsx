'use client'

import { useState } from 'react'

interface SmartSearchProps {
  placeholder: string
  onSearch: (query: string, filters: any) => void
}

export default function SmartSearch({ placeholder, onSearch }: SmartSearchProps) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query, {})
    }
  }

  const suggestions = [
    "anxiety natural remedies",
    "turmeric benefits",
    "ginseng dosage",
    "sleep herbs",
    "digestive enzymes"
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all">
          <div className="flex-1 flex items-center px-6 py-4">
            <span className="text-gray-400 mr-3 text-xl">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
              placeholder={placeholder}
              className="flex-1 text-lg text-gray-900 placeholder-gray-500 border-none outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 font-semibold transition-colors"
          >
            Search
          </button>
        </div>
        
        {/* Search Suggestions */}
        {isExpanded && (
          <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-xl shadow-lg border border-gray-200 z-10">
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion)
                      onSearch(suggestion, {})
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="mr-2">🔍</span>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
      
      {/* Quick Filter Tags */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['Anxiety', 'Sleep', 'Digestion', 'Energy', 'Immunity'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag.toLowerCase())
              onSearch(tag.toLowerCase(), { category: tag })
            }}
            className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
} 