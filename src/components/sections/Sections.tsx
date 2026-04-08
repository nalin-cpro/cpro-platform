// Shared section primitives used across templates.
// Colors come from Tailwind brand-* / ink-* (set in tailwind.config.ts).
import Link from 'next/link'
import { ArrowRight, CheckCircle, Quote } from 'lucide-react'

export function PageHero({ eyebrow, title, subtitle, ctaText, ctaHref }: { eyebrow?: string; title: string; subtitle?: string; ctaText?: string; ctaHref?: string }) {
  return (
    <section className="relative bg-white border-b border-ink-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-100 via-white to-sky2-100/30" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {eyebrow && <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">{eyebrow}</p>}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-tight mb-5 max-w-4xl">{title}</h1>
        {subtitle && <p className="text-xl text-ink-600 max-w-3xl leading-relaxed mb-8">{subtitle}</p>}
        {ctaText && ctaHref && (
          <Link href={ctaHref} className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full transition shadow-lg uppercase tracking-wide text-sm">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  )
}

export function FeatureStrip({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <section className="bg-ink-900 text-white py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((it, i) => (
          <div key={i} className="border-l-4 border-brand-500 pl-5">
            <h3 className="font-heading font-bold text-lg mb-2 text-white">{it.title}</h3>
            <p className="text-ink-300 text-sm leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function AlternatingContent({ rows }: { rows: { heading: string; body: string }[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {rows.map((r, i) => (
          <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={i % 2 ? 'lg:order-2' : ''}>
              <h2 className="font-heading text-3xl font-extrabold text-ink-900 mb-4">{r.heading}</h2>
              <p className="text-ink-600 leading-relaxed text-lg">{r.body}</p>
            </div>
            <div className={`bg-gradient-to-br from-brand-50 to-sky2-100 rounded-3xl aspect-video flex items-center justify-center ${i % 2 ? 'lg:order-1' : ''}`}>
              <span className="text-brand-500 font-heading font-bold text-2xl opacity-30">{r.heading.split(' ')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ProcessSteps({ steps }: { steps: string[] }) {
  return (
    <section className="py-20 bg-ink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-extrabold text-ink-900 text-center mb-12">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-ink-200">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center mb-4">{i + 1}</div>
              <p className="text-ink-700 font-medium">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-ink-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="font-heading text-4xl lg:text-5xl font-extrabold text-brand-500">{s.value}</p>
            <p className="text-sm text-ink-300 mt-2 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-heading text-3xl font-extrabold text-ink-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-ink-100 rounded-xl p-5 cursor-pointer">
              <summary className="font-bold text-ink-900 flex justify-between items-center">
                {f.q}
                <span className="text-brand-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
              </summary>
              <p className="text-ink-600 mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTABanner({ heading, ctaText = 'Get Free Audit', ctaHref = '/contact' }: { heading: string; ctaText?: string; ctaHref?: string }) {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-6">{heading}</h2>
        <Link href={ctaHref} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-bold rounded-full hover:bg-ink-100 transition uppercase tracking-wide text-sm">
          {ctaText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

export function ClientQuote({ quote, author }: { quote: string; author: string }) {
  return (
    <section className="py-20 bg-ink-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Quote className="w-12 h-12 text-brand-500 mx-auto mb-6" />
        <p className="font-heading text-2xl lg:text-3xl text-ink-900 leading-relaxed italic mb-6">&ldquo;{quote}&rdquo;</p>
        <p className="text-ink-600 font-semibold">— {author}</p>
      </div>
    </section>
  )
}

export function MetricsStrip({ metrics }: { metrics: { metric: string; delta: string }[] }) {
  return (
    <section className="bg-ink-900 text-white py-14">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="font-heading text-3xl font-extrabold text-brand-500">{m.delta}</p>
            <p className="text-sm text-ink-300 mt-2">{m.metric}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function KeyInsightCallout({ text }: { text: string }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-l-4 border-brand-500 bg-brand-50 rounded-r-2xl p-8">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Key Insight</p>
          <p className="font-heading text-xl text-ink-900 leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
          <span className="text-ink-700">{it}</span>
        </li>
      ))}
    </ul>
  )
}
