'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { getLeadAttribution } from '@/lib/attribution'

type Answers = { projectType: string; problem: string; timeline: string; budget: string; email: string; consent: boolean; website: string }
const initial: Answers = { projectType: '', problem: '', timeline: '', budget: '', email: '', consent: false, website: '' }
const projectOptions = ['Crear un SaaS', 'Automatizar un proceso', 'Mejorar una aplicación', 'Crear una herramienta interna', 'No lo tengo claro']
const projectTypeForApi: Record<string, string> = {
  'Crear un SaaS': 'MVP de una nueva idea',
  'Automatizar un proceso': 'Automatización con IA',
  'Mejorar una aplicación': 'Mejorar un producto existente',
  'Crear una herramienta interna': 'Herramienta interna',
  'No lo tengo claro': 'Otro proyecto digital',
}
const timelineOptions = ['Lo antes posible', 'En 1 a 3 meses', 'En 3 a 6 meses', 'Solo estoy explorando']
const budgetOptions = ['Menos de 5.000 €', '5.000 € a 10.000 €', '10.000 € a 25.000 €', 'Más de 25.000 €', 'Necesito orientación']

function recommendation(type: string) {
  if (type.includes('SaaS')) return { label: 'Desarrollo SaaS a medida', href: '/desarrollo-saas' }
  if (type.includes('Automatizar')) return { label: 'Automatización con IA', href: '/automatizacion-ia' }
  if (type.includes('herramienta')) return { label: 'Software empresarial', href: '/software-empresarial' }
  if (type.includes('aplicación')) return { label: 'Evolución de producto', href: '/desarrollo-saas' }
  return { label: 'Diagnóstico de producto', href: '/desarrollo-mvp' }
}

export function LeadAssistant() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initial)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const update = (field: keyof Answers, value: string | boolean) => setAnswers((current) => ({ ...current, [field]: value }))
  const next = () => setStep((current) => Math.min(current + 1, 4))
  const reset = () => { setAnswers(initial); setStep(0); setStatus('idle') }
  const suggested = recommendation(answers.projectType)

  async function send(event: React.FormEvent) {
    event.preventDefault()
    if (!answers.consent) return
    setStatus('sending')
    const attribution = getLeadAttribution()
    const message = [`Asistente de diagnóstico`, `Origen: ${pathname}`, `Tipo: ${answers.projectType}`, `Problema: ${answers.problem}`, `Plazo: ${answers.timeline}`, `Presupuesto: ${answers.budget}`, `Recomendación: ${suggested.label}`].join('\n')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Contacto desde asistente', email: answers.email, projectType: projectTypeForApi[answers.projectType], message, consent: answers.consent, website: answers.website, attribution }) })
      if (!response.ok) throw new Error('Request failed')
      trackEvent('generate_lead', { form_source: 'guided_assistant', project_type: answers.projectType, recommendation: suggested.label, lead_source: attribution.source, lead_medium: attribution.medium, lead_campaign: attribution.campaign })
      setStatus('sent')
    } catch { setStatus('error') }
  }

  return <div className={`lead-assistant ${open ? 'is-open' : ''}`}>
    <button className="assistant-trigger" onClick={() => { if (!open) trackEvent('assistant_open', { page_path: pathname }); setOpen(!open) }} aria-expanded={open} aria-controls="lead-assistant-panel"><span>MD</span><b>{open ? 'Cerrar' : '¿Tienes una idea?'}</b></button>
    {open && <section id="lead-assistant-panel" className="assistant-panel" aria-label="Asistente de diagnóstico" aria-live="polite">
      <header><div><span>MD / ASISTENTE</span><small>Paso {Math.min(step + 1, 5)} de 5</small></div><button onClick={() => setOpen(false)} aria-label="Cerrar asistente">×</button></header>
      {status === 'sent' ? <div className="assistant-result"><span>Solicitud recibida</span><h2>Ya tenemos el contexto.</h2><p>Revisaremos tus respuestas y te escribiremos en un máximo de 2 días laborables.</p><button onClick={reset}>Nueva consulta</button></div> : <>
        <div className="assistant-progress"><i style={{ transform: `scaleX(${(step + 1) / 5})` }} /></div>
        {step === 0 && <div className="assistant-step"><small>Para empezar</small><h2>¿Qué necesitas resolver?</h2><div className="assistant-options">{projectOptions.map((option) => <button key={option} onClick={() => { update('projectType', option); next() }}>{option}<span>↗</span></button>)}</div></div>}
        {step === 1 && <div className="assistant-step"><small>El contexto</small><h2>¿Qué tarea o problema quieres mejorar?</h2><textarea autoFocus rows={5} value={answers.problem} onChange={(e) => update('problem', e.target.value)} placeholder="Describe brevemente qué ocurre hoy y quién participa." /><button className="assistant-next" disabled={answers.problem.trim().length < 10} onClick={next}>Continuar <span>↗</span></button></div>}
        {step === 2 && <div className="assistant-step"><small>El momento</small><h2>¿Cuándo te gustaría ponerlo en marcha?</h2><div className="assistant-options">{timelineOptions.map((option) => <button key={option} onClick={() => { update('timeline', option); next() }}>{option}<span>↗</span></button>)}</div></div>}
        {step === 3 && <div className="assistant-step"><small>La inversión</small><h2>¿Tienes una horquilla prevista?</h2><div className="assistant-options">{budgetOptions.map((option) => <button key={option} onClick={() => { update('budget', option); next() }}>{option}<span>↗</span></button>)}</div></div>}
        {step === 4 && <form className="assistant-step" onSubmit={send}><small>La recomendación</small><h2>{suggested.label}</h2><p>Es el punto de partida que mejor encaja con lo que nos has contado. Déjanos un correo y revisaremos el caso personalmente.</p><Link className="assistant-service-link" href={suggested.href}>Conocer el servicio <span>↗</span></Link><label>Email<input required type="email" value={answers.email} onChange={(e) => update('email', e.target.value)} placeholder="nombre@empresa.com" /></label><label className="assistant-consent"><input required type="checkbox" checked={answers.consent} onChange={(e) => update('consent', e.target.checked)} /><span>Acepto la <Link href="/privacidad">política de privacidad</Link>.</span></label><label className="lead-honeypot">Web<input tabIndex={-1} value={answers.website} onChange={(e) => update('website', e.target.value)} /></label>{status === 'error' && <p className="assistant-error">No hemos podido enviarlo. Inténtalo de nuevo.</p>}<button className="assistant-next" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar diagnóstico'} <span>↗</span></button></form>}
        {step > 0 && step < 4 && <button className="assistant-back" onClick={() => setStep(step - 1)}>← Volver</button>}
      </>}
    </section>}
  </div>
}
