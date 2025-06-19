'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里添加错误日志上报逻辑
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center">
      <div className="max-w-xl mx-auto px-4 py-8 text-center">
        <div className="mb-8">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto animate-bounce" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <p className="text-gray-600 mb-4">
            We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-50 rounded p-4 mb-4 text-left">
              <p className="text-sm font-mono text-gray-700 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try again
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Home className="h-5 w-5 mr-2" />
              Return home
            </Link>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  )
} 