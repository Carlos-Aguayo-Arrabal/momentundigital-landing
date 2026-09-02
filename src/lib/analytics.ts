declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, parameters?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', name, parameters)
}
