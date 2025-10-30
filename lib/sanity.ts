import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content?: any[];
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  author: string | { name: string; bio?: string; expertise?: string[] };
  category: string;
  tags: string[] | { title: string }[];
  featured_image?: any;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  status?: string;
}

interface Category {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  postCount?: number;
}

// Ensure we have the required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13rzzwgz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.NEXT_PUBLIC_SANITY_READ_TOKEN || process.env.SANITY_API_TOKEN

if (!projectId) {
  console.warn('⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID is not set, using fallback')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// sanityFetch function for compatibility with build-time error handling
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {},
  options?: { next?: { revalidate?: number } }
): Promise<T> {
  try {
    // If no projectId is available during build, return empty result
    if (!projectId) {
      console.warn('⚠️ Sanity projectId not available, returning empty result')
      return ([] as unknown) as T
    }

    return await client.fetch<T>(query, params, options)
  } catch (error) {
    console.error('Error in sanityFetch:', error)

    // During build time, return empty result instead of throwing
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV) {
      console.warn('⚠️ Build-time Sanity fetch failed, returning empty result')
      return ([] as unknown) as T
    }

    throw error
  }
}

// Blog post queries
export const blogPostQueries = {
  // Get all published blog posts with basic info (English only)
  getAllPosts: `*[_type == "blogPost" && status == "published" && (!defined(language) || language == "en")] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    featured,
    language,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get featured blog posts (English only)
  getFeaturedPosts: `*[_type == "blogPost" && status == "published" && featured == true && (!defined(language) || language == "en")] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    language,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get blog post by slug (language-aware)
  getPostBySlug: `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    readTime,
    featured,
    language,
    "author": author->{name, bio, expertise},
    "category": category->{title, description},
    "tags": tags[]->{title, slug},
    featured_image,
    seoTitle,
    seoDescription,
    seoKeywords
  }`,

  // Get posts by category (English only)
  getPostsByCategory: `*[_type == "blogPost" && status == "published" && category->title == $category && (!defined(language) || language == "en")] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    language,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get all categories with post counts (English only)
  getCategories: `*[_type == "category" && (!defined(language) || language == "en")] {
    _id,
    title,
    slug,
    description,
    language,
    "postCount": count(*[_type == "blogPost" && status == "published" && (!defined(language) || language == "en") && references(^._id)])
  } | order(title asc)`,
  
  // Get all Chinese categories with post counts
  getCategoriesZh: `*[_type == "category" && language == "zh"] {
    _id,
    title,
    slug,
    description,
    language,
    "postCount": count(*[_type == "blogPost" && status == "published" && language == "zh" && references(^._id)])
  } | order(title asc)`,

  // Get all tags with post counts (English only)
  getTags: `*[_type == "tag"] {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "blogPost" && status == "published" && (!defined(language) || language == "en") && references(^._id)])
  } | order(title asc)`,
  
  // Get all Chinese tags with post counts
  getTagsZh: `*[_type == "tag"] {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "blogPost" && status == "published" && language == "zh" && references(^._id)])
  } | order(title asc)`,

  // Search posts (English only)
  searchPosts: `*[_type == "blogPost" && status == "published" && (!defined(language) || language == "en") && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    author->name match $searchTerm + "*" ||
    tags[]->title match $searchTerm + "*"
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    language,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // === Chinese (ZH) Blog Post Queries ===
  // Get all published Chinese blog posts
  getAllPostsZh: `*[_type == "blogPost" && status == "published" && language == "zh"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    featured,
    language,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get featured Chinese blog posts
  getFeaturedPostsZh: `*[_type == "blogPost" && status == "published" && featured == true && language == "zh"] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    language,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get Chinese blog post by slug
  getPostBySlugZh: `*[_type == "blogPost" && slug.current == $slug && status == "published" && language == "zh"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    readTime,
    featured,
    language,
    "author": author->{name, bio, expertise},
    "category": category->{title, description},
    "tags": tags[]->{title, slug},
    featured_image,
    seoTitle,
    seoDescription,
    seoKeywords
  }`
}

// Helper functions for fetching data (English)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostQueries.getAllPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostQueries.getFeaturedPosts)
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Helper functions for fetching blog posts
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(blogPostQueries.getPostBySlug, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostQueries.getPostsByCategory, { category })
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

