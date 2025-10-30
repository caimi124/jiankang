/**
 * IndexNow API Integration
 * 自动通知 Bing、Yandex 等搜索引擎新增/更新的页面
 * 
 * 支持的搜索引擎：
 * - Bing
 * - Yandex
 * - Seznam.cz
 * - Naver (间接)
 */

interface IndexNowConfig {
  host: string
  key: string
  keyLocation: string
}

const INDEXNOW_ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
  'https://api.indexnow.org/indexnow',
]

/**
 * 提交单个 URL 到 IndexNow
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  const config: IndexNowConfig = {
    host: 'herbscience.shop',
    key: process.env.INDEXNOW_API_KEY || 'd9cef75a7df241d5aeffb8c21006c151',
    keyLocation: `https://herbscience.shop/d9cef75a7df241d5aeffb8c21006c151.txt`,
  }

  const payload = {
    host: config.host,
    key: config.key,
    keyLocation: config.keyLocation,
    urlList: [url],
  }

  try {
    // 提交到 Bing (主要终端)
    const response = await fetch(INDEXNOW_ENDPOINTS[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      console.log(`✅ IndexNow: Successfully submitted ${url}`)
      return true
    } else {
      console.error(`❌ IndexNow: Failed to submit ${url}, status: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error(`❌ IndexNow: Error submitting ${url}`, error)
    return false
  }
}

/**
 * 批量提交多个 URL 到 IndexNow
 */
export async function submitBatchToIndexNow(urls: string[]): Promise<number> {
  const config: IndexNowConfig = {
    host: 'herbscience.shop',
    key: process.env.INDEXNOW_API_KEY || 'd9cef75a7df241d5aeffb8c21006c151',
    keyLocation: `https://herbscience.shop/d9cef75a7df241d5aeffb8c21006c151.txt`,
  }

  // IndexNow API 支持每次最多 10,000 个 URL，但建议每次提交 100 个以内
  const chunkSize = 100
  let successCount = 0

  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize)
    
    const payload = {
      host: config.host,
      key: config.key,
      keyLocation: config.keyLocation,
      urlList: chunk,
    }

    try {
      const response = await fetch(INDEXNOW_ENDPOINTS[0], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        successCount += chunk.length
        console.log(`✅ IndexNow: Successfully submitted ${chunk.length} URLs`)
      } else {
        console.error(`❌ IndexNow: Failed to submit batch, status: ${response.status}`)
      }
    } catch (error) {
      console.error(`❌ IndexNow: Error submitting batch`, error)
    }

    // 避免过快请求，每批次之间等待 1 秒
    if (i + chunkSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return successCount
}

/**
 * 生成 IndexNow API Key 文件内容
 */
export function generateIndexNowKeyFile(apiKey: string): string {
  return apiKey
}

/**
 * 提交新博客文章到 IndexNow
 */
export async function notifyNewBlogPost(slug: string): Promise<boolean> {
  const url = `https://herbscience.shop/blog/${slug}`
  return await submitUrlToIndexNow(url)
}

/**
 * 提交新草药页面到 IndexNow
 */
export async function notifyNewHerbPage(slug: string): Promise<boolean> {
  const url = `https://herbscience.shop/herbs/${slug}`
  return await submitUrlToIndexNow(url)
}

/**
 * 提交所有重要页面到 IndexNow
 */
export async function submitAllImportantPages(): Promise<number> {
  const importantPages = [
    'https://herbscience.shop/',
    'https://herbscience.shop/constitution-test',
    'https://herbscience.shop/herb-finder',
    'https://herbscience.shop/blog',
    'https://herbscience.shop/about',
  ]

  return await submitBatchToIndexNow(importantPages)
}

