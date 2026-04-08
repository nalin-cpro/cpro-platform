'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Save, Globe, Layers } from 'lucide-react'
import { PAGE_TYPES } from '@/lib/layout-resolver'

const LayoutEditor = dynamic(() => import('@/components/admin/LayoutEditor'), { ssr: false })

const LABELS: Record<string, string> = {
  home: 'Home', service: 'Service', location: 'Location', blog: 'Blog',
  'case-study': 'Case study', contact: 'Contact', landing: 'Landing',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TemplateEditor({ template: initial }: { template: any }) {
  const [tpl, setTpl] = useState(initial)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  async function save(extra: Record<string, unknown> = {}) {
    setSaving(true)
    const res = await fetch(`/api/admin/templates/${tpl.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...tpl, ...extra }),
    })
    if (res.ok) setTpl(await res.json())
    setSaving(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link href="/admin/templates" className="text-sm text-ink-500 hover:text-brand-500 inline-flex items-center gap-1 mb-4"><ArrowLeft className="w-3 h-3" /> Back to templates</Link>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-brand-500" />
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-ink-900">{tpl.name}</h1>
            <p className="text-xs text-ink-500 mt-1">Page type: <span className="font-semibold text-ink-700">{LABELS[tpl.pageType] || tpl.pageType}</span></p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded font-semibold ${tpl.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{tpl.status}</span>
      </div>

      <div className="bg-white border border-ink-200 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-ink-700">Name</span>
          <input value={tpl.name} onChange={e => setTpl({ ...tpl, name: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink-700">Page type</span>
          <select value={tpl.pageType} onChange={e => setTpl({ ...tpl, pageType: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg">
            {PAGE_TYPES.map(t => <option key={t} value={t}>{LABELS[t]}</option>)}
          </select>
        </label>
        <div className="border-t border-ink-100 pt-4">
          <p className="text-sm font-bold text-ink-700 mb-2">Layout</p>
          {tpl.layoutHtml ? (
            <p className="text-xs text-green-700 mb-3">✓ Layout HTML stored ({tpl.layoutHtml.length} chars)</p>
          ) : (
            <p className="text-xs text-yellow-700 mb-3">No layout yet — click below to start building</p>
          )}
          <button onClick={() => setEditing(true)} className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm">Open layout editor</button>
        </div>
      </div>

      {editing && (
        <LayoutEditor
          initialData={tpl.layoutJson || undefined}
          initialHtml={tpl.layoutHtml || undefined}
          onSave={async ({ html, css, json }) => {
            const res = await fetch('/api/admin/save-layout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: tpl.id, type: 'template', html, css, json }),
            })
            if (res.ok) setTpl({ ...tpl, layoutHtml: html, layoutCss: css, layoutJson: json })
            setEditing(false)
          }}
          onClose={() => setEditing(false)}
        />
      )}

      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-ink-200 p-4 flex items-center justify-between">
        <span className="text-xs text-ink-500">{saving ? 'Saving...' : 'All changes ready'}</span>
        <div className="flex gap-3">
          <button onClick={() => save()} className="px-5 py-2.5 border border-ink-200 hover:border-brand-500 text-ink-700 font-bold rounded-full text-sm flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
          <button onClick={() => save({ status: tpl.status === 'published' ? 'draft' : 'published' })} className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full text-sm flex items-center gap-2 uppercase tracking-wide"><Globe className="w-4 h-4" /> {tpl.status === 'published' ? 'Unpublish' : 'Publish'}</button>
        </div>
      </div>
      <div className="h-20" />
    </div>
  )
}
