'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getTranslation, supportedLanguages } from '../lib/i18n'

// 懒加载图标
import dynamic from 'next/dynamic'
const Menu = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Menu })), { ssr: false })
const X = dynamic(() => import('lucide-react').then(mod => ({ default: mod.X })), { ssr: false })
const ChevronDown = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown })), { ssr: false })

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 检测当前语言 - 使用 useMemo 优化
  const currentLocale = useMemo(() => pathname.startsWith('/zh') ? 'zh' : 'en', [pathname])
  const t = useMemo(() => getTranslation(currentLocale), [currentLocale])

  // 精简导航项目 - 突出体质测试作为主打功能
  const navigationItems = useMemo(() => [
    { href: '/', label: t.nav.home, icon: '🏠' },
    { href: '/constitution-test', label: t.nav.constitutionTest, icon: '🧠', featured: true },
    { href: '/herb-finder', label: t.nav.herbFinder, icon: '🔍' },
    { href: '/blog', label: t.nav.blog, icon: '📝' },
    { href: '/about', label: t.nav.about, icon: 'ℹ️' }
  ], [t])

  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/zh'
    }
    return pathname === href || pathname === `/zh${href}` || pathname.startsWith(href + '/') || pathname.startsWith(`/zh${href}/`)
  }, [pathname])

  const handleLanguageChange = useCallback((langCode: string) => {
    setShowLangMenu(false)
    const currentPath = pathname.replace(/^\/zh/, '') || '/'
    if (langCode === 'zh') {
      router.push(`/zh${currentPath}`)
    } else {
      router.push(currentPath)
    }
  }, [pathname, router])

  const getLocalizedHref = useCallback((href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }, [currentLocale])

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

          {/* 桌面导航 - 核心功能 + 工具下拉菜单 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* 核心导航项 */}
            <Link
              href={getLocalizedHref('/')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">🏠</span>
              {t.nav.home}
            </Link>

            {/* 突出体质测试 - 主打功能 */}
            <Link
              href={getLocalizedHref('/constitution-test')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive('/constitution-test')
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg'
              } relative overflow-hidden`}
            >
              <span className="mr-2">🧠</span>
              {t.nav.constitutionTest}
              <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </Link>

            <Link
              href={getLocalizedHref('/herb-finder')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/herb-finder')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">🔍</span>
              {t.nav.herbFinder}
            </Link>

            <Link
              href={getLocalizedHref('/blog')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/blog')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">📝</span>
              {t.nav.blog}
            </Link>
            
            <Link
              href={getLocalizedHref('/about')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">ℹ️</span>
              {t.nav.about}
            </Link>
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

        {/* 移动端导航 - 突出体质测试 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                    item.featured
                      ? isActive(item.href)
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md relative'
                      : isActive(item.href)
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className={`font-medium ${item.featured ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                  {item.featured && !isActive(item.href) && (
                    <span className="ml-auto text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold">
                      Hot
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 