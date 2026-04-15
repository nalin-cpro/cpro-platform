import Link from 'next/link'
import { prisma } from '@/lib/db'
import { resolveLayout } from '@/lib/layout-resolver'
import { buildMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: '/' } })
  if (!page) return {}
  return buildMetadata({
    title: page.title,
    description: page.metaDesc || '',
    slug: '',
    ogTitle: page.ogTitle || page.title,
    ogDesc: page.ogDesc || page.metaDesc || '',
  })
}

export default async function HomePage() {
  // Check for DB-driven layout override first
  const page = await prisma.page.findUnique({ where: { slug: '/' } })
  if (page && page.status === 'published') {
    const layout = await resolveLayout(
      { useLayout: page.useLayout, layoutHtml: page.layoutHtml, layoutCss: page.layoutCss },
      page.templateId,
    )
    if (layout) {
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: layout.css }} />
          <div dangerouslySetInnerHTML={{ __html: layout.html }} />
        </>
      )
    }
  }

  // Default: render the Kinetic homepage as a React component
  return <KineticHome />
}

/* ═══════════════════════════════════════════════════════════════════════════
   KINETIC HOMEPAGE — converted from public/reference/kinetic.html
   Branding: ConversionPro LLP, all hrefs point to real routes
   No nav/footer (handled by layout), no bottom mobile nav
   ═══════════════════════════════════════════════════════════════════════════ */

