import Link from 'next/link'
import { prisma } from '@/lib/db'

export const revalidate = 3600

export default async function CaseStudiesIndex() {
  const studies = await prisma.caseStudy.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    select: { slug: true, clientAlias: true, clientName: true, industry: true, primaryMetric: true, primaryDelta: true, title: true },
  })

  return (
    <>
      <section className="page-title-hero">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <span className="section-label">PROOF</span>
          <h1>Case Studies</h1>
          <p style={{ fontSize: 18, color: 'var(--color-body)', marginTop: 16 }}>
            Real results from real engagements — see how we help brands grow.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container-site">
          {studies.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-body)', fontSize: 17 }}>
              Case studies coming soon.
            </p>
          ) : (
            <div className="grid-2">
              {studies.map((cs, i) => (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="bento-card" style={{ background: 'var(--color-surface)' }}>
                    <div style={{
                      aspectRatio: '16/9',
                      background: i % 2 === 0 ? 'var(--gradient-brand)' : 'var(--color-header)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      padding: 32,
                      textAlign: 'center',
                    }}>
                      <p style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{cs.primaryDelta}</p>
                      <p style={{ fontSize: 14, marginTop: 8, opacity: 0.85 }}>{cs.primaryMetric}</p>
                    </div>
                    <div style={{ padding: 28 }}>
                      <span className="chip" style={{ marginBottom: 12 }}>{cs.industry}</span>
                      <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>{cs.title || cs.clientAlias || cs.clientName}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
