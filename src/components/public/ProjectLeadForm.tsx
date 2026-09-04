'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { getLeadAttribution } from '@/lib/attribution'

const initialForm = { name: '', email: '', phone: '', company: '', projectType: '', budget: '', timeline: '', message: '', website: '', consent: false }

export function ProjectLeadForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const started = useRef(false)
  const update = (field: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }))

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    const attribution = getLeadAttribution()
    const details = [`Empresa o web: ${form.company || 'Sin especificar'}`, `Inversión prevista: ${form.budget || 'Sin especificar'}`, `Plazo: ${form.timeline || 'Sin especificar'}`, '', form.message].join('\n')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, projectType: form.projectType, message: details, website: form.website, consent: form.consent, attribution }) })
      if (!response.ok) throw new Error('Request failed')
      trackEvent('generate_lead', { form_source: 'diagnostic_form', project_type: form.projectType, lead_source: attribution.source, lead_medium: attribution.medium, lead_campaign: attribution.campaign })
      setForm(initialForm)
      setStatus('success')
    } catch { setStatus('error') }
  }

  if (status === 'success') return <div className="lead-success" role="status"><strong>Solicitud recibida.</strong><p>Revisaremos el contexto y te responderemos en un máximo de 2 días laborables con los siguientes pasos.</p><a href="mailto:contacto@momentundigital.com">¿Necesitas añadir algo? Escríbenos</a><button onClick={() => setStatus('idle')}>Enviar otra solicitud</button></div>

  return (
    <form className="lead-form" onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; trackEvent('form_start', { form_source: 'diagnostic_form' }) } }}>
      <div className="lead-field"><label htmlFor="lead-name">Nombre</label><input id="lead-name" required minLength={2} autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="¿Cómo te llamas?" /></div>
      <div className="lead-field"><label htmlFor="lead-email">Email</label><input id="lead-email" required type="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="nombre@empresa.com" /></div>
      <div className="lead-field"><label htmlFor="lead-company">Empresa o web <span>Opcional</span></label><input id="lead-company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="empresa.com" /></div>
      <div className="lead-field"><label htmlFor="lead-phone">Teléfono <span>Opcional</span></label><input id="lead-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+34 600 000 000" /></div>
      <div className="lead-field"><label htmlFor="lead-type">¿Qué quieres construir?</label><select id="lead-type" required value={form.projectType} onChange={(e) => update('projectType', e.target.value)}><option value="">Selecciona una opción</option><option>MVP de una nueva idea</option><option>Herramienta interna</option><option>Portal para clientes</option><option>Automatización con IA</option><option>Mejorar un producto existente</option><option>Otro proyecto digital</option></select></div>
      <div className="lead-field"><label htmlFor="lead-timeline">¿Cuándo quieres lanzarlo? <span>Opcional</span></label><select id="lead-timeline" value={form.timeline} onChange={(e) => update('timeline', e.target.value)}><option value="">Selecciona un plazo</option><option>Lo antes posible</option><option>En 1 a 3 meses</option><option>En 3 a 6 meses</option><option>Solo estoy explorando</option></select></div>
      <div className="lead-field lead-wide"><label htmlFor="lead-budget">Inversión prevista <span>Opcional</span></label><select id="lead-budget" value={form.budget} onChange={(e) => update('budget', e.target.value)}><option value="">Todavía no está definida</option><option>Menos de 5.000 €</option><option>5.000 € a 10.000 €</option><option>10.000 € a 25.000 €</option><option>Más de 25.000 €</option></select></div>
      <div className="lead-field lead-wide"><label htmlFor="lead-message">Cuéntanos brevemente la idea</label><textarea id="lead-message" required minLength={10} maxLength={4000} rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Qué problema quieres resolver, para quién y qué has probado hasta ahora." /></div>
      <div className="lead-honeypot" aria-hidden="true"><label htmlFor="lead-website">Sitio web</label><input id="lead-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} /></div>
      <label className="lead-consent"><input type="checkbox" required checked={form.consent} onChange={(e) => update('consent', e.target.checked)} /><span>He leído y acepto la <Link href="/privacidad">política de privacidad</Link>.</span></label>
      {status === 'error' && <p className="lead-error" role="alert">No hemos podido enviar la solicitud. Inténtalo de nuevo o escribe a contacto@momentundigital.com.</p>}
      <button className="factory-button lead-submit" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando...' : 'Solicitar diagnóstico gratuito'} <span>↗</span></button>
      <p className="lead-privacy">Sin compromiso. No recibirás comunicaciones comerciales automáticas.</p>
    </form>
  )
}
