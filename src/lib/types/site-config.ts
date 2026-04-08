export interface SiteConfig {
  id: string
  name: string
  domain: string
  stagingDomain: string
  tagline: string
  description: string
  brand: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontHeading: string
    fontBody: string
    logoPath: string
    faviconPath: string
  }
  contact: {
    email: string
    phone: string
    address: string
    whatsapp: string
    calendlyUrl: string
  }
  social: {
    linkedin: string
    instagram: string
    twitter: string
    facebook: string
    youtube: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
    ga4Id: string
    gtmId: string
  }
  features: {
    aiPipeline: boolean
    blogEnabled: boolean
    caseStudiesEnabled: boolean
    marketplaceEnabled: boolean
    zohoEnabled: boolean
    layoutEditor: boolean
  }
  activeClusters: string[]
  activeCities: string[]
}
