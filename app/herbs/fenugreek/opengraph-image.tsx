import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fenugreek Benefits for Men, Women & Blood Sugar Control | HerbScience'
export const size = {
  width: 1200,
  height: 630,
}
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Gradient Background Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
            opacity: 0.95,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            zIndex: 10,
          }}
        >
          {/* Brand Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              marginBottom: '30px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <span style={{ fontSize: '60px' }}>🌿</span>
          </div>

          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                marginBottom: '10px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Fenugreek (胡芦巴)
            </h1>
            <p
              style={{
                fontSize: '28px',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              Trigonella foenum-graecum
            </p>
          </div>

          {/* Key Benefits Grid */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '15px 25px',
                borderRadius: '50px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <span style={{ fontSize: '24px', marginRight: '10px' }}>💪</span>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: '600' }}>
                Testosterone
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '15px 25px',
                borderRadius: '50px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <span style={{ fontSize: '24px', marginRight: '10px' }}>🤱</span>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: '600' }}>
                Lactation
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '15px 25px',
                borderRadius: '50px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <span style={{ fontSize: '24px', marginRight: '10px' }}>🩸</span>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: '600' }}>
                Blood Sugar
              </span>
            </div>
          </div>

          {/* Value Proposition */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '25px 40px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              maxWidth: '900px',
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                fontSize: '26px',
                color: 'white',
                margin: 0,
                textAlign: 'center',
                fontWeight: '600',
                lineHeight: 1.4,
              }}
            >
              🎯 Personalized by TCM Body Type • Science-Backed Dosage Guide
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 'bold',
              }}
            >
              HerbScience.shop
            </div>
            <div
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              • Evidence-Based Natural Medicine
            </div>
          </div>

          {/* Trust Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '15px',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <span style={{ fontSize: '20px' }}>⭐</span>
            <span>Strong Clinical Evidence</span>
            <span>•</span>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <span>GRAS Safety Status</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
