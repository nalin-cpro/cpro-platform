import Link from 'next/link'

interface HomeBody {
  hero_title?: string
  hero_subtitle?: string
}

const stats = [
  { value: '+47%', label: 'Conversion Lift', accent: true },
  { value: '90d',  label: 'Avg Result Time', accent: false },
  { value: '150+', label: 'Brands Scaled',   accent: false },
  { value: '3.2x', label: 'ROAS Growth',     accent: false },
]

const valueProp = [
  { icon: 'biotech',   title: 'Research-led decisions',  desc: 'No guesswork. Every pixel move and button placement is backed by user behavioral data and heatmaps.', color: 'text-primary' },
  { icon: 'speed',     title: 'Results in 30-90 days',    desc: 'We focus on high-impact levers that move the needle quickly, delivering tangible revenue growth within 3 months.', color: 'text-tertiary' },
  { icon: 'handshake', title: 'Long-term partnership',    desc: "We don't just audit and leave. We integrate with your team to ensure continuous iterative optimization and growth.", color: 'text-on-background' },
]

const caseStudies = [
  { span: 8, title: '+120% ROAS Increase', sub: 'Complete UX overhaul of the checkout funnel resulting in record-breaking conversion lift.', tag: 'Footwear Brand', bg: 'kinetic-gradient', large: true },
  { span: 4, metric: '+85%', label: 'SaaS Co', title: 'LTV Expansion', bg: 'bg-white border border-outline-variant/10', metricColor: 'text-tertiary' },
  { span: 4, metric: '+64%', label: 'Fashion Brand', title: 'Revenue Growth', bg: 'bg-on-background text-white', metricColor: 'text-primary' },
]

const services = [
  { icon: 'ads_click',                title: 'Digital Marketing', desc: 'Full-funnel performance marketing across Meta, Google, and marketplaces with ROI focus.', href: '/digital-marketing' },
  { icon: 'monitoring',               title: 'CRO',              desc: 'Systematic A/B testing and user research to squeeze every drop of revenue from your traffic.', href: '/cro' },
  { icon: 'storefront',               title: 'Marketplaces',     desc: 'Amazon and Flipkart advertising and account management for maximum shelf visibility.', href: '/marketplaces' },
  { icon: 'integration_instructions', title: 'Zoho One',         desc: 'Custom CRM setup and business process automation to scale operations flawlessly.', href: '/zoho' },
  { icon: 'code',                     title: 'Web Development',  desc: 'Lightning-fast headless commerce and high-converting landing pages built on modern stacks.', href: '/development' },
]

const gridStats = [
  { value: '8+',   label: 'Years of Expertise', cls: 'bg-surface-container-low' },
  { value: '150+', label: 'Happy Clients',      cls: 'kinetic-gradient text-white shadow-xl' },
  { value: '50+',  label: 'Experts Team',        cls: 'bg-on-background text-white' },
  { value: '500M', label: 'Managed Spend',       cls: 'bg-surface-container-high' },
]

