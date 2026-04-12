export function ContactTemplate({ page }: { page: { title: string; h1?: string | null } }) {
  return (
    <>
      <section className="relative px-6 py-16 md:py-24 bg-surface overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative text-center">
          <span className="inline-flex items-center gap-2 bg-surface-container-high text-primary font-label text-xs font-bold px-4 py-1.5 rounded-full w-fit tracking-wider mx-auto mb-4">
            <span className="material-symbols-outlined text-sm">mail</span>
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-on-background leading-[1.1] mb-4">
            {page.h1 || page.title}
          </h1>
          <p className="text-lg text-secondary">We typically respond within 4 working hours.</p>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface-container-low">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[
              { icon: 'mail', label: 'Email', value: 'hello@conversionprollp.com', href: 'mailto:hello@conversionprollp.com' },
              { icon: 'phone', label: 'Phone / WhatsApp', value: '+91 98765 43210' },
              { icon: 'location_on', label: 'Office', value: 'Pune, Maharashtra, India' },
            ].map(c => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">{c.icon}</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-on-background">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-secondary hover:text-primary transition-colors">{c.value}</a>
                  ) : (
                    <p className="text-secondary">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-card space-y-4">
            <input type="text" placeholder="Name" className="w-full px-5 py-3 border border-outline-variant/20 rounded-xl focus:outline-none focus:border-primary transition-colors bg-surface" />
            <input type="email" placeholder="Email" className="w-full px-5 py-3 border border-outline-variant/20 rounded-xl focus:outline-none focus:border-primary transition-colors bg-surface" />
            <input type="tel" placeholder="Phone" className="w-full px-5 py-3 border border-outline-variant/20 rounded-xl focus:outline-none focus:border-primary transition-colors bg-surface" />
            <textarea placeholder="How can we help?" rows={5} className="w-full px-5 py-3 border border-outline-variant/20 rounded-xl focus:outline-none focus:border-primary transition-colors bg-surface resize-none" />
            <button type="submit" className="w-full kinetic-gradient text-white py-4 rounded-full font-headline font-bold text-lg hover:scale-[1.02] transition-transform shadow-md">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
