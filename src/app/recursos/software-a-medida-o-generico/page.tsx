import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'

export const metadata: Metadata = {
  title: 'Software a medida o SaaS genérico: cómo elegir',
  description: 'Un criterio para distinguir cuándo un proceso interno se resuelve con una herramienta genérica y cuándo necesita software propio.',
  alternates: { canonical: '/recursos/software-a-medida-o-generico' },
  openGraph: { title: 'Software a medida o SaaS genérico', description: 'Cuándo un proceso interno necesita una herramienta propia y cuándo no.', url: '/recursos/software-a-medida-o-generico', type: 'article', images: ['/images/resource-software-operations.png'] },
}

export default function Page() { return <ResourceArticle content={resourceContent['software-a-medida-o-generico']} /> }
