import Link from 'next/link'

export function CaseStudyTemplate({ cs }: {
  cs: {
    clientName: string
    clientAlias?: string | null
    industry: string
    platform: string
    city?: string | null
    primaryMetric: string
    primaryDelta: string
    secondaryMetric?: string | null
    secondaryDelta?: string | null
    thirdMetric?: string | null
    thirdDelta?: string | null
    timeToResult?: string | null
    challenge?: string | null
    approach?: string | null
    keyInsight?: string | null
    clientQuote?: string | null
    clientQuoteAuthor?: string | null
    title?: string | null
  }
}) {
  let approachSteps: string[] = []
  if (cs.approach) {
    try {
      const parsed = JSON.parse(cs.approach)
      if (Array.isArray(parsed)) approachSteps = parsed
      else approachSteps = [cs.approach]
    } catch {
      approachSteps = [cs.approach]
    }
  }

  const metrics = [
    { metric: cs.primaryMetric, delta: cs.primaryDelta, primary: true },
    cs.secondaryMetric && cs.secondaryDelta ? { metric: cs.secondaryMetric, delta: cs.secondaryDelta, primary: false } : null,
    cs.thirdMetric && cs.thirdDelta ? { metric: cs.thirdMetric, delta: cs.thirdDelta, primary: false } : null,
    cs.timeToResult ? { metric: 'Time to result', delta: cs.timeToResult, primary: false } : null,
  ].filter(Boolean) as { metric: string; delta: string; primary: boolean }[]

  return (
    <>
      {/* HERO */}
      <section className="page-title-hero">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep" />
            <Link href="/case-studies">Case studies</Link>
            <span className="breadcrumb-sep" />
            <span>{cs.clientAlias || cs.clientName}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="chip">{cs.industry}</span>
            <span className="chip">{cs.platform}</span>
            {cs.city && <span className="chip">{cs.city}</span>}
          </div>
          <h1 style={{ marginTop: 8 }}>{cs.title || cs.clientAlias || cs.clientName}</h1>
          <p style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginTop: 24 }}>
            <span className="text-gradient">{cs.primaryDelta}</span>
            <span style={{ display: 'block', fontSize: 16, color: 'var(--color-body)', fontWeight: 400, marginTop: 8 }}>
              {cs.primaryMetric}
            </span>
          </p>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section style={{ padding: '60px 0' }}>
        <div className="container-site">
          <div className="grid-4">
            {metrics.map((m, i) => (
              <div key={i} className="metric-card" style={m.primary ? { background: 'var(--gradient-brand)', color: '#fff' } : {}}>
                <p className="metric-delta" style={m.primary ? { color: '#fff' } : {}}>{m.delta}</p>
                <p className="metric-label" style={m.primary ? { color: 'rgba(255,255,255,0.85)' } : {}}>{m.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      {cs.challenge && (
        <section style={{ padding: '60px 0 100px' }}>
          <div className="container-site" style={{ maxWidth: 900 }}>
            <div className="bento-card-dark" style={{ padding: '60px 50px' }}>
              <span className="section-label" style={{ color: '#FF6B4A' }}>THE CHALLENGE</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginTop: 12, marginBottom: 24 }}>
                The problem we set out to solve
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)' }}>{cs.challenge}</p>
            </div>
          </div>
        </section>
      )}

      {/* APPROACH — TIMELINE */}
      {approachSteps.length > 0 && (
        <section className="section-surface">
          <div className="container-site" style={{ maxWidth: 900 }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="section-label">OUR APPROACH</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700 }}>How we delivered the results</h2>
            </div>
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{
                position: 'absolute',
                left: 16,
                top: 12,
                bottom: 12,
                width: 2,
                background: 'var(--color-border)',
              }} />
              {approachSteps.map((step, i) => (
                <div key={i} style={{ position: 'relative', paddingLeft: 32, paddingBottom: 36 }}>
                  <div style={{
                    position: 'absolute',
                    left: -16,
                    top: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--gradient-brand)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-header)', paddingTop: 4 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KEY INSIGHT */}
      {cs.keyInsight && (
        <section style={{ padding: '100px 0' }}>
          <div className="container-site" style={{ maxWidth: 900 }}>
            <div style={{
              borderLeft: '4px solid var(--color-accent)',
              paddingLeft: 40,
              paddingTop: 16,
              paddingBottom: 16,
            }}>
              <span className="section-label">KEY INSIGHT</span>
              <p style={{
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 600,
                color: 'var(--color-header)',
                lineHeight: 1.4,
                marginTop: 8,
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}>
                {cs.keyInsight}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CLIENT QUOTE */}
      {cs.clientQuote && (
        <section className="section-surface">
          <div className="container-site" style={{ maxWidth: 900, textAlign: 'center' }}>
            <div className="text-gradient" style={{ fontSize: 80, lineHeight: 1, marginBottom: 16 }}>“</div>
            <blockquote style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              lineHeight: 1.5,
              color: 'var(--color-header)',
              fontWeight: 500,
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              margin: 0,
            }}>
              {cs.clientQuote}
            </blockquote>
            {cs.clientQuoteAuthor && (
              <p style={{ marginTop: 24, fontSize: 14, color: 'var(--color-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                — {cs.clientQuoteAuthor}
              </p>
            )}
          </div>
        </section>
      )}

      {/* RELATED CASE STUDIES */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">MORE WORK</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700 }}>Related case studies</h2>
          </div>
          <div className="grid-2">
            {[
              { title: 'B2B SaaS conversion lift', metric: '+47%' },
              { title: 'Marketplace breakthrough', metric: '3x revenue' },
            ].map((c, i) => (
              <Link key={i} href="/case-studies" style={{ textDecoration: 'none' }}>
                <div className="bento-card" style={{ background: 'var(--color-surface)' }}>
                  <div style={{
                    aspectRatio: '16/9',
                    background: i === 0 ? 'var(--color-header)' : 'var(--gradient-brand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 36,
                    fontWeight: 700,
                  }}>
                    {c.metric}
                  </div>
                  <div style={{ padding: 28 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600 }}>{c.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container-site">
          <div style={{
            background: 'var(--gradient-brand)',
            borderRadius: 30,
            padding: '80px 40px',
            textAlign: 'center',
            color: '#fff',
          }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Get similar results for your business
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
              Book a free strategy call. We&apos;ll review your funnel and show you exactly how we&apos;d unlock your next growth phase.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 100,
              background: '#fff',
              color: 'var(--color-header)',
              fontWeight: 500,
              fontSize: 15,
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}>
              Book a strategy call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
