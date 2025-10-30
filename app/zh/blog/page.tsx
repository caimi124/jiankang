import React from 'react'
import { Metadata } from 'next'
import ZhBlogClient from './ZhBlogClient'
import { getAllBlogPostsZh, getFeaturedBlogPostsZh, getBlogCategoriesZh } from '@/lib/sanity'

export const metadata: Metadata = {
  title: '草药知识博客 - 循证草药医学 | HerbScience',
  description: '专业的草药知识分享平台，提供草药研究资讯、中医养生知识和自然疗法指南。药剂师撰写的循证草药使用指南。',
  keywords: '草药博客, 中医养生, 草药研究, 自然疗法, 健康养生',
  openGraph: {
    title: 'HerbScience草药博客 - 循证草药医学',
    description: '专业的草药和中医养生知识分享。',
    type: 'website',
    url: 'https://herbscience.shop/zh/blog',
  },
  alternates: {
    canonical: 'https://herbscience.shop/zh/blog',
    languages: {
      'zh': 'https://herbscience.shop/zh/blog',
      'en': 'https://herbscience.shop/blog',
      'x-default': 'https://herbscience.shop/blog',
    }
  }
}

export const revalidate = 60 // 重新验证时间（秒）

export default async function ZhBlogPage() {
  // 从Sanity获取中文博客数据（直接使用中文查询函数）
  const [zhPosts, zhFeaturedPosts, zhCategories] = await Promise.all([
    getAllBlogPostsZh(),
    getFeaturedBlogPostsZh(),
    getBlogCategoriesZh()
  ])

  return (
    <ZhBlogClient
      initialPosts={zhPosts}
      initialFeaturedPosts={zhFeaturedPosts}
      initialCategories={zhCategories}
    />
  )
}