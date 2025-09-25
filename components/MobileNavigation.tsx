'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Menu, Search, ChevronDown } from 'lucide-react'
import { getTranslation } from '../lib/i18n'

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const pathname = usePathname()
  
  // 检测当前语言
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)

  const menuItems = [
    {
      title: t.nav.home,
      href: '/',
      icon: '🏠'
    },
    {
      title: t.nav.herbFinder,
      href: '/herb-finder',
      icon: '🔍'
    },
    {
      title: t.nav.constitutionTest,
      href: '/constitution-test',
      icon: '🧠'
    },
    {
      title: t.nav.blog,
      href: '/blog',
      icon: '📝'
    },
    {
      title: t.nav.about,
      href: '/about',
      icon: 'ℹ️'
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
                  <Link
                    key={item.href}
                    href={currentLocale === 'zh' ? `/zh${item.href}` : item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.href || pathname === `/zh${item.href}`
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={currentLocale === 'zh' ? '/zh/constitution-test' : '/constitution-test'}
                onClick={() => setIsOpen(false)}
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                🎯 {t.nav.constitutionTest}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 