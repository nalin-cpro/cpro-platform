import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactTemplate({ page }: { page: { title: string; h1?: string | null } }) {
  return (
    <>
      <section className="bg-white py-20 border-b border-ink-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="font-heading text-5xl font-extrabold text-ink-900 mb-4">{page.h1 || page.title}</h1>
          <p className="text-lg text-ink-600">We typically respond within 4 working hours.</p>
        </div>
      </section>
      <section className="py-20 bg-ink-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
              <div><p className="font-bold text-ink-900">Email</p><a href="mailto:hello@conversionprollp.com" className="text-ink-600 hover:text-brand-500">hello@conversionprollp.com</a></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center"><Phone className="w-5 h-5" /></div>
              <div><p className="font-bold text-ink-900">Phone / WhatsApp</p><p className="text-ink-600">+91 98765 43210</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
              <div><p className="font-bold text-ink-900">Office</p><p className="text-ink-600">Pune, Maharashtra, India</p></div>
            </div>
          </div>
          <form className="bg-white rounded-2xl p-8 border border-ink-200 space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-brand-500" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-brand-500" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-brand-500" />
            <textarea placeholder="How can we help?" rows={5} className="w-full px-4 py-3 border border-ink-200 rounded-lg focus:outline-none focus:border-brand-500" />
            <button type="submit" className="w-full px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm transition">Send message</button>
          </form>
        </div>
      </section>
    </>
  )
}
