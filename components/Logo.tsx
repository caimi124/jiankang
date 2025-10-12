'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  href?: string
  className?: string
  locale?: string
  priority?: boolean
}

export default function Logo({ 
  href = '/', 
  className = '', 
  locale = 'en',
  priority = true
}: LogoProps) {
  const getLocalizedHref = (path: string) => {
    if (locale === 'zh') {
      return `/zh${path}`
    }
    return path
  }

  return (
    <Link 
      href={getLocalizedHref(href)}
      className={`inline-flex items-center transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg ${className}`}
      aria-label="HerbScience - Health Customization"
    >
      <Image 
        src="/images/logo.png"
        alt="HerbScience - Health Customization"
        width={180}
        height={45}
        priority={priority}
        className="h-10 w-auto object-contain"
        style={{ maxHeight: '40px' }}
      />
    </Link>
  )
}

