import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'),
  title: { default: 'Desarrollo SaaS a medida y automatización | MOMENTUNDIGITAL', template: '%s | MOMENTUNDIGITAL' },
  description: 'Diseñamos y desarrollamos productos SaaS, MVP y automatizaciones con IA para empresas. Estrategia, UX y tecnología en un único equipo.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: 'Desarrollo SaaS a medida y automatización | MOMENTUNDIGITAL',
    description: 'Estrategia, diseño y desarrollo de productos SaaS, MVP y automatizaciones con IA para empresas.',
    locale: 'es_ES',
    siteName: 'MOMENTUNDIGITAL',
    type: 'website',
    url: '/',
    images: [{ url: '/images/momentun-hero-system.png', width: 1672, height: 941, alt: 'Sistema digital modular de MOMENTUNDIGITAL' }],
  },
  twitter: { card: 'summary_large_image', title: 'MOMENTUNDIGITAL | Desarrollo SaaS a medida', description: 'Productos SaaS, MVP y automatización con IA para empresas.', images: ['/images/momentun-hero-system.png'] },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
