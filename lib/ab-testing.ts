// 扩展 Window 类型以包含 gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

interface ABTestConfig {
  testId: string
  variants: {
    id: string
    weight: number
    name: string
  }[]
  targeting?: {
    country?: string[]
    device?: ('mobile' | 'desktop')[]
    language?: string[]
  }
  duration?: {
    start: Date
    end: Date
  }
}

interface ABTestResult {
  testId: string
  variantId: string
  userId: string
}

class ABTestingManager {
  private tests: Map<string, ABTestConfig> = new Map()
  private userAssignments: Map<string, Map<string, string>> = new Map()

  constructor() {
    this.initializeTests()
  }

  private initializeTests() {
    // CTA按钮测试
    this.addTest({
      testId: 'hero-cta-buttons',
      variants: [
        { id: 'control', weight: 50, name: 'Original Buttons' },
        { id: 'variant-a', weight: 25, name: 'Action-Focused' },
        { id: 'variant-b', weight: 25, name: 'Urgency-Based' }
      ]
    })

    // 价值主张测试
    this.addTest({
      testId: 'value-proposition',
      variants: [
        { id: 'control', weight: 50, name: 'Science-Backed' },
        { id: 'variant-a', weight: 50, name: 'Safety-First' }
      ]
    })

    // 草药推荐布局测试
    this.addTest({
      testId: 'herb-recommendations-layout',
      variants: [
        { id: 'control', weight: 50, name: 'Grid Layout' },
        { id: 'variant-a', weight: 50, name: 'List Layout' }
      ]
    })
  }

  addTest(config: ABTestConfig) {
    this.tests.set(config.testId, config)
  }

  private getUserId(): string {
    if (typeof window === 'undefined') return 'server'
    
    let userId = localStorage.getItem('ab-test-user-id')
    if (!userId) {
      userId = Math.random().toString(36).substr(2, 9)
      localStorage.setItem('ab-test-user-id', userId)
    }
    return userId
  }

  private hashUserId(userId: string, testId: string): number {
    let hash = 0
    const str = userId + testId
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

  getVariant(testId: string): string {
    const test = this.tests.get(testId)
    if (!test) return 'control'

    const userId = this.getUserId()
    
    // 检查用户是否已有分配
    if (!this.userAssignments.has(userId)) {
      this.userAssignments.set(userId, new Map())
    }
    
    const userTests = this.userAssignments.get(userId)!
    if (userTests.has(testId)) {
      return userTests.get(testId)!
    }

    // 基于用户ID和测试ID生成一致的随机数
    const hash = this.hashUserId(userId, testId)
    const randomValue = (hash % 100) + 1

    // 根据权重分配变体
    let cumulativeWeight = 0
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (randomValue <= cumulativeWeight) {
        userTests.set(testId, variant.id)
        this.trackAssignment(testId, variant.id, userId)
        return variant.id
      }
    }

    // 默认返回第一个变体
    const defaultVariant = test.variants[0].id
    userTests.set(testId, defaultVariant)
    return defaultVariant
  }

  private trackAssignment(testId: string, variantId: string, userId: string) {
    // 发送到 Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_assignment', {
        event_category: 'AB Testing',
        event_label: `${testId}:${variantId}`,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId,
          user_id: userId
        }
      })
    }

    // 发送到自定义分析端点
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/ab-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          variantId,
          userId,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error)
    }
  }

  trackConversion(testId: string, conversionType: string = 'default', value?: number) {
    const userId = this.getUserId()
    const variantId = this.getVariant(testId)

    // 发送到 Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        event_category: 'AB Testing',
        event_label: `${testId}:${variantId}:${conversionType}`,
        value: value || 1,
        custom_parameters: {
          test_id: testId,
          variant_id: variantId,
          conversion_type: conversionType,
          user_id: userId
        }
      })
    }

    // 发送到自定义分析端点
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/ab-test-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId,
          variantId,
          userId,
          conversionType,
          value,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error)
    }
  }

  // 获取测试配置（用于组件渲染）
  getTestConfig(testId: string) {
    return this.tests.get(testId)
  }

  // 检查测试是否激活
  isTestActive(testId: string): boolean {
    const test = this.tests.get(testId)
    if (!test || !test.duration) return true

    const now = new Date()
    return now >= test.duration.start && now <= test.duration.end
  }
}

// 单例实例
export const abTesting = new ABTestingManager()

// React Hook 用于组件中使用
export function useABTest(testId: string) {
  const variant = abTesting.getVariant(testId)
  
  const trackConversion = (conversionType?: string, value?: number) => {
    abTesting.trackConversion(testId, conversionType, value)
  }

  return { variant, trackConversion }
} 