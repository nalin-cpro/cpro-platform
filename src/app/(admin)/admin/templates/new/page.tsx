'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PAGE_TYPES } from '@/lib/layout-resolver'

const LABELS: Record<string, string> = {
  home: 'Home', service: 'Service', location: 'Location', blog: 'Blog',
  'case-study': 'Case study', contact: 'Contact', landing: 'Landing',
}

export default function NewTemplate() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [pageType, setPageType] = useState<string>('service')
  const [saving, setSaving] = useState(false)

  async function create() {
    setSaving(true)
    const res = await fetch('/api/admin/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pageType, status: 'draft' }),
    })
    if (res.ok) {
      const t = await res.json()
      router.push(`/admin/templates/${t.id}`)
    } else {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-ink-900 mb-2">New template</h1>
      <p className="text-ink-600 mb-8 text-sm">After creating, you&apos;ll be taken to the GrapesJS editor.</p>
      <div className="bg-white border border-ink-200 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-ink-700">Template name</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Bold service hero" className="mt-1 w-full px-4 py-3 border border-ink-200 rounded-lg" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink-700">Page type</span>
          <select value={pageType} onChange={e => setPageType(e.target.value)} className="mt-1 w-full px-4 py-3 border border-ink-200 rounded-lg">
            {PAGE_TYPES.map(t => <option key={t} value={t}>{LABELS[t]}</option>)}
          </select>
          <span className="text-xs text-ink-500 mt-1 block">All pages of this type will use this template once published.</span>
        </label>
        <button onClick={create} disabled={!name || saving} className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm disabled:opacity-60">
          {saving ? 'Creating...' : 'Create template'}
        </button>
      </div>
    </div>
  )
}
