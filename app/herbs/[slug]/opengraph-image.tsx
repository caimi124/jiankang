import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = decodeURIComponent(slug).replace(/-/g, ' ')
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
          background: 'linear-gradient(135deg,#065f46,#059669)',
          color: '#fff',
          padding: '64px',
          fontFamily: 'Inter, ui-sans-serif, system-ui'
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.85, marginBottom: 12 }}>HerbScience.shop</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
          {`Herb: ${title}`}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, opacity: 0.9 }}>Evidence-based • Safety-first • TCM insights</div>
      </div>
    ),
    size
  )
}

