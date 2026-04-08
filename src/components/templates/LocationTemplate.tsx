import { PageHero, AlternatingContent, FAQAccordion, CTABanner } from '@/components/sections/Sections'
import { CheckCircle } from 'lucide-react'

interface LocationBody {
  hero_subtitle?: string
  sections?: { heading: string; body: string }[]
  why_choose?: { title: string; desc: string }[]
  faq?: { q: string; a: string }[]
  cta_text?: string
}

export function LocationTemplate({ page }: { page: { title: string; h1?: string | null; bodyJson: LocationBody | null; location?: { city: string } | null; service?: { name: string } | null } }) {
  const body = page.bodyJson || {}
  return (
    <>
      <PageHero
        eyebrow={page.location?.city ? `${page.service?.name} in ${page.location.city}` : 'Location'}
        title={page.h1 || page.title}
        subtitle={body.hero_subtitle}
        ctaText="Get Local Audit"
        ctaHref="/contact"
      />
      {body.sections && body.sections.length > 0 && <AlternatingContent rows={body.sections} />}
      {body.why_choose && body.why_choose.length > 0 && (
        <section className="py-20 bg-ink-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-3xl font-extrabold text-ink-900 text-center mb-12">Why {page.location?.city} Chooses Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {body.why_choose.map((w, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 border border-ink-200">
                  <CheckCircle className="w-8 h-8 text-brand-500 mb-4" />
                  <h3 className="font-heading font-bold text-xl text-ink-900 mb-2">{w.title}</h3>
                  <p className="text-ink-600 text-sm leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {body.faq && body.faq.length > 0 && <FAQAccordion faqs={body.faq} />}
      <CTABanner heading={body.cta_text || `Ready to grow in ${page.location?.city}?`} />
    </>
  )
}
