'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  page: {
    title: string
    metaDesc?: string | null
    h1?: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bodyJson?: any
    service?: { name: string; cluster: string; slug: string } | null
    location?: { city: string; state: string } | null
  }
}

export function ServiceTemplate({ page }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = page.bodyJson as Record<string, any> | null
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const svcName = page.service?.name || page.title
  const city = page.location?.city

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offerCards: any[] = body?.offer_cards || body?.features || [
    { icon: 'analytics', title: 'Full funnel audit', desc: 'Deconstructing every touchpoint from first click to repeat purchase.' },
    { icon: 'map', title: 'Heatmap analysis', desc: 'Visualising user behaviour to eliminate friction points in the UX.' },
    { icon: 'science', title: 'A/B testing', desc: 'Rigorous scientific testing of creative, copy, and landing pages.' },
    { icon: 'bar_chart_4_bars', title: 'Monthly reporting', desc: 'Transparent, data-rich dashboards that focus on your bottom line.' },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats: any[] = body?.stats || [
    { number: '+47%', label: 'Avg CVR Lift', color: '#b72301' },
    { number: '90d', label: 'Time to Result', color: '#0d1c32' },
    { number: '+150', label: 'Clients Served', color: '#0d1c32' },
    { number: '98%', label: 'Retention Rate', color: '#00677c' },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const advantages: any[] = body?.advantages || body?.sections || [
    { title: 'Data-driven approach', heading: 'Data-driven approach', desc: 'We bypass gut feelings. Every decision is backed by statistical significance and historical performance modelling.', body: 'We bypass gut feelings. Every decision is backed by statistical significance and historical performance modelling.' },
    { title: 'Fast time to value', heading: 'Fast time to value', desc: 'Our sprint-based methodology ensures you see tangible improvements within the first 30 days of implementation.', body: 'Our sprint-based methodology ensures you see tangible improvements within the first 30 days of implementation.' },
    { title: 'Embedded partnership', heading: 'Embedded partnership', desc: 'We operate as an extension of your team, with direct access and strategic alignment with your growth leads.', body: 'We operate as an extension of your team, with direct access and strategic alignment with your growth leads.' },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const caseStudies: any[] = body?.case_studies || [
    {
      tag: svcName,
      metric: '40% RTO reduction in 60 days.',
      title: 'D2C Footwear Brand',
      desc: 'Optimised sizing guides and post-purchase flows reduced logistics drag significantly.',
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      tag_color: '#b72301',
    },
    {
      tag: 'B2B SaaS',
      metric: '+47% conversion on free trial.',
      title: 'CRM Provider',
      desc: 'Total overhaul of landing page messaging and social proof placement.',
      image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
      tag_color: '#00677c',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqs: any[] = body?.faq || [
    { q: 'How long does it take to see results?', a: 'Most clients see initial data signals within 2 weeks. Meaningful conversion improvements typically show within 60–90 days. We set clear milestones from day one.' },
    { q: 'Which platforms do you specialise in?', a: 'Google Ads, Meta (Facebook + Instagram), Amazon Advertising. We match the channel mix to your audience and margins.' },
    { q: 'Do you require a long-term contract?', a: 'We work on a 3-month minimum engagement — enough time to run meaningful tests and show real results. After that, month-to-month.' },
    { q: 'How do you charge for your services?', a: 'Monthly retainer based on scope — no hidden fees, no percentage-of-spend markups. Clear proposal within 48 hours of your call.' },
  ]

  const heroHeading = city
    ? `${svcName} in ${city}`
    : (body?.hero_heading || page.h1 || page.title)

  const heroTag = city
    ? `${svcName} · ${city}`
    : (body?.hero_tag || svcName)

  return (
    <div style={{ fontFamily: 'var(--font-inter, "Inter", sans-serif)' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        paddingTop: 80, paddingBottom: 80,
        paddingLeft: 'clamp(16px, 4vw, 64px)',
        paddingRight: 'clamp(16px, 4vw, 64px)',
        overflow: 'hidden',
        background: '#f9f9ff',
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'radial-gradient(#b72301 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 12, color: '#94a3b8' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/digital-marketing" style={{ color: '#94a3b8', textDecoration: 'none' }}>Services</Link>
            {page.service && <><span>›</span><span style={{ color: '#64748b' }}>{page.service.name}</span></>}
            {city && <><span>›</span><span style={{ color: '#64748b' }}>{city}</span></>}
          </div>

          <div style={{ maxWidth: 720 }}>
            <span style={{
              display: 'inline-block', padding: '4px 14px',
              borderRadius: 9999,
              background: 'rgba(183,35,1,0.08)',
              color: '#b72301',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 20,
            }}>{heroTag}</span>

            <h1 style={{
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 800, color: '#0d1c32',
              lineHeight: 1.1, letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              {heroHeading}{' '}
              <span style={{ color: '#b72301' }}>Services</span>
            </h1>

            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#515f78', lineHeight: 1.7, marginBottom: 32, maxWidth: 560 }}>
              {body?.hero_subtext || body?.hero_subtitle || page.metaDesc || `We engineer compounding growth for ambitious ${svcName.toLowerCase()} clients using data-driven strategy and proven frameworks.`}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href="/contact" style={{
                background: 'linear-gradient(135deg, #b72301, #ff5733)',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: 9999,
                fontWeight: 700, fontSize: 15,
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 24px rgba(183,35,1,0.3)',
              }}>
                Get a free audit
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/case-studies" style={{
                background: '#ffffff', border: '1px solid #e2e8f0',
                color: '#0d1c32', padding: '14px 28px',
                borderRadius: 9999, fontWeight: 700, fontSize: 15,
                textDecoration: 'none',
              }}>
                See case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUTCOMES — dark section ── */}
      <section style={{ background: '#0f172a', padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 64px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'flex-end', marginBottom: 56 }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700,
                color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 12,
              }}>Outcomes-first approach.</h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>We don&apos;t just run campaigns — we architect systems that convert traffic into loyal revenue.</p>
            </div>
            <div style={{ height: 1, background: '#1e293b', width: 200, alignSelf: 'center' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {offerCards.map((card: any, i: number) => (
              <div key={i} style={{
                padding: 'clamp(20px, 3vw, 32px)',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <span className="ms" style={{ fontSize: 36, color: '#b72301', display: 'block', marginBottom: 16 }}>{card.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 18, fontWeight: 700, color: '#ffffff', marginBottom: 10, marginTop: 0 }}>{card.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 64px)', background: '#f9f9ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1, background: '#e2e8f0',
            borderRadius: 20, overflow: 'hidden',
            border: '1px solid #e2e8f0',
          }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {stats.map((s: any, i: number) => (
              <div key={i} style={{
                background: '#ffffff', padding: 'clamp(24px, 4vw, 48px)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800,
                  color: s.color || '#0d1c32', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8,
                }}>{s.number || s.value}</div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 64px)', background: '#f0f3ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 64px)' }}>
            <h2 style={{
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700,
              color: '#0d1c32', letterSpacing: '-0.02em', marginBottom: 12,
            }}>The ConversionPro Advantage</h2>
            <p style={{ color: '#515f78', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>Why we consistently outperform standard digital agencies.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {advantages.map((a: any, i: number) => (
              <div key={i} style={{
                padding: 'clamp(24px, 3vw, 36px)',
                background: '#ffffff',
                borderRadius: 20,
                borderBottom: '4px solid #b72301',
                boxShadow: '0 4px 20px rgba(13,28,50,0.04)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 20, fontWeight: 700, color: '#0d1c32', marginBottom: 12, marginTop: 0 }}>{a.title || a.heading}</h3>
                <p style={{ color: '#515f78', lineHeight: 1.7, fontSize: 15 }}>{a.desc || a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 64px)', background: '#f9f9ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
            fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700,
            color: '#0d1c32', letterSpacing: '-0.02em', marginBottom: 'clamp(28px, 4vw, 48px)',
          }}>Recent Client Wins</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {caseStudies.map((cs: any, i: number) => (
              <Link key={i} href="/case-studies" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#e8eeff', borderRadius: 24,
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Image */}
                  {cs.image_url && (
                    <div style={{ height: 220, overflow: 'hidden' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cs.image_url} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  {/* Content */}
                  <div style={{ padding: 28 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.1em', color: cs.tag_color || '#b72301',
                      display: 'block', marginBottom: 10,
                    }}>{cs.tag}</span>
                    <h3 style={{
                      fontFamily: 'var(--font-jakarta)', fontSize: 24,
                      fontWeight: 800, color: '#0d1c32', marginBottom: 12, marginTop: 0,
                      lineHeight: 1.2,
                    }}>{cs.metric || cs.headline}</h3>
                    <p style={{ fontSize: 14, color: '#515f78', lineHeight: 1.6, marginBottom: 18 }}>{cs.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#0d1c32' }}>
                      Read Full Case Study
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 64px)', background: '#f0f3ff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700,
              color: '#0d1c32', letterSpacing: '-0.02em', marginBottom: 10,
            }}>Common Questions</h2>
            <p style={{ color: '#515f78', fontSize: 15 }}>Everything you need to know about our process.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {faqs.map((faq: any, i: number) => (
              <div key={i} style={{
                background: '#ffffff', borderRadius: 16,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(13,28,50,0.04)',
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 'clamp(16px, 3vw, 24px)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                  fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                  fontSize: 'clamp(14px, 2vw, 17px)', fontWeight: 700, color: '#0d1c32',
                }}>
                  <span>{faq.q}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1.5px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 18, fontWeight: 300,
                    color: openFaq === i ? '#b72301' : '#64748b',
                    borderColor: openFaq === i ? '#b72301' : '#e2e8f0',
                    transition: 'all 0.2s ease',
                  }}>
                    {openFaq === i ? '−' : '+'}
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)',
                    fontSize: 15, color: '#515f78', lineHeight: 1.75,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(32px, 6vw, 64px) clamp(16px, 4vw, 64px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            borderRadius: 'clamp(24px, 4vw, 48px)',
            background: 'linear-gradient(135deg, #b72301 0%, #ff5733 100%)',
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 96px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(183,35,1,0.3)',
          }}>
            <div style={{
              position: 'absolute', top: -80, right: -80,
              width: 280, height: 280, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)', filter: 'blur(40px)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800,
                color: '#ffffff', letterSpacing: '-0.02em',
                marginBottom: 16, lineHeight: 1.15,
              }}>
                {body?.cta_heading || body?.cta_text || `Ready to scale your ${svcName}?`}
              </h2>
              <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.88)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.7 }}>
                {body?.cta_subtext || 'Stop guessing. Start growing. Let our data-driven growth engine find your missing revenue.'}
              </p>
              <Link href="/contact" style={{
                display: 'inline-block',
                background: '#ffffff', color: '#b72301',
                padding: 'clamp(12px, 2vw, 18px) clamp(24px, 4vw, 48px)',
                borderRadius: 9999,
                fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                fontWeight: 800, fontSize: 'clamp(14px, 2vw, 18px)',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              }}>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
