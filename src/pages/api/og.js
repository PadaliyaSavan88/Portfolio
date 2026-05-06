import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract the title from query params
    const title = searchParams.get('title') || 'Savan Padaliya';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#030712',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%)',
            backgroundSize: '40px 40px',
            padding: '80px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ color: '#60a5fa', fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              SAVANPADALIYA.COM / BLOG
            </span>
          </div>
          <div
            style={{
              fontSize: '70px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              maxWidth: '900px',
              fontFamily: 'sans-serif',
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', marginTop: '40px' }}>
            <div style={{ background: '#3b82f6', height: '8px', width: '120px', borderRadius: '4px' }} />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}