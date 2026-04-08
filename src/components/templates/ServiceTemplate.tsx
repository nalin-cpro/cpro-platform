import { PageHero, FeatureStrip, AlternatingContent, ProcessSteps, StatsBar, FAQAccordion, CTABanner } from '@/components/sections/Sections'

interface ServiceBody {
  hero_subtitle?: string
  features?: { title: string; desc: string }[]
  sections?: { heading: string; body: string }[]
  process?: string[]
  stats?: { value: string; label: string }[]
  faq?: { q: string; a: string }[]
  cta_text?: string
}

export function ServiceTemplate({ page }: { page: { title: string; h1?: string | null; bodyJson: ServiceBody | null; service?: { name: string } | null } }) {
  const body = page.bodyJson || {}
  return (
    <>
      <PageHero
        eyebrow={page.service?.name || 'Service'}
        title={page.h1 || page.title}
        subtitle={body.hero_subtitle}
        ctaText="Get Free Audit"
        ctaHref="/contact"
      />
      {body.features && body.features.length > 0 && <FeatureStrip items={body.features} />}
      {body.sections && body.sections.length > 0 && <AlternatingContent rows={body.sections} />}
      {body.process && body.process.length > 0 && <ProcessSteps steps={body.process} />}
      {body.stats && body.stats.length > 0 && <StatsBar stats={body.stats} />}
      {body.faq && body.faq.length > 0 && <FAQAccordion faqs={body.faq} />}
      <CTABanner heading={body.cta_text || 'Ready to grow your conversions?'} />
    </>
  )
}
