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
  { title: 'On-ground support', desc: 'In-person workshops, audits, and quarterly strategy reviews when you need them.' },
  { title: 'Region-specific tactics', desc: 'Hindi/regional language ad creatives, festival calendars, local courier networks.' },
]

const defaultProcess = [
  { title: 'Discovery call', desc: 'We learn about your business, goals, and current pain points.' },
  { title: 'Local audit', desc: 'We dig into your funnel, ads, and competitors in your city.' },
  { title: 'Strategy roadmap', desc: 'A prioritised 90-day plan with expected outcomes.' },
  { title: 'Execution & review', desc: 'We implement and report on progress every two weeks.' },
]

export function LocationTemplate({ page }: { page: { title: string; h1?: string | null; bodyJson: LocationBody | null; location?: { city: string } | null; service?: { name: string } | null } }) {
  const body = page.bodyJson || {}
  const city = page.location?.city || 'your city'
  const reasons = body.why_choose?.length ? body.why_choose : defaultReasons
  const sections = body.sections || []
  const process = body.process?.length ? body.process : defaultProcess
  const faqs = body.faq || []

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 bg-surface overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary font-label text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {city.toUpperCase()}
          </span>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-on-background leading-[1.1] mb-6 max-w-3xl">
            {page.h1 || `${page.service?.name || 'Our service'} in ${city}`}
          </h1>
          {body.hero_subtitle && <p className="text-lg text-secondary max-w-2xl leading-relaxed mb-8">{body.hero_subtitle}</p>}
          <Link href="/contact" className="kinetic-gradient text-white px-8 py-4 rounded-full font-headline font-bold text-lg inline-flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform">
            Get local audit <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Why this city */}
      <section className="px-6 py-24 bg-surface-container-lowest max-w-7xl mx-auto">
        <h2 className="text-3xl font-headline font-extrabold text-center mb-12">Why {city} businesses choose us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.slice(0, 3).map((r, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-outline-variant/10 hover:shadow-card-hover transition-shadow">
              <span className="material-symbols-outlined text-4xl text-primary mb-6 block">{['biotech', 'handshake', 'public'][i]}</span>
              <h3 className="text-2xl font-headline font-bold mb-3">{r.title}</h3>
              <p className="text-secondary leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content sections */}
      {sections.map((s, i) => (
        <section key={i} className={`px-6 py-20 ${i % 2 === 0 ? 'bg-surface-container-low' : 'bg-surface'}`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <h2 className="text-3xl font-headline font-extrabold mb-4">{s.heading}</h2>
              <p className="text-secondary text-lg leading-relaxed">{s.body}</p>
            </div>
            <div className={`bg-on-background rounded-3xl aspect-video flex items-center justify-center ${i % 2 ? 'md:order-1' : ''}`}>
              <span className="material-symbols-outlined text-6xl text-primary">{i % 2 === 0 ? 'trending_up' : 'target'}</span>
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section className="px-6 py-24 bg-surface max-w-7xl mx-auto">
        <h2 className="text-3xl font-headline font-extrabold text-center mb-12">Our 4-step process</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {process.map((p, i) => (
            <div key={i} className="bg-surface-container-low rounded-3xl p-8 relative">
              <span className="text-6xl font-headline font-black text-primary/10 absolute top-4 right-6">{String(i + 1).padStart(2, '0')}</span>
              <div className="pt-12">
                <h3 className="text-lg font-headline font-bold mb-2">{p.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="px-6 py-24 bg-surface-container-low">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-extrabold text-center mb-12">Common questions from {city} businesses</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <details key={i} className="bg-white rounded-2xl p-6 border border-outline-variant/10 group">
                  <summary className="font-headline font-bold text-on-background cursor-pointer flex justify-between items-center list-none">
                    {f.q}
                    <span className="material-symbols-outlined text-primary group-open:rotate-45 transition-transform">add</span>
                  </summary>
                  <p className="text-secondary mt-4 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto kinetic-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-headline font-black mb-6">{body.cta_text || `Talk to our ${city} team`}</h2>
            <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-full font-headline font-black text-xl hover:scale-105 transition-transform shadow-lg inline-block">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
