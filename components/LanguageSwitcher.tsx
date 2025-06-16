'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// 简化版本的类型定义
type Locale = 'en' | 'zh'

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  zh: { name: '中文', flag: '🇨🇳' }
} as const

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
}

export default function LanguageSwitcher({ 
  currentLocale = 'en', 
  className = '' 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([])

  const localeEntries = Object.entries(languages) as [Locale, typeof languages[Locale]][]

  // 键盘导航处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          buttonRef.current?.focus()
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev < localeEntries.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : localeEntries.length - 1
          )
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusedIndex >= 0) {
            const [locale] = localeEntries[focusedIndex]
            handleLocaleChange(locale)
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, focusedIndex, localeEntries])

  // 焦点管理
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      itemsRef.current[focusedIndex]?.focus()
    }
  }, [focusedIndex, isOpen])

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false)
    setFocusedIndex(-1)
    
    // 简单的语言切换逻辑
    const newPath = newLocale === 'en' ? pathname.replace(/^\/zh/, '') : `/zh${pathname}`
    router.push(newPath || '/')
    
    // 更新 HTML lang 属性
    document.documentElement.lang = newLocale
    
    // 保存用户偏好
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setFocusedIndex(0)
    }
  }

  const currentLanguage = languages[currentLocale]

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current language: ${currentLanguage.name}. Click to change language.`}
        type="button"
      >
        <span role="img" aria-hidden="true" className="text-lg">
          {currentLanguage.flag}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          role="listbox"
          aria-label="Language options"
        >
          <div className="py-1">
            {localeEntries.map(([locale, language], index) => (
              <button
                key={locale}
                ref={(el) => {
                  itemsRef.current[index] = el
                }}
                onClick={() => handleLocaleChange(locale)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus-visible:bg-gray-50 transition-colors ${
                  locale === currentLocale ? 'bg-green-50 text-green-700' : 'text-gray-700'
                } ${focusedIndex === index ? 'bg-gray-50' : ''}`}
                role="option"
                aria-selected={locale === currentLocale}
                aria-label={`Switch to ${language.name}`}
                type="button"
              >
                <span role="img" aria-hidden="true" className="text-lg">
                  {language.flag}
                </span>
                <span className="text-sm font-medium">
                  {language.name}
                </span>
                {locale === currentLocale && (
                  <svg
                    className="w-4 h-4 text-green-600 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 