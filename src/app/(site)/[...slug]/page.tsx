import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { buildMetadata, buildLocalBusinessSchema, buildServiceSchema } from '@/lib/seo'
import { Metadata } from 'next'
import { ServiceTemplate } from '@/components/templates/ServiceTemplate'
import { LocationTemplate } from '@/components/templates/LocationTemplate'
import { HomeTemplate } from '@/components/templates/HomeTemplate'
import { ContactTemplate } from '@/components/templates/ContactTemplate'

export const revalidate = 86400

interface Props { params: { slug: string[] } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug.join('/')
  const page = await prisma.page.findUnique({ where: { slug } })
  if (!page) return {}
  return buildMetadata({ title: page.title, description: page.metaDesc || '', slug, ogTitle: page.ogTitle || page.title, ogDesc: page.ogDesc || page.metaDesc || '' })
}

export async function generateStaticParams() {
  const pages = await prisma.page.findMany({ where: { status: 'published' }, select: { slug: true } })
  return pages.map(p => ({ slug: p.slug.split('/') }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TEMPLATES: Record<string, React.ComponentType<{ page: any }>> = {
  service:  ServiceTemplate,
  location: LocationTemplate,
  home:     HomeTemplate,
  contact:  ContactTemplate,
}

export default async function DynamicPage({ params }: Props) {
  const slug = params.slug.join('/')
  const page = await prisma.page.findUnique({ where: { slug }, include: { location: true, service: true } })
  if (!page || page.status !== 'published') notFound()

  // Build SEO schema
  let schema: object | null = null
  if (page.pageType === 'location' && page.location && page.service) {
    schema = buildLocalBusinessSchema(page.location.city, page.location.state, page.service.name)
  } else if (page.pageType === 'service' && page.service) {
    schema = buildServiceSchema(page.service.name, page.metaDesc || '')
  }

  // GrapesJS layout takes precedence when active
  if (page.useLayout && page.layoutHtml) {
    return (
      <>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
        <style dangerouslySetInnerHTML={{ __html: page.layoutCss || '' }} />
        <div dangerouslySetInnerHTML={{ __html: page.layoutHtml }} />
      </>
    )
  }

  // Otherwise pick template by pageType
  const Template = TEMPLATES[page.pageType] || TEMPLATES.service
  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <Template page={page} />
    </>
  )
}
