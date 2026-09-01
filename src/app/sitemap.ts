import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://momentundigital.com'
  const pages = ['', '/desarrollo-saas', '/automatizacion-ia', '/desarrollo-mvp', '/software-empresarial', '/recursos', '/recursos/guia-desarrollo-saas', '/recursos/automatizacion-ia-empresa', '/recursos/como-definir-mvp']
  return pages.map((path, index) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: 'monthly', priority: index === 0 ? 1 : 0.8 }))
}
