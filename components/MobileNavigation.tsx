'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu, Search, ChevronDown } from 'lucide-react'

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const menuItems = [
    {
      title: 'Tools',
      href: '/tools',
      icon: '🔧',
      children: [
        { title: 'Herb Finder', href: '/herb-finder', icon: '🔍' },
        { title: 'Ingredient Checker', href: '/ingredient-checker', icon: '🛡️' },
        { title: 'Constitution Quiz', href: '/constitution-test', icon: '🧠' },
        { title: 'Dosage Calculator', href: '/dosage-calculator', icon: '⚖️' }
      ]
    },
    {
      title: 'Learn',
      href: '/learn',
      icon: '📚',
      children: [
        { title: 'Knowledge Center', href: '/knowledge-center', icon: '📖' },
        { title: 'Articles', href: '/articles', icon: '📝' },
        { title: 'Research', href: '/research', icon: '🔬' }
      ]
    },
    {
      title: 'Community',
      href: '/community',
      icon: '👥',
      children: [
        { title: 'User Experiences', href: '/user-experiences', icon: '💬' },
        { title: 'Expert Q&A', href: '/expert-qa', icon: '🎓' },
        { title: 'Forum', href: '/forum', icon: '💭' }
      ]
    }
  ]

  const toggleExpanded = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
        aria-label="Open mobile menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl transform transition-transform">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link href="/" className="text-xl font-bold text-green-700 flex items-center">
                🌿 HerbScience
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close mobile menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search herbs, symptoms..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${
                          expandedSection === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {expandedSection === item.title && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <span className="mr-3">{child.icon}</span>
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Quick Links */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <span className="mr-3">ℹ️</span>
                    <span>About Us</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <span className="mr-3">📧</span>
                    <span>Contact</span>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href="/constitution-test"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                🎯 Take Constitution Quiz
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 