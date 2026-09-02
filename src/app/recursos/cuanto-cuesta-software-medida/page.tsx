import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'

export const metadata: Metadata = {
  title: 'Cuánto cuesta un software de gestión a medida',
  description: 'Qué determina el presupuesto de una herramienta interna a medida y qué partidas debe incluir una propuesta seria.',
  alternates: { canonical: '/recursos/cuanto-cuesta-software-medida' },
  openGraph: { title: 'Cuánto cuesta un software de gestión a medida', description: 'Qué partidas debe incluir una propuesta seria de software interno.', url: '/recursos/cuanto-cuesta-software-medida', type: 'article', images: ['/images/resource-saas-planning.png'] },
}

export default function Page() { return <ResourceArticle content={resourceContent['cuanto-cuesta-software-medida']} /> }
