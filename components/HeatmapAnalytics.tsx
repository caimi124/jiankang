'use client'

import { useEffect, useRef } from 'react'

interface HeatmapEvent {
  type: 'click' | 'scroll' | 'hover' | 'focus'
  element: string
  x: number
  y: number
  timestamp: number
  viewport: {
    width: number
    height: number
  }
  page: string
}

export default function HeatmapAnalytics() {
  const events = useRef<HeatmapEvent[]>([])
  const scrollPosition = useRef(0)
  const lastActivity = useRef(Date.now())

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const collectEvent = (event: Partial<HeatmapEvent>) => {
      const fullEvent: HeatmapEvent = {
        type: event.type!,
        element: event.element || '',
        x: event.x || 0,
        y: event.y || 0,
        timestamp: Date.now(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        page: window.location.pathname
      }
      
      events.current.push(fullEvent)
      lastActivity.current = Date.now()

      // 批量发送事件
      if (events.current.length >= 10) {
        sendBatchEvents()
      }
    }

    const sendBatchEvents = async () => {
      if (events.current.length === 0) return

      try {
        await fetch('/api/analytics/heatmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            events: events.current,
            sessionId: getSessionId(),
            userAgent: navigator.userAgent
          })
        })
        events.current = []
      } catch (error) {
        console.warn('Failed to send heatmap data:', error)
      }
    }

    const getSessionId = () => {
      let sessionId = sessionStorage.getItem('heatmap-session')
      if (!sessionId) {
        sessionId = Math.random().toString(36).substr(2, 9)
        sessionStorage.setItem('heatmap-session', sessionId)
      }
      return sessionId
    }

    // 点击事件追踪
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()
      
      collectEvent({
        type: 'click',
        element: getElementSelector(target),
        x: e.clientX,
        y: e.clientY
      })

      // 跟踪重要元素的点击
      if (target.matches('button, a, [role="button"]')) {
        window.gtag?.('event', 'element_click', {
          event_category: 'User Interaction',
          event_label: getElementSelector(target),
          custom_parameters: {
            element_type: target.tagName.toLowerCase(),
            element_text: target.textContent?.substring(0, 50) || '',
            page: window.location.pathname
          }
        })
      }
    }

    // 滚动事件追踪
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollPercentage = Math.round((scrollY / (documentHeight - viewportHeight)) * 100)

      // 记录关键滚动里程碑
      if (scrollPercentage > scrollPosition.current + 25) {
        scrollPosition.current = Math.floor(scrollPercentage / 25) * 25
        
        collectEvent({
          type: 'scroll',
          element: 'window',
          x: 0,
          y: scrollY
        })

        window.gtag?.('event', 'scroll_milestone', {
          event_category: 'User Engagement',
          event_label: `${scrollPosition.current}%`,
          value: scrollPosition.current
        })
      }
    }

    // 悬停事件追踪（仅关键元素）
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // 只追踪重要的交互元素
      if (target.matches('button, a, .herb-card, [data-track-hover]')) {
        collectEvent({
          type: 'hover',
          element: getElementSelector(target),
          x: e.clientX,
          y: e.clientY
        })
      }
    }

    // 焦点事件追踪
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      
      if (target.matches('input, textarea, select')) {
        collectEvent({
          type: 'focus',
          element: getElementSelector(target),
          x: 0,
          y: 0
        })
      }
    }

    // 获取元素选择器
    const getElementSelector = (element: HTMLElement): string => {
      if (element.id) return `#${element.id}`
      if (element.className) {
        const classes = element.className.split(' ').filter(c => c.length > 0).slice(0, 2)
        if (classes.length > 0) return `.${classes.join('.')}`
      }
      return element.tagName.toLowerCase()
    }

    // 页面离开时发送剩余事件
    const handleBeforeUnload = () => {
      if (events.current.length > 0) {
        navigator.sendBeacon('/api/analytics/heatmap', JSON.stringify({
          events: events.current,
          sessionId: getSessionId(),
          userAgent: navigator.userAgent
        }))
      }

      // 记录会话时长
      const sessionDuration = Date.now() - (lastActivity.current - 300000) // 5分钟缓冲
      window.gtag?.('event', 'session_duration', {
        event_category: 'User Engagement',
        value: Math.round(sessionDuration / 1000), // 转换为秒
        custom_parameters: {
          page: window.location.pathname
        }
      })
    }

    // 定期发送事件
    const intervalId = setInterval(() => {
      if (events.current.length > 0) {
        sendBatchEvents()
      }
    }, 30000) // 每30秒发送一次

    // 注册事件监听器
    document.addEventListener('click', handleClick, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseover', handleHover, { passive: true })
    document.addEventListener('focusin', handleFocus, { passive: true })
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      // 清理事件监听器
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseover', handleHover)
      document.removeEventListener('focusin', handleFocus)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearInterval(intervalId)
      
      // 发送剩余事件
      if (events.current.length > 0) {
        sendBatchEvents()
      }
    }
  }, [])

  return null // 这是一个分析组件，不渲染UI
} 