'use client'
import { useState } from 'react'
import Link from 'next/link'

// ─── types ─────────────────────────────────────────────────────────────────
interface Feature { title: string; desc: string; icon?: string }
interface Stat    { value: string; label: string }
interface Section { heading: string; body: string; bullets?: string[] }
interface FAQ     { q: string; a: string }
interface CasePreview { tag: string; headline: string; desc: string }

interface ServiceBody {
  hero_subtitle?: string
  features?: Feature[]
  stats?: Stat[]
  sections?: Section[]
  faq?: FAQ[]
  case_studies?: CasePreview[]
  cta_text?: string
}

// ─── defaults (shown when bodyJson fields are missing) ─────────────────────
const defaultFeatures: Feature[] = [
  { title: 'Full funnel audit',  desc: 'Deconstructing every touchpoint from first click to repeat purchase.', icon: 'analytics' },
  { title: 'Heatmap analysis',   desc: 'Visualising user behaviour to eliminate friction points in the UX.', icon: 'map' },
  { title: 'A/B testing',        desc: 'Rigorous scientific testing of creative, copy, and landing pages.', icon: 'science' },
  { title: 'Monthly reporting',  desc: 'Transparent, data-rich dashboards that focus on your bottom line.', icon: 'bar_chart_4_bars' },
]

const defaultStats: Stat[] = [
  { value: '+47%', label: 'Avg CVR Lift' },
  { value: '90d',  label: 'Time to Result' },
  { value: '+150', label: 'Clients Served' },
  { value: '98%',  label: 'Retention Rate' },
]

const defaultAdvantage: Section[] = [
  { heading: 'Data-driven approach',  body: 'We bypass gut feelings. Every decision is backed by statistical significance and historical performance modelling.' },
  { heading: 'Fast time to value',    body: 'Our sprint-based methodology ensures you see tangible conversion improvements within the first 30 days of implementation.' },
  { heading: 'Embedded partnership',   body: 'We operate as an extension of your team, with direct access and strategic alignment with your growth leads.' },
]

const defaultCaseStudies: CasePreview[] = [
  { tag: 'D2C Footwear',  headline: '40% RTO reduction in 60 days.', desc: 'Optimised sizing guides and post-purchase email flows reduced logistics drag significantly.' },
  { tag: 'B2B SaaS',      headline: '+47% conversion on free trial.',  desc: 'Total overhaul of landing page messaging and social proof placement for a major CRM provider.' },
]

const featureIcons = ['analytics', 'map', 'science', 'bar_chart_4_bars']
const statColors  = ['text-primary', 'text-on-surface', 'text-on-surface', 'text-tertiary']

