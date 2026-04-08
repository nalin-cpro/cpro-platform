import Link from 'next/link'

interface LocationBody {
  hero_subtitle?: string
  why_choose?: { title: string; desc: string }[]
  sections?: { heading: string; body: string }[]
  local_stats?: { value: string; label: string }[]
  process?: { title: string; desc: string }[]
  faq?: { q: string; a: string }[]
  cta_text?: string
}

const defaultReasons = [
  { title: 'Local market knowledge', desc: 'We understand the buying behaviour, trust signals and price sensitivity of customers in your city.' },
  { title: 'On-ground support',       desc: 'In-person workshops, audits, and quarterly strategy reviews when you need them.' },
  { title: 'Region-specific tactics', desc: 'Hindi/regional language ad creatives, festival calendars, local courier networks.' },
]

const defaultProcess = [
  { title: 'Discovery call',     desc: 'We learn about your business, goals, and current pain points.' },
  { title: 'Local audit',        desc: 'We dig into your funnel, ads, and competitors in your city.' },
  { title: 'Strategy roadmap',   desc: 'A prioritised 90-day plan with expected outcomes.' },
  { title: 'Execution & review', desc: 'We implement and report on progress every two weeks.' },
]

export function LocationTemplate({ page }: { page: { title: string; h1?: string | null; bodyJson: LocationBody | null; location?: { city: string; state?: string } | null; service?: { name: string } | null } }) {
  const body = page.bodyJson || {}
  const city = page.location?.city || 'your city'
  const reasons = body.why_choose && body.why_choose.length ? body.why_choose : defaultReasons
  const sections = body.sections || []
  const process = body.process && body.process.length ? body.process : defaultProcess
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
            <span>{city}</span>
          </div>
          <h1 style={{ marginTop: 16 }}>
            {page.h1 || page.title || `${page.service?.name || 'Our service'} in ${city}`}
          </h1>
          {body.hero_subtitle && (
            <p style={{ fontSize: 18, color: 'var(--color-body)', maxWidth: 720, margin: '20px auto 0' }}>{body.hero_subtitle}</p>
          )}
        </div>
      </section>

      {/* WHY CITY CHOOSES US */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">WHY US</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>
              Why <span className="text-gradient">{city}</span> businesses choose ConversionPro
            </h2>
          </div>
          <div className="grid-3">
            {reasons.slice(0, 3).map((r, i) => (
              <div key={i} className="bento-card" style={{ padding: 36, background: 'var(--color-surface)' }}>
                <div className="icon-box icon-box-accent">{['🎯', '🤝', '🌏'][i] || '✨'}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{r.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--color-body)', lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE OVERVIEW (alternating sections from bodyJson) */}
      {sections.length > 0 && sections.map((s, i) => (
        <section key={i} style={{ padding: '80px 0', background: i % 2 === 0 ? 'var(--color-surface)' : '#fff' }}>
          <div className="container-site">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 60, alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, marginBottom: 20 }}>{s.heading}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--color-body)' }}>{s.body}</p>
              </div>
              <div style={{
                background: 'var(--color-header)',
                color: '#fff',
                borderRadius: 30,
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60,
              }}>
                {i % 2 === 0 ? '📈' : '🎯'}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* LOCAL STATS */}
      {body.local_stats && body.local_stats.length > 0 && (
        <section className="section-dark">
          <div className="container-site">
            <div className="grid-3" style={{ textAlign: 'center', gap: 40 }}>
              {body.local_stats.map((s, i) => (
                <div key={i}>
                  <p style={{ fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-inter), Inter, sans-serif', letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS STEPS */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">HOW WE WORK</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700 }}>Our 4-step process</h2>
          </div>
          <div className="grid-4">
            {process.map((p, i) => (
              <div key={i} className="bento-card" style={{ padding: 32, background: 'var(--color-surface)', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 20,
                  right: 24,
                  fontSize: 56,
                  fontWeight: 700,
                  color: 'var(--color-border)',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  lineHeight: 1,
                  opacity: 0.5,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, marginTop: 40 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--color-body)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL FAQ */}
      {faqs.length > 0 && (
        <section className="section-surface">
          <div className="container-site" style={{ maxWidth: 800 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="section-label">{city.toUpperCase()} FAQ</span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700 }}>Common questions from {city} businesses</h2>
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

      {/* CTA */}
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
              {body.cta_text || `Talk to our ${city} team`}
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 32, maxWidth: 580, margin: '0 auto 32px' }}>
              We&apos;ll review your funnel, identify the biggest opportunities, and show you exactly how we&apos;d grow your business.
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
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
