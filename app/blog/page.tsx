import React from 'react'
import { Metadata } from 'next'
import BlogClient from './BlogClient'
import { getAllBlogPosts, getFeaturedBlogPosts, getBlogCategories } from '../../lib/sanity'

export const metadata: Metadata = {
  title: 'Blog - Evidence-Based Herbal Medicine | HerbScience',
  description: 'Expert articles on herbal medicine, TCM wisdom, natural remedies, and wellness. Evidence-based guides by licensed pharmacist for safe herbal use.',
  keywords: 'herbal medicine blog, natural remedies, TCM articles, herb guides, wellness tips',
  openGraph: {
    title: 'HerbScience Blog - Evidence-Based Herbal Medicine',
    description: 'Expert articles on herbs, TCM, and natural wellness.',
    type: 'website',
    url: 'https://herbscience.shop/blog',
  },
  alternates: {
    canonical: 'https://herbscience.shop/blog',
  }
}

export const revalidate = 60 // 重新验证时间（秒）

// Static articles (local blog posts not in Sanity)
const staticLocalArticles = [
  {
    id: 1758713619593,
    _id: '1758713619593',
    title: "Red Onion vs White Onion: Which Is Healthier? (Science-Backed Comparison)",
    excerpt: "Red onion vs white onion — which is healthier? Discover the key differences in antioxidants, quercetin, anthocyanins, digestion benefits, and how to use each for maximum health impact. Evidence-based guide for Western readers.",
    category: "science",
    author: "曾楚平 (Zeng Chuping)",
    publishedAt: "2025-01-27",
    readTime: 8,
    featured: true,
    featured_image: null,
    slug: { current: "red-onion-vs-white-onion-health-benefits" },
    tags: ["red onion vs white onion", "onion health benefits", "pickled onion benefits", "who should not eat onion", "onion for cholesterol", "onion antioxidants", "quercetin", "anthocyanins", "onion for digestion", "natural remedies"]
  },
  {
    id: 1758713619592,
    _id: '1758713619592',
    title: "Ginger Tablets vs Chews: Which Works Better for Nausea & Bloating?",
    excerpt: "Feeling bloated or nauseous? Discover ginger tablets benefits, ginger chews for nausea, and why this ancient root is your stomach's best friend. Complete guide with DIY recipes and real results.",
    category: "lifestyle",
    author: "曾楚平 (Zeng Chuping)",
    publishedAt: "2025-01-26",
    readTime: 8,
    featured: true,
    featured_image: null,
    slug: { current: "ginger-tablets-chews-nausea-bloating-guide" },
    tags: ["ginger tablets benefits", "ginger chews for nausea", "ginger capsules benefits", "ginger supplement for nausea", "benefits of drinking ginger tea", "natural remedies", "digestive health", "motion sickness", "bloating relief"]
  },
  {
    id: 1758713619591,
    _id: '1758713619591',
    title: "Ginger Tea for Menstrual Cramps: Natural Period Pain Relief That Actually Works",
    excerpt: "Tired of period cramps controlling your life? Learn how ginger tea for menstrual cramps provides natural relief. Discover when to drink ginger tea in periods, how to use ginger for menstrual cramps, and why it works as well as ibuprofen.",
    category: "lifestyle",
    author: "曾楚平 (Zeng Chuping)",
    publishedAt: "2025-01-26",
    readTime: 7,
    featured: true,
    featured_image: null,
    slug: { current: "ginger-tea-menstrual-cramps-natural-relief" },
    tags: ["ginger tea for menstrual cramps", "ginger tea in periods", "ginger for period pain", "natural period pain relief", "how to use ginger for menstrual cramps", "ginger root for menstrual cramps", "period cramp remedies", "women's health", "natural remedies"]
  },
  {
    id: 1758713619590,
    _id: '1758713619590',
    title: "Ashwagandha Benefits for Female: Hormonal Imbalance, Stress & What It's Good For",
    excerpt: "Discover ashwagandha benefits for female health: balance hormones, reduce stress, improve sleep. Learn safe dosage, side effects, and what ashwagandha is good for. Evidence-based guide by licensed pharmacist.",
    category: "science",
    author: "曾楚平 (Zeng Chuping)",
    publishedAt: "2025-01-26",
    readTime: 8,
    featured: true,
    featured_image: null,
    slug: { current: "ashwagandha-for-women-hormone-balance" },
    tags: ["ashwagandha benefits for female", "ashwagandha for hormonal imbalance", "side effects of ashwagandha on females", "what is ashwagandha good for", "best herbs for stress and anxiety", "ashwagandha for women", "adaptogen herb", "hormonal balance", "women's health"]
  },
  {
    id: 1758713619589,
    _id: '1758713619589',
    title: "Why Rhodiola Works for Some People but Not Others — How to Take It Right for Your Body Type",
    excerpt: "Discover why rhodiola crenulata benefits vary by person. Learn how to take rhodiola the right way based on your TCM body constitution. Complete guide on rhodiola dosage, timing, and herb combinations for optimal results.",
    category: "science",
    author: "Dr. Sarah Chen, HerbScience Team",
    publishedAt: "2025-01-23",
    readTime: 10,
    featured: true,
    featured_image: null,
    slug: { current: "why-rhodiola-works-body-type" },
    tags: ["rhodiola crenulata benefits", "rhodiola benefits", "how to take rhodiola", "best time to take rhodiola", "rhodiola dosage", "rhodiola supplement benefits", "TCM body type", "adaptogen herbs", "personalized supplements"]
  },
  {
    id: 1758713619588,
    _id: '1758713619588',
    title: "Rhodiola Tea Recipes for Energy and Focus — Find the Best Blend for Your Body Type",
    excerpt: "Discover easy rhodiola tea recipes to boost energy, improve focus, and reduce fatigue. Learn how to make rhodiola rosea tea and customize blends using TCM-inspired herbal pairings tailored to your constitution.",
    category: "lifestyle",
    author: "HerbScience Team",
    publishedAt: "2025-01-22",
    readTime: 8,
    featured_image: null,
    slug: { current: "rhodiola-tea-recipes-energy-focus" },
    tags: ["rhodiola tea", "rhodiola rosea tea", "rhodiola tea benefits", "adaptogenic tea", "rhodiola for energy", "rhodiola for focus", "herbal tea recipes", "TCM", "rhodiola with ginseng", "rhodiola for fatigue"]
  },
  {
    id: 1758713619587,
    _id: '1758713619587',
    title: "How to Take Rhodiola the Smart Way — Daily Rituals, Recipes & Body-Type Tips",
    excerpt: "Learn the best time to take rhodiola, optimal dosage for energy, simple recipes, and how to pair it with other herbs. Complete guide for using rhodiola supplement effectively for stress relief and mental clarity.",
    category: "lifestyle",
    author: "HerbScience Team",
    publishedAt: "2025-01-22",
    readTime: 7,
    featured_image: null,
    slug: { current: "rhodiola-smart-way-daily-rituals" },
    tags: ["rhodiola", "adaptogen herbs", "how to take rhodiola", "rhodiola dosage", "rhodiola recipes", "rhodiola tea", "natural energy", "stress relief", "rhodiola with ginseng", "best time to take rhodiola"]
  }
]

export default async function BlogPage() {
  // 从Sanity获取数据
  const [sanityPosts, sanityFeaturedPosts, sanityCategories] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(),
    getBlogCategories()
  ])

  // 合并Sanity数据和本地静态文章
  // 静态文章排在前面（最新的）
  const mergedPosts = [...staticLocalArticles, ...sanityPosts]
  
  // Featured posts: 如果Sanity有featured，使用Sanity的；否则使用静态文章的前2篇
  const mergedFeaturedPosts = sanityFeaturedPosts.length > 0 
    ? [...staticLocalArticles.slice(0, 2), ...sanityFeaturedPosts]
    : staticLocalArticles.slice(0, 2)

  return (
    <BlogClient
      initialPosts={mergedPosts}
      initialFeaturedPosts={mergedFeaturedPosts}
      initialCategories={sanityCategories}
    />
  )
} 