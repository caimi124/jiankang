'use client'

import { Share2, Bookmark } from 'lucide-react'

interface BlogActionButtonsProps {
  title: string
  url?: string
}

export default function BlogActionButtons({ title, url }: BlogActionButtonsProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: title,
        url: url || window.location.href
      }).catch(() => {
        // Silently fail if user cancels
      })
    }
  }

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedArticles') || '[]'
      const savedArray = JSON.parse(saved)
      const currentPath = window.location.pathname
      
      if (!savedArray.includes(currentPath)) {
        savedArray.push(currentPath)
        localStorage.setItem('savedArticles', JSON.stringify(savedArray))
        alert('Article saved!')
      } else {
        alert('Article already saved!')
      }
    }
  }

  return (
    <>
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors"
        aria-label="Share article"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>
      <button 
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 transition-colors"
        aria-label="Save article"
      >
        <Bookmark className="w-4 h-4" />
        <span className="text-sm">Save</span>
      </button>
    </>
  )
}
