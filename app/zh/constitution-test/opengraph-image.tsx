import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          background: 'linear-gradient(135deg,#064e3b,#10b981)',
          color: '#fff',
          padding: '64px',
          fontFamily: 'Inter, ui-sans-serif, system-ui'
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.85, marginBottom: 12 }}>HerbScience.shop</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
          中医体质测试（20题）
        </div>
        <div style={{ marginTop: 24, fontSize: 28, opacity: 0.9 }}>9大体质 • 个性化草药建议 • 安全优先</div>
      </div>
    ),
    size
  )
}

