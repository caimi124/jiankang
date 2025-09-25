'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, List } from 'lucide-react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 解析HTML内容生成目录
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const items: TOCItem[] = []
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const title = heading.textContent || ''
      const id = `heading-${index}`
      
      // 为标题添加ID（如果没有的话）
      if (!heading.id) {
        heading.id = id
      }
      
      items.push({
        id: heading.id || id,
        title,
        level
      })
    })
    
    setTocItems(items)
  }, [content])

  useEffect(() => {
    // 监听滚动事件，高亮当前章节
    const handleScroll = () => {
      const headingElements = tocItems.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean)

      const currentHeading = headingElements.find(heading => {
        if (heading) {
          const rect = heading.getBoundingClientRect()
          return rect.top >= 0 && rect.top <= window.innerHeight / 3
        }
        return false
      })

      if (currentHeading) {
        setActiveId(currentHeading.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始调用

    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 100 // 留出导航栏空间
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  if (tocItems.length === 0) return null

  return (
    <>
      {/* 移动端切换按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="lg:hidden fixed top-20 right-4 z-50 bg-white shadow-lg rounded-full p-3 border border-gray-200 hover:shadow-xl transition-shadow"
        aria-label="Toggle table of contents"
      >
        <List className="h-5 w-5 text-gray-700" />
      </button>

      {/* 目录导航 */}
      <div className={`
        fixed top-24 right-4 w-80 max-h-[calc(100vh-6rem)] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-40
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full lg:opacity-100 lg:translate-x-0'}
        hidden lg:block
      `}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center">
            <List className="h-4 w-4 mr-2" />
            Table of Contents
          </h3>
        </div>
        
        <div className="p-2 max-h-96 overflow-y-auto">
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                  hover:bg-blue-50 hover:text-blue-700
                  ${activeId === item.id 
                    ? 'bg-blue-100 text-blue-800 font-medium border-l-2 border-blue-500' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                style={{ 
                  paddingLeft: `${12 + (item.level - 1) * 16}px`,
                  fontSize: item.level === 1 ? '14px' : '13px'
                }}
              >
                <div className="flex items-center">
                  {item.level > 1 && (
                    <ChevronRight className="h-3 w-3 mr-1 opacity-50" />
                  )}
                  <span className="truncate">{item.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 移动端遮罩 */}
      {isVisible && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* 移动端目录面板 */}
      <div className={`
        lg:hidden fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <List className="h-5 w-5 mr-2" />
            Table of Contents
          </h3>
        </div>
        
        <div className="p-4 overflow-y-auto h-full pb-20">
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToHeading(item.id)
                  setIsVisible(false)
                }}
                className={`
                  w-full text-left px-3 py-3 rounded-lg transition-all duration-200
                  hover:bg-blue-50 hover:text-blue-700
                  ${activeId === item.id 
                    ? 'bg-blue-100 text-blue-800 font-medium border-l-4 border-blue-500' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                style={{ 
                  paddingLeft: `${12 + (item.level - 1) * 20}px`
                }}
              >
                <div className="flex items-center">
                  {item.level > 1 && (
                    <ChevronRight className="h-4 w-4 mr-2 opacity-50" />
                  )}
                  <span className="text-sm leading-relaxed">{item.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
