'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getTranslation } from '../lib/i18n'
import Logo from './Logo'

interface NavItem {
  name: string
  href: string
  ariaLabel?: string
  description?: string
}

export default function AccessibleNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  // 检测当前语言
  const currentLocale = pathname.startsWith('/zh') ? 'zh' : 'en'
  const t = getTranslation(currentLocale)

  const navItems: NavItem[] = [
    { 
      name: t.nav.home, 
      href: '/',
      ariaLabel: 'Go to homepage',
      description: 'Main page with overview of our services'
    },
    { 
      name: t.nav.herbFinder, 
      href: '/herb-finder',
      ariaLabel: 'Find herbs by symptoms',
      description: 'Search for herbs based on your health symptoms'
    },
    { 
      name: t.nav.constitutionTest, 
      href: '/constitution-test',
      ariaLabel: 'Take TCM body constitution assessment',
      description: 'Discover your Traditional Chinese Medicine body type'
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
    <nav 
      className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm" 
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Left Side: Logo + Navigation (Premium Western Style) */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Logo href="/" priority={true} />

            {/* Desktop Navigation - Premium Spacing */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navItems.map((item) => {
                const isCurrentPage = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${
                      isCurrentPage
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
          </div>

          {/* Right Side: Mobile menu button */}
          <div className="lg:hidden" ref={menuRef}>
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
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      ref={(el) => {
                        menuItemsRef.current[index] = el
                      }}
                      className={`block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg mx-2 ${
                        pathname === item.href
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
                          // Navigate programmatically if needed
                        }
                      }}
                    >
                      {item.name}
                      <span className="sr-only">. {item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>
    </nav>
  )
} 