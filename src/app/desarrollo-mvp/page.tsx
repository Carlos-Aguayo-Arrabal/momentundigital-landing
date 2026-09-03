import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Empresa de desarrollo de MVP en España', description: 'Diseñamos y desarrollamos MVP funcionales para validar una idea, conseguir usuarios y decidir la siguiente inversión.', alternates: { canonical: '/desarrollo-mvp' }, openGraph: { title: 'Desarrollo de MVP para startups y empresas', description: 'Del alcance a una primera versión funcional preparada para usuarios reales.', url: '/desarrollo-mvp', type: 'website', images: ['/images/momentun-hero-system.png'] } }
export default function Page() { return <ServiceLanding content={serviceContent['desarrollo-mvp']} /> }
