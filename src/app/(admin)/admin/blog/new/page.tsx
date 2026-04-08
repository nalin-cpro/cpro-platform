'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewBlogPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [bodyMd, setBodyMd] = useState('')
  const [category, setCategory] = useState('')
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, bodyMd, category, status: 'draft' }),
    })
    if (res.ok) {
      const post = await res.json()
      router.push(`/admin/blog/${post.id}`)
    }
    setSaving(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-ink-900 mb-8">New blog post</h1>
      <div className="space-y-4">
        <input placeholder="Title" value={title} onChange={e => { setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <input placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} className="w-full px-4 py-3 border border-ink-200 rounded-lg font-mono text-sm" />
        <input placeholder="Category (e.g. CRO, Zoho, SEO)" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
        <textarea placeholder="Body (Markdown)" rows={20} value={bodyMd} onChange={e => setBodyMd(e.target.value)} className="w-full px-4 py-3 border border-ink-200 rounded-lg font-mono text-sm" />
        <button onClick={save} disabled={saving || !title || !slug} className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase text-sm disabled:opacity-60">{saving ? 'Creating...' : 'Create draft'}</button>
      </div>
    </div>
  )
}
