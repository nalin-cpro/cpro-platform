import Link from 'next/link'
import { prisma } from '@/lib/db'
import { resolveLayout } from '@/lib/layout-resolver'
import { buildMetadata } from '@/lib/seo'
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
  }
  return <KineticHome />
}

/* ═══════════════════════════════════════════════════════════════════════════
   KINETIC HOME — full homepage converted from kinetic.html reference
   with added Process Steps + Numbers sections
   Nav and footer handled by (site)/layout.tsx → PageWrapper
   ═══════════════════════════════════════════════════════════════════════════ */

function KineticHome() {
  return (
    <>
      {/* Inline styles for animations and kinetic-specific classes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pulse-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #b72301;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes scroll-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex; gap: 48px;
          animation: scroll-ticker 30s linear infinite;
          width: max-content;
        }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.6s ease-out both; }
        .stat-cell { transition: background 0.2s ease; }
        .stat-cell:hover { background: #f0f3ff !important; }
      `}} />

      {/* ── HERO ── */}
      <section className="relative px-6 py-16 md:py-32 overflow-hidden" style={{ background: '#f9f9ff' }}>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(255,87,51,0.06)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(0,103,124,0.04)' }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col gap-6 md:w-2/3">
            {/* Animated pulse tag */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit tracking-wider" style={{ background: '#dfe8ff', color: '#b72301', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <span className="pulse-dot" />
              PUNE-BASED PERFORMANCE AGENCY
            </span>

            <h1 className="font-headline font-extrabold tracking-tight" style={{ fontSize: 'clamp(42px, 7vw, 76px)', lineHeight: 1.08, color: '#0d1c32' }}>
              UX-led conversion that{' '}
              <span style={{ color: '#b72301', fontStyle: 'italic' }}>drives revenue</span>
            </h1>

            <p style={{ fontSize: 18, color: '#515f78', maxWidth: 520, lineHeight: 1.7 }}>
              We transform digital storefronts into high-performance revenue engines using data-driven research and intentional user experience design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/contact" className="kinetic-gradient" style={{
                color: '#fff', padding: '16px 32px', borderRadius: 9999,
                fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 17,
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: '0 8px 28px rgba(183,35,1,0.28)',
                textDecoration: 'none',
              }}>
                Get a free audit
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/case-studies" style={{
                border: '1.5px solid rgba(228,190,182,0.3)', background: 'rgba(255,255,255,0.5)',
                color: '#0d1c32', padding: '16px 32px', borderRadius: 9999,
                fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: 17,
                textDecoration: 'none', textAlign: 'center',
              }}>
                See case studies
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '+47%', label: 'Conversion Lift', color: '#b72301' },
              { val: '90d',  label: 'Avg Result Time', color: '#0d1c32' },
              { val: '150+', label: 'Brands Scaled',   color: '#0d1c32' },
              { val: '3.2x', label: 'ROAS Growth',     color: '#00677c' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#fff', padding: 24, borderRadius: 12,
                boxShadow: '0 1px 4px rgba(13,28,50,0.06)',
                border: '1px solid rgba(228,190,182,0.1)',
              }}>
                <p style={{ fontSize: 32, fontFamily: 'var(--font-jakarta)', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#515f78', marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER / MARQUEE STRIP ── */}
      <section style={{ padding: '40px 0', background: '#f0f3ff' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#515f78', opacity: 0.6 }}>
            Trusted by 150+ world-class brands
          </p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="ticker-track">
            {['ACME Corp', 'BrightCart', 'NorthStar', 'Plyform', 'Velura', 'Kindred', 'Lumio', 'Atrium', 'NextWave', 'Pinnacle',
              'ACME Corp', 'BrightCart', 'NorthStar', 'Plyform', 'Velura', 'Kindred', 'Lumio', 'Atrium', 'NextWave', 'Pinnacle'].map((logo, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-jakarta)', fontWeight: 800, fontSize: 22,
                color: '#0d1c32', opacity: 0.18, whiteSpace: 'nowrap',
                letterSpacing: '-0.02em',
              }}>
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US — Value Props ── */}
      <section style={{ padding: '96px 24px', background: '#f9f9ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#b72301', marginBottom: 12 }}>WHY CONVERSIONPRO</p>
            <h2 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#0d1c32', letterSpacing: '-0.02em' }}>
              Built different from day one
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'biotech', title: 'Research-led decisions', desc: 'No guesswork. Every pixel move and button placement is backed by user behavioral data and heatmaps.', bg: 'rgba(183,35,1,0.06)' },
              { icon: 'speed', title: 'Results in 30-90 days', desc: 'We focus on high-impact levers that move the needle quickly, delivering tangible revenue growth within 3 months.', bg: 'rgba(0,103,124,0.06)' },
              { icon: 'handshake', title: 'Long-term partnership', desc: "We don't just audit and leave. We integrate with your team to ensure continuous iterative optimization and growth.", bg: 'rgba(13,28,50,0.04)' },
            ].map((v, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="ms" style={{ fontSize: 28, color: i === 0 ? '#b72301' : i === 1 ? '#00677c' : '#0d1c32' }}>{v.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 22, fontWeight: 700, color: '#0d1c32' }}>{v.title}</h3>
                <p style={{ color: '#515f78', lineHeight: 1.7, fontSize: 15 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '96px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
            <h2 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#0d1c32', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Specialized Services
            </h2>
            <p style={{ color: '#515f78', fontSize: 16 }}>Comprehensive digital solutions designed for conversion and scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'ads_click', title: 'Digital Marketing', desc: 'Full-funnel performance marketing across Meta, Google, and TikTok with ROI focus.', href: '/digital-marketing' },
              { icon: 'monitoring', title: 'CRO', desc: 'Systematic A/B testing and user research to squeeze every drop of revenue from your traffic.', href: '/cro' },
              { icon: 'storefront', title: 'Marketplaces', desc: 'Amazon and Flipkart advertising and account management for maximum shelf visibility.', href: '/marketplaces' },
              { icon: 'integration_instructions', title: 'Zoho One', desc: 'Custom CRM setup and business process automation to scale operations flawlessly.', href: '/zoho' },
              { icon: 'code', title: 'Web Development', desc: 'Lightning-fast headless commerce and high-converting landing pages built on modern stacks.', href: '/development' },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{
                padding: 40, borderRadius: 32, background: '#fff',
                border: '1px solid rgba(228,190,182,0.1)',
                textDecoration: 'none', display: 'block',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}>
                <span className="ms" style={{ fontSize: 40, color: '#b72301', display: 'block', marginBottom: 24 }}>{s.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 22, fontWeight: 700, color: '#0d1c32', marginBottom: 16 }}>{s.title}</h3>
                <p style={{ color: '#515f78', marginBottom: 32, lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                <span style={{ fontWeight: 700, color: '#0d1c32', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            ))}
            {/* CTA block */}
            <div style={{
              padding: 40, borderRadius: 32,
              background: '#b72301', color: '#fff',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 30, fontWeight: 900, marginBottom: 16 }}>Don&apos;t see what you need?</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28, lineHeight: 1.6 }}>We create custom growth packages for ambitious brands.</p>
              <Link href="/contact" style={{
                background: '#fff', color: '#b72301', padding: '12px 24px',
                borderRadius: 9999, fontWeight: 700, fontSize: 14,
                textDecoration: 'none', display: 'inline-block', width: 'fit-content',
              }}>
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NUMBERS SECTION ── */}
      <section style={{ padding: '80px 24px', background: '#f9f9ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1, background: '#e2e8f0',
            borderRadius: 24, overflow: 'hidden',
            border: '1px solid #e2e8f0',
          }}>
            {[
              { val: '+47%', label: 'Avg CVR Lift', color: '#b72301' },
              { val: '90d', label: 'Time to Result', color: '#0d1c32' },
              { val: '+150', label: 'Clients Served', color: '#0d1c32' },
              { val: '98%', label: 'Retention Rate', color: '#00677c' },
            ].map((s, i) => (
              <div key={i} className="stat-cell" style={{ background: '#fff', padding: 'clamp(28px, 5vw, 56px)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, color: s.color, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES (Bento Grid) ── */}
      <section style={{ padding: '96px 24px', background: '#f0f3ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#0d1c32', letterSpacing: '-0.02em' }}>Impact Driven Work</h2>
              <p style={{ color: '#515f78', marginTop: 8 }}>Real results for real businesses.</p>
            </div>
            <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#b72301', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
              View All Stories
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M4 4h8M4 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main feature */}
            <Link href="/case-studies" style={{ textDecoration: 'none' }} className="md:col-span-8 group relative overflow-hidden rounded-3xl block" >
              <div style={{ height: 400, position: 'relative' }}>
                <div className="kinetic-gradient" style={{ position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0d1c32, transparent)', opacity: 0.5 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 32, color: '#fff' }}>
                  <span style={{ background: '#b72301', padding: '4px 12px', borderRadius: 9999, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 16 }}>Footwear Brand</span>
                  <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 30, fontWeight: 800, marginBottom: 8 }}>+120% ROAS Increase</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>Complete UX overhaul of the checkout funnel resulting in record-breaking conversion lift.</p>
                </div>
              </div>
            </Link>
            {/* Side 1 */}
            <div className="md:col-span-4" style={{ background: '#fff', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(228,190,182,0.1)', boxShadow: '0 1px 4px rgba(13,28,50,0.04)', minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="ms" style={{ fontSize: 40, color: '#00677c' }}>hub</span>
                <span style={{ color: '#00677c', fontWeight: 900, fontSize: 24 }}>+85%</span>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#515f78', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>SaaS Co</p>
                <h4 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 20, fontWeight: 700, color: '#0d1c32' }}>LTV Expansion</h4>
              </div>
            </div>
            {/* Side 2 */}
            <div className="md:col-span-4" style={{ background: '#0d1c32', color: '#fff', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="ms" style={{ fontSize: 40, color: '#b72301' }}>shopping_bag</span>
                <span style={{ color: '#b72301', fontWeight: 900, fontSize: 24 }}>+64%</span>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Fashion Brand</p>
                <h4 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 20, fontWeight: 700 }}>Revenue Growth</h4>
              </div>
            </div>
            {/* Wide bottom */}
            <div className="md:col-span-8" style={{ background: '#d6e3ff', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid rgba(228,190,182,0.1)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#515f78', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Manufacturing Group</p>
                  <h4 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 24, fontWeight: 800, color: '#0d1c32', marginBottom: 12 }}>Streamlining B2B Lead Gen with Zoho One</h4>
                  <p style={{ color: '#515f78', fontSize: 15 }}>Reduced lead acquisition cost by 40% using automated CRM integration.</p>
                </div>
                <div style={{ fontFamily: 'var(--font-jakarta)', fontSize: 52, fontWeight: 900, color: '#b72301', fontStyle: 'italic' }}>-40%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section style={{ padding: '96px 24px', background: '#f9f9ff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#b72301', marginBottom: 12 }}>HOW WE WORK</p>
            <h2 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#0d1c32', letterSpacing: '-0.02em' }}>
              Our 4-step growth process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Discovery Call', desc: 'We learn about your business, goals, current channels, and where revenue is leaking.' },
              { num: '02', title: 'Deep Audit', desc: 'Full-funnel analytics, heatmap analysis, competitor benchmarking, and opportunity mapping.' },
              { num: '03', title: '90-Day Roadmap', desc: 'Prioritised action plan with expected outcomes, timelines, and clear accountability.' },
              { num: '04', title: 'Execute & Scale', desc: 'Sprint-based implementation with bi-weekly reporting and continuous optimisation.' },
            ].map((step, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 24, padding: 32,
                border: '1px solid rgba(228,190,182,0.1)',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{
                  position: 'absolute', top: 16, right: 20,
                  fontFamily: 'var(--font-jakarta)', fontSize: 64, fontWeight: 900,
                  color: 'rgba(183,35,1,0.06)', lineHeight: 1,
                }}>{step.num}</span>
                <div style={{ paddingTop: 48 }}>
                  <h3 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 20, fontWeight: 700, color: '#0d1c32', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: '#515f78', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROWTH PARTNER + STAT GRID ── */}
      <section style={{ padding: '96px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#0d1c32', letterSpacing: '-0.02em', marginBottom: 24 }}>Your Complete Growth Partner</h2>
              <p style={{ fontSize: 17, color: '#515f78', lineHeight: 1.7, marginBottom: 32 }}>
                We don&apos;t just do marketing; we engineer growth. Our holistic approach covers everything from the first ad click to the final checkout and lifetime customer retention.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {['End-to-end strategy execution', 'Custom data visualization dashboards', 'Dedicated account growth manager'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span className="ms" style={{ color: '#b72301', fontSize: 22 }}>check_circle</span>
                    <span style={{ fontWeight: 700, color: '#0d1c32', fontSize: 15 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '8+', label: 'Years of Expertise', bg: '#f0f3ff', color: '#0d1c32' },
                { val: '150+', label: 'Happy Clients', bg: 'linear-gradient(135deg,#b72301,#ff5733)', color: '#fff' },
                { val: '50+', label: 'Experts Team', bg: '#0d1c32', color: '#b72301' },
                { val: '500M', label: 'Managed Spend', bg: '#dfe8ff', color: '#00677c' },
              ].map((s, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 24, padding: 32,
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                  background: s.bg,
                  boxShadow: i === 1 ? '0 8px 32px rgba(183,35,1,0.25)' : undefined,
                }}>
                  <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: 40, fontWeight: 900, color: s.color, marginBottom: 8 }}>{s.val}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: i === 1 ? 'rgba(255,255,255,0.8)' : i === 2 ? 'rgba(255,255,255,0.5)' : '#515f78' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          borderRadius: 48, padding: 'clamp(48px, 8vw, 96px)',
          background: 'linear-gradient(135deg, #b72301 0%, #ff5733 100%)',
          textAlign: 'center', color: '#fff',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(183,35,1,0.3)',
        }}>
          <div style={{ position: 'absolute', top: -48, left: -48, width: 256, height: 256, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -48, right: -48, width: 256, height: 256, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Ready to grow your business?
            </h2>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.88)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Book a 30-minute growth audit with our specialists. We&apos;ll identify at least 3 quick-win opportunities for your brand.
            </p>
            <Link href="/contact" style={{
              display: 'inline-block',
              background: '#fff', color: '#b72301',
              padding: '18px 44px', borderRadius: 9999,
              fontFamily: 'var(--font-jakarta)', fontWeight: 900, fontSize: 20,
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}>
              Get my free audit
            </Link>
            <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>No obligation. Just high-value strategy.</p>
          </div>
        </div>
      </section>
    </>
  )
}
