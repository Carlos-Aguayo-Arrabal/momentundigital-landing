import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Desarrollo SaaS a medida para empresas', description: 'Diseño y desarrollo de productos SaaS, plataformas B2B y aplicaciones por suscripción adaptadas a tu modelo de negocio.', alternates: { canonical: '/desarrollo-saas' } }
export default function Page() { return <ServiceLanding content={serviceContent['desarrollo-saas']} /> }
