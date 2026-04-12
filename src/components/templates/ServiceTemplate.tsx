import Link from 'next/link'

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

const defaultFeatures = [
  { title: 'Research-led approach', desc: 'Heatmaps, recordings and analytics inform every recommendation.' },
  { title: 'Test-driven decisions', desc: 'A/B testing every change to prove uplift before scaling.' },
  { title: 'Long-term partnership', desc: "We don't just disappear — ongoing iteration after the first wins." },
]

export function ServiceTemplate({ page }: { page: { title: string; h1?: string | null; bodyJson: ServiceBody | null; service?: { name: string } | null } }) {
  const body = page.bodyJson || {}
  const features = body.features?.length ? body.features : defaultFeatures
  const sections = body.sections || []
  const faqs = body.faq || []

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 bg-surface overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary font-label text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">category</span>
            {page.service?.name?.toUpperCase() || 'SERVICE'}
          </span>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-on-background leading-[1.1] mb-6 max-w-3xl">
            {page.h1 || page.title}
          </h1>
          {body.hero_subtitle && <p className="text-lg text-secondary max-w-2xl leading-relaxed mb-8">{body.hero_subtitle}</p>}
          <Link href="/contact" className="kinetic-gradient text-white px-8 py-4 rounded-full font-headline font-bold text-lg inline-flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform">
            Get a free audit <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Value props / features */}
      <section className="px-6 py-24 bg-surface-container-lowest max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.slice(0, 3).map((f, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-outline-variant/10 hover:shadow-card-hover transition-shadow">
              <span className="material-symbols-outlined text-4xl text-primary mb-6 block">{['biotech', 'monitoring', 'handshake'][i] || 'check_circle'}</span>
              <h3 className="text-2xl font-headline font-bold mb-3">{f.title}</h3>
              <p className="text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content sections */}
      {sections.map((s, i) => (
        <section key={i} className={`px-6 py-20 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}`}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <h2 className="text-3xl font-headline font-extrabold mb-4">{s.heading}</h2>
              <p className="text-secondary text-lg leading-relaxed">{s.body}</p>
            </div>
            <div className={`bg-surface-container-high rounded-3xl aspect-video flex items-center justify-center ${i % 2 ? 'md:order-1' : ''}`}>
              <span className="material-symbols-outlined text-6xl text-primary/20">{i % 2 === 0 ? 'monitoring' : 'biotech'}</span>
            </div>
          </div>
        </section>
      ))}

      {/* Stats */}
      {body.stats && body.stats.length > 0 && (
        <section className="py-16 bg-on-background text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {body.stats.map((s, i) => (
              <div key={i}>
                <p className="text-4xl font-headline font-black text-primary">{s.value}</p>
                <p className="text-xs font-label uppercase tracking-widest text-white/60 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="px-6 py-24 bg-surface">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-extrabold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <details key={i} className="bg-surface-container-low rounded-2xl p-6 group">
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
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-headline font-black mb-6">{body.cta_text || `Ready to scale your ${page.service?.name || 'business'}?`}</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">Book a free 30-minute strategy call. We&apos;ll review your funnel and show you the highest-impact opportunities.</p>
            <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-full font-headline font-black text-xl hover:scale-105 transition-transform shadow-lg inline-block">
              Book a strategy call
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
