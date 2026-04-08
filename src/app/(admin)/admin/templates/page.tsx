import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Layers } from 'lucide-react'

const PAGE_TYPE_LABELS: Record<string, string> = {
  home: 'Home', service: 'Service', location: 'Location', blog: 'Blog',
  'case-study': 'Case study', contact: 'Contact', landing: 'Landing',
}

export default async function AdminTemplatesIndex() {
  const templates = await prisma.pageTemplate.findMany({ orderBy: [{ pageType: 'asc' }, { updatedAt: 'desc' }] })
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-heading text-3xl font-extrabold text-ink-900">Page templates</h1>
        <Link href="/admin/templates/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm"><Plus className="w-4 h-4" /> New template</Link>
      </div>
      <p className="text-ink-600 mb-8 text-sm">Templates apply site-wide to every page of their type. Individual pages can still override the template with a custom layout.</p>
      <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
        {templates.length === 0 ? (
          <p className="p-8 text-center text-ink-500">No templates yet. <Link href="/admin/templates/new" className="text-brand-500 font-bold">Create one</Link> or seed defaults.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ink-100 border-b border-ink-200">
              <tr>{['Name', 'Page type', 'Status', 'Updated', ''].map(h => <th key={h} className="text-left px-4 py-3 text-ink-600 font-bold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {templates.map(t => (
                <tr key={t.id} className="hover:bg-ink-100">
                  <td className="px-4 py-3 font-semibold text-ink-800 inline-flex items-center gap-2"><Layers className="w-4 h-4 text-brand-500" /> {t.name}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded font-semibold">{PAGE_TYPE_LABELS[t.pageType] || t.pageType}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded font-semibold ${t.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{t.status}</span></td>
                  <td className="px-4 py-3 text-xs text-ink-500">{new Date(t.updatedAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3"><Link href={`/admin/templates/${t.id}`} className="text-xs text-brand-500 font-bold uppercase">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
