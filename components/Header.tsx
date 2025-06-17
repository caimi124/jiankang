'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe, Menu, X } from 'lucide-react'
import MobileNavigation from './MobileNavigation'
import { getTranslation, supportedLanguages } from '../lib/i18n'

export default function Header() {
  const pathname = usePathname()
  const [currentLang, setCurrentLang] = useState('en')
  const [showLangMenu, setShowLangMenu] = useState(false)

  const t = getTranslation(currentLang)

  // 检测当前语言
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t_corrected = getTranslation(currentLocale)

  const navigationItems = [
    { href: '/', label: t_corrected.nav.home, icon: '🏠' },
    { href: '/herb-finder', label: t_corrected.nav.herbFinder, icon: '🔍' },
    { href: '/ingredient-checker', label: t_corrected.nav.safetyChecker, icon: '🛡️' },
    { href: '/knowledge-center', label: t_corrected.nav.knowledgeCenter, icon: '📚' },
    { href: '/constitution-test', label: t_corrected.nav.constitutionTest, icon: '🧠' },
    { href: '/user-experiences', label: t_corrected.nav.userReviews, icon: '💬' },
    { href: '/blog', label: t_corrected.nav.blog, icon: '📝' },
    { href: '/about', label: t_corrected.nav.about, icon: 'ℹ️' }
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setShowLangMenu(false)
    // Here you would implement actual language switching logic
    // For example, using next-i18next or your preferred i18n solution
    console.log(`Switching to language: ${langCode}`)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center text-2xl font-bold text-green-700 hover:text-green-800 transition-colors"
            >
              <span className="mr-2 text-3xl">🌿</span>
              <span className="hidden sm:inline">HerbScience.shop</span>
              <span className="sm:hidden">HerbScience</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive(item.href)
                    ? 'text-green-700 bg-green-50 shadow-sm'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                aria-label="Choose language"
              >
                <Globe size={16} className="mr-2" />
                <span className="hidden sm:inline">
                  {supportedLanguages.find(lang => lang.code === currentLang)?.name || 'English'}
                </span>
                <span className="sm:hidden">
                  {supportedLanguages.find(lang => lang.code === currentLang)?.flag || '🇺🇸'}
                </span>
              </button>

              {/* Language Dropdown */}
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                  {supportedLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`
                        w-full text-left px-4 py-3 text-sm flex items-center hover:bg-green-50 transition-colors
                        ${currentLang === language.code ? 'text-green-700 bg-green-50 font-medium' : 'text-gray-700'}
                      `}
                    >
                      <span className="mr-3 text-lg">{language.flag}</span>
                      {language.name}
                      {currentLang === language.code && (
                        <span className="ml-auto text-green-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Overlay - handled by MobileNavigation component */}
    </header>
  )
} 