import { MetricsStrip, KeyInsightCallout, ClientQuote, CTABanner } from '@/components/sections/Sections'

export function CaseStudyTemplate({ cs }: { cs: { clientName: string; clientAlias?: string | null; industry: string; platform: string; city?: string | null; primaryMetric: string; primaryDelta: string; secondaryMetric?: string | null; secondaryDelta?: string | null; thirdMetric?: string | null; thirdDelta?: string | null; timeToResult?: string | null; challenge?: string | null; approach?: string | null; keyInsight?: string | null; clientQuote?: string | null; clientQuoteAuthor?: string | null; title?: string | null } }) {
  let approachSteps: string[] = []
  if (cs.approach) {
    try { const parsed = JSON.parse(cs.approach); if (Array.isArray(parsed)) approachSteps = parsed }
    catch { approachSteps = [cs.approach] }
  }

  const metrics = [
    { metric: cs.primaryMetric, delta: cs.primaryDelta },
    cs.secondaryMetric && cs.secondaryDelta ? { metric: cs.secondaryMetric, delta: cs.secondaryDelta } : null,
    cs.thirdMetric && cs.thirdDelta ? { metric: cs.thirdMetric, delta: cs.thirdDelta } : null,
    cs.timeToResult ? { metric: 'Time to result', delta: cs.timeToResult } : null,
  ].filter(Boolean) as { metric: string; delta: string }[]

  return (
    <>
      <section className="bg-white border-b border-ink-100 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Case Study</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight mb-6">{cs.title || cs.clientAlias || cs.clientName}</h1>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-600">
            <span><strong className="text-ink-800">Industry:</strong> {cs.industry}</span>
            <span><strong className="text-ink-800">Platform:</strong> {cs.platform}</span>
            {cs.city && <span><strong className="text-ink-800">Location:</strong> {cs.city}</span>}
          </div>
        </div>
      </section>

      <MetricsStrip metrics={metrics} />

      {cs.challenge && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-extrabold text-ink-900 mb-5">The Challenge</h2>
            <p className="text-lg text-ink-700 leading-relaxed">{cs.challenge}</p>
          </div>
        </section>
      )}

      {approachSteps.length > 0 && (
        <section className="py-20 bg-ink-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-extrabold text-ink-900 mb-8">Our Approach</h2>
            <ol className="space-y-5">
              {approachSteps.map((step, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center">{i + 1}</div>
                  <p className="text-ink-700 pt-1.5 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {cs.keyInsight && <KeyInsightCallout text={cs.keyInsight} />}
      {cs.clientQuote && cs.clientQuoteAuthor && <ClientQuote quote={cs.clientQuote} author={cs.clientQuoteAuthor} />}
      <CTABanner heading="Want results like this?" ctaText="Book a Strategy Call" />
    </>
  )
}
