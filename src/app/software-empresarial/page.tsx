import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Software empresarial y herramientas internas a medida', description: 'Aplicaciones web para centralizar operaciones, clientes, documentos, informes y procesos internos de empresa.', alternates: { canonical: '/software-empresarial' } }
export default function Page() { return <ServiceLanding content={serviceContent['software-empresarial']} /> }