// ─── component ─────────────────────────────────────────────────────────────
export function ServiceTemplate({ page }: {
  page: {
    title: string
    h1?: string | null
    bodyJson: ServiceBody | null
    service?: { name: string } | null
  }
}) {
  const body       = page.bodyJson || {}
  const features   = body.features?.length   ? body.features   : defaultFeatures
  const stats      = body.stats?.length      ? body.stats      : defaultStats
  const advantage  = body.sections?.length   ? body.sections   : defaultAdvantage
  const faqs       = body.faq || []
  const caseStudies = body.case_studies?.length ? body.case_studies : defaultCaseStudies
  const heroBullets = body.sections?.[0]?.bullets

  const serviceName = page.service?.name || page.title.split('|')[0].trim()

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#b72301 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-4 rounded-full bg-red-50 text-primary font-label text-xs font-bold tracking-widest uppercase mb-5">
              {serviceName}
            </span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[1.1]">
              {page.h1 || <>{serviceName} <span className="text-primary">Services</span></>}
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-8 leading-relaxed font-medium max-w-xl">
              {body.hero_subtitle || `We engineer compounding growth for high-velocity brands using data attribution and behavioural psychology.`}
            </p>

            {/* Optional hero bullet points from sections[0].bullets */}
            {heroBullets && heroBullets.length > 0 && (
              <ul className="space-y-2 mb-8 max-w-lg">
                {heroBullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 no-underline"
              >
                Get a free audit
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <Link
                href="/case-studies"
                className="bg-white border border-slate-200 text-on-surface px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-slate-50 transition-all text-center no-underline"
              >
                See case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER — dark section ── */}
      <section className="bg-slate-900 py-20 md:py-32 px-4 md:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-end mb-12 md:mb-20">
            <div>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">Outcomes-first approach.</h2>
              <p className="text-slate-400 text-base md:text-lg">We don&apos;t just run ads — we architect ecosystems that convert traffic into loyal revenue streams.</p>
            </div>
            <div className="h-px bg-slate-800 w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {features.slice(0, 4).map((f, i) => (
              <div key={i} className="p-6 md:p-8 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 transition-all group">
                <span className="material-symbols-outlined text-primary text-3xl md:text-4xl mb-4 md:mb-6 block group-hover:scale-110 transition-transform">
                  {f.icon || featureIcons[i] || 'check_circle'}
                </span>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200">
            {stats.slice(0, 4).map((s, i) => (
              <div key={i} className="bg-white p-8 md:p-12 text-center transition-colors hover:bg-surface-container-low cursor-default">
                <div className={`text-4xl sm:text-5xl md:text-6xl font-headline font-black mb-2 ${statColors[i] || 'text-on-surface'}`}>
                  {s.value}
                </div>
                <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CONVERSIONPRO ADVANTAGE ── */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">The ConversionPro Advantage</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg font-medium">Why we consistently outperform standard digital agencies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {advantage.slice(0, 3).map((s, i) => (
              <div key={i} className="p-7 md:p-10 bg-surface rounded-2xl border-b-4 border-primary shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{s.heading}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT CLIENT WINS ── */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-10 md:mb-16">Recent Client Wins</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {caseStudies.slice(0, 2).map((cs, i) => (
              <Link key={i} href="/case-studies" className="no-underline">
                <div className="group flex flex-col sm:flex-row bg-surface-container rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  {/* Placeholder image (gradient) */}
                  <div className="w-full sm:w-1/2 overflow-hidden h-60">
                    <div className={`w-full h-full flex items-center justify-center text-white text-6xl transition-transform duration-700 group-hover:scale-[1.08] ${i === 0 ? 'bg-gradient-to-br from-primary to-primary-container' : 'bg-slate-800'}`}>
                      <span className="material-symbols-outlined text-6xl opacity-30">{i === 0 ? 'shopping_bag' : 'hub'}</span>
                    </div>
                  </div>
                  <div className="p-7 md:p-10 flex flex-col justify-center w-full sm:w-1/2">
                    <span className={`text-xs font-label uppercase tracking-widest font-bold mb-3 ${i === 0 ? 'text-primary' : 'text-tertiary'}`}>
                      {cs.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 leading-tight text-on-surface">{cs.headline}</h3>
                    <p className="text-on-surface-variant mb-6 md:mb-8 font-medium text-sm md:text-base">{cs.desc}</p>
                    <span className="text-on-surface font-bold flex items-center gap-2 group-hover:text-primary transition-colors text-sm md:text-base">
                      Read Full Case Study
                      <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-xl">arrow_right_alt</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-primary to-primary-container p-8 sm:p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl -mr-32 md:-mr-48 -mt-32 md:-mt-48 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-8 leading-tight">
                {body.cta_text || <>Ready to scale your<br className="hidden sm:block" /> {serviceName}?</>}
              </h2>
              <p className="text-base md:text-xl mb-8 md:mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Stop guessing. Start growing. Let our data-driven growth engine find your missing revenue.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-base md:text-xl hover:scale-105 transition-all shadow-2xl no-underline"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── FAQ sub-component (client-side accordion) ─────────────────────────────
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">Common Questions</h2>
          <p className="text-on-surface-variant text-sm md:text-base">Everything you need to know about our process.</p>
        </div>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="bg-surface rounded-xl md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <button
                  className="w-full flex justify-between items-center text-left p-5 md:p-6 gap-4"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="text-base md:text-lg font-bold text-on-surface">{faq.q}</span>
                  <span className="material-symbols-outlined flex-shrink-0 text-slate-400">
                    {isOpen ? 'remove' : 'add'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-on-surface-variant text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
