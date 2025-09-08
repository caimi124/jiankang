'use client'

import dynamic from 'next/dynamic'

// 动态加载Sanity Studio避免构建问题
const NextStudio = dynamic(
  () => import('next-sanity/studio').then(mod => ({ default: mod.NextStudio })),
  {
    ssr: false,
    loading: () => <div>Loading admin...</div>
  }
)

const config = dynamic(() => import('../../sanity.config'), { ssr: false })

export default function AdminPage() {
  return <NextStudio config={config} />
}

// 禁用静态生成
export const dynamic = 'force-dynamic' 