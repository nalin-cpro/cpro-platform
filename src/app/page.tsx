import Link from 'next/link'
import { ArrowRight, BarChart3, Zap, Users, Award, TrendingUp, CheckCircle, Layout, Mail, Share2 } from 'lucide-react'

const services = [
  {
    icon: TrendingUp,
    title: 'UX-Led Conversion',
    desc: 'Data-driven CRO that turns your traffic into revenue. Heatmaps, session recordings, and A/B testing.',
    href: '/conversion-rate-optimization',
    color: 'bg-brand-50 text-brand-500',
  },
  {
    icon: Layout,
    title: 'Website Design',
    desc: 'Conversion-focused web design and development. Built for performance, optimised for results.',
    href: '/services/web-design',
    color: 'bg-sky2-100 text-ink-800',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    desc: 'Build community, drive engagement, generate leads with strategic social media campaigns.',
    href: '/digital-marketing/social-media-marketing',
    color: 'bg-lime2-100 text-ink-800',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    desc: 'Lifecycle email automation that nurtures leads and drives repeat revenue.',
    href: '/digital-marketing/email-marketing',
    color: 'bg-sun2-100 text-ink-800',
  },
  {
    icon: Zap,
    title: 'Zoho Services',
    desc: 'Certified Zoho One consulting — CRM, Marketing, Commerce, and full-stack integrations.',
    href: '/zoho-services',
    color: 'bg-brand-50 text-brand-500',
  },
  {
    icon: BarChart3,
    title: 'Digital Marketing',
    desc: 'SEO, PPC, content — full-funnel digital growth that compounds over time.',
    href: '/digital-marketing',
    color: 'bg-sky2-100 text-ink-800',
  },
]

const stats = [
  { value: '200+', label: 'Clients Served' },
  { value: '40%', label: 'Avg. Conversion Lift' },
  { value: '8+', label: 'Years Experience' },
  { value: '98%', label: 'Client Retention' },
]

const cities = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai']

const approach = [
  { icon: Users, label: 'User Experience', desc: 'Research-led design that puts the visitor first' },
  { icon: Zap, label: 'Technology', desc: 'Modern stack: Next.js, headless, AI-powered' },
  { icon: BarChart3, label: 'Analytics', desc: 'Every decision backed by data and testing' },
  { icon: Award, label: 'Certified Team', desc: 'Google, Zoho, and CXL-certified strategists' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-100 via-white to-sky2-100/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
              <Award className="w-4 h-4" />
              India&apos;s Leading CRO Agency
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-ink-900 leading-[1.05] mb-6">
              UX-Led <span className="text-brand-500">Conversion</span><br />
              That Drives Revenue
            </h1>
            <p className="text-xl text-ink-600 leading-relaxed mb-8 max-w-2xl">
              ConversionPro LLP is Pune&apos;s data-driven CRO, web design, Zoho, and digital marketing agency.
              We turn your existing traffic into customers using research, psychology, and technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full transition shadow-lg uppercase tracking-wide text-sm"
              >
                Get Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/conversion-rate-optimization"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-ink-100 text-ink-800 font-bold rounded-full transition border-2 border-ink-200 uppercase tracking-wide text-sm"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-ink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-4xl lg:text-5xl font-extrabold text-brand-500">{s.value}</p>
                <p className="text-sm text-ink-300 mt-2 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-ink-900 mb-4">Our Services</h2>
            <p className="text-lg text-ink-600 max-w-2xl mx-auto">
              Full-stack growth services — from converting your existing traffic to scaling your digital presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <Link key={s.href} href={s.href} className="group bg-white rounded-2xl p-8 border border-ink-200 hover:border-brand-500 hover:shadow-xl transition">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${s.color}`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-ink-900 mb-3 group-hover:text-brand-500 transition">{s.title}</h3>
                <p className="text-ink-600 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm font-bold text-brand-500 group-hover:gap-2 transition-all uppercase tracking-wide">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-ink-900 mb-4">Our Approach</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map(item => (
              <div key={item.label} className="bg-white rounded-2xl p-6 text-center border border-ink-200">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7" />
                </div>
                <p className="font-heading font-bold text-ink-900 text-lg mb-1">{item.label}</p>
                <p className="text-sm text-ink-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Pan-India Coverage</p>
          <h2 className="font-heading text-4xl font-extrabold text-ink-900 mb-4">Serving Major Indian Cities</h2>
          <p className="text-ink-600 mb-10 max-w-xl mx-auto">AI-generated, locally-optimised pages for each city × service combination.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map(city => (
              <Link
                key={city}
                href={`/conversion-rate-optimization/${city.toLowerCase()}`}
                className="px-5 py-2.5 bg-ink-100 hover:bg-brand-50 border border-ink-200 hover:border-brand-500 rounded-full text-sm font-semibold text-ink-700 hover:text-brand-500 transition"
              >
                CRO Agency {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 bg-ink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Why Us</p>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold mb-6">Why Businesses Choose ConversionPro</h2>
              <p className="text-ink-300 text-lg leading-relaxed mb-8">
                We&apos;re not a generic agency. We&apos;re analysts who use heatmaps, session recordings, and funnel data to find exactly where your revenue is leaking — then fix it.
              </p>
              <ul className="space-y-4">
                {[
                  'Full-funnel CRO — not just button colour changes',
                  'Certified Zoho implementation partner',
                  'Transparent, data-backed reporting',
                  'No lock-in contracts — results speak',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span className="text-ink-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full transition uppercase tracking-wide text-sm"
              >
                Book a Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-10 lg:p-14">
              <p className="font-heading text-6xl lg:text-7xl font-extrabold text-white">200+</p>
              <p className="text-white/80 text-lg mt-2 mb-8">Successful CRO projects delivered</p>
              <div className="border-t border-white/20 pt-8 grid grid-cols-2 gap-6">
                <div>
                  <p className="font-heading text-3xl font-bold text-white">40%</p>
                  <p className="text-white/70 text-sm mt-1">Avg conversion lift</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-white">98%</p>
                  <p className="text-white/70 text-sm mt-1">Client retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-ink-900 mb-4">Ready to Grow Your Conversions?</h2>
          <p className="text-lg text-ink-600 mb-8">
            Get a free website audit and CRO opportunity assessment — no strings attached.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-500 hover:bg-brand-600 text-white text-base font-bold rounded-full transition shadow-lg uppercase tracking-wide"
          >
            Get Your Free Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
