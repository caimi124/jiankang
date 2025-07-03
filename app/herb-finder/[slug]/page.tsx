import { redirect } from 'next/navigation'
import { getAllHerbsFromNotion } from '@/lib/notion-herbs-api'

interface HerbDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

// 根据slug查找草药并重定向到统一模版
async function getHerbBySlug(slug: string): Promise<string | null> {
  try {
    // 首先获取所有草药
    const herbs = await getAllHerbsFromNotion()
    
    // 根据slug匹配草药
    const herb = herbs.find(h => {
      const herbSlug = h.name_en.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      return herbSlug === slug
    })
    
    if (herb) {
      // 生成新的统一模版slug
      const unifiedSlug = herb.name_en.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]/g, '')
        .replace(/--+/g, '-')
        .trim()
      return unifiedSlug
    }
    
    return null
  } catch (error) {
    console.error('Error fetching herb by slug:', error)
    return null
  }
}

// 生成静态路径 - 用于重定向
export async function generateStaticParams() {
  try {
    const herbs = await getAllHerbsFromNotion()
    
    return herbs.map((herb) => ({
      slug: herb.name_en.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// 主页面组件 - 重定向到统一模版
export default async function HerbDetailPage({ params }: HerbDetailPageProps) {
  const resolvedParams = await params
  const unifiedSlug = await getHerbBySlug(resolvedParams.slug)

  if (unifiedSlug) {
    // 重定向到统一的现代化草药详情页模版
    redirect(`/herbs/${unifiedSlug}`)
  } else {
    // 如果找不到草药，重定向到herb-finder主页
    redirect('/herb-finder')
  }
} 