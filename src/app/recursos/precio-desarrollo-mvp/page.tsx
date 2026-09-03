import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'

export const metadata: Metadata = {
  title: 'Precio de desarrollar un MVP: alcance y presupuesto',
  description: 'Cómo estimar el precio de un MVP según el objetivo, las funciones, las integraciones y el nivel de validación que necesitas.',
  alternates: { canonical: '/recursos/precio-desarrollo-mvp' },
  openGraph: { title: 'Precio de desarrollar un MVP', description: 'Qué determina la inversión de una primera versión funcional.', url: '/recursos/precio-desarrollo-mvp', type: 'article', images: ['/images/resource-mvp-path.png'] },
}

export default function Page() { return <ResourceArticle content={resourceContent['precio-desarrollo-mvp']} /> }
