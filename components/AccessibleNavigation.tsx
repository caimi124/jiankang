'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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

  const navItems: NavItem[] = [
    { 
      name: 'Home', 
      href: '/',
      ariaLabel: 'Go to homepage',
      description: 'Main page with overview of our services'
    },
    { 
      name: 'Herb Finder', 
      href: '/herb-finder',
      ariaLabel: 'Find herbs by symptoms',
      description: 'Search for herbs based on your health symptoms'
    },
    { 
      name: 'Safety Checker', 
      href: '/ingredient-checker',
      ariaLabel: 'Check supplement safety',
      description: 'Verify herb safety and drug interactions'
    },
    { 
      name: 'Knowledge Center', 
      href: '/knowledge-center',
      ariaLabel: 'Browse herb knowledge base',
      description: 'Comprehensive information about herbs and research'
    },
    { 
      name: 'Constitution Test', 
      href: '/constitution-test',
      ariaLabel: 'Take TCM body constitution assessment',
      description: 'Discover your Traditional Chinese Medicine body type'
    },
    { 
      name: 'User Reviews', 
      href: '/user-experiences',
      ariaLabel: 'Read user experiences and reviews',
      description: 'Real stories from our community members'
    },
    { 
      name: 'Blog', 
      href: '/blog',
      ariaLabel: 'Read health and wellness articles',
      description: 'Latest research and insights on herbal medicine'
    },
    { 
      name: 'About', 
      href: '/about',
      ariaLabel: 'Learn about our team and mission',
      description: 'Our story, team, and evidence-based approach'
    },
    { 
      name: 'Contact', 
      href: '/contact',
      ariaLabel: 'Get in touch with our team',
      description: 'Contact information and support resources'
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
      className="bg-white shadow-lg sticky top-0 z-50" 
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
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
          <div className="hidden md:flex space-x-8" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg ${
                  pathname === item.href
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
                role="menuitem"
                aria-label={item.ariaLabel}
                title={item.description}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden" ref={menuRef}>
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