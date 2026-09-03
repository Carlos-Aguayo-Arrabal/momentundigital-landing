import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'
export const metadata: Metadata = { title: 'SaaS a medida o software genérico: comparativa', description: 'Compara adaptación, coste total, dependencia y evolución antes de elegir software genérico o un producto propio.', alternates: { canonical: '/recursos/saas-vs-software-generico' }, openGraph: { title: 'SaaS a medida o software genérico', description: 'Criterios para elegir la opción que encaja con tu operación.', url: '/recursos/saas-vs-software-generico', type: 'article', images: ['/images/resource-saas-planning.png'] } }
export default function Page() { return <ResourceArticle content={resourceContent['saas-vs-software-generico']} /> }
