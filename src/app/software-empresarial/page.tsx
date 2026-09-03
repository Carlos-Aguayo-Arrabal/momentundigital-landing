import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Desarrollo de software a medida para empresas', description: 'Creamos software empresarial, aplicaciones web y herramientas internas a medida para centralizar operaciones, datos e integraciones.', alternates: { canonical: '/software-empresarial' }, openGraph: { title: 'Desarrollo de software a medida para empresas', description: 'Aplicaciones web y herramientas internas adaptadas a la operación real de tu empresa.', url: '/software-empresarial', type: 'website', images: ['/images/momentun-hero-system.png'] } }
export default function Page() { return <ServiceLanding content={serviceContent['software-empresarial']} /> }
