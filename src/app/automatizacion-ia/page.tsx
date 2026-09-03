import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Automatización con IA para empresas', description: 'Automatizamos tareas, documentos y flujos empresariales con inteligencia artificial, integraciones y control humano.', alternates: { canonical: '/automatizacion-ia' }, openGraph: { title: 'Automatización de procesos con IA para empresas', description: 'Detectamos e implantamos automatizaciones medibles, integradas y con supervisión humana.', url: '/automatizacion-ia', type: 'website', images: ['/images/momentun-hero-system.png'] } }
export default function Page() { return <ServiceLanding content={serviceContent['automatizacion-ia']} /> }
