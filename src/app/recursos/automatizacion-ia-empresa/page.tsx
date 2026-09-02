import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'
export const metadata: Metadata = { title: 'Qué procesos automatizar con IA en una empresa', description: 'Criterios para elegir procesos empresariales que merece la pena automatizar con inteligencia artificial y control humano.', alternates: { canonical: '/recursos/automatizacion-ia-empresa' }, openGraph: { title: 'Qué procesos automatizar con IA', description: 'Criterios para elegir qué automatizar con IA y control humano.', url: '/recursos/automatizacion-ia-empresa', type: 'article', images: ['/images/resource-ai-automation.png'] } }
export default function Page(){ return <ResourceArticle content={resourceContent['automatizacion-ia-empresa']} /> }
