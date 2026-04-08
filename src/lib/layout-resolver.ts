import { prisma } from './db'

export const PAGE_TYPES = ['home', 'service', 'location', 'blog', 'case-study', 'contact', 'landing'] as const
export type PageType = typeof PAGE_TYPES[number]

export interface ResolvedLayout {
  html: string
  css: string
  source: 'override' | 'template'
}

/**
 * Resolves the layout HTML/CSS for a page record.
 *
 * Priority (new):
 *   1. Per-record override (`useLayout && layoutHtml`)  → render that
 *   2. Explicitly assigned PageTemplate (by templateId, must be published) → render that
 *   3. null → caller falls back to its React template component (the default)
 *
 * Note: there is NO automatic match by pageType. A PageTemplate is only used
 * when an editor has explicitly assigned it to a page via the admin.
 */
export async function resolveLayout(
  override?: { useLayout: boolean; layoutHtml?: string | null; layoutCss?: string | null },
  templateId?: number | null,
): Promise<ResolvedLayout | null> {
  if (override?.useLayout && override.layoutHtml) {
    return { html: override.layoutHtml, css: override.layoutCss || '', source: 'override' }
  }

  if (templateId) {
    const template = await prisma.pageTemplate.findUnique({ where: { id: templateId } })
    if (template && template.status === 'published' && template.layoutHtml) {
      return { html: template.layoutHtml, css: template.layoutCss || '', source: 'template' }
    }
  }

  return null
}

/** Returns the explicitly-assigned PageTemplate for a page, regardless of publish status. */
export async function getAssignedTemplate(templateId?: number | null) {
  if (!templateId) return null
  return prisma.pageTemplate.findUnique({ where: { id: templateId } })
}

/** Lists published PageTemplates for a given pageType — used by the admin template-picker dropdown. */
export async function listPublishedTemplatesForType(pageType: string) {
  return prisma.pageTemplate.findMany({
    where: { pageType, status: 'published' },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, pageType: true },
  })
}
