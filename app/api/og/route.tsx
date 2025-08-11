/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'generic'
  const title = searchParams.get('title') || ''
  const slug = searchParams.get('slug') || ''

  const displayTitle = title || (type === 'herb' ? `Herb: ${slug}` : type === 'blog' ? `Blog: ${slug}` : 'HerbScience.shop')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
          color: '#ffffff',
          padding: '64px',
          fontFamily: 'Inter, ui-sans-serif, system-ui'
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.8, marginBottom: 12 }}>HerbScience.shop</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{displayTitle}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, opacity: 0.9 }}>
          {type === 'herb' && (
            <div style={{ fontSize: 28 }}>Evidence-based • Safety-first • TCM insights</div>
          )}
          {type === 'blog' && (
            <div style={{ fontSize: 28 }}>Research • Safety • Practical Guides</div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

