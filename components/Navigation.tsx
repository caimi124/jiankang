'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTranslation } from '../lib/i18n'

interface NavItem {
  name: string
  href: string
  ariaLabel?: string
  description?: string
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const pathname = usePathname()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  // 检测当前语言
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)

  // 添加语言前缀的函数
  const addLocalePrefix = (href: string) => {
    if (currentLocale === 'zh') {
      return `/zh${href}`
    }
    return href
  }

  const navItems: NavItem[] = [
    {
      name: t.nav.home,
      href: '/',
      ariaLabel: 'Go to homepage',
      description: 'Main page with overview of our services'
    },
    {
      name: t.nav.constitutionTest,
      href: '/constitution-test',
      ariaLabel: 'Take TCM body constitution assessment',
      description: 'Discover your Traditional Chinese Medicine body type'
    },
    {
      name: t.nav.herbFinder,
      href: '/herb-finder',
      ariaLabel: 'Find herbs by symptoms',
      description: 'Search for herbs based on your health symptoms'
    },
    {
      name: t.nav.blog,
      href: '/blog',
      ariaLabel: 'Read health and wellness articles',
      description: 'Latest research and insights on herbal medicine'
    },
    {
      name: t.nav.about,
      href: '/about',
      ariaLabel: 'Learn about our team and get in touch',
      description: 'Our story, team, mission, and contact information'
    }
  ]

  // 语言切换功能
  const handleLanguageSwitch = (newLocale: string) => {
    console.log(`[Navigation] 切换语言: ${currentLocale} -> ${newLocale}`)
    console.log(`[Navigation] 当前路径: ${pathname}`)
    
    const currentPath = pathname.replace(/^\/zh/, '') || '/'
    const newPath = newLocale === 'zh' ? `/zh${currentPath}` : currentPath
    
    console.log(`[Navigation] 目标路径: ${newPath}`)
    
    // 直接使用 window.location 进行导航
    window.location.href = newPath
  }

  // 键盘导航处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          setIsMenuOpen(false)
          menuButtonRef.current?.focus()
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev < navItems.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : navItems.length - 1
          )
          break
        case 'Home':
          e.preventDefault()
          setFocusedIndex(0)
          break
        case 'End':
          e.preventDefault()
          setFocusedIndex(navItems.length - 1)
          break
        case 'Tab':
          if (e.shiftKey && focusedIndex === 0) {
            e.preventDefault()
            setIsMenuOpen(false)
            menuButtonRef.current?.focus()
          }
          break
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen, focusedIndex, navItems.length])

  // 焦点管理
  useEffect(() => {
    if (isMenuOpen && focusedIndex >= 0) {
      menuItemsRef.current[focusedIndex]?.focus()
    }
  }, [focusedIndex, isMenuOpen])

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      setFocusedIndex(0)
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setFocusedIndex(-1)
  }

  return (
    <>
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>

      <nav 
        className="bg-white shadow-lg sticky top-0 z-50" 
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href={addLocalePrefix('/')} 
                className="flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg p-1"
                aria-label="HerbScience.shop homepage"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold" role="img" aria-label="Herb icon">🌿</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs" role="img" aria-label="Science icon">⚗️</span>
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold text-green-700">HerbScience</span>
                  <div className="text-xs text-gray-500 -mt-1">Evidence-Based Guidance</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6" role="menubar">
                {navItems.map((item) => {
                  const localizedHref = addLocalePrefix(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={localizedHref}
                      className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg ${
                        pathname === localizedHref
                          ? 'text-green-600 border-b-2 border-green-600'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                      role="menuitem"
                      aria-label={item.ariaLabel}
                      title={item.description}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
              
              {/* Language Switcher */}
              <div className="relative">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  {/* 按钮版本 */}
                  <button
                    onClick={() => handleLanguageSwitch('en')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      currentLocale === 'en' 
                        ? 'bg-white text-green-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    type="button"
                    aria-label="切换到英文版本"
                  >
                    🇺🇸 EN
                  </button>
                  <button
                    onClick={() => handleLanguageSwitch('zh')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      currentLocale === 'zh' 
                        ? 'bg-white text-green-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    type="button"
                    aria-label="切换到中文版本"
                  >
                    🇨🇳 中文
                  </button>
                  
                  {/* 备用链接版本 - 仅在按钮不工作时显示 */}
                  <div className="hidden" id="lang-backup">
                    <a
                      href={currentLocale === 'en' ? '/zh' + pathname.replace(/^\/zh/, '') : pathname.replace(/^\/zh/, '') || '/'}
                      className="px-3 py-1 text-sm font-medium rounded-md bg-gray-200 text-gray-700"
                    >
                      🔄 {currentLocale === 'en' ? '中文' : 'EN'}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu and language switcher */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleLanguageSwitch('en')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    currentLocale === 'en' 
                      ? 'bg-green-100 text-green-600' 
                      : 'text-gray-600'
                  }`}
                  type="button"
                  aria-label="Switch to English"
                >
                  🇺🇸
                </button>
                <button
                  onClick={() => handleLanguageSwitch('zh')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    currentLocale === 'zh' 
                      ? 'bg-green-100 text-green-600' 
                      : 'text-gray-600'
                  }`}
                  type="button"
                  aria-label="切换到中文"
                >
                  🇨🇳
                </button>
              </div>
              
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg p-2"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div 
                  id="mobile-menu"
                  className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="mobile-menu-button"
                >
                  <div className="py-2 space-y-1">
                    {navItems.map((item, index) => {
                      const localizedHref = addLocalePrefix(item.href)
                      return (
                        <Link
                          key={item.name}
                          href={localizedHref}
                          ref={(el) => {
                            menuItemsRef.current[index] = el
                          }}
                          className={`block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg mx-2 ${
                            pathname === localizedHref
                              ? 'text-green-600 bg-green-50'
                              : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                          }`}
                          role="menuitem"
                          aria-label={item.ariaLabel}
                          onClick={closeMenu}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              closeMenu()
                            }
                          }}
                        >
                          {item.name}
                          <span className="sr-only">. {item.description}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
} 