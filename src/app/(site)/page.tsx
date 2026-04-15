import { prisma } from '@/lib/db'
import { resolveLayout } from '@/lib/layout-resolver'
import { buildMetadata } from '@/lib/seo'
import { HomeTemplate } from '@/components/templates/HomeTemplate'
import { Metadata } from 'next'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: '/' } })
  if (!page) return {}
  return buildMetadata({
    title: page.title,
    description: page.metaDesc || '',
    slug: '',
    ogTitle: page.ogTitle || page.title,
    ogDesc: page.ogDesc || page.metaDesc || '',
  })
}

export default async function HomePage() {
  const page = await prisma.page.findUnique({ where: { slug: '/' } })

  // If a DB record exists, use the same resolver logic as [...slug]/page.tsx
  if (page && page.status === 'published') {
    const layout = await resolveLayout(
      { useLayout: page.useLayout, layoutHtml: page.layoutHtml, layoutCss: page.layoutCss },
      page.templateId,
    )

    if (layout) {
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: layout.css }} />
          <div dangerouslySetInnerHTML={{ __html: layout.html }} />
        </>
      )
    }

    // DB record exists but no layout override — render HomeTemplate with DB data
    return <HomeTemplate page={page} />
  }

  // No DB record at all — render HomeTemplate with hardcoded defaults
  return (
    <HomeTemplate
      page={{
        title: 'ConversionPro LLP — UX-led conversion that drives revenue',
        bodyJson: null,
      }}
    />
  )
}
