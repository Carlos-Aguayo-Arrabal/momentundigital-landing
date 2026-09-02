'use client'

export type LeadAttribution = {
  source: string
  medium: string
  campaign: string
  content: string
  term: string
  landingPath: string
  referrer: string
}

const storageKey = 'momentundigital-first-touch'
const clean = (value: string | null, limit = 180) => (value || '').trim().slice(0, limit)

function currentAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search)
  const referrer = clean(document.referrer, 300)
  let source = clean(params.get('utm_source'))
  let medium = clean(params.get('utm_medium'))

  if (!source && referrer) {
    try {
      const hostname = new URL(referrer).hostname.replace(/^www\./, '')
      if (hostname !== window.location.hostname.replace(/^www\./, '')) {
        source = hostname
        medium = 'referral'
      }
    } catch { /* Ignore malformed browser referrers. */ }
  }

  return {
    source: source || 'direct',
    medium: medium || '(none)',
    campaign: clean(params.get('utm_campaign')) || '(not set)',
    content: clean(params.get('utm_content')) || '(not set)',
    term: clean(params.get('utm_term')) || '(not set)',
    landingPath: clean(`${window.location.pathname}${window.location.search}`, 500),
    referrer: referrer || '(direct)',
  }
}

export function captureFirstTouch() {
  if (typeof window === 'undefined' || sessionStorage.getItem(storageKey)) return
  sessionStorage.setItem(storageKey, JSON.stringify(currentAttribution()))
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === 'undefined') return { source: 'unknown', medium: 'unknown', campaign: '(not set)', content: '(not set)', term: '(not set)', landingPath: '/', referrer: '(unknown)' }
  try {
    const stored = sessionStorage.getItem(storageKey)
    if (stored) return JSON.parse(stored) as LeadAttribution
  } catch { /* Fall back to the current page. */ }
  return currentAttribution()
}
