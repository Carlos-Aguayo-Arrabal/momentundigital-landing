import Link from 'next/link'
import { LeadAssistant } from './LeadAssistant'

export interface ServiceContent {
  slug: string
  eyebrow: string
  title: string
  intro: string
  definition: string
  situations: string[]
  deliverables: Array<{ title: string; text: string }>
  process: Array<{ title: string; text: string }>
  decisions: Array<{ question: string; answer: string }>
  related: Array<{ label: string; href: string }>
}

export function ServiceLanding({ content }: { content: ServiceContent }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: content.title, description: content.intro, provider: { '@type': 'ProfessionalService', name: 'MOMENTUNDIGITAL', url: siteUrl }, areaServed: 'España', url: `${siteUrl}/${content.slug}` }
  return <main className="service-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#service-content">Saltar al contenido</a>
    <header className="service-nav"><Link href="/" className="factory-logo"><span className="factory-mark">MD</span><span>MOMENTUNDIGITAL</span></Link><Link href="/#diagnostico" className="service-nav-cta">Cuéntanos el proyecto <span>↗</span></Link></header>
    <article id="service-content">
      <section className="service-hero"><div className="service-breadcrumb"><Link href="/">Inicio</Link><span>/</span><span>{content.eyebrow}</span></div><h1>{content.title}</h1><p>{content.intro}</p><Link href="/#diagnostico" className="factory-button">Solicitar diagnóstico gratuito <span>↗</span></Link></section>
      <section className="service-definition"><p>En pocas palabras</p><h2>{content.definition}</h2></section>
      <section className="service-fit"><div><p>Cuándo tiene sentido</p><h2>Este servicio encaja si...</h2></div><ol>{content.situations.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></section>
      <section className="service-deliverables"><header><p>Qué construimos</p><h2>Un resultado que se puede usar, medir y mantener.</h2></header><div>{content.deliverables.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      <section className="service-method"><div><p>Cómo lo abordamos</p><h2>Decisiones visibles de principio a fin.</h2></div><ol>{content.process.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></section>
      <section className="service-decisions"><header><p>Antes de contratar</p><h2>Preguntas que conviene resolver.</h2></header><div>{content.decisions.map((item) => <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
      <aside className="service-related"><p>También puede interesarte</p><div>{content.related.map((item) => <Link key={item.href} href={item.href}>{item.label}<span>↗</span></Link>)}</div></aside>
      <section className="service-close"><p>Primera conversación, sin compromiso</p><h2>Veamos si merece la pena construirlo.</h2><span>En 30 minutos revisamos el problema, el alcance inicial y los riesgos principales.</span><Link href="/#diagnostico" className="factory-button">Solicitar diagnóstico <b>↗</b></Link></section>
    </article>
    <footer className="service-footer"><Link href="/">MOMENTUNDIGITAL</Link><a href="mailto:contacto@momentundigital.com">contacto@momentundigital.com</a><Link href="/privacidad">Privacidad</Link></footer><LeadAssistant />
  </main>
}
