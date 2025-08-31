import React from 'react'
import HerbFinderClient from './HerbFinderClient'

// 预生成静态页面
export async function generateStaticParams() {
  try {
    // 这里可以预生成一些静态路径
    return [
      { category: 'general' },
      { category: 'sleep' },
      { category: 'energy' },
      { category: 'immune' },
      { category: 'digestive' },
      { category: 'mental' }
    ]
  } catch (error) {
    console.warn('Failed to generate static params:', error)
    return []
  }
}

export default function HerbFinderPage() {
  return <HerbFinderClient />
} 