import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  let needsRedirect = false

  // Normalize protocol to https
  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    needsRedirect = true
  }

  // Normalize hostname to apex (non-www)
  if (url.hostname === 'www.herbscience.shop') {
    url.hostname = 'herbscience.shop'
    needsRedirect = true
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml).*)'],
}


