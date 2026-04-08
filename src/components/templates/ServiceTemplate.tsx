import Link from 'next/link'
import type { CSSProperties } from 'react'

interface ServiceBody {
  hero_subtitle?: string
  intro_text?: string
  bullets?: string[]
  features?: { title: string; desc: string }[]
  sections?: { heading: string; body: string }[]
  stats?: { value: string; label: string }[]
  faq?: { q: string; a: string }[]
  cta_text?: string
}

const placeholderImg: CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 30,
  aspectRatio: '4/3',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 60,
  color: 'var(--color-border)',
}

const defaultFeatures = [
  { title: 'Research-led approach', desc: 'Heatmaps, recordings and analytics inform every recommendation.' },
  { title: 'Test-driven decisions', desc: 'A/B testing every change to prove uplift before scaling.' },
  { title: 'Long-term partnership', desc: 'Ongoing iteration after the first wins — we don\u2019t disappear.' },
]

const defaultBullets = [
  'Conversion audit and funnel analysis',
  'Heatmap and session recording setup',
  'A/B test design and execution',
  'Personalisation strategy',
  'Reporting and quarterly reviews',
]

export function ServiceTemplate({ page }: { page: { title: string; h1?: string | null; bodyJson: ServiceBody | null; service?: { name: string } | null } }) {
  const body = page.bodyJson || {}
  const features = body.features && body.features.length ? body.features : defaultFeatures
  const bullets = body.bullets && body.bullets.length ? body.bullets : defaultBullets
  const sections = body.sections || []
  const faqs = body.faq || []

  return (
    <>
      {/* PAGE TITLE HERO */}
      <section className="page-title-hero">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep" />
            <Link href="/services">Services</Link>
            <span className="breadcrumb-sep" />
            <span>{page.service?.name || page.title}</span>
          </div>
          <h1 style={{ marginTop: 16 }}>{page.h1 || page.title}</h1>
          {body.hero_subtitle && (
            <p style={{ fontSize: 18, color: 'var(--color-body)', maxWidth: 720, margin: '20px auto 0' }}>{body.hero_subtitle}</p>
          )}
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <span className="section-label">WHAT WE OFFER</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 20 }}>
                Outcomes-first <span className="text-gradient">{page.service?.name || 'service'}</span>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-body)', marginBottom: 28 }}>
                {body.intro_text || 'We focus on the metrics that move your business — conversion rate, AOV, retention. Every recommendation is backed by data and tested against your real users.'}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--color-header)' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary">Get a free audit →</Link>
            </div>
            <div style={placeholderImg}>📊</div>
          </div>
        </div>
      </section>

      {/* DARK FEATURE STRIP */}
      <section className="section-dark">
        <div className="container-site">
          <div className="grid-3">
            {features.slice(0, 3).map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 30,
                  padding: 36,
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 20,
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>{f.desc}</p>
                <Link href="#" style={{ fontSize: 14, color: '#FF6B4A', fontWeight: 500, textDecoration: 'none' }}>
                  Discover more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALTERNATING CONTENT SECTIONS */}
      {sections.map((s, i) => (
        <section key={i} style={{ padding: '100px 0', background: i % 2 === 0 ? '#fff' : 'var(--color-surface)' }}>
          <div className="container-site">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 60, alignItems: 'center', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}>
              <div style={{ direction: 'ltr' }}>
                <span className="section-label">{i === 0 ? 'OUR PROCESS' : 'OUR APPROACH'}</span>
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 700, marginBottom: 20 }}>{s.heading}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-body)' }}>{s.body}</p>
              </div>
              <div style={{ ...placeholderImg, direction: 'ltr' }}>{i % 2 === 0 ? '🎯' : '⚡'}</div>
            </div>
          </div>
        </section>
      ))}

      {/* STATS BAR */}
      {body.stats && body.stats.length > 0 && (
        <section className="section-dark">
          <div className="container-site">
            <div className="grid-3" style={{ textAlign: 'center', gap: 40 }}>
              {body.stats.map((s, i) => (
                <div key={i}>
                  <p style={{ fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-inter), Inter, sans-serif', letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDY PREVIEWS */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">PROOF</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700 }}>Recent client wins</h2>
          </div>
          <div className="grid-2">
            {[
              { title: 'D2C Footwear Brand', metric: '40% RTO reduction', desc: 'Custom checkout flow + COD validation cut RTO from 40% to 24% in 90 days.' },
              { title: 'B2B SaaS Co.', metric: '+47% conversion', desc: 'Funnel rebuild and onboarding optimisation lifted trial-to-paid by nearly half.' },
            ].map((c, i) => (
              <Link key={i} href="/case-studies" style={{ textDecoration: 'none' }}>
                <div className="bento-card" style={{ background: 'var(--color-surface)', padding: 0 }}>
                  <div style={{
                    aspectRatio: '16/9',
                    background: i === 0 ? 'var(--gradient-brand)' : 'var(--color-header)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: 700,
                  }}>
                    {c.metric}
                  </div>
                  <div style={{ padding: 28 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{c.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--color-body)', lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="section-surface">
          <div className="container-site" style={{ maxWidth: 800 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700 }}>Frequently asked questions</h2>
            </div>
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">
                  {f.q}
                  <span style={{ color: 'var(--color-accent)', fontSize: 24, fontWeight: 300 }}>+</span>
                </summary>
                <p className="faq-answer">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{
            background: 'var(--gradient-brand)',
            borderRadius: 30,
            padding: '80px 40px',
            textAlign: 'center',
            color: '#fff',
          }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              {body.cta_text || `Ready to scale your ${page.service?.name || 'business'}?`}
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 32, maxWidth: 580, margin: '0 auto 32px' }}>
              Book a free 30-minute strategy call. We&apos;ll review your funnel and show you the highest-impact opportunities.
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
