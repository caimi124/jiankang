import { ImageResponse } from 'next/og'
import { getBlogPostBySlug } from '@/lib/sanity'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const resolvedParams = await params
  
  // 尝试获取文章标题
  let title = '草药知识 • HerbScience'
  try {
    const post = await getBlogPostBySlug(resolvedParams.slug)
    if (post?.title) {
      title = post.title
    }
  } catch (error) {
    console.error('获取文章标题失败:', error)
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #0f766e, #16a34a)',
          color: '#fff',
          padding: '64px',
          fontFamily: 'Inter, ui-sans-serif, system-ui'
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.85, marginBottom: 12 }}>
          HerbScience.shop
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 980,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, opacity: 0.9 }}>
          循证草药医学指南
        </div>
      </div>
    ),
    size
  )
}

