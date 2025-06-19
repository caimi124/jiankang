import { LRUCache } from 'lru-cache'

export interface RateLimitOptions {
  uniqueTokenPerInterval?: number
  interval?: number
}

export interface RateLimiter {
  check: (limit: number, token: string) => Promise<void>
}

export function rateLimit(options?: RateLimitOptions): RateLimiter {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (limit: number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0]
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1])
        return Promise.resolve()
      }
      if (tokenCount[0] === limit) {
        return Promise.reject(new Error('Rate limit exceeded'))
      }
      tokenCount[0] += 1
      tokenCache.set(token, tokenCount)
      return Promise.resolve()
    },
  }
} 