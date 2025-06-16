'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {/* Home Link */}
      <Link 
        href="/" 
        className="flex items-center hover:text-green-600 transition-colors"
        aria-label="Go to homepage"
      >
        <Home size={16} />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="text-gray-400 mx-1" />
          
          {item.href && index < items.length - 1 ? (
            <Link 
              href={item.href}
              className="hover:text-green-600 transition-colors flex items-center"
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span 
              className={`flex items-center ${
                index === items.length - 1 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600'
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Structured Data for Breadcrumbs (SEO)
export function BreadcrumbsStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://herbscience.shop${item.href}` : undefined
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 