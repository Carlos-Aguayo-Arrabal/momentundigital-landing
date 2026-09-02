import { NextRequest, NextResponse } from 'next/server'

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
    const { name, email, phone, message, website, consent, attribution } = body
    if (website) return NextResponse.json({ success: true })
    if (consent !== true) return NextResponse.json({ error: 'Debes aceptar la política de privacidad.' }, { status: 400 })
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 120) return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 })
    if (!email || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) return NextResponse.json({ error: 'Mensaje inválido' }, { status: 400 })

    if (!process.env.RESEND_API_KEY) {
      console.error('Contact email unavailable: RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'El envío no está disponible temporalmente. Escríbenos a contacto@momentundigital.com.' }, { status: 503 })
    }

    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM || 'MOMENTUNDIGITAL <web@send.momentundigital.com>',
        to: process.env.CONTACT_EMAIL || 'contacto@momentundigital.com',
        replyTo: email.trim(),
        subject: `Nueva solicitud de proyecto de ${name.trim()}`,
        html: `<h2>Nueva solicitud de diagnóstico</h2><p><strong>Nombre:</strong> ${escapeHtml(name.trim())}</p><p><strong>Email:</strong> ${escapeHtml(email.trim())}</p><p><strong>Teléfono:</strong> ${escapeHtml(phone?.trim() || 'No proporcionado')}</p><p><strong>Detalles:</strong></p><p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p><h3>Origen del contacto</h3><p><strong>Fuente:</strong> ${escapeHtml(typeof attribution?.source === 'string' ? attribution.source.slice(0, 180) : 'No disponible')}<br><strong>Medio:</strong> ${escapeHtml(typeof attribution?.medium === 'string' ? attribution.medium.slice(0, 180) : 'No disponible')}<br><strong>Campaña:</strong> ${escapeHtml(typeof attribution?.campaign === 'string' ? attribution.campaign.slice(0, 180) : 'No disponible')}<br><strong>Página de entrada:</strong> ${escapeHtml(typeof attribution?.landingPath === 'string' ? attribution.landingPath.slice(0, 500) : 'No disponible')}<br><strong>Referencia:</strong> ${escapeHtml(typeof attribution?.referrer === 'string' ? attribution.referrer.slice(0, 300) : 'No disponible')}</p><hr><p style="color:#666;font-size:12px">Consentimiento de privacidad aceptado desde el formulario de MOMENTUNDIGITAL.</p>`,
      })
      if (error) throw new Error(error.message)
    } catch (error) {
      console.error('Contact email failed:', error)
      return NextResponse.json({ error: 'No se pudo enviar la solicitud. Escríbenos a contacto@momentundigital.com.' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Error del servidor' }, { status: 500 }) }
}
