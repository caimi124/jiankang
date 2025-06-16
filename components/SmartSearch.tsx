'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Filter, ChevronDown } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  type: 'herb' | 'condition' | 'article'
  description: string
  url: string
}

interface SmartSearchProps {
  placeholder?: string
  onSearch?: (query: string, filters: string[]) => void
  showFilters?: boolean
}

export default function SmartSearch({ 
  placeholder = "Search herbs, conditions, or articles...",
  onSearch,
  showFilters = true 
}: SmartSearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Mock search data - in real app, this would come from API
  const searchData: SearchResult[] = [
    { id: '1', title: 'Ashwagandha', type: 'herb', description: 'Adaptogenic herb for stress relief', url: '/herbs/ashwagandha' },
    { id: '2', title: 'Anxiety Management', type: 'condition', description: 'Natural approaches to anxiety', url: '/conditions/anxiety' },
    { id: '3', title: 'Turmeric Benefits', type: 'article', description: 'Anti-inflammatory properties of turmeric', url: '/articles/turmeric-benefits' },
    { id: '4', title: 'Reishi Mushroom', type: 'herb', description: 'Immune support and stress relief', url: '/herbs/reishi' },
    { id: '5', title: 'Insomnia Solutions', type: 'condition', description: 'Herbal remedies for sleep issues', url: '/conditions/insomnia' },
  ]

  const filterOptions = [
    { value: 'herb', label: '🌿 Herbs', count: 127 },
    { value: 'condition', label: '🎯 Conditions', count: 45 },
    { value: 'article', label: '📄 Articles', count: 89 },
    { value: 'research', label: '🔬 Research', count: 156 }
  ]

  useEffect(() => {
    if (query.length > 1) {
      // Simulate search API call
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ).filter(item => 
        filters.length === 0 || filters.includes(item.type)
      )
      setResults(filteredResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, filters])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowFilterMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query, filters)
    setIsOpen(false)
  }

  const toggleFilter = (filterValue: string) => {
    setFilters(prev => 
      prev.includes(filterValue) 
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    )
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'herb': return '🌿'
      case 'condition': return '🎯'
      case 'article': return '📄'
      default: return '📋'
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 text-gray-900 bg-white rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
          />
          <div className="absolute right-2 flex items-center space-x-2">
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {showFilters && (
              <button
                type="button"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`p-2 rounded-lg transition-colors ${
                  filters.length > 0 || showFilterMenu 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Filter Menu */}
      {showFilterMenu && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="font-semibold text-gray-900 mb-3">Filter by type:</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.includes(option.value)}
                  onChange={() => toggleFilter(option.value)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="flex-1">{option.label}</span>
                <span className="text-sm text-gray-500">({option.count})</span>
              </label>
            ))}
          </div>
          {filters.length > 0 && (
            <button
              onClick={() => setFilters([])}
              className="mt-3 text-sm text-green-600 hover:text-green-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Search Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-40">
          {results.map((result) => (
            <a
              key={result.id}
              href={result.url}
              className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getTypeIcon(result.type)}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                    {result.type}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center z-40">
          <div className="text-gray-400 mb-2">
            <Search className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-gray-600">No results found for "{query}"</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
} 