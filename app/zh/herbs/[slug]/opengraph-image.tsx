import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const resolvedParams = await params
  const title = resolvedParams.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

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
          background: 'linear-gradient(135deg, #065f46, #059669)',
          color: '#fff',
          padding: '64px',
          fontFamily: 'Inter, ui-sans-serif, system-ui'
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.85, marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 48, marginRight: 16 }}>🌿</span>
          HerbScience.shop
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, opacity: 0.9 }}>
          草药功效 • 用法 • 安全性
        </div>
      </div>
    ),
    size
  )
}

