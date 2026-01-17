import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'WellWave - Sistema de Anamnese Médica Inteligente'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #004e92, #00c6ff)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '60px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              marginBottom: 20,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #eef2f3)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            WellWave
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              marginBottom: 24,
              color: '#eef2f3',
              letterSpacing: '-0.01em',
            }}
          >
            Sistema de Anamnese Médica Inteligente
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            Geração automática de anamneses em pronto-socorro.
            <br />
            Compliance CFM e LGPD garantidos.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          wellwave.com.br
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
