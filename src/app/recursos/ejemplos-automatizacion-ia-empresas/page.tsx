import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'

export const metadata: Metadata = {
  title: 'Automatización con IA para empresas: ejemplos rentables',
  description: 'Ejemplos de automatización con IA para empresas y criterios para priorizar procesos según ahorro, riesgo, datos y supervisión.',
  alternates: { canonical: '/recursos/ejemplos-automatizacion-ia-empresas' },
  openGraph: { title: 'Automatización con IA para empresas: ejemplos', description: 'Casos prácticos y criterios para elegir una automatización rentable.', url: '/recursos/ejemplos-automatizacion-ia-empresas', type: 'article', images: ['/images/resource-ai-automation.png'] },
}

export default function Page() { return <ResourceArticle content={resourceContent['ejemplos-automatizacion-ia-empresas']} /> }
