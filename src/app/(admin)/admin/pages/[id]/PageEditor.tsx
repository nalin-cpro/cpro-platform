'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Save, Eye, Globe, ArrowLeft, Layers, ExternalLink } from 'lucide-react'

const LayoutEditor = dynamic(() => import('@/components/admin/LayoutEditor'), { ssr: false })

interface ActiveTemplate {
  id: number
  name: string
  pageType: string
  layoutHtml: string | null
  layoutCss: string | null
  layoutJson: object | null
}

export default function PageEditor({
  page: initial,
  activeTemplate,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { page: any; activeTemplate: ActiveTemplate | null }) {
  const [page, setPage] = useState(initial)
  const [tab, setTab] = useState<'content' | 'seo' | 'layout'>('content')
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  async function save(extra: Record<string, unknown> = {}) {
    setSaving(true)
    const res = await fetch(`/api/admin/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...page, ...extra }),
    })
    if (res.ok) {
      const updated = await res.json()
      setPage(updated)
    }
    setSaving(false)
  }

  async function togglePublish() {
    await save({ status: page.status === 'published' ? 'draft' : 'published' })
  }

  // When the user clicks "Override for this page only", we seed the GrapesJS editor
  // with the active template's HTML so they have a starting point instead of a blank canvas.
  const overrideSeedHtml = page.layoutHtml || activeTemplate?.layoutHtml || ''

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link href="/admin/pages" className="text-sm text-ink-500 hover:text-brand-500 inline-flex items-center gap-1 mb-4"><ArrowLeft className="w-3 h-3" /> Back to pages</Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-ink-900">{page.title}</h1>
          <p className="font-mono text-xs text-ink-500 mt-1">/{page.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded font-semibold ${page.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{page.status}</span>
          {page.useLayout && <span className="text-xs px-2 py-1 rounded font-semibold bg-green-50 text-green-700">Custom layout</span>}
        </div>
      </div>

      <div className="border-b border-ink-200 mb-6 flex gap-1">
        {(['content', 'seo', 'layout'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm font-bold uppercase tracking-wide transition border-b-2 ${tab === t ? 'border-brand-500 text-brand-500' : 'border-transparent text-ink-500 hover:text-ink-800'}`}>{t}</button>
        ))}
      </div>

      {tab === 'content' && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-ink-700">Title</span>
            <input value={page.title} onChange={e => setPage({ ...page, title: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink-700">H1</span>
            <input value={page.h1 || ''} onChange={e => setPage({ ...page, h1: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink-700">Body JSON (raw)</span>
            <textarea value={JSON.stringify(page.bodyJson, null, 2)} onChange={e => { try { setPage({ ...page, bodyJson: JSON.parse(e.target.value) }) } catch {} }} rows={18} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg font-mono text-xs" />
          </label>
        </div>
      )}

      {tab === 'seo' && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-ink-700">Meta title <em className="text-ink-500 font-normal">({(page.title || '').length}/60)</em></span>
            <input value={page.title} onChange={e => setPage({ ...page, title: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink-700">Meta description <em className="text-ink-500 font-normal">({(page.metaDesc || '').length}/155)</em></span>
            <textarea value={page.metaDesc || ''} onChange={e => setPage({ ...page, metaDesc: e.target.value })} rows={3} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink-700">Primary keyword</span>
            <input value={page.primaryKw || ''} onChange={e => setPage({ ...page, primaryKw: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-ink-700">OG image URL</span>
            <input value={page.ogImage || ''} onChange={e => setPage({ ...page, ogImage: e.target.value })} className="mt-1 w-full px-4 py-2 border border-ink-200 rounded-lg" />
          </label>
        </div>
      )}

      {tab === 'layout' && (
        <div className="space-y-4">
          <div className="bg-white border border-ink-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-bold text-ink-900 mb-1">Page layout</h2>
                {activeTemplate ? (
                  <>
                    <p className="text-sm text-ink-600 mb-3">
                      This page renders using the <strong className="text-ink-900">{activeTemplate.name}</strong> template
                      (page type: <code className="text-xs bg-ink-100 px-1.5 py-0.5 rounded">{activeTemplate.pageType}</code>).
                    </p>
                    <Link href={`/admin/templates/${activeTemplate.id}`} className="inline-flex items-center gap-1 text-sm text-brand-500 font-bold hover:underline">
                      Edit this template <ExternalLink className="w-3 h-3" />
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-ink-600 mb-3">
                    No published template for page type <code className="text-xs bg-ink-100 px-1.5 py-0.5 rounded">{page.pageType}</code>.
                    Falling back to the built-in React component.
                  </p>
                )}
              </div>
            </div>
          </div>

          {page.useLayout ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Per-page override active</p>
                <p className="text-xs text-green-700 mt-0.5">This page uses a custom layout that overrides the template above.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(true)} className="text-xs font-bold text-green-800 underline">Edit override</button>
                <button onClick={() => save({ useLayout: false })} className="text-xs font-bold text-green-800 underline">Revert to template</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} className="px-6 py-3 bg-white border-2 border-ink-200 hover:border-brand-500 text-ink-800 font-bold rounded-full uppercase tracking-wide text-sm">
              Override for this page only
            </button>
          )}
        </div>
      )}

      {editing && (
        <LayoutEditor
          initialData={page.layoutJson || undefined}
          initialHtml={overrideSeedHtml || undefined}
          onSave={async ({ html, css, json }) => {
            const res = await fetch('/api/admin/save-layout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: page.id, type: 'page', html, css, json }),
            })
            if (res.ok) setPage({ ...page, layoutHtml: html, layoutCss: css, layoutJson: json, useLayout: true })
            setEditing(false)
          }}
          onClose={() => setEditing(false)}
        />
      )}

      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-ink-200 p-4 flex items-center justify-between">
        <span className="text-xs text-ink-500">{saving ? 'Saving...' : 'All changes ready'}</span>
        <div className="flex gap-3">
          <button onClick={() => save()} className="px-5 py-2.5 border border-ink-200 hover:border-brand-500 text-ink-700 font-bold rounded-full text-sm flex items-center gap-2"><Save className="w-4 h-4" /> Save draft</button>
          <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-ink-200 hover:border-brand-500 text-ink-700 font-bold rounded-full text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> Preview</a>
          <button onClick={togglePublish} className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full text-sm flex items-center gap-2 uppercase tracking-wide"><Globe className="w-4 h-4" /> {page.status === 'published' ? 'Unpublish' : 'Publish'}</button>
        </div>
      </div>
      <div className="h-20" />
    </div>
  )
}
