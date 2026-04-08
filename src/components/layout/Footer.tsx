import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  'CRO Services': [
    { label: 'Conversion Rate Optimization', href: '/conversion-rate-optimization' },
    { label: 'eCommerce CRO', href: '/conversion-rate-optimization/ecommerce' },
    { label: 'Shopify CRO', href: '/conversion-rate-optimization/shopify' },
    { label: 'Landing Page Optimization', href: '/conversion-rate-optimization/landing-page' },
    { label: 'A/B Testing', href: '/conversion-rate-optimization/ab-testing' },
  ],
  'Zoho Services': [
    { label: 'Zoho CRM Implementation', href: '/zoho-services/zoho-crm-implementation' },
    { label: 'Zoho One Consulting', href: '/zoho-services/zoho-one-consulting' },
    { label: 'Zoho Marketing Automation', href: '/zoho-services/zoho-marketing-automation' },
    { label: 'Zoho Commerce', href: '/zoho-services/zoho-commerce' },
    { label: 'Zoho Integrations', href: '/zoho-services/zoho-integrations' },
  ],
  'Digital Marketing': [
    { label: 'SEO Services', href: '/digital-marketing/seo' },
    { label: 'Google Ads / PPC', href: '/digital-marketing/ppc-google-ads' },
    { label: 'Social Media Marketing', href: '/digital-marketing/social-media-marketing' },
    { label: 'Content Marketing', href: '/digital-marketing/content-marketing' },
    { label: 'Email Marketing', href: '/digital-marketing/email-marketing' },
  ],
  'Company': [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-white inline-block rounded-md p-3 mb-4">
              <Image
                src="/brand/logo.png"
                alt="ConversionPro LLP"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-ink-400 leading-relaxed mb-4">
              Data-driven CRO, Zoho consulting, and digital marketing agency helping Indian businesses convert more.
            </p>
            <p className="text-sm text-ink-500">Pune, Maharashtra, India</p>
            <a href="mailto:hello@conversionprollp.com" className="text-sm text-brand-400 hover:text-brand-300 transition mt-1 block">
              hello@conversionprollp.com
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-400 hover:text-brand-400 transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} ConversionPro LLP. All rights reserved.
          </p>
          <p className="text-xs text-ink-600">
            CRO Agency Pune | Zoho Partner | Digital Marketing India
          </p>
        </div>
      </div>
    </footer>
  )
}
