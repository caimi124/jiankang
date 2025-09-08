'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Globe, Menu, X, ChevronDown } from 'lucide-react'
import MobileNavigation from './MobileNavigation'
import { getTranslation, supportedLanguages } from '../lib/i18n'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 检测当前语言
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)

  const navigationItems = [
    { href: '/', label: t.nav.home, icon: '🏠', gradient: 'from-blue-500 to-cyan-500' },
    { href: '/herb-finder', label: t.nav.herbFinder, icon: '🔍', gradient: 'from-green-500 to-emerald-500' },
    { href: '/ingredient-checker', label: t.nav.safetyChecker, icon: '🛡️', gradient: 'from-orange-500 to-red-500' },
    { href: '/knowledge-center', label: t.nav.knowledgeCenter, icon: '📚', gradient: 'from-purple-500 to-pink-500' },
    { href: '/constitution-test', label: t.nav.constitutionTest, icon: '🧠', gradient: 'from-indigo-500 to-purple-500' },
    { href: '/user-experiences', label: t.nav.userReviews, icon: '💬', gradient: 'from-yellow-500 to-orange-500' },
    { href: '/blog', label: t.nav.blog, icon: '📝', gradient: 'from-teal-500 to-green-500' },
    { href: '/about', label: t.nav.about, icon: 'ℹ️', gradient: 'from-gray-500 to-slate-500' }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/zh'
    }
    return pathname === href || pathname === `/zh${href}` || pathname.startsWith(href + '/') || pathname.startsWith(`/zh${href}/`)
  }

  const handleLanguageChange = (langCode: string) => {
    setShowLangMenu(false)
    const currentPath = pathname.replace(/^\/zh/, '') || '/'
    if (langCode === 'zh') {
      router.push(`/zh${currentPath}`)
    } else {
      router.push(currentPath)
    }
  }

  const getLocalizedHref = (href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <Link 
              href={getLocalizedHref('/')}
              className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6">
                  <span className="text-2xl filter drop-shadow-sm">🌿</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs text-white">⚗️</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  HerbScience
                </div>
                <div className="text-xs text-gray-500 -mt-1 font-medium">
                  Evidence-Based Guidance
                </div>
              </div>
              <div className="sm:hidden">
                <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  HerbScience
                </div>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={getLocalizedHref(item.href)}
                className={`group relative flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={
                  isActive(item.href)
                    ? { background: `linear-gradient(135deg, var(--tw-gradient-stops))` }
                    : {}
                }
              >
                {isActive(item.href) && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl`}></div>
                )}
                <span className={`relative mr-2 text-lg ${isActive(item.href) ? 'filter drop-shadow-sm' : ''}`}>
                  {item.icon}
                </span>
                <span className="relative font-medium">
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-sm"></div>
                )}
              </Link>
            ))}
            
            {/* More Menu for additional items */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
              >
                <span className="mr-2">⋯</span>
                <span className="hidden xl:inline">More</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-20">
                  {navigationItems.slice(6).map((item) => (
                    <Link
                      key={item.href}
                      href={getLocalizedHref(item.href)}
                      onClick={() => setShowLangMenu(false)}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center hover:bg-gray-50 transition-colors ${
                        isActive(item.href) ? 'text-green-600 bg-green-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side - Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Language Switcher */}
            <div className="relative">
              <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 shadow-inner">
                {supportedLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    aria-label={`Switch to ${language.name}`}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-w-[3.5rem] h-10 ${
                      currentLocale === language.code
                        ? 'bg-white text-green-600 shadow-md transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="mr-2 text-base">{language.flag}</span>
                    <span className="hidden sm:inline">{language.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-all duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={
                    isActive(item.href)
                      ? { background: `linear-gradient(135deg, ${item.gradient.split(' ')[1]} 0%, ${item.gradient.split(' ')[3]} 100%)` }
                      : {}
                  }
                >
                  <span className={`mr-3 text-xl ${isActive(item.href) ? 'filter drop-shadow-sm' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 