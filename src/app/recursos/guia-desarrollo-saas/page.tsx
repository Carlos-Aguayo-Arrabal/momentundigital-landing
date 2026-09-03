import type { Metadata } from 'next'
import { ResourceArticle } from '@/components/marketing/ResourceArticle'
import { resourceContent } from '@/config/resourceContent'
export const metadata: Metadata = { title: 'Cómo plantear un SaaS a medida: guía práctica', description: 'Cómo definir usuarios, alcance, costes y riesgos antes de contratar el desarrollo de un producto SaaS.', alternates: { canonical: '/recursos/guia-desarrollo-saas' }, openGraph: { title: 'Cómo plantear un SaaS a medida', description: 'Usuarios, alcance, costes y riesgos antes de contratar el desarrollo.', url: '/recursos/guia-desarrollo-saas', type: 'article', images: ['/images/resource-product-architecture.png'] } }
export default function Page(){ return <ResourceArticle content={resourceContent['guia-desarrollo-saas']} /> }
