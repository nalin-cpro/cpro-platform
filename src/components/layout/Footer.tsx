import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6 md:w-1/3">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
            <span className="text-lg font-black text-white font-headline">CONVERSIONPRO</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Pune&apos;s leading conversion-focused agency helping brands scale profitably through UX, CRO, and performance marketing.
          </p>
          <div className="flex gap-4">
            <a href="https://linkedin.com/company/conversionpro" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a href="https://instagram.com/conversionprollp" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-sm">hub</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-primary uppercase text-xs tracking-widest">Solutions</p>
            <Link href="/cro" className="text-slate-400 hover:text-white transition-colors text-sm">CRO</Link>
            <Link href="/digital-marketing" className="text-slate-400 hover:text-white transition-colors text-sm">Digital Marketing</Link>
            <Link href="/marketplaces" className="text-slate-400 hover:text-white transition-colors text-sm">Marketplaces</Link>
            <Link href="/zoho" className="text-slate-400 hover:text-white transition-colors text-sm">Zoho Services</Link>
            <Link href="/development" className="text-slate-400 hover:text-white transition-colors text-sm">Web Development</Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-primary uppercase text-xs tracking-widest">Company</p>
            <Link href="/case-studies" className="text-slate-400 hover:text-white transition-colors text-sm">Case Studies</Link>
            <Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">Blog</Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} ConversionPro LLP. All rights reserved.</p>
        <p>Made with precision in Pune.</p>
      </div>
    </footer>
  )
}
