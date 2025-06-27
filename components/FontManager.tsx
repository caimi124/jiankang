'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function FontManager() {
  const pathname = usePathname()

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    // 移除之前的字体类
    body.classList.remove('zh-route', 'en-route')
    html.classList.remove('zh-route', 'en-route')

    // 根据路径设置字体
    if (pathname.startsWith('/zh')) {
      // 中文路由
      body.classList.add('zh-route')
      html.classList.add('zh-route')
      body.setAttribute('lang', 'zh-CN')
      html.setAttribute('lang', 'zh-CN')
      body.setAttribute('data-current-path', pathname)
      
      // 强制设置中文字体
      body.style.fontFamily = "var(--font-noto-sans-sc), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'SimHei', sans-serif"
    } else {
      // 英文路由
      body.classList.add('en-route')
      html.classList.add('en-route')
      body.setAttribute('lang', 'en')
      html.setAttribute('lang', 'en')
      body.setAttribute('data-current-path', pathname)
      
      // 强制设置英文字体
      body.style.fontFamily = "var(--font-inter), 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    }

    // 设置data属性用于CSS选择器
    body.setAttribute('data-pathname', pathname)
    html.setAttribute('data-pathname', pathname)

  }, [pathname])

  return null
} 