'use client'

import { useEffect } from 'react'

interface PerformanceMonitorProps {
  pageType: string
  pageSlug?: string
}

export default function PerformanceMonitor({ pageType, pageSlug }: PerformanceMonitorProps) {
  useEffect(() => {
    // 只在生产环境进行性能监控
    if (process.env.NODE_ENV !== 'production') return

    const measurePagePerformance = () => {
      // 等待页面完全加载
      if (document.readyState === 'complete') {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        const metrics = {
          pageType,
          pageSlug,
          // 核心Web Vitals
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          // 用户感知性能
          timeToFirstByte: navigation.responseStart - navigation.requestStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          // 时间戳
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        }

        // 发送到分析服务（这里可以替换为实际的分析服务）
        console.log('页面性能指标:', metrics)
        
        // 可以发送到 Google Analytics 或其他分析服务
        // gtag('event', 'page_performance', metrics)
      }
    }

    // 如果页面已经加载完成，立即测量
    if (document.readyState === 'complete') {
      setTimeout(measurePagePerformance, 0)
    } else {
      // 否则等待加载完成
      window.addEventListener('load', measurePagePerformance)
    }

    // 监控 Core Web Vitals
    const observeWebVitals = () => {
      // 监控 Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log('LCP:', lastEntry.startTime)
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // 监控 First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              const fidEntry = entry as any
              if (fidEntry.processingStart) {
                console.log('FID:', fidEntry.processingStart - entry.startTime)
              }
            })
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // 监控 Cumulative Layout Shift (CLS)
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            })
            console.log('CLS:', clsValue)
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        } catch (error) {
          console.warn('Performance Observer not supported:', error)
        }
      }
    }

    observeWebVitals()

    return () => {
      window.removeEventListener('load', measurePagePerformance)
    }
  }, [pageType, pageSlug])

  // 这个组件不渲染任何UI
  return null
}