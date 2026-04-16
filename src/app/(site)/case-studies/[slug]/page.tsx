import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { buildMetadata } from '@/lib/seo'
import { resolveLayout } from '@/lib/layout-resolver'
import { CaseStudyTemplate } from '@/components/templates/CaseStudyTemplate'
import { Metadata } from 'next'

export const revalidate = 0

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await prisma.caseStudy.findUnique({ where: { slug: params.slug } })
  if (!cs) return {}
  return buildMetadata({ title: cs.title || cs.clientName, description: cs.metaDesc || '', slug: `case-studies/${cs.slug}` })
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = await prisma.caseStudy.findUnique({ where: { slug: params.slug } })
  if (!cs || cs.status !== 'published') notFound()

  // CaseStudy has no templateId — only the per-record override can replace the React template.
  const layout = await resolveLayout({
    useLayout: cs.useLayout,
    layoutHtml: cs.layoutHtml,
    layoutCss: cs.layoutCss,
  })

  if (layout) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: layout.css }} />
        <div dangerouslySetInnerHTML={{ __html: layout.html }} />
      </>
    )
  }
  return <CaseStudyTemplate cs={cs} />
}
