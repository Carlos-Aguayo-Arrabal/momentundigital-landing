'use client'

import Link from 'next/link'
import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { getLeadAttribution } from '@/lib/attribution'

export function ResourceLeadMagnet({ resourceSlug, resourceTitle }: { resourceSlug: string; resourceTitle: string }) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resourceSlug, website, consent, attribution: getLeadAttribution() }),
      })
      if (!response.ok) throw new Error('Request failed')
      trackEvent('lead_magnet_signup', { resource: resourceSlug })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return (
    <div className="resource-magnet" role="status">
      <h3>Revisa tu correo</h3>
      <p>Te hemos enviado el enlace a «{resourceTitle}» para que la tengas siempre a mano.</p>
    </div>
  )

  return (
    <div className="resource-magnet">
      <h3>¿Quieres tenerla siempre a mano?</h3>
      <p>Te la enviamos a tu correo para que la puedas consultar o compartir con tu equipo cuando quieras.</p>
      <form onSubmit={submit}>
        <input type="email" required placeholder="nombre@empresa.com" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="lead-honeypot" aria-hidden="true">
          <label htmlFor={`magnet-website-${resourceSlug}`}>Sitio web</label>
          <input id={`magnet-website-${resourceSlug}`} tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <label className="lead-consent">
          <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>Acepto la <Link href="/privacidad">política de privacidad</Link>.</span>
        </label>
        {status === 'error' && <p className="lead-error" role="alert">No hemos podido enviarla. Escribe a contacto@momentundigital.com.</p>}
        <button className="factory-button" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando...' : 'Enviarme la guía'} <span>↗</span></button>
      </form>
    </div>
  )
}
