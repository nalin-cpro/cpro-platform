'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CaseStudyEditor({ cs: initial }: { cs: any }) {
  const [cs, setCs] = useState(initial)
  const [saving, setSaving] = useState(false)

  async function save(extra: Record<string, unknown> = {}) {
    setSaving(true)
    const res = await fetch(`/api/admin/case-studies/${cs.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...cs, ...extra }) })
    if (res.ok) setCs(await res.json())
    setSaving(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link href="/admin/case-studies" className="text-sm text-ink-500 hover:text-brand-500 inline-flex items-center gap-1 mb-4"><ArrowLeft className="w-3 h-3" /> Back</Link>
      <h1 className="font-heading text-2xl font-extrabold text-ink-900 mb-6">{cs.clientAlias || cs.clientName}</h1>
      <div className="space-y-4">
        <input value={cs.title || ''} onChange={e => setCs({ ...cs, title: e.target.value })} placeholder="Title" className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <input value={cs.metaDesc || ''} onChange={e => setCs({ ...cs, metaDesc: e.target.value })} placeholder="Meta description" className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <textarea value={cs.challenge || ''} onChange={e => setCs({ ...cs, challenge: e.target.value })} placeholder="Challenge" rows={4} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <textarea value={cs.approach || ''} onChange={e => setCs({ ...cs, approach: e.target.value })} placeholder="Approach (JSON array of strings)" rows={6} className="w-full px-4 py-3 border border-ink-200 rounded-lg font-mono text-xs" />
        <textarea value={cs.keyInsight || ''} onChange={e => setCs({ ...cs, keyInsight: e.target.value })} placeholder="Key insight" rows={3} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <textarea value={cs.clientQuote || ''} onChange={e => setCs({ ...cs, clientQuote: e.target.value })} placeholder="Client quote" rows={2} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <input value={cs.clientQuoteAuthor || ''} onChange={e => setCs({ ...cs, clientQuoteAuthor: e.target.value })} placeholder="Quote author" className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={() => save()} className="px-5 py-2.5 border border-ink-200 hover:border-brand-500 text-ink-700 font-bold rounded-full text-sm">Save</button>
        <button onClick={() => save({ status: cs.status === 'published' ? 'draft' : 'published' })} className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full text-sm uppercase tracking-wide">{cs.status === 'published' ? 'Unpublish' : 'Publish'}</button>
        <span className="text-xs text-ink-500 self-center">{saving ? 'Saving...' : ''}</span>
      </div>
    </div>
  )
}
