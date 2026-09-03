import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LeadAssistant } from '@/components/marketing/LeadAssistant'
import { resourceContent } from '@/config/resourceContent'

export const metadata: Metadata = { title: 'Guías sobre SaaS, MVP y automatización con IA', description: 'Recursos prácticos para tomar mejores decisiones antes de desarrollar un SaaS, definir un MVP o automatizar procesos con IA.', alternates: { canonical: '/recursos' }, openGraph: { title: 'Guías sobre SaaS, MVP y automatización con IA', description: 'Recursos prácticos para tomar mejores decisiones antes de desarrollar un SaaS, definir un MVP o automatizar procesos con IA.', url: '/recursos', type: 'website', images: ['/images/momentun-hero-system.png'] } }
export default function ResourcesPage() {
  const resources = Object.values(resourceContent)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', name: 'Guías sobre SaaS, MVP y automatización con IA', description: 'Recursos prácticos para tomar mejores decisiones antes de desarrollar un SaaS, definir un MVP o automatizar procesos con IA.', url: `${siteUrl}/recursos` },
    { '@type': 'ItemList', itemListElement: resources.map((resource, index) => ({ '@type': 'ListItem', position: index + 1, url: `${siteUrl}/recursos/${resource.slug}`, name: resource.title })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Recursos', item: `${siteUrl}/recursos` }] },
  ] }
  return <main className="resource-index"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><header className="service-nav"><Link href="/" className="factory-logo"><span className="factory-mark">MD</span><span>MOMENTUNDIGITAL</span></Link><Link href="/#diagnostico" className="service-nav-cta">Hablar del proyecto <span>↗</span></Link></header><section className="resource-index-hero"><p>Conocimiento compartido</p><h1>Decidir mejor antes de construir.</h1><span>Guías escritas desde la práctica de producto, diseño y desarrollo. Sin tendencias vacías ni recetas universales.</span></section><section className="resource-index-list">{resources.map((resource, index) => <article key={resource.slug}><span>0{index + 1}</span><Link className="resource-index-image" href={`/recursos/${resource.slug}`} aria-label={`Leer ${resource.title}`}><Image src={resource.image} alt={resource.imageAlt} fill sizes="(max-width: 800px) 100vw, 350px" /></Link><div><small>{resource.category}</small><h2>{resource.title}</h2><p>{resource.description}</p></div><Link href={`/recursos/${resource.slug}`}>Leer guía <b>↗</b></Link></article>)}</section><footer className="service-footer"><Link href="/">MOMENTUNDIGITAL</Link><a href="mailto:contacto@momentundigital.com">contacto@momentundigital.com</a><Link href="/privacidad">Privacidad</Link></footer><LeadAssistant /></main>
}