export async function getBlogCategories(): Promise<Category[]> {
  try {
    return await client.fetch(blogPostQueries.getCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getBlogCategoriesZh(): Promise<Category[]> {
  try {
    return await client.fetch(blogPostQueries.getCategoriesZh)
  } catch (error) {
    console.error('Error fetching Chinese categories:', error)
    return []
  }
}

export async function searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostQueries.searchPosts, { searchTerm })
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// === Chinese (ZH) Blog Helper Functions ===
export async function getAllBlogPostsZh(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostQueries.getAllPostsZh)
  } catch (error) {
    console.error('Error fetching Chinese blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPostsZh(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostQueries.getFeaturedPostsZh)
  } catch (error) {
    console.error('Error fetching featured Chinese posts:', error)
    return []
  }
}

export async function getBlogPostBySlugZh(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(blogPostQueries.getPostBySlugZh, { slug })
  } catch (error) {
    console.error('Error fetching Chinese blog post:', error)
    return null
  }
}

// Static data fallback for development/testing
export const staticBlogData = {
  featuredPosts: [
    {
      _id: '7',
      title: "Red Onion vs White Onion: Which Is Healthier? (Science-Backed Comparison)",
      slug: { current: "red-onion-vs-white-onion-health-benefits" },
      excerpt: "Red onion vs white onion — which is healthier? Discover the key differences in antioxidants, quercetin, anthocyanins, digestion benefits, and how to use each for maximum health impact. Evidence-based guide for Western readers.",
      publishedAt: "2025-01-27",
      readTime: 8,
      author: "曾楚平 (Zeng Chuping)",
      category: "science",
      tags: ["red onion vs white onion", "onion health benefits", "pickled onion benefits", "who should not eat onion", "onion for cholesterol", "onion antioxidants", "quercetin", "anthocyanins", "onion for digestion", "natural remedies"],
      featured_image: null,
      seoTitle: "Red Onion vs White Onion: Which Is Healthier? (Science-Backed Comparison) | HerbScience",
      seoDescription: "Red onion vs white onion — which is healthier? Discover the key differences in antioxidants, quercetin, anthocyanins, digestion benefits, and how to use each for maximum health impact. Evidence-based guide for Western readers."
    },
    {
      _id: '6',
      title: "Ginger Tablets vs Chews: Which Works Better for Nausea & Bloating?",
      slug: { current: "ginger-tablets-chews-nausea-bloating-guide" },
      excerpt: "Feeling bloated or nauseous? Discover ginger tablets benefits, ginger chews for nausea, and why this ancient root is your stomach's best friend. Complete guide with DIY recipes and real results.",
      publishedAt: "2025-01-26",
      readTime: 8,
      author: "曾楚平 (Zeng Chuping)",
      category: "lifestyle",
      tags: ["ginger tablets benefits", "ginger chews for nausea", "ginger capsules benefits", "ginger supplement for nausea", "benefits of drinking ginger tea", "natural remedies", "digestive health", "motion sickness", "bloating relief"],
      featured_image: null,
      seoTitle: "Ginger Tablets vs Chews: Which Works Better for Nausea & Bloating? | HerbScience",
      seoDescription: "Feeling bloated or nauseous? Discover ginger tablets benefits, ginger chews for nausea, and why this ancient root is your stomach's best friend. Complete guide with DIY recipes and real results."
    },
    {
      _id: '5',
      title: "Ginger Tea for Menstrual Cramps: Natural Period Pain Relief That Actually Works",
      slug: { current: "ginger-tea-menstrual-cramps-natural-relief" },
      excerpt: "Tired of period cramps controlling your life? Learn how ginger tea for menstrual cramps provides natural relief. Discover when to drink ginger tea in periods, how to use ginger for menstrual cramps, and why it works as well as ibuprofen.",
      publishedAt: "2025-01-26",
      readTime: 7,
      author: "曾楚平 (Zeng Chuping)",
      category: "lifestyle",
      tags: ["ginger tea for menstrual cramps", "ginger tea in periods", "ginger for period pain", "natural period pain relief", "how to use ginger for menstrual cramps", "ginger root for menstrual cramps", "period cramp remedies", "women's health", "natural remedies"],
      featured_image: null,
      seoTitle: "Ginger Tea for Menstrual Cramps: Natural Period Pain Relief That Actually Works | HerbScience",
      seoDescription: "Learn how ginger tea relieves menstrual cramps naturally. Discover when to drink ginger tea in periods, how to use it, and why it works as well as ibuprofen. Evidence-based guide by licensed pharmacist."
    },
    {
      _id: '4',
      title: "Ashwagandha Benefits for Female: Hormonal Imbalance, Stress & What It's Good For",
      slug: { current: "ashwagandha-for-women-hormone-balance" },
      excerpt: "Discover ashwagandha benefits for female health: balance hormones, reduce stress, improve sleep. Learn safe dosage, side effects, and what ashwagandha is good for. Evidence-based guide by licensed pharmacist.",
      publishedAt: "2025-01-26",
      readTime: 8,
      author: "曾楚平 (Zeng Chuping)",
      category: "science",
      tags: ["ashwagandha benefits for female", "ashwagandha for hormonal imbalance", "side effects of ashwagandha on females", "what is ashwagandha good for", "best herbs for stress and anxiety", "ashwagandha for women", "adaptogen herb", "hormonal balance", "women's health"],
      featured_image: null,
      seoTitle: "Ashwagandha Benefits for Female: Hormonal Imbalance, Stress & Sleep Solutions | HerbScience",
      seoDescription: "Discover ashwagandha benefits for female health: balance hormones, reduce stress, improve sleep. Learn safe dosage, side effects, and what ashwagandha is good for. Evidence-based guide by licensed pharmacist."
    },
    {
      _id: '1',
      title: "Why Personalized Herbal Supplements Work Better Than One-Size-Fits-All Remedies",
      slug: { current: "why-some-herbs-work-for-you-and-others-dont" },
      excerpt: "Discover why some herbs work for you while others don't, and how TCM constitution testing can help you choose the right herbal remedies for your unique body type.",
      publishedAt: "2024-01-19",
      readTime: 8,
      author: "HerbScience Expert Team",
      category: "lifestyle",
      tags: ["TCM", "constitution types", "personalized medicine", "herbal safety"],
      featured_image: null,
      seoTitle: "Personalized Herbal Supplements: Why Constitution Testing Works Better",
      seoDescription: "Discover why some herbs work for you while others don't. Learn how TCM constitution testing helps you choose the right herbal remedies for your unique body type."
    },
    {
      _id: '2',
      title: "Best Herbs for Anxiety: Natural Alternatives to Prescription Medications",
      slug: { current: "herbs-for-anxiety-natural-alternatives" },
      excerpt: "Compare the effectiveness of ashwagandha, valerian, and passionflower vs. prescription anti-anxiety drugs. Evidence-based guide with dosages.",
      publishedAt: "2024-01-17",
      readTime: 8,
      author: "Dr. Sarah Chen",
      category: "science",
      tags: ["anxiety", "herbs vs drugs", "ashwagandha", "prescription alternatives"],
      featured_image: null,
      seoTitle: "Best Herbs for Anxiety: Natural Alternatives to Prescription Medications",
      seoDescription: "Compare the effectiveness of ashwagandha, valerian, and passionflower vs. prescription anti-anxiety drugs. Evidence-based guide with dosages."
    },
    {
      _id: '3',
      title: "Best Herbs for Sleep: What Actually Works for Insomnia",
      slug: { current: "herbs-for-sleep-insomnia" },
      excerpt: "Scientific comparison of valerian, chamomile, passionflower, and melatonin. Which sleep herbs have the strongest evidence?",
      publishedAt: "2024-01-15",
      readTime: 7,
      author: "Dr. Sarah Chen",
      category: "lifestyle",
      tags: ["herbs for sleep", "insomnia", "valerian vs melatonin", "natural sleep aids"],
      featured_image: null,
      seoTitle: "Best Herbs for Sleep: What Actually Works for Insomnia",
      seoDescription: "Scientific comparison of valerian, chamomile, passionflower, and melatonin. Which sleep herbs have the strongest evidence?"
    }
  ],

  categories: [
    { _id: '1', title: 'lifestyle', description: 'Practical guides for daily wellness and traditional wisdom', postCount: 18 },
    { _id: '2', title: 'science', description: 'Research, safety studies, and evidence-based insights', postCount: 14 }
  ]
}