import { prisma } from './db'

export const PAGE_TYPES = ['home', 'service', 'location', 'blog', 'case-study', 'contact', 'landing'] as const
export type PageType = typeof PAGE_TYPES[number]

export interface ResolvedLayout {
  html: string
  css: string
  source: 'override' | 'template'
}

/**
 * Resolves the layout HTML/CSS for a given pageType, applying priority:
 *   1. (caller-handled) per-record useLayout override — pass `override` here
 *   2. published PageTemplate matching pageType
 *   3. null → caller falls back to React template
 */
export async function resolveLayout(
  pageType: string,
  override?: { useLayout: boolean; layoutHtml?: string | null; layoutCss?: string | null }
): Promise<ResolvedLayout | null> {
  if (override?.useLayout && override.layoutHtml) {
    return { html: override.layoutHtml, css: override.layoutCss || '', source: 'override' }
  }
  const template = await prisma.pageTemplate.findFirst({
    where: { pageType, status: 'published' },
    orderBy: { updatedAt: 'desc' },
  })
  if (template?.layoutHtml) {
    return { html: template.layoutHtml, css: template.layoutCss || '', source: 'template' }
  }
  return null
}

/** Returns the published template for a pageType (regardless of override). Used in admin info boxes. */
export async function getActiveTemplate(pageType: string) {
  return prisma.pageTemplate.findFirst({
    where: { pageType, status: 'published' },
    orderBy: { updatedAt: 'desc' },
  })
}
