import Link from 'next/link'

export function CaseStudyTemplate({ cs }: {
  cs: {
    clientName: string; clientAlias?: string | null; industry: string; platform: string; city?: string | null;
    primaryMetric: string; primaryDelta: string; secondaryMetric?: string | null; secondaryDelta?: string | null;
    thirdMetric?: string | null; thirdDelta?: string | null; timeToResult?: string | null;
    challenge?: string | null; approach?: string | null; keyInsight?: string | null;
    clientQuote?: string | null; clientQuoteAuthor?: string | null; title?: string | null;
  }
}) {
  let approachSteps: string[] = []
  if (cs.approach) {
    try { const p = JSON.parse(cs.approach); if (Array.isArray(p)) approachSteps = p; else approachSteps = [cs.approach] }
    catch { approachSteps = [cs.approach] }
  }

  const metrics = [
    { metric: cs.primaryMetric, delta: cs.primaryDelta, accent: true },
    cs.secondaryMetric && cs.secondaryDelta ? { metric: cs.secondaryMetric, delta: cs.secondaryDelta, accent: false } : null,
    cs.thirdMetric && cs.thirdDelta ? { metric: cs.thirdMetric, delta: cs.thirdDelta, accent: false } : null,
    cs.timeToResult ? { metric: 'Time to result', delta: cs.timeToResult, accent: false } : null,
  ].filter(Boolean) as { metric: string; delta: string; accent: boolean }[]

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 bg-surface overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary font-label text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">work</span>
            CASE STUDY
          </span>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-xs font-bold text-secondary bg-surface-container-low px-3 py-1 rounded-full">{cs.industry}</span>
            <span className="text-xs font-bold text-secondary bg-surface-container-low px-3 py-1 rounded-full">{cs.platform}</span>
            {cs.city && <span className="text-xs font-bold text-secondary bg-surface-container-low px-3 py-1 rounded-full">{cs.city}</span>}
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-on-background leading-[1.1] mb-6 max-w-4xl">
            {cs.title || cs.clientAlias || cs.clientName}
          </h1>
          <p className="text-5xl md:text-7xl font-headline font-black text-primary italic">{cs.primaryDelta}</p>
          <p className="text-secondary mt-2">{cs.primaryMetric}</p>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className={`p-6 rounded-xl shadow-card border border-outline-variant/10 ${m.accent ? 'kinetic-gradient text-white' : 'bg-surface-container-lowest'}`}>
              <p className={`text-3xl font-headline font-black ${m.accent ? '' : 'text-primary'}`}>{m.delta}</p>
              <p className={`text-xs font-label uppercase tracking-widest mt-1 ${m.accent ? 'text-white/80' : 'text-secondary'}`}>{m.metric}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge */}
      {cs.challenge && (
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <div className="bg-on-background text-white rounded-3xl p-10 md:p-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">THE CHALLENGE</span>
            <h2 className="text-2xl md:text-3xl font-headline font-extrabold mt-3 mb-6">The problem we set out to solve</h2>
            <p className="text-white/85 text-lg leading-relaxed">{cs.challenge}</p>
          </div>
        </section>
      )}

      {/* Approach */}
      {approachSteps.length > 0 && (
        <section className="px-6 py-20 bg-surface-container-low">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline font-extrabold text-center mb-12">How we delivered the results</h2>
            <div className="space-y-6">
              {approachSteps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-full kinetic-gradient text-white font-headline font-bold text-sm flex items-center justify-center">{i + 1}</div>
                  <p className="text-on-background text-lg leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key insight */}
      {cs.keyInsight && (
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <div className="border-l-4 border-primary pl-8 py-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">KEY INSIGHT</span>
            <p className="text-2xl md:text-3xl font-headline font-bold text-on-background leading-snug mt-3">{cs.keyInsight}</p>
          </div>
        </section>
      )}

      {/* Client quote */}
      {cs.clientQuote && (
        <section className="px-6 py-20 bg-surface-container-low">
          <div className="max-w-3xl mx-auto text-center">
            <span className="material-symbols-outlined text-6xl text-primary/30">format_quote</span>
            <blockquote className="text-2xl md:text-3xl font-headline font-bold text-on-background leading-snug mt-4">
              &ldquo;{cs.clientQuote}&rdquo;
            </blockquote>
            {cs.clientQuoteAuthor && (
              <p className="text-secondary mt-6 text-sm font-bold uppercase tracking-widest">— {cs.clientQuoteAuthor}</p>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto kinetic-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-headline font-black mb-6">Get similar results for your business</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">Book a free strategy call. We&apos;ll review your funnel and show you exactly how we&apos;d unlock your next growth phase.</p>
            <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-full font-headline font-black text-xl hover:scale-105 transition-transform shadow-lg inline-block">
              Book a strategy call
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
