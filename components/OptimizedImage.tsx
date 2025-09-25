'use client'

import { useState } from 'react'
import { ImageIcon, AlertCircle } from 'lucide-react'

interface OptimizedImageProps {
  src?: string
  alt: string
  emoji?: string
  title?: string
  description?: string
  className?: string
  placeholder?: 'herb' | 'chart' | 'diagram' | 'process'
}

const placeholders = {
  herb: {
    emoji: '🌿',
    gradient: 'from-green-400 to-emerald-500',
    title: 'Herb Illustration',
    description: 'Visual representation of herbal compounds'
  },
  chart: {
    emoji: '📊',
    gradient: 'from-blue-400 to-indigo-500',
    title: 'Data Visualization',
    description: 'Interactive chart showing effectiveness data'
  },
  diagram: {
    emoji: '🔬',
    gradient: 'from-purple-400 to-pink-500',
    title: 'Scientific Diagram',
    description: 'Illustration of biological processes'
  },
  process: {
    emoji: '⚡',
    gradient: 'from-yellow-400 to-orange-500',
    title: 'Process Flow',
    description: 'Step-by-step mechanism visualization'
  }
}

export default function OptimizedImage({
  src,
  alt,
  emoji,
  title,
  description,
  className = '',
  placeholder = 'herb'
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const placeholderConfig = placeholders[placeholder]
  const displayEmoji = emoji || placeholderConfig.emoji
  const displayTitle = title || placeholderConfig.title
  const displayDescription = description || placeholderConfig.description

  // For now, we'll use placeholder graphics since no actual images are provided
  const showPlaceholder = !src || imageError

  if (showPlaceholder) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${className}`}>
        {/* Gradient Background */}
        <div className={`w-full h-64 bg-gradient-to-br ${placeholderConfig.gradient} flex flex-col items-center justify-center text-white relative`}>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 40 40" className="text-white">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <div className="text-6xl mb-4 animate-pulse">
              {displayEmoji}
            </div>
            <h3 className="text-xl font-bold mb-2">
              {displayTitle}
            </h3>
            <p className="text-sm opacity-90 max-w-xs">
              {displayDescription}
            </p>
          </div>
          
          {/* Corner Decoration */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Caption Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center text-sm text-gray-600">
            <ImageIcon className="w-4 h-4 mr-2" />
            <span>Visual placeholder - {alt}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
      
      {/* Caption */}
      {(title || description) && (
        <div className="bg-white border-t border-gray-200 p-4">
          {title && (
            <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}

// Specialized image components for different types of content
export function HerbIllustration({ herb, className = '' }: { herb: string; className?: string }) {
  const herbEmojis: { [key: string]: string } = {
    ginseng: '🫘',
    chamomile: '🌸',
    echinacea: '🟣',
    valerian: '🌿',
    turmeric: '🟡',
    ginger: '🫚',
    default: '🌿'
  }

  return (
    <OptimizedImage
      alt={`${herb} illustration`}
      emoji={herbEmojis[herb.toLowerCase()] || herbEmojis.default}
      title={`${herb} Profile`}
      description={`Visual guide to ${herb} properties and uses`}
      placeholder="herb"
      className={className}
    />
  )
}

export function ProcessDiagram({ 
  title, 
  description, 
  className = '' 
}: { 
  title: string; 
  description: string; 
  className?: string 
}) {
  return (
    <OptimizedImage
      alt={title}
      title={title}
      description={description}
      placeholder="process"
      className={className}
    />
  )
}

export function ScientificChart({ 
  title, 
  description, 
  className = '' 
}: { 
  title: string; 
  description: string; 
  className?: string 
}) {
  return (
    <OptimizedImage
      alt={title}
      title={title}
      description={description}
      placeholder="chart"
      className={className}
    />
  )
}
