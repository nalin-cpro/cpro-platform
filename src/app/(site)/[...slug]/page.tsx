import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { buildMetadata, buildLocalBusinessSchema, buildServiceSchema } from '@/lib/seo'
import { Metadata } from 'next'

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

export default async function DynamicPage({ params }: Props) {
  const slug = params.slug.join('/')
  const page = await prisma.page.findUnique({ where: { slug }, include: { location: true, service: true } })
  if (!page || page.status !== 'published') notFound()

  const body = page.bodyJson as Record<string, any> | null

  let schema = null
  if (page.pageType === 'location' && page.location && page.service) {
    schema = buildLocalBusinessSchema(page.location.city, page.location.state, page.service.name)
  } else if (page.pageType === 'service' && page.service) {
    schema = buildServiceSchema(page.service.name, page.metaDesc || '')
  }

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-ink-900 mb-4">{page.h1 || page.title}</h1>
          {body?.hero_subtitle && <p className="text-xl text-ink-600">{body.hero_subtitle}</p>}
        </section>
        {body?.sections?.map((s: { heading: string; body: string }, i: number) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-semibold text-ink-800 mb-3">{s.heading}</h2>
            <p className="text-ink-600 leading-relaxed">{s.body}</p>
          </section>
        ))}
        {body?.faq?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-ink-800 mb-6">Frequently asked questions</h2>
            {body.faq.map((item: { q: string; a: string }, i: number) => (
              <div key={i} className="mb-6 border-b border-ink-200 pb-6">
                <h3 className="text-lg font-medium text-ink-800 mb-2">{item.q}</h3>
                <p className="text-ink-600">{item.a}</p>
              </div>
            ))}
          </section>
        )}
        {body?.cta_text && (
          <section className="bg-brand-50 rounded-xl p-8 text-center">
            <p className="text-xl font-medium text-brand-700 mb-4">{body.cta_text}</p>
            <a href="/contact" className="inline-block bg-brand-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-600 transition">Get in touch</a>
          </section>
        )}
      </main>
    </>
  )
}
