import { SiteConfig } from './types/site-config'

const SITE_ID = process.env.SITE_ID || 'conversionpro'
let cachedConfig: SiteConfig | null = null

export async function getSiteConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig
  const mod = await import(`../../sites/${SITE_ID}/config`)
  cachedConfig = mod.default
  return cachedConfig!
}
