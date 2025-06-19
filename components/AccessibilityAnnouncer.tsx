'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function AccessibilityAnnouncer() {
  const pathname = usePathname()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // 当路由变化时，为屏幕阅读器提供反馈
    if (pathname) {
      const pageTitle = pathname === '/' ? 'Home' : pathname.split('/').pop()?.replace(/-/g, ' ')
      const message = `Navigated to ${pageTitle} page`
      setAnnouncement(message)
    }
  }, [pathname])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      data-testid="accessibility-announcer"
    >
      {announcement}
    </div>
  )
}

export default AccessibilityAnnouncer 