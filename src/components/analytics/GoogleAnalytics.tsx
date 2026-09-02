'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const storageKey = 'momentundigital-analytics-consent'

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID
  const [consent, setConsent] = useState<'accepted' | 'rejected' | null>(null)

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (saved === 'accepted' || saved === 'rejected') setConsent(saved)
  }, [])

  useEffect(() => {
    if (!measurementId || consent !== 'accepted') return
    const trackClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a')
      if (!link || !window.gtag) return
      const href = link.getAttribute('href') || ''
      const label = link.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || href
      if (href.startsWith('mailto:')) window.gtag('event', 'contact_click', { method: 'email', link_text: label })
      else if (href.includes('#diagnostico')) window.gtag('event', 'cta_click', { cta: 'diagnostico', link_text: label })
      else if (href.startsWith('/recursos')) window.gtag('event', 'resource_click', { link_url: href, link_text: label })
      else if (/^\/(desarrollo|automatizacion|software)/.test(href)) window.gtag('event', 'service_click', { link_url: href, link_text: label })
    }
    document.addEventListener('click', trackClick)
    return () => document.removeEventListener('click', trackClick)
  }, [consent, measurementId])

  if (!measurementId) return null

  const decide = (choice: 'accepted' | 'rejected') => {
    window.localStorage.setItem(storageKey, choice)
    setConsent(choice)
  }

  return <>
    {consent === 'accepted' && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="momentundigital-ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}</Script>
    </>}
    {consent === null && <aside className="analytics-consent" aria-label="Preferencias de analítica"><div><small>Privacidad / Analítica</small><p>Nos gustaría medir qué contenidos resultan útiles. Google Analytics solo se cargará si aceptas.</p><Link href="/cookies">Ver política de cookies</Link></div><div><button onClick={() => decide('rejected')}>Rechazar</button><button onClick={() => decide('accepted')}>Aceptar analítica</button></div></aside>}
  </>
}
