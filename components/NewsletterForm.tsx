'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface NewsletterFormProps {
  source?: string
  constitutionType?: string
  title?: string
  description?: string
  buttonText?: string
  variant?: 'default' | 'minimal' | 'hero'
}

export default function NewsletterForm({
  source = 'website',
  constitutionType,
  title = '🌿 Get Weekly Herb Tips',
  description = 'Subscribe for personalized herb recommendations and health insights.',
  buttonText = 'Subscribe Free',
  variant = 'default'
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source,
          constitutionType
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
      console.error('Newsletter subscription error:', error)
    }
  }

  // 简约版（适合页脚）
  if (variant === 'minimal') {
    return (
      <div className="max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        {status === 'success' ? (
          <div className="flex items-center text-green-600 bg-green-50 px-4 py-3 rounded-lg">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? '...' : buttonText}
            </button>
          </form>
        )}
        
        {status === 'error' && (
          <div className="flex items-center text-red-600 mt-2">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">{message}</span>
          </div>
        )}
      </div>
    )
  }

  // Hero版（适合首页大横幅）
  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-green-50 mb-8">
            {description}
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-xl shadow-lg">
              <CheckCircle className="w-6 h-6 mr-3" />
              <span className="text-lg font-medium">{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name (optional)"
                  disabled={status === 'loading'}
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-white text-green-700 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {status === 'loading' ? 'Subscribing...' : buttonText}
                </button>
              </div>
              <p className="text-sm text-green-100">
                Join 10,000+ people getting personalized herb tips. Unsubscribe anytime.
              </p>
            </form>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center text-white bg-red-500 bg-opacity-30 px-6 py-3 rounded-lg mt-4">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 默认版（适合侧边栏、弹窗）
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <Mail className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      {status === 'success' ? (
        <div className="flex items-center text-green-600 bg-green-50 px-4 py-3 rounded-lg">
          <CheckCircle className="w-6 h-6 mr-3" />
          <div>
            <p className="font-medium">Success!</p>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      )}

      {status === 'error' && (
        <div className="flex items-center text-red-600 bg-red-50 px-4 py-3 rounded-lg mt-4">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="text-sm">{message}</span>
        </div>
      )}
    </div>
  )
}

