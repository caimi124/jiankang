'use client'

import { useEffect } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // 只在生产环境运行性能监控
    if (process.env.NODE_ENV !== 'production') return

    // Web Vitals 监控
    const vitalsQueue: PerformanceMetric[] = []

    const sendToAnalytics = (metric: PerformanceMetric) => {
      vitalsQueue.push(metric)
      
      // 发送到 Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: metric.name,
          value: Math.round(metric.value),
          custom_map: { metric_rating: metric.rating }
        })
      }

      // 发送到自定义分析（可选）
      if (vitalsQueue.length >= 5) {
        sendBatchMetrics()
      }
    }

    const sendBatchMetrics = async () => {
      try {
        await fetch('/api/analytics/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ metrics: vitalsQueue })
        })
        vitalsQueue.length = 0 // 清空队列
      } catch (error) {
        console.warn('Performance metrics upload failed:', error)
      }
    }

    const getRating = (name: string, value: number) => {
      const thresholds = {
        CLS: { good: 0.1, poor: 0.25 },
        FID: { good: 100, poor: 300 },
        LCP: { good: 2500, poor: 4000 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 }
      }

      const threshold = thresholds[name as keyof typeof thresholds]
      if (!threshold) return 'good'

      if (value <= threshold.good) return 'good'
      if (value <= threshold.poor) return 'needs-improvement'
      return 'poor'
    }

    // 监控 Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          sendToAnalytics({
            name: 'LCP',
            value: entry.startTime,
            rating: getRating('LCP', entry.startTime)
          })
        }

        if (entry.entryType === 'first-input') {
          sendToAnalytics({
            name: 'FID',
            value: (entry as any).processingStart - entry.startTime,
            rating: getRating('FID', (entry as any).processingStart - entry.startTime)
          })
        }

        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          sendToAnalytics({
            name: 'CLS',
            value: (entry as any).value,
            rating: getRating('CLS', (entry as any).value)
          })
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    // 监控 Navigation Timing
    const measureNavigationTiming = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        // Time to First Byte
        const ttfb = navigation.responseStart - navigation.requestStart
        sendToAnalytics({
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb)
        })

        // First Contentful Paint
        const fcp = performance.getEntriesByName('first-contentful-paint')[0]
        if (fcp) {
          sendToAnalytics({
            name: 'FCP',
            value: fcp.startTime,
            rating: getRating('FCP', fcp.startTime)
          })
        }
      }
    }

    // 等待页面加载完成后测量
    if (document.readyState === 'complete') {
      measureNavigationTiming()
    } else {
      window.addEventListener('load', measureNavigationTiming)
    }

    // 资源加载监控
    const monitorResources = () => {
      const resources = performance.getEntriesByType('resource')
      const slowResources = resources.filter(resource => resource.duration > 1000)
      
      if (slowResources.length > 0) {
        window.gtag?.('event', 'slow_resources', {
          event_category: 'Performance',
          event_label: 'Resources over 1s',
          value: slowResources.length
        })
      }
    }

    setTimeout(monitorResources, 5000) // 延迟5秒监控资源

    // 错误监控
    const errorHandler = (event: ErrorEvent) => {
      window.gtag?.('event', 'js_error', {
        event_category: 'Error',
        event_label: event.message,
        value: 1
      })
    }

    window.addEventListener('error', errorHandler)

    return () => {
      observer.disconnect()
      window.removeEventListener('error', errorHandler)
      window.removeEventListener('load', measureNavigationTiming)
    }
  }, [])

  return null // 这是一个监控组件，不渲染任何UI
} 