import type { Metadata } from 'next'
import Link from 'next/link'
import { ProjectLeadForm } from '@/components/public/ProjectLeadForm'
import { LeadAssistant } from '@/components/marketing/LeadAssistant'

export const metadata: Metadata = {
  title: 'Contacto | Desarrollo SaaS, MVP y automatización con IA',
  description: 'Cuéntanos qué necesitas construir. Respondemos en un máximo de 2 días laborables con los siguientes pasos para tu proyecto digital.',
  alternates: { canonical: '/contacto' },
  openGraph: { title: 'Contacto | MOMENTUNDIGITAL', description: 'Hablemos de tu SaaS, MVP, software empresarial o automatización con IA.', url: '/contacto', type: 'website' },
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'
  const schema = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contacto MOMENTUNDIGITAL', url: `${siteUrl}/contacto`, mainEntity: { '@type': 'ProfessionalService', name: 'MOMENTUNDIGITAL', email: 'contacto@momentundigital.com', url: siteUrl, areaServed: { '@type': 'Country', name: 'España' } } }
  return <main className="contact-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><header className="service-nav"><Link href="/" className="factory-logo"><span className="factory-mark">MD</span><span>MOMENTUNDIGITAL</span></Link><Link href="/" className="service-nav-cta">Volver al inicio <span>↗</span></Link></header><section className="contact-hero"><div><p>Hablemos del proyecto</p><h1>La primera conversación sirve para ordenar.</h1><span>Cuéntanos qué quieres construir, qué problema estás intentando resolver y en qué punto te encuentras. No necesitas tenerlo todo definido.</span><a href="mailto:contacto@momentundigital.com">contacto@momentundigital.com <b>↗</b></a></div><ProjectLeadForm /></section><footer className="service-footer"><Link href="/">MOMENTUNDIGITAL</Link><Link href="/privacidad">Privacidad</Link><Link href="/cookies">Cookies</Link></footer><LeadAssistant /></main>
}
