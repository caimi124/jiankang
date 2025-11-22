import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Environment detection
  const isProduction = process.env.NODE_ENV === 'production'
  const url = new URL(request.url)
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  const { pathname } = url
  const host = url.hostname

  // ============================================
  // 域名规范化（最高优先级）
  // ============================================

  // 1. www → non-www 重定向（生产环境）
  if (isProduction && !isLocalhost && host === 'www.herbscience.shop') {
    const canonicalUrl = new URL(request.url)
    canonicalUrl.hostname = 'herbscience.shop'
    return NextResponse.redirect(canonicalUrl, { status: 301 })
  }

  // 2. HTTP → HTTPS 重定向（通过 x-forwarded-proto 检测）
  const proto = request.headers.get('x-forwarded-proto')
  if (isProduction && !isLocalhost && proto === 'http') {
    const httpsUrl = new URL(request.url)
    httpsUrl.protocol = 'https:'
    httpsUrl.hostname = 'herbscience.shop' // 确保使用规范域名
    return NextResponse.redirect(httpsUrl, { status: 301 })
  }

  // ============================================
  // SEO优化：路径重定向规则（301 Permanent）
  // ============================================

  // 3. 清理 index.html
  if (pathname.endsWith('/index.html')) {
    const cleanPath = pathname.replace('/index.html', '/')
    return NextResponse.redirect(new URL(cleanPath, request.url), { status: 301 })
  }

  // 4. 重定向 /articles → /blog（消除重复内容）
  if (pathname === '/articles' || pathname.startsWith('/articles/')) {
    const newPath = pathname.replace('/articles', '/blog')
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 })
  }

  // 5. 统一体质测试入口
  if (pathname === '/quiz' || pathname.startsWith('/quiz/')) {
    const newPath = pathname.replace('/quiz', '/constitution-test')
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 })
  }
  if (pathname === '/simple-test') {
    return NextResponse.redirect(new URL('/constitution-test/quick', request.url), { status: 301 })
  }

  // 6. 旧 URL 格式重定向：/herb-finder/:slug → /herbs/:slug
  if (pathname.startsWith('/herb-finder/')) {
    const newPath = pathname.replace('/herb-finder/', '/herbs/')
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 })
  }

  // 7. 隐藏测试页面（生产环境阻止访问）
  const testPaths = ['/test', '/test-cms', '/test-enhanced']
  if (isProduction && !isLocalhost && testPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/404', request.url), { status: 302 })
  }

  // 继续正常处理
  const response = NextResponse.next()

  // 只在生产环境添加CSP头
  if (isProduction && !isLocalhost) {
    const cspHeader = `
      default-src 'self' 'unsafe-inline' 'unsafe-eval';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob: data:;
      style-src 'self' 'unsafe-inline' https:;
      img-src 'self' data: https: blob:;
      font-src 'self' https: data:;
      connect-src 'self' https: wss: ws:;
      media-src 'self' https: data:;
      object-src 'none';
      base-uri 'self';
      form-action 'self' https:;
      frame-ancestors 'self';
    `.replace(/\s{2,}/g, ' ').trim()

    response.headers.set('Content-Security-Policy', cspHeader)
  }

  // 基本安全头（开发和生产环境都添加）
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  return response
}

// 指定中间件应用的路由
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap files
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml|api).*)',
  ],
} 