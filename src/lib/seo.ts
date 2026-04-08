import { Metadata } from 'next'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'ConversionPro LLP'
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || 'http://localhost:3000'

interface SeoProps {
  title: string
  description?: string
  slug: string
  ogTitle?: string
  ogDesc?: string
}

export function buildMetadata({ title, description, slug, ogTitle, ogDesc }: SeoProps): Metadata {
  const canonical = `${SITE_URL}/${slug}`.replace(/\/+$/, '')
  return {
    title: `${title} | ${SITE_NAME}`,
    description: description || '',
    alternates: { canonical },
    openGraph: {
      title: ogTitle || title,
      description: ogDesc || description || '',
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: ogTitle || title, description: ogDesc || description || '' },
  }
}

export function buildLocalBusinessSchema(city: string, state: string, service: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: `${service} agency in ${city}, India`,
    url: SITE_URL,
    address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: state, addressCountry: 'IN' },
    areaServed: { '@type': 'City', name: city },
    serviceType: service,
  }
}

export function buildServiceSchema(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'India' },
  }
}
