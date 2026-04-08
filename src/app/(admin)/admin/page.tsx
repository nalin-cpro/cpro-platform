import { prisma } from '@/lib/db'
import Link from 'next/link'
import { FileText, Newspaper, Briefcase, Image, Sparkles, ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const [pages, blogs, caseStudies, media, jobs] = await Promise.all([
    prisma.page.count(),
    prisma.blogPost.count(),
    prisma.caseStudy.count(),
    prisma.media.count(),
    prisma.aiJob.count(),
  ])
  const recent = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' }, take: 5, select: { id: true, slug: true, title: true, status: true, updatedAt: true } })

  const cards = [
    { label: 'Pages',        value: pages,       icon: FileText,  href: '/admin/pages' },
    { label: 'Blog posts',   value: blogs,       icon: Newspaper, href: '/admin/blog' },
    { label: 'Case studies', value: caseStudies, icon: Briefcase, href: '/admin/case-studies' },
    { label: 'Media files',  value: media,       icon: Image,     href: '/admin/media' },
    { label: 'AI jobs run',  value: jobs,        icon: Sparkles,  href: '/admin/ai-generate' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-ink-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="bg-white border border-ink-200 hover:border-brand-500 rounded-2xl p-6 transition">
            <c.icon className="w-6 h-6 text-brand-500 mb-3" />
            <p className="font-heading text-3xl font-extrabold text-ink-900">{c.value}</p>
            <p className="text-sm text-ink-500 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-ink-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-ink-900">Recent pages</h2>
          <Link href="/admin/pages" className="text-xs text-brand-500 font-bold uppercase tracking-wide">View all <ArrowRight className="inline w-3 h-3" /></Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-ink-500">No pages yet — head to <Link href="/admin/ai-generate" className="text-brand-500 font-semibold">AI Generate</Link> to create some.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {recent.map(p => (
              <li key={p.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-ink-800">{p.title}</p>
                  <p className="font-mono text-xs text-ink-500">/{p.slug}</p>
                </div>
                <Link href={`/admin/pages/${p.id}`} className="text-brand-500 text-xs font-bold uppercase">Edit</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
