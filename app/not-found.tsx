'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import { Home, Search, ArrowLeft, Book } from 'lucide-react'

export default function NotFound() {
  const pathname = usePathname()
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    // Simple logic to suggest relevant pages based on the current path
    const pathSegments = pathname?.split('/').filter(Boolean) || []
    const lastSegment = pathSegments[pathSegments.length - 1]
    
    const defaultSuggestions = [
      '/',
      '/herb-finder',
      '/constitution-test',
      '/blog'
    ]

    if (lastSegment?.includes('herb')) {
      setSuggestions(['/herb-finder', '/constitution-test', '/', '/blog'])
    } else if (lastSegment?.includes('test')) {
      setSuggestions(['/constitution-test', '/herb-finder', '/', '/blog'])
    } else if (lastSegment?.includes('blog')) {
      setSuggestions(['/blog', '/articles', '/', '/herb-finder'])
    } else {
      setSuggestions(defaultSuggestions)
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Don&apos;t worry though, we&apos;ve got some helpful suggestions below.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-base font-semibold text-gray-900 text-center mb-8">
            Popular Pages You Might Like
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {suggestions.map((suggestion) => {
              let icon
              let title
              let description

              switch (suggestion) {
                case '/':
                  icon = <Home className="h-6 w-6" />
                  title = 'Home'
                  description = 'Return to our homepage'
                  break
                case '/herb-finder':
                  icon = <Search className="h-6 w-6" />
                  title = 'Herb Finder'
                  description = 'Find the perfect herbs'
                  break
                case '/constitution-test':
                  icon = <ArrowLeft className="h-6 w-6" />
                  title = 'Constitution Test'
                  description = 'Discover your type'
                  break
                case '/blog':
                  icon = <Book className="h-6 w-6" />
                  title = 'Blog'
                  description = 'Read latest articles'
                  break
                default:
                  icon = <Home className="h-6 w-6" />
                  title = suggestion.replace('/', '').replace(/-/g, ' ')
                  description = 'Explore more'
              }

              return (
                <Link
                  key={suggestion}
                  href={suggestion}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white group-hover:bg-indigo-600 transition-colors">
                      {icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-900">
                      {title}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-indigo-700">
                      {description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          <Link
            href="/herb-finder"
            className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
          >
            Search herbs <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 