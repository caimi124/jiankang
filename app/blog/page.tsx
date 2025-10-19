import React from 'react'
import BlogClient from './BlogClient'
import { getAllBlogPosts, getFeaturedBlogPosts, getBlogCategories } from '../../lib/sanity'

export const revalidate = 60 // 重新验证时间（秒）

export default async function BlogPage() {
  // 从Sanity获取数据
  const [allPosts, featuredPosts, categories] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(),
    getBlogCategories()
  ])

  // 如果Sanity返回空数据，使用静态fallback
  const postsToUse = allPosts.length > 0 ? allPosts : []
  const featuredToUse = featuredPosts.length > 0 ? featuredPosts : []
  const categoriesToUse = categories.length > 0 ? categories : []

  return (
    <BlogClient
      initialPosts={postsToUse}
      initialFeaturedPosts={featuredToUse}
      initialCategories={categoriesToUse}
    />
  )
} 