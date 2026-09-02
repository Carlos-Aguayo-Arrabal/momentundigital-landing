import Link from 'next/link'
import Image from 'next/image'
import { ProjectLeadForm } from '@/components/public/ProjectLeadForm'
import { LeadAssistant } from '@/components/marketing/LeadAssistant'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'

const capabilities = [
  { number: '01', title: 'Producto', text: 'Convertimos una necesidad real en una propuesta clara, validable y preparada para crecer.' },
  { number: '02', title: 'Diseño', text: 'Diseñamos experiencias simples que reducen fricción y hacen que el valor del producto sea evidente.' },
  { number: '03', title: 'Desarrollo', text: 'Construimos una base técnica sólida con Next.js, automatización, datos y servicios conectados.' },
  { number: '04', title: 'Lanzamiento', text: 'Ponemos el producto en producción, medimos su uso y priorizamos la siguiente iteración.' },
]

const phases = [
  ['Semana 01', 'Definición', 'Objetivo, alcance y arquitectura'],
  ['Semana 02', 'Prototipo', 'Experiencia y validación del flujo'],
  ['Semanas 03-05', 'Construcción', 'Producto funcional y conectado'],
  ['Semana 06', 'Lanzamiento', 'Producción, métricas y evolución'],
]

const solutions = [
  ['CRM especializado', 'Centraliza clientes, oportunidades y tareas en un flujo adaptado a tu negocio.'],
  ['Portal de clientes', 'Ofrece documentación, seguimiento, pagos y comunicación en un espacio privado.'],
  ['Automatización con IA', 'Reduce trabajo repetitivo conectando datos, decisiones y procesos internos.'],
  ['Plataforma de reservas', 'Gestiona disponibilidad, pagos, recordatorios y atención desde un único sistema.'],
  ['SaaS por suscripción', 'Convierte conocimiento o servicios en un producto digital recurrente y escalable.'],
  ['Evolución de producto', 'Mejora una aplicación existente sin detener la operación ni perder su base actual.'],
]

const faqs = [
  ['¿Cuánto tarda un primer lanzamiento?', 'Un MVP bien definido suele estar listo en unas 6 semanas. El plazo final depende del alcance, las integraciones y la validación necesaria.'],
  ['¿Cómo se define el presupuesto?', 'Después del diagnóstico recibirás una propuesta cerrada por alcance, entregables y calendario. Así sabes qué se construirá antes de empezar.'],
  ['¿El código y el producto serán míos?', 'Sí. Al completar el proyecto recibes la propiedad del código, los diseños y la documentación correspondiente.'],
  ['¿Podéis continuar un producto existente?', 'Sí. Primero auditamos su arquitectura, experiencia y prioridades para proponer una evolución segura y medible.'],
  ['¿Qué ocurre después del lanzamiento?', 'Podemos acompañarte con mantenimiento, análisis de uso y nuevas iteraciones, o preparar una transferencia completa a tu equipo.'],
]

