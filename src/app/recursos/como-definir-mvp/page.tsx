import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'
export const metadata: Metadata = { title: 'Cómo definir el alcance de un MVP útil', description: 'Método para decidir qué incluir en un MVP, qué dejar fuera y cómo medir el resultado del primer lanzamiento.', alternates: { canonical: '/recursos/como-definir-mvp' }, openGraph: { title: 'Cómo definir el alcance de un MVP', description: 'Qué incluir, qué dejar fuera y cómo medir el primer lanzamiento.', url: '/recursos/como-definir-mvp', type: 'article', images: ['/images/resource-mvp-scope.png'] } }
export default function Page(){ return <ResourceArticle content={resourceContent['como-definir-mvp']} /> }
