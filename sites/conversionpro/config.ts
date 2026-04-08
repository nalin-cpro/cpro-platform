import { SiteConfig } from '@/lib/types/site-config'

const config: SiteConfig = {
  id: 'conversionpro',
  name: 'ConversionPro LLP',
  domain: 'conversionprollp.com',
  stagingDomain: 'stagingdev.conversionprollp.com',
  tagline: 'Data-driven digital marketing, CRO and Zoho consulting',
  description: 'ConversionPro LLP helps eCommerce brands and mid-sized businesses grow through CRO, digital marketing, marketplace management, and Zoho implementation.',
  brand: {
    primaryColor: '#EE4D34',
    secondaryColor: '#2B2B2B',
    accentColor: '#FF6B4A',
    fontHeading: 'Manrope',
    fontBody: 'Inter',
    logoPath: '/brand/logo.png',
    faviconPath: '/brand/favicon.ico',
  },
  contact: {
    email: 'hello@conversionprollp.com',
    phone: '+91 98765 43210',
    address: 'Pune, Maharashtra, India',
    whatsapp: '+91 98765 43210',
    calendlyUrl: '',
  },
  social: {
    linkedin: 'https://linkedin.com/company/conversionpro',
    instagram: 'https://instagram.com/conversionprollp',
    twitter: '',
    facebook: '',
    youtube: '',
  },
  seo: {
    defaultTitle: 'ConversionPro LLP — Digital Marketing & CRO Agency India',
    defaultDescription: 'Data-driven CRO, digital marketing, Zoho consulting and marketplace management for eCommerce brands across India.',
    ga4Id: '',
    gtmId: '',
  },
  features: {
    aiPipeline: true,
    blogEnabled: true,
    caseStudiesEnabled: true,
    marketplaceEnabled: true,
    zohoEnabled: true,
    layoutEditor: true,
  },
  activeClusters: ['digital-marketing', 'cro', 'marketplaces', 'development', 'zoho'],
  activeCities: ['pune', 'mumbai', 'bangalore', 'delhi', 'hyderabad', 'chennai'],
}

export default config
