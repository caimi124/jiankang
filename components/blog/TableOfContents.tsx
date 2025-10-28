'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface Props {
  headings?: Heading[];
}

/**
 * 浮动目录组件
 * 帮助用户快速导航长文章
 * 提升用户体验和停留时间
 * 
 * 如果不传递headings，会自动从页面中提取H2和H3标题
 */
export function TableOfContents({ headings: propHeadings }: Props) {
  const [headings, setHeadings] = useState<Heading[]>(propHeadings || []);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // 自动提取页面标题
  useEffect(() => {
    if (!propHeadings) {
      const elements = document.querySelectorAll('article h2, article h3');
      const extractedHeadings: Heading[] = [];
      
      elements.forEach((element, index) => {
        const id = element.id || `heading-${index}`;
        if (!element.id) {
          element.id = id;
        }
        
        extractedHeadings.push({
          id,
          title: element.textContent || '',
          level: element.tagName === 'H2' ? 2 : 3
        });
      });
      
      setHeadings(extractedHeadings);
    }
  }, [propHeadings]);
  
  useEffect(() => {
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
      }
    );
    
    // 观察所有标题元素
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => observer.disconnect();
  }, [headings]);
  
  // 平滑滚动到指定位置
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // 顶部偏移量
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  
  // 如果没有标题，不显示目录
  if (headings.length === 0) {
    return null;
  }
  
  return (
    <>
      {/* 桌面端 - 侧边栏 */}
      <nav className="hidden lg:block sticky top-24 w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
              <List className="w-5 h-5" />
              Table of Contents
            </h3>
          </div>
          
          <nav className="space-y-1">
            {headings.map(({ id, title, level }) => (
              <button
                key={id}
                onClick={() => scrollToHeading(id)}
                className={`
                  block w-full text-left py-2 px-3 text-sm rounded-lg
                  transition-all duration-200
                  ${level === 3 ? 'pl-6' : ''}
                  ${level === 4 ? 'pl-9' : ''}
                  ${activeId === id
                    ? 'text-green-600 font-medium bg-green-50'
                    : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'
                  }
                `}
              >
                <span className="line-clamp-2">{title}</span>
              </button>
            ))}
          </nav>
          
          {/* 进度指示 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Reading Progress</span>
              <span>{headings.findIndex(h => h.id === activeId) + 1}/{headings.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{
                  width: `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      
      {/* 移动端 - 可折叠按钮 */}
      <div className="lg:hidden fixed bottom-20 right-4 z-30">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="
            bg-white rounded-full shadow-lg p-4 
            border-2 border-green-500 text-green-600
            hover:bg-green-50 transition-all
          "
          aria-label="Toggle table of contents"
        >
          <List className="w-6 h-6" />
        </button>
        
        {/* 移动端展开面板 */}
        {!isCollapsed && (
          <div className="
            absolute bottom-full right-0 mb-2
            bg-white rounded-xl shadow-2xl border border-gray-200
            w-80 max-h-96 overflow-y-auto
            animate-slide-up
          ">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <List className="w-5 h-5" />
                Table of Contents
              </h3>
            </div>
            
            <nav className="p-2">
              {headings.map(({ id, title, level }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToHeading(id);
                    setIsCollapsed(true);
                  }}
                  className={`
                    block w-full text-left py-2 px-3 text-sm rounded-lg
                    transition-all duration-200
                    ${level === 3 ? 'pl-6' : ''}
                    ${level === 4 ? 'pl-9' : ''}
                    ${activeId === id
                      ? 'text-green-600 font-medium bg-green-50'
                      : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'
                    }
                  `}
                >
                  {title}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

