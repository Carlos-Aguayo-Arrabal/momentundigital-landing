import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'
export const metadata: Metadata = { title: 'Low-code o desarrollo a medida: cómo elegir', description: 'Ventajas y límites del low-code frente al desarrollo a medida según velocidad, propiedad, riesgo y evolución.', alternates: { canonical: '/recursos/low-code-vs-desarrollo-medida' }, openGraph: { title: 'Low-code o desarrollo a medida', description: 'Una comparativa práctica para decidir la arquitectura de tu proyecto.', url: '/recursos/low-code-vs-desarrollo-medida', type: 'article' } }
export default function Page() { return <ResourceArticle content={resourceContent['low-code-vs-desarrollo-medida']} /> }
