import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Environment detection
  const isProduction = process.env.NODE_ENV === 'production'
  const url = new URL(request.url)
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
  
  // 重定向交给vercel.json处理，middleware只负责安全头
  // 这样避免重复重定向和冲突

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