function KineticHome() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative px-6 py-16 md:py-32 overflow-hidden bg-surface">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 md:w-2/3">
            <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary font-label text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-wider">
              <span className="ms text-sm">location_on</span>
              PUNE-BASED PERFORMANCE AGENCY
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-background leading-[1.1] tracking-tight">
              UX-led conversion that <span className="text-primary italic">drives revenue</span>
            </h1>
            <p className="text-lg text-secondary max-w-xl leading-relaxed">
              We transform digital storefronts into high-performance revenue engines using data-driven research and intentional user experience design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact" className="kinetic-gradient text-white px-8 py-4 rounded-full font-headline font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform">
                Get a free audit
                <span className="ms text-xl">arrow_forward</span>
              </Link>
              <Link href="/case-studies" className="border border-outline-variant/30 bg-white/50 text-on-background px-8 py-4 rounded-full font-headline font-bold text-lg hover:bg-surface-container-low transition-colors text-center">
                See case studies
              </Link>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-3xl font-headline font-black text-primary">+47%</p>
              <p className="text-xs font-label uppercase tracking-widest text-secondary mt-1">Conversion Lift</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-3xl font-headline font-black text-on-background">90d</p>
              <p className="text-xs font-label uppercase tracking-widest text-secondary mt-1">Avg Result Time</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-3xl font-headline font-black text-on-background">150+</p>
              <p className="text-xs font-label uppercase tracking-widest text-secondary mt-1">Brands Scaled</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <p className="text-3xl font-headline font-black text-tertiary">3.2x</p>
              <p className="text-xs font-label uppercase tracking-widest text-secondary mt-1">ROAS Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF: Logo Wall ── */}
      <section className="py-12 bg-surface-container-low">
        <div className="px-6 text-center mb-8">
          <p className="text-sm font-label font-bold text-secondary tracking-widest uppercase opacity-60">Trusted by 150+ world-class brands</p>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-12 animate-scroll-marquee">
            {['ACME Co.', 'BrightCart', 'NorthStar', 'Plyform', 'Velura', 'Kindred', 'Lumio', 'Atrium',
              'ACME Co.', 'BrightCart', 'NorthStar', 'Plyform', 'Velura', 'Kindred', 'Lumio', 'Atrium'].map((logo, i) => (
              <span key={i} className="flex-shrink-0 grayscale opacity-40 hover:opacity-100 transition-opacity flex items-center font-headline font-black text-xl">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROP ── */}
      <section className="px-6 py-24 bg-surface max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center">
              <span className="ms text-primary text-3xl">biotech</span>
            </div>
            <h3 className="text-2xl font-headline font-bold">Research-led decisions</h3>
            <p className="text-secondary leading-relaxed">No guesswork. Every pixel move and button placement is backed by user behavioral data and heatmaps.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-tertiary-container/10 flex items-center justify-center">
              <span className="ms text-tertiary text-3xl">speed</span>
            </div>
            <h3 className="text-2xl font-headline font-bold">Results in 30-90 days</h3>
            <p className="text-secondary leading-relaxed">We focus on high-impact levers that move the needle quickly, delivering tangible revenue growth within 3 months.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-14 h-14 rounded-2xl bg-on-background/5 flex items-center justify-center">
              <span className="ms text-on-background text-3xl">handshake</span>
            </div>
            <h3 className="text-2xl font-headline font-bold">Long-term partnership</h3>
            <p className="text-secondary leading-relaxed">We don&apos;t just audit and leave. We integrate with your team to ensure continuous iterative optimization and growth.</p>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES (Bento Grid) ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-headline font-extrabold tracking-tight">Impact Driven Work</h2>
              <p className="text-secondary mt-2">Real results for real businesses.</p>
            </div>
            <Link href="/case-studies" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              View All Stories
              <span className="ms text-sm">arrow_outward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Feature */}
            <Link href="/case-studies/fulfillment-excellence-d2c-footwear" className="md:col-span-8 group relative overflow-hidden rounded-3xl h-[400px] block">
              <div className="absolute inset-0 kinetic-gradient" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Footwear Brand</span>
                <h3 className="text-3xl font-headline font-extrabold mb-2">+120% ROAS Increase</h3>
                <p className="text-white/80 max-w-md">Complete UX overhaul of the checkout funnel resulting in record-breaking conversion lift.</p>
              </div>
            </Link>
            {/* Side 1 */}
            <div className="md:col-span-4 bg-white rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/10 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="ms text-tertiary text-4xl">hub</span>
                <span className="text-tertiary font-black text-2xl">+85%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-1">SaaS Co</p>
                <h4 className="text-xl font-headline font-bold text-on-background">LTV Expansion</h4>
              </div>
            </div>
            {/* Side 2 */}
            <div className="md:col-span-4 bg-on-background text-white rounded-3xl p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="ms text-primary text-4xl">shopping_bag</span>
                <span className="text-primary font-black text-2xl">+64%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/60 uppercase tracking-widest mb-1">Fashion Brand</p>
                <h4 className="text-xl font-headline font-bold">Revenue Growth</h4>
              </div>
            </div>
            {/* Wide bottom */}
            <div className="md:col-span-8 bg-surface-container-highest rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10">
              <div className="flex-1">
                <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-1">Manufacturing Group</p>
                <h4 className="text-2xl font-headline font-extrabold text-on-background mb-4">Streamlining B2B Lead Gen with Zoho One</h4>
                <p className="text-secondary">Reduced lead acquisition cost by 40% using automated CRM integration.</p>
              </div>
              <div className="text-5xl font-headline font-black text-primary italic">-40%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GROWTH PARTNER / Grid Stats ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-6">Your Complete Growth Partner</h2>
            <p className="text-lg text-secondary leading-relaxed mb-8">We don&apos;t just do marketing; we engineer growth. Our holistic approach covers everything from the first ad click to the final checkout and lifetime customer retention.</p>
            <div className="space-y-4">
              {['End-to-end strategy execution', 'Custom data visualization dashboards', 'Dedicated account growth manager'].map(item => (
                <div key={item} className="flex items-center gap-4">
                  <span className="ms text-primary">check_circle</span>
                  <span className="font-bold text-on-background">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-surface-container-low rounded-3xl p-8 flex flex-col justify-center items-center text-center">
              <span className="text-4xl font-headline font-black text-on-background mb-2">8+</span>
              <span className="text-xs font-label uppercase font-bold text-secondary tracking-widest">Years of Expertise</span>
            </div>
            <div className="aspect-square kinetic-gradient rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-xl">
              <span className="text-4xl font-headline font-black text-white mb-2">150+</span>
              <span className="text-xs font-label uppercase font-bold text-white/80 tracking-widest">Happy Clients</span>
            </div>
            <div className="aspect-square bg-on-background rounded-3xl p-8 flex flex-col justify-center items-center text-center">
              <span className="text-4xl font-headline font-black text-primary mb-2">50+</span>
              <span className="text-xs font-label uppercase font-bold text-white/60 tracking-widest">Experts Team</span>
            </div>
            <div className="aspect-square bg-surface-container-high rounded-3xl p-8 flex flex-col justify-center items-center text-center">
              <span className="text-4xl font-headline font-black text-tertiary mb-2">500M</span>
              <span className="text-xs font-label uppercase font-bold text-secondary tracking-widest">Managed Spend</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-4">Specialized Services</h2>
            <p className="text-secondary">Comprehensive digital solutions designed for conversion and scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'ads_click', title: 'Digital Marketing', desc: 'Full-funnel performance marketing across Meta, Google, and TikTok with ROI focus.', href: '/digital-marketing' },
              { icon: 'monitoring', title: 'CRO', desc: 'Systematic A/B testing and user research to squeeze every drop of revenue from your traffic.', href: '/cro' },
              { icon: 'storefront', title: 'Marketplaces', desc: 'Amazon and Flipkart advertising and account management for maximum shelf visibility.', href: '/marketplaces' },
              { icon: 'integration_instructions', title: 'Zoho One', desc: 'Custom CRM setup and business process automation to scale operations flawlessly.', href: '/zoho' },
              { icon: 'code', title: 'Web Development', desc: 'Lightning-fast headless commerce and high-converting landing pages built on modern stacks.', href: '/development' },
            ].map(s => (
              <Link key={s.href} href={s.href} className="p-10 rounded-[2rem] bg-white border border-outline-variant/10 hover:border-primary/20 transition-all hover:shadow-xl group block">
                <span className="ms text-4xl text-primary mb-6 block">{s.icon}</span>
                <h3 className="text-2xl font-headline font-bold mb-4">{s.title}</h3>
                <p className="text-secondary mb-8 leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-on-background font-bold group-hover:text-primary transition-colors">
                  Learn more
                  <span className="ms text-sm">chevron_right</span>
                </span>
              </Link>
            ))}
            {/* CTA Block */}
            <div className="p-10 rounded-[2rem] bg-primary text-white flex flex-col justify-center">
              <h3 className="text-3xl font-headline font-black mb-4">Don&apos;t see what you need?</h3>
              <p className="text-white/80 mb-8">We create custom growth packages for ambitious brands.</p>
              <Link href="/contact" className="bg-white text-primary px-6 py-3 rounded-full font-bold w-fit">Inquire Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto kinetic-gradient rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-black mb-6 tracking-tight">Ready to grow your business?</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">Book a 30-minute growth audit with our specialists. We&apos;ll identify at least 3 quick-win opportunities for your brand.</p>
            <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-full font-headline font-black text-xl hover:scale-105 transition-transform shadow-lg inline-block">
              Get my free audit
            </Link>
            <p className="mt-6 text-sm text-white/60 font-medium">No obligation. Just high-value strategy.</p>
          </div>
        </div>
      </section>
    </>
  )
}
