import { NextRequest, NextResponse } from 'next/server'
import { resourceContent } from '@/config/resourceContent'

const attempts = new Map<string, { count: number; resetAt: number }>()
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] || char)

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()
    const rate = attempts.get(ip)
    if (rate && rate.resetAt > now && rate.count >= 5) return NextResponse.json({ error: 'Demasiadas solicitudes. Inténtalo más tarde.' }, { status: 429 })
    attempts.set(ip, !rate || rate.resetAt <= now ? { count: 1, resetAt: now + 60 * 60 * 1000 } : { ...rate, count: rate.count + 1 })

    const body = await request.json()
    const { email, resourceSlug, website, consent, attribution } = body
    if (website) return NextResponse.json({ success: true })
    if (consent !== true) return NextResponse.json({ error: 'Debes aceptar la política de privacidad.' }, { status: 400 })
    if (!email || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    if (typeof resourceSlug !== 'string' || !(resourceSlug in resourceContent)) return NextResponse.json({ error: 'Recurso inválido' }, { status: 400 })

    const resourceTitle = resourceContent[resourceSlug].title
    const resourceUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'}/recursos/${resourceSlug}`

    if (!process.env.RESEND_API_KEY) {
      console.error('Lead magnet email unavailable: RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'El envío no está disponible temporalmente.' }, { status: 503 })
    }

    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const [internal, visitor] = await Promise.all([
        resend.emails.send({
          from: process.env.CONTACT_FROM || 'MOMENTUNDIGITAL <web@send.momentundigital.com>',
          to: process.env.CONTACT_EMAIL || 'contacto@momentundigital.com',
          replyTo: email.trim(),
          subject: `Nueva descarga de guía: ${resourceTitle}`,
          html: `<h2>Nueva descarga de guía</h2><p><strong>Guía:</strong> ${escapeHtml(resourceTitle)}</p><p><strong>Email:</strong> ${escapeHtml(email.trim())}</p><h3>Origen del contacto</h3><p><strong>Fuente:</strong> ${escapeHtml(typeof attribution?.source === 'string' ? attribution.source.slice(0, 180) : 'No disponible')}<br><strong>Medio:</strong> ${escapeHtml(typeof attribution?.medium === 'string' ? attribution.medium.slice(0, 180) : 'No disponible')}<br><strong>Página de entrada:</strong> ${escapeHtml(typeof attribution?.landingPath === 'string' ? attribution.landingPath.slice(0, 500) : 'No disponible')}</p>`,
        }),
        resend.emails.send({
          from: process.env.CONTACT_FROM || 'MOMENTUNDIGITAL <web@send.momentundigital.com>',
          to: email.trim(),
          subject: `Tu guía: ${resourceTitle}`,
          html: `<p>Hola,</p><p>Aquí tienes el enlace a la guía que has pedido:</p><p><a href="${resourceUrl}">${escapeHtml(resourceTitle)}</a></p><p>Guárdala en marcadores o compártela con tu equipo cuando la necesites.</p><p>Un saludo,<br>El equipo de MOMENTUNDIGITAL</p>`,
        }),
      ])
      if (internal.error) throw new Error(internal.error.message)
      if (visitor.error) throw new Error(visitor.error.message)
    } catch (error) {
      console.error('Lead magnet email failed:', error)
      return NextResponse.json({ error: 'No se pudo enviar la guía.' }, { status: 502 })
    }

    if (process.env.LEADS_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEADS_WEBHOOK_URL, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ created_at: new Date().toISOString(), status: 'descarga-recurso', name: '(descarga de recurso)', email: email.trim(), phone: '', projectType: '', message: `Descargó: ${resourceTitle} (${resourceSlug})`, attribution: attribution || {} }),
          signal: AbortSignal.timeout(5000),
        })
      } catch (webhookError) { console.error('Lead magnet CRM webhook failed:', webhookError) }
    }
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Error del servidor' }, { status: 500 }) }
}
