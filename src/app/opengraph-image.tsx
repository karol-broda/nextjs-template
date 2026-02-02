import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Next.js Template';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: 64, fontWeight: 700 }}>Next.js Template</h1>
    </div>,
    { ...size },
  );
}
