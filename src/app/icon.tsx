import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1d1d1b', color: '#eeede7', border: '5px solid #d94b32', fontSize: 21, fontWeight: 800, letterSpacing: '-2px' }}>MD</div>, size)
}
