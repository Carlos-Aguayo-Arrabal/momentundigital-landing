import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'
export const metadata: Metadata = { title: 'Automatizar o construir un MVP: cómo decidir', description: 'Distingue una mejora operativa de una oportunidad de producto y elige el primer proyecto con mayor aprendizaje.', alternates: { canonical: '/recursos/automatizar-o-construir-mvp' }, openGraph: { title: 'Automatizar o construir un MVP', description: 'Criterios para elegir el primer proyecto digital.', url: '/recursos/automatizar-o-construir-mvp', type: 'article', images: ['/images/resource-mvp-scope.png'] } }
export default function Page() { return <ResourceArticle content={resourceContent['automatizar-o-construir-mvp']} /> }
