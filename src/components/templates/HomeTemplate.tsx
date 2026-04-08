import { CTABanner } from '@/components/sections/Sections'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HomeBody {
  hero_title?: string
  hero_subtitle?: string
  services?: { title: string; desc: string; href: string }[]
  stats?: { value: string; label: string }[]
  about?: string
}

export function HomeTemplate({ page }: { page: { title: string; bodyJson: HomeBody | null } }) {
  const body = page.bodyJson || {}
  return (
    <>
      <section className="relative bg-white py-20 lg:py-28 border-b border-ink-100">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-100 via-white to-sky2-100/40" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl lg:text-6xl font-extrabold text-ink-900 mb-6">{body.hero_title || page.title}</h1>
          {body.hero_subtitle && <p className="text-xl text-ink-600 max-w-3xl mx-auto mb-8">{body.hero_subtitle}</p>}
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white font-bold rounded-full uppercase tracking-wide text-sm">Get Free Audit <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
      {body.services && body.services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {body.services.map((s, i) => (
              <Link key={i} href={s.href} className="bg-white border border-ink-200 hover:border-brand-500 rounded-2xl p-7 transition">
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-2">{s.title}</h3>
                <p className="text-ink-600 text-sm">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {body.about && (
        <section className="py-20 bg-ink-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-extrabold text-ink-900 mb-5">About Us</h2>
            <p className="text-lg text-ink-600 leading-relaxed">{body.about}</p>
          </div>
        </section>
      )}
      <CTABanner heading="Ready to grow your conversions?" />
    </>
  )
}
