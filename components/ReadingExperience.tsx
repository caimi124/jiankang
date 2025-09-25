'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Type, Minus, Plus, BookOpen, Printer } from 'lucide-react'

export default function ReadingExperience() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 从本地存储加载设置
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '16')
    
    setIsDarkMode(savedDarkMode)
    setFontSize(savedFontSize)
    
    // 应用到文档
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
    document.documentElement.style.fontSize = `${savedFontSize}px`
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const changeFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta))
    setFontSize(newSize)
    localStorage.setItem('fontSize', newSize.toString())
    document.documentElement.style.fontSize = `${newSize}px`
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* 浮动控制按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Reading Settings"
      >
        <BookOpen className="h-5 w-5" />
      </button>

      {/* 控制面板 */}
      {isVisible && (
        <>
          {/* 遮罩 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsVisible(false)}
          />
          
          {/* 面板 */}
          <div className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Reading Settings
              </h3>
            </div>
            
            <div className="p-4 space-y-6">
              {/* 夜间模式 */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
                <button
                  onClick={toggleDarkMode}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                    ${isDarkMode 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {isDarkMode ? (
                    <>
                      <Moon className="h-4 w-4" />
                      <span className="text-sm">Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" />
                      <span className="text-sm">Light</span>
                    </>
                  )}
                </button>
              </div>

              {/* 字体大小 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Font Size
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {fontSize}px
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => changeFontSize(-2)}
                    disabled={fontSize <= 12}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Minus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                        style={{ width: `${((fontSize - 12) / 12) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => changeFontSize(2)}
                    disabled={fontSize >= 24}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Plus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* 快捷操作 */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrint}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Printer className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Print</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setFontSize(16)
                      setIsDarkMode(false)
                      localStorage.setItem('fontSize', '16')
                      localStorage.setItem('darkMode', 'false')
                      document.documentElement.style.fontSize = '16px'
                      document.documentElement.classList.remove('dark')
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <Type className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}