'use client'

import { useState } from 'react'
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react'

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=herbalhealth,naturalwellness`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedinUrl, '_blank', 'width=600,height=400')
  }

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    window.open(redditUrl, '_blank', 'width=600,height=400')
  }

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url
      })
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="relative">
      {/* 分享按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Share2 className="h-4 w-4" />
        <span>Share Article</span>
      </button>

      {/* 分享选项面板 */}
      {isVisible && (
        <>
          {/* 遮罩 */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsVisible(false)}
          />
          
          {/* 分享面板 */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Share on</h3>
            </div>
            
            <div className="p-2">
              {/* Facebook分享 */}
              <button
                onClick={shareToFacebook}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Facebook className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Facebook</span>
              </button>

              {/* Twitter/X分享 */}
              <button
                onClick={shareToTwitter}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Twitter/X</span>
              </button>

              {/* LinkedIn分享 */}
              <button
                onClick={shareToLinkedIn}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">LinkedIn</span>
              </button>

              {/* Reddit分享 */}
              <button
                onClick={shareToReddit}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900 transition-colors"
              >
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Reddit</span>
              </button>

              {/* 原生分享API (移动端) */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={shareNative}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Share2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">More options</span>
                </button>
              )}

              {/* 复制链接 */}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  {copied ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {copied ? 'Copied!' : 'Copy link'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}