const logos = ['ACME Co.', 'BrightCart', 'NorthStar', 'Plyform', 'Velura', 'Kindred', 'Lumio', 'Atrium']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HomeTemplate({ page }: { page: { title: string; bodyJson?: HomeBody | any; [key: string]: any } }) {
  const body = page.bodyJson || {}

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative px-6 py-16 md:py-32 overflow-hidden bg-surface">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 md:w-2/3">
            <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary font-label text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-wider">
              <span className="material-symbols-outlined text-sm">location_on</span>
              PUNE-BASED PERFORMANCE AGENCY
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-background leading-[1.1]">
              {body.hero_title || <>UX-led conversion that <span className="text-primary italic">drives revenue</span></>}
            </h1>
            <p className="text-lg text-secondary max-w-xl leading-relaxed">
              {body.hero_subtitle || 'We transform digital storefronts into high-performance revenue engines using data-driven research and intentional user experience design.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact" className="kinetic-gradient text-white px-8 py-4 rounded-full font-headline font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform">
                Get a free audit
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/case-studies" className="border border-outline-variant/30 bg-white/50 text-on-background px-8 py-4 rounded-full font-headline font-bold text-lg hover:bg-surface-container-low transition-colors text-center">
                See case studies
              </Link>
            </div>
          </div>

          {/* Stats badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-surface-container-lowest p-6 rounded-xl shadow-card border border-outline-variant/10">
                <p className={`text-3xl font-headline font-black ${s.accent ? 'text-primary' : 'text-on-background'}`}>{s.value}</p>
                <p className="text-xs font-label uppercase tracking-widest text-secondary mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-12 bg-surface-container-low">
        <div className="px-6 text-center mb-8">
          <p className="text-sm font-label font-bold text-secondary tracking-widest uppercase opacity-60">Trusted by 150+ world-class brands</p>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-12 animate-scroll-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="flex-shrink-0 grayscale opacity-40 hover:opacity-100 transition-opacity font-headline font-black text-xl">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="px-6 py-24 bg-surface max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {valueProp.map(v => (
            <div key={v.title} className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center">
                <span className={`material-symbols-outlined ${v.color} text-3xl`}>{v.icon}</span>
              </div>
              <h3 className="text-2xl font-headline font-bold">{v.title}</h3>
              <p className="text-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES (Bento Grid) ── */}
      <section className="py-24 bg-surface-container-low">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-headline font-extrabold">Impact Driven Work</h2>
              <p className="text-secondary mt-2">Real results for real businesses.</p>
            </div>
            <Link href="/case-studies" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              View All Stories <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main feature */}
            <Link href="/case-studies" className="md:col-span-8 group relative overflow-hidden rounded-3xl h-[400px] block">
              <div className="absolute inset-0 kinetic-gradient" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">{caseStudies[0].tag}</span>
                <h3 className="text-3xl font-headline font-extrabold mb-2">{caseStudies[0].title}</h3>
                <p className="text-white/80 max-w-md">{caseStudies[0].sub}</p>
              </div>
            </Link>
            {/* Side cards */}
            {caseStudies.slice(1).map((cs, i) => (
              <Link key={i} href="/case-studies" className={`md:col-span-4 ${cs.bg} rounded-3xl p-8 flex flex-col justify-between shadow-card min-h-[200px]`}>
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-4xl">{i === 0 ? 'hub' : 'shopping_bag'}</span>
                  <span className={`${cs.metricColor} font-black text-2xl`}>{cs.metric}</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest mb-1 opacity-60">{cs.label}</p>
                  <h4 className="text-xl font-headline font-bold">{cs.title}</h4>
                </div>
              </Link>
            ))}
            {/* Wide bottom card */}
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

      {/* ── GROWTH PARTNER + STAT GRID ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-headline font-extrabold mb-6">Your Complete Growth Partner</h2>
            <p className="text-lg text-secondary leading-relaxed mb-8">
              We don&apos;t just do marketing; we engineer growth. Our holistic approach covers everything from the first ad click to the final checkout and lifetime customer retention.
            </p>
            <div className="space-y-4">
              {['End-to-end strategy execution', 'Custom data visualization dashboards', 'Dedicated account growth manager'].map(item => (
                <div key={item} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="font-bold text-on-background">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {gridStats.map(s => (
              <div key={s.label} className={`aspect-square ${s.cls} rounded-3xl p-8 flex flex-col justify-center items-center text-center`}>
                <span className="text-4xl font-headline font-black mb-2">{s.value}</span>
                <span className="text-xs font-label uppercase font-bold tracking-widest opacity-70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-headline font-extrabold mb-4">Specialized Services</h2>
            <p className="text-secondary">Comprehensive digital solutions designed for conversion and scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(s => (
              <Link key={s.href} href={s.href} className="p-10 rounded-[2rem] bg-white border border-outline-variant/10 hover:border-primary/20 transition-all hover:shadow-card-hover group block">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 block">{s.icon}</span>
                <h3 className="text-2xl font-headline font-bold mb-4">{s.title}</h3>
                <p className="text-secondary mb-8 leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-on-background font-bold group-hover:text-primary transition-colors">
                  Learn more <span className="material-symbols-outlined text-sm">chevron_right</span>
                </span>
              </Link>
            ))}
            {/* CTA block */}
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
            <h2 className="text-4xl md:text-6xl font-headline font-black mb-6">Ready to grow your business?</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Book a 30-minute growth audit with our specialists. We&apos;ll identify at least 3 quick-win opportunities for your brand.
            </p>
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
