import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  let needsRedirect = false

  // 仅在生产环境强制 HTTPS（排除 localhost 开发环境）
  const isProduction = process.env.NODE_ENV === 'production'
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  
  if (isProduction && !isLocalhost && url.protocol === 'http:') {
    url.protocol = 'https:'
    needsRedirect = true
  }

  // 紧急修复：重定向到non-www域名（SSL证书修复前）
  if (url.hostname === 'www.herbscience.shop') {
    url.hostname = 'herbscience.shop'
    needsRedirect = true
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 301)
  }

  // Handle herb URL redirects
  if (url.pathname === '/herbs/pumpkin-seed') {
    return NextResponse.redirect(new URL('/herbs/pumpkin-seeds', request.url), 301)
  }
  
  if (url.pathname === '/herbs/cloves') {
    return NextResponse.redirect(new URL('/herbs/clove', request.url), 301)
  }

  const response = NextResponse.next()

  // 只在生产环境添加适度的安全头，避免阻止JavaScript执行
  if (isProduction && !isLocalhost) {
    // 更宽松的CSP策略，允许必要的JavaScript执行
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
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  // 基本安全头（开发和生产环境都添加）
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
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