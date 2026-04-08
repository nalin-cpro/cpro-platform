import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminCaseStudiesIndex() {
  const items = await prisma.caseStudy.findMany({ orderBy: { updatedAt: 'desc' } })
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-extrabold text-ink-900">Case studies</h1>
        <Link href="/admin/case-studies/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm"><Plus className="w-4 h-4" /> New case study</Link>
      </div>
      <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <p className="p-8 text-center text-ink-500">No case studies yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ink-100 border-b border-ink-200">
              <tr>{['Client', 'Industry', 'Primary metric', 'Status', ''].map(h => <th key={h} className="text-left px-4 py-3 text-ink-600 font-bold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {items.map(c => (
                <tr key={c.id} className="hover:bg-ink-100">
                  <td className="px-4 py-3 font-semibold text-ink-800">{c.clientAlias || c.clientName}</td>
                  <td className="px-4 py-3 text-xs text-ink-600">{c.industry}</td>
                  <td className="px-4 py-3 text-xs text-ink-600">{c.primaryMetric}: <strong>{c.primaryDelta}</strong></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded font-semibold ${c.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{c.status}</span></td>
                  <td className="px-4 py-3"><Link href={`/admin/case-studies/${c.id}`} className="text-xs text-brand-500 font-bold uppercase">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
