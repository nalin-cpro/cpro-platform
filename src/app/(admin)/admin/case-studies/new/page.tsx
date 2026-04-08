'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'

export default function NewCaseStudy() {
  const router = useRouter()
  const [intake, setIntake] = useState({
    clientAlias: '', industry: '', platform: '',
    primaryMetric: '', primaryDelta: '',
    secondaryMetric: '', secondaryDelta: '',
    timeToResult: '', challenge: '', approach: '', keyInsight: '',
  })
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<Record<string, unknown> | null>(null)

  async function generate() {
    setGenerating(true)
    const res = await fetch('/api/admin/case-study-narrative', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(intake) })
    if (res.ok) setGenerated(await res.json())
    setGenerating(false)
  }

  async function publish() {
    const slug = (intake.clientAlias || intake.industry).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const data = { ...intake, ...generated, clientName: intake.clientAlias, slug, status: 'published', approach: typeof generated?.approach === 'string' ? generated.approach : JSON.stringify(generated?.approach) }
    const res = await fetch('/api/admin/case-studies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) {
      const cs = await res.json()
      router.push(`/admin/case-studies/${cs.id}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-ink-900 mb-8">New case study</h1>
      {!generated ? (
        <div className="space-y-4">
          <input placeholder="Client alias (e.g. D2C Footwear Brand)" value={intake.clientAlias} onChange={e => setIntake({ ...intake, clientAlias: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <input placeholder="Industry" value={intake.industry} onChange={e => setIntake({ ...intake, industry: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <input placeholder="Platform (e.g. Shopify, Custom)" value={intake.platform} onChange={e => setIntake({ ...intake, platform: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Primary metric" value={intake.primaryMetric} onChange={e => setIntake({ ...intake, primaryMetric: e.target.value })} className="px-4 py-3 border border-ink-200 rounded-lg" />
            <input placeholder="Primary delta (e.g. +47%)" value={intake.primaryDelta} onChange={e => setIntake({ ...intake, primaryDelta: e.target.value })} className="px-4 py-3 border border-ink-200 rounded-lg" />
            <input placeholder="Secondary metric" value={intake.secondaryMetric} onChange={e => setIntake({ ...intake, secondaryMetric: e.target.value })} className="px-4 py-3 border border-ink-200 rounded-lg" />
            <input placeholder="Secondary delta" value={intake.secondaryDelta} onChange={e => setIntake({ ...intake, secondaryDelta: e.target.value })} className="px-4 py-3 border border-ink-200 rounded-lg" />
          </div>
          <input placeholder="Time to result (e.g. 90 days)" value={intake.timeToResult} onChange={e => setIntake({ ...intake, timeToResult: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <textarea placeholder="Challenge notes" rows={4} value={intake.challenge} onChange={e => setIntake({ ...intake, challenge: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <textarea placeholder="Approach notes" rows={4} value={intake.approach} onChange={e => setIntake({ ...intake, approach: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <textarea placeholder="Key insight" rows={3} value={intake.keyInsight} onChange={e => setIntake({ ...intake, keyInsight: e.target.value })} className="w-full px-4 py-3 border border-ink-200 rounded-lg" />
          <button onClick={generate} disabled={generating} className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm disabled:opacity-60 inline-flex items-center gap-2"><Sparkles className="w-4 h-4" /> {generating ? 'Generating narrative...' : 'Generate narrative with AI'}</button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-ink-900">Preview generated narrative</h2>
          <pre className="bg-ink-100 p-4 rounded-lg text-xs overflow-x-auto">{JSON.stringify(generated, null, 2)}</pre>
          <div className="flex gap-3">
            <button onClick={() => setGenerated(null)} className="px-5 py-2.5 border border-ink-200 hover:border-brand-500 text-ink-700 font-bold rounded-full text-sm">Re-generate</button>
            <button onClick={publish} className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm">Publish case study</button>
          </div>
        </div>
      )}
    </div>
  )
}
