'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
}

export default function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  placeholder = 'empty'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px' // 提前50px开始加载
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={imgRef} className={`overflow-hidden ${className}`}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      ) : (
        <div
          className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${
            width && height ? '' : 'aspect-video'
          }`}
          style={{ width, height }}
        />
      )}
    </div>
  )
}