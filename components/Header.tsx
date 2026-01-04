'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getTranslation, supportedLanguages } from '../lib/i18n'
import Logo from './Logo'

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
    { href: '/', label: t.nav.home },
    { href: '/constitution-test', label: t.nav.constitutionTest, primary: true },
    { href: '/herb-finder', label: t.nav.herbFinder },
    { href: '/blog', label: t.nav.blog },
    { href: '/about', label: t.nav.about }
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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Left Side: Logo + Navigation (Premium Western Style) */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Logo 
              href="/"
              locale={currentLocale}
              priority={true}
            />

            {/* Desktop Navigation - Premium Spacing */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => {
                const localizedHref = getLocalizedHref(item.href)
                const active = isActive(item.href)

                if (item.primary) {
                  return (
                    <Link
                      key={item.href}
                      href={localizedHref}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm ${
                        active
                          ? 'bg-green-700 text-white'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={localizedHref}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Side - Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Premium Language Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-gray-100/80 rounded-lg p-1">
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  aria-label={`Switch to ${language.name}`}
                  className={`flex flex-col items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 min-w-[3rem] ${
                    currentLocale === language.code
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span className="text-lg mb-0.5">{language.flag}</span>
                  <span className="text-[10px] font-semibold">{language.code.toUpperCase()}</span>
                </button>
              ))}
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
              {navigationItems.map((item) => {
                const localizedHref = getLocalizedHref(item.href)
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={localizedHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all ${
                      item.primary
                        ? active
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'bg-green-600 text-white shadow'
                        : active
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 