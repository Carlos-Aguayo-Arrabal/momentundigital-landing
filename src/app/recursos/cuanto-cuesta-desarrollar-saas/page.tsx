import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'

export const metadata: Metadata = {
  title: 'Cuánto cuesta desarrollar un SaaS: guía de presupuesto',
  description: 'Conoce qué determina el coste de desarrollar un SaaS, las partidas del presupuesto y los gastos que debes prever después del lanzamiento.',
  alternates: { canonical: '/recursos/cuanto-cuesta-desarrollar-saas' },
  openGraph: { title: 'Cuánto cuesta desarrollar un SaaS', description: 'Partidas, alcance y costes ocultos que debes revisar antes de contratar.', url: '/recursos/cuanto-cuesta-desarrollar-saas', type: 'article', images: ['/images/resource-saas-cost.png'] },
}

export default function Page() { return <ResourceArticle content={resourceContent['cuanto-cuesta-desarrollar-saas']} /> }
