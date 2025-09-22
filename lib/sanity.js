import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Blog post queries
export const blogPostQueries = {
  // Get all published blog posts with basic info
  getAllPosts: `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    featured,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get featured blog posts
  getFeaturedPosts: `*[_type == "blogPost" && status == "published" && featured == true] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get blog post by slug
  getPostBySlug: `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    readTime,
    featured,
    "author": author->{name, bio, expertise},
    "category": category->{title, description},
    "tags": tags[]->{title, slug},
    featured_image,
    seoTitle,
    seoDescription,
    seoKeywords
  }`,

  // Get posts by category
  getPostsByCategory: `*[_type == "blogPost" && status == "published" && category->title == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`,

  // Get all categories with post counts
  getCategories: `*[_type == "category"] {
    _id,
    title,
    slug,
    description,
    "postCount": count(*[_type == "blogPost" && status == "published" && references(^._id)])
  } | order(title asc)`,

  // Get all tags with post counts
  getTags: `*[_type == "tag"] {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "blogPost" && status == "published" && references(^._id)])
  } | order(title asc)`,

  // Search posts
  searchPosts: `*[_type == "blogPost" && status == "published" && (
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
    "author": author->name,
    "category": category->title,
    "tags": tags[]->title,
    featured_image,
    seoTitle,
    seoDescription
  }`
}

// Helper functions for fetching data
export async function getAllBlogPosts() {
  try {
    return await client.fetch(blogPostQueries.getAllPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPosts() {
  try {
    return await client.fetch(blogPostQueries.getFeaturedPosts)
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    return await client.fetch(blogPostQueries.getPostBySlug, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getBlogPostsByCategory(category) {
  try {
    return await client.fetch(blogPostQueries.getPostsByCategory, { category })
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

export async function getBlogCategories() {
  try {
    return await client.fetch(blogPostQueries.getCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function searchBlogPosts(searchTerm) {
  try {
    return await client.fetch(blogPostQueries.searchPosts, { searchTerm })
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// Static data fallback for development/testing
export const staticBlogData = {
  featuredPosts: [
    {
      _id: '1',
      title: "Why Personalized Herbal Supplements Work Better Than One-Size-Fits-All Remedies",
      slug: { current: "personalized-herbal-supplements-constitution-based" },
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
      title: "The 9 TCM Constitution Types: Your Personal Guide to Herbal Selection",
      slug: { current: "tcm-constitution-types-herbal-guide" },
      excerpt: "Learn about the 9 constitution types in Traditional Chinese Medicine and how they guide personalized herb selection for optimal health and wellness.",
      publishedAt: "2024-01-17",
      readTime: 12,
      author: "HerbScience Expert Team",
      category: "lifestyle",
      tags: ["TCM", "constitution types", "traditional medicine", "personalized health"],
      featured_image: null,
      seoTitle: "9 TCM Constitution Types: Complete Guide to Herbal Selection",
      seoDescription: "Learn the 9 TCM constitution types and how they guide personalized herbal selection. Take our constitution test to find the right herbs for your body type."
    },
    {
      _id: '3',
      title: "Best Immune Boosting Herbs: Science-Based Guide for Each Constitution Type",
      slug: { current: "immune-boosting-herbs-constitution-guide" },
      excerpt: "Discover which immune boosting herbs work best for your constitution type. Evidence-based guide to echinacea, astragalus, elderberry and more.",
      publishedAt: "2024-01-15",
      readTime: 10,
      author: "HerbScience Expert Team",
      category: "science",
      tags: ["immune support", "evidence-based", "TCM", "herbal safety"],
      featured_image: null,
      seoTitle: "Best Immune Boosting Herbs by Constitution Type: Science-Based Guide",
      seoDescription: "Learn which immune boosting herbs work best for your constitution. Evidence-based guide to astragalus, elderberry, echinacea and more based on TCM principles."
    }
  ],

  categories: [
    { _id: '1', title: 'lifestyle', description: 'Practical guides for daily wellness and traditional wisdom', postCount: 18 },
    { _id: '2', title: 'science', description: 'Research, safety studies, and evidence-based insights', postCount: 14 }
  ]
}