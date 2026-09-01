import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Automatización de procesos con IA', description: 'Automatizamos tareas, documentos y flujos empresariales con inteligencia artificial, integraciones y control humano.', alternates: { canonical: '/automatizacion-ia' } }
export default function Page() { return <ServiceLanding content={serviceContent['automatizacion-ia']} /> }
