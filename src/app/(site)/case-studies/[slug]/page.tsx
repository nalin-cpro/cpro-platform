import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { buildMetadata } from '@/lib/seo'
import { CaseStudyTemplate } from '@/components/templates/CaseStudyTemplate'
import { Metadata } from 'next'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await prisma.caseStudy.findUnique({ where: { slug: params.slug } })
  if (!cs) return {}
  return buildMetadata({ title: cs.title || cs.clientName, description: cs.metaDesc || '', slug: `case-studies/${cs.slug}` })
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = await prisma.caseStudy.findUnique({ where: { slug: params.slug } })
  if (!cs || cs.status !== 'published') notFound()

  if (cs.useLayout && cs.layoutHtml) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: cs.layoutCss || '' }} />
        <div dangerouslySetInnerHTML={{ __html: cs.layoutHtml }} />
      </>
    )
  }
  return <CaseStudyTemplate cs={cs} />
}
