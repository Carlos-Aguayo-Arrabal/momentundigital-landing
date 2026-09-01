import type { Metadata } from 'next'
import { ServiceLanding } from '@/components/marketing/ServiceLanding'
import { serviceContent } from '@/config/serviceContent'

export const metadata: Metadata = { title: 'Desarrollo de MVP para validar productos digitales', description: 'Diseñamos y desarrollamos MVP funcionales para validar una idea, conseguir usuarios y decidir la siguiente inversión.', alternates: { canonical: '/desarrollo-mvp' } }
export default function Page() { return <ServiceLanding content={serviceContent['desarrollo-mvp']} /> }