export default function HomePage() {
  const structuredData = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'MOMENTUNDIGITAL', url: siteUrl, email: 'contacto@momentundigital.com', description: 'Estudio de producto digital especializado en desarrollo SaaS a medida, MVP y automatización de procesos con inteligencia artificial.', areaServed: { '@type': 'Country', name: 'España' }, serviceType: ['Desarrollo SaaS a medida', 'Desarrollo de MVP', 'Automatización de procesos con IA', 'Diseño de producto digital'] }
  return (
    <main className="factory-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="factory-nav">
        <Link href="/" className="factory-logo">
          <span className="factory-mark">MD</span>
          <span>MOMENTUNDIGITAL</span>
        </Link>
        <nav className="factory-links" aria-label="Navegación principal">
          <a href="#soluciones">Soluciones</a>
          <a href="#proceso">Proceso</a>
          <Link href="/recursos">Recursos</Link>
          <a href="#diagnostico">Contacto</a>
        </nav>
        <a href="#diagnostico" className="factory-button factory-button-small">Diagnóstico gratuito</a>
        <details className="mobile-nav"><summary aria-label="Menú: abrir navegación">Menú</summary><nav aria-label="Navegación móvil"><a href="#soluciones">Soluciones</a><a href="#proceso">Proceso</a><Link href="/recursos">Recursos</Link><a href="#diagnostico">Diagnóstico</a></nav></details>
      </header>

      <section className="factory-hero" id="contenido">
        <Image className="factory-hero-image" src="/images/momentun-hero-system.png" alt="Composición de piezas metálicas y acrílicas que representa un sistema digital modular" fill priority fetchPriority="high" sizes="(max-width: 1000px) 100vw, 1400px" />
        <div className="factory-hero-copy">
          <p className="factory-kicker"><span /> Producto digital de principio a fin</p>
          <h1>Convertimos procesos complejos en <em>software fácil de usar.</em></h1>
          <p className="factory-lead">Trabajamos con equipos que necesitan lanzar una herramienta propia, automatizar una operación o rehacer un producto que se ha quedado pequeño.</p>
          <div className="factory-actions">
            <a href="#diagnostico" className="factory-button">Solicitar diagnóstico gratuito <span>↗</span></a>
            <a href="#proceso" className="factory-text-link">Ver cómo trabajamos <span>↓</span></a>
          </div>
        </div>

        <div className="studio-statement" aria-label="Forma de trabajo de MOMENTUNDIGITAL">
          <p>Un producto útil empieza por hacer las preguntas incómodas.</p>
          <div><span>01</span><strong>¿Quién lo va a usar?</strong></div>
          <div><span>02</span><strong>¿Qué tarea debe resolver?</strong></div>
          <div><span>03</span><strong>¿Qué podemos dejar fuera?</strong></div>
          <small>Después, diseñamos y construimos.</small>
        </div>
      </section>

      <section className="solutions-section" id="soluciones">
        <div className="solutions-heading"><p>El tipo de trabajo</p><h2>Software que encaja con la operación, no al revés.</h2><span>No vendemos una tecnología concreta. Elegimos lo que necesita cada producto.</span></div>
        <div className="solutions-grid">{solutions.map(([title, text], index) => { const hrefs = ['/software-empresarial', '/software-empresarial', '/automatizacion-ia', '/software-empresarial', '/desarrollo-saas', '/desarrollo-saas']; return <article key={title}><h3>{title}</h3><p>{text}</p><Link href={hrefs[index]} aria-label={`Ver cómo lo abordamos: ${title}`}>Ver cómo lo abordamos <span>↗</span></Link></article> })}</div>
      </section>

      <section className="factory-proof" aria-label="Propuesta de valor">
        <p>MOMENTUNDIGITAL es un estudio de producto. Unimos criterio de negocio, diseño y desarrollo para que las decisiones no se pierdan entre proveedores.</p>
      </section>

      <section className="factory-section" id="capacidades">
        <div className="factory-section-title">
          <p>Todo lo necesario para lanzar</p>
          <h2>Menos proveedores.<br />Más producto.</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="factory-process" id="proceso">
        <div className="process-intro">
          <p>Un proceso concreto</p>
          <h2>De cero a producción en semanas, no en meses.</h2>
          <p>Trabajamos por etapas cortas, con entregables visibles y decisiones basadas en evidencia.</p>
        </div>
        <div className="process-list">
          {phases.map(([time, title, description]) => (
            <div key={title}><small>{time}</small><strong>{title}</strong><span>{description}</span></div>
          ))}
        </div>
      </section>

      <section className="offer-section">
        <div className="offer-heading"><p>Tres puntos de entrada</p><h2>Entramos donde el proyecto nos necesita.</h2></div>
        <div className="offer-grid">
          <article><small>VALIDACIÓN</small><h3>De la idea al plan</h3><p>Para comprobar viabilidad, alcance y oportunidad antes de invertir en desarrollo.</p><ul><li>Diagnóstico del problema</li><li>Propuesta de valor</li><li>Mapa funcional</li><li>Plan de lanzamiento</li></ul></article>
          <article className="offer-featured"><small>CONSTRUCCIÓN</small><h3>MVP listo para lanzar</h3><p>Para transformar una oportunidad validada en un producto funcional y medible.</p><ul><li>Diseño de experiencia</li><li>Desarrollo completo</li><li>Integraciones clave</li><li>Despliegue y métricas</li></ul><a href="#diagnostico">Solicitar propuesta <span>↗</span></a></article>
          <article><small>EVOLUCIÓN</small><h3>Producto en crecimiento</h3><p>Para mejorar rendimiento, automatizar operaciones y desarrollar nuevas capacidades.</p><ul><li>Auditoría de producto</li><li>Priorización de mejoras</li><li>Iteraciones mensuales</li><li>Soporte técnico</li></ul></article>
        </div>
      </section>

      <section className="faq-section">
        <div><p>Preguntas frecuentes</p><h2>Antes de empezar, todo claro.</h2></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div>
      </section>

      <section className="home-resources"><header><p>Recursos para decidir</p><h2>Antes de contratar desarrollo, conviene hacer mejores preguntas.</h2><Link href="/recursos">Ver todos los recursos <span>↗</span></Link></header><div><Link href="/recursos/guia-desarrollo-saas"><small>GUÍA SAAS</small><h3>Cómo plantear un SaaS sin empezar por la tecnología</h3><span>8 min ↗</span></Link><Link href="/recursos/automatizacion-ia-empresa"><small>AUTOMATIZACIÓN</small><h3>Qué procesos merece la pena automatizar con IA</h3><span>7 min ↗</span></Link><Link href="/recursos/como-definir-mvp"><small>PRODUCTO</small><h3>Cómo definir un MVP sin convertirlo en una demo inútil</h3><span>6 min ↗</span></Link></div></section>

      <section className="diagnostic-section" id="diagnostico">
        <div className="diagnostic-copy"><p>Diagnóstico inicial gratuito</p><h2>Aclara tu idea antes de invertir.</h2><span>Una videollamada de 30 minutos para revisar:</span><ul><li>El problema y el cliente objetivo</li><li>Las funciones imprescindibles del MVP</li><li>La arquitectura y las integraciones</li><li>Una horquilla realista de inversión</li><li>El plan inicial de lanzamiento</li></ul><strong>Después recibirás un resumen con alcance, prioridades y próximos pasos. Respuesta en un máximo de 2 días laborables.</strong></div>
        <ProjectLeadForm />
      </section>

      <footer className="factory-footer">
        <div className="factory-logo"><span className="factory-mark">MD</span><span>MOMENTUNDIGITAL</span></div>
        <div className="footer-contact"><a href="mailto:contacto@momentundigital.com">contacto@momentundigital.com</a><Link href="/privacidad">Privacidad</Link></div>
        <span>© 2026 MOMENTUNDIGITAL</span>
      </footer>
      <LeadAssistant />
    </main>
  )
}
