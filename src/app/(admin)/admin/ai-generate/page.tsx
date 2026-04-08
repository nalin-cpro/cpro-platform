'use client'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

interface Option { slug: string; name: string }

export default function AiGenerate() {
  const [services, setServices] = useState<Option[]>([])
  const [cities, setCities] = useState<Option[]>([])
  const [service, setService] = useState('')
  const [city, setCity] = useState('')
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/admin/ai-generate').then(r => r.json()).then(d => { setServices(d.services); setCities(d.cities) })
  }, [])

  async function generate() {
    if (!service || !city) return
    setRunning(true)
    setLog(l => [...l, `Generating /${service}/${city}...`])
    const res = await fetch('/api/admin/ai-generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service, city }) })
    if (res.ok) {
      const data = await res.json()
      setLog(l => [...l, `✓ Created page #${data.id}: /${data.slug}`])
    } else {
      const err = await res.text()
      setLog(l => [...l, `✗ Error: ${err}`])
    }
    setRunning(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-ink-900 mb-2">AI Page Generation</h1>
      <p className="text-ink-600 mb-8">Generate location × service pages using Claude.</p>
      <div className="bg-white border border-ink-200 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-ink-700">Service cluster</span>
          <select value={service} onChange={e => setService(e.target.value)} className="mt-1 w-full px-4 py-2.5 border border-ink-200 rounded-lg">
            <option value="">— select —</option>
            {services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink-700">City</span>
          <select value={city} onChange={e => setCity(e.target.value)} className="mt-1 w-full px-4 py-2.5 border border-ink-200 rounded-lg">
            <option value="">— select —</option>
            {cities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </label>
        <button onClick={generate} disabled={running || !service || !city} className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-full uppercase tracking-wide text-sm disabled:opacity-60 inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> {running ? 'Generating...' : 'Generate page'}
        </button>
      </div>
      {log.length > 0 && (
        <div className="mt-6 bg-ink-900 text-green-400 rounded-2xl p-4 font-mono text-xs space-y-1">
          {log.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      )}
    </div>
  )
}
