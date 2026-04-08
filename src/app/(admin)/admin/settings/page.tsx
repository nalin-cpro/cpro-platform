import { getSiteConfig } from '@/lib/site-config'

export default async function AdminSettings() {
  const config = await getSiteConfig()
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-ink-900 mb-2">Settings</h1>
      <p className="text-ink-600 mb-8">Site configuration is loaded from <code className="text-xs bg-ink-100 px-2 py-0.5 rounded">sites/{config.id}/config.ts</code>. Edit that file and redeploy to change these values.</p>

      <div className="bg-white border border-ink-200 rounded-2xl p-6 space-y-6">
        <Section title="Identity">
          <Row label="Site name" value={config.name} />
          <Row label="Domain" value={config.domain} />
          <Row label="Tagline" value={config.tagline} />
        </Section>
        <Section title="Contact">
          <Row label="Email" value={config.contact.email} />
          <Row label="Phone" value={config.contact.phone} />
          <Row label="Address" value={config.contact.address} />
        </Section>
        <Section title="SEO">
          <Row label="Default title" value={config.seo.defaultTitle} />
          <Row label="GA4 ID" value={config.seo.ga4Id || '—'} />
          <Row label="GTM ID" value={config.seo.gtmId || '—'} />
        </Section>
        <Section title="Brand">
          <Row label="Primary color" value={config.brand.primaryColor} swatch />
          <Row label="Secondary color" value={config.brand.secondaryColor} swatch />
          <Row label="Accent color" value={config.brand.accentColor} swatch />
          <Row label="Heading font" value={config.brand.fontHeading} />
          <Row label="Body font" value={config.brand.fontBody} />
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-brand-500 mb-3">{title}</h2>
      <div className="divide-y divide-ink-100">{children}</div>
    </div>
  )
}
function Row({ label, value, swatch }: { label: string; value: string; swatch?: boolean }) {
  return (
    <div className="py-2.5 flex items-center justify-between text-sm">
      <span className="text-ink-600">{label}</span>
      <span className="font-semibold text-ink-800 flex items-center gap-2">
        {swatch && <span className="w-4 h-4 rounded-full border border-ink-200" style={{ background: value }} />}
        {value}
      </span>
    </div>
  )
}
