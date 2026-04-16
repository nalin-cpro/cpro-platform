'use client'
import { useState, useEffect } from 'react'

export default function HomepageEditor() {
  const [html, setHtml] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/homepage')
      .then(r => r.json())
      .then(data => {
        setHtml(data.html || '')
        setEnabled(data.enabled || false)
        setLoading(false)
      })
  }, [])

  async function save(enable: boolean) {
    setSaving(true)
    setStatus('')
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, enabled: enable }),
      })
      const data = await res.json()
      if (data.success) {
        setEnabled(enable)
        setStatus(enable ? '✓ Saved and live on homepage' : '✓ Saved as draft — homepage shows default template')
      } else {
        setStatus('✗ Save failed')
      }
    } catch {
      setStatus('✗ Network error')
    }
    setSaving(false)
  }

  if (loading) return (
    <div style={{ padding: 40, fontFamily: 'Inter, sans-serif' }}>Loading...</div>
  )

  return (
    <div style={{
      padding: 32,
      fontFamily: 'Inter, sans-serif',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: 24, fontWeight: 700,
        color: '#0d1c32', marginBottom: 8
      }}>
        Homepage HTML Editor
      </h1>
      <p style={{ color: '#64748b', marginBottom: 24, fontSize: 14 }}>
        Paste your full page HTML here.
        {enabled
          ? ' ✓ Custom HTML is currently live on the homepage.'
          : ' The default React template is currently showing.'}
      </p>

      {/* Status */}
      {status && (
        <div style={{
          padding: '10px 16px',
          borderRadius: 8,
          marginBottom: 16,
          background: status.startsWith('✓') ? '#f0fdf4' : '#fef2f2',
          color: status.startsWith('✓') ? '#16a34a' : '#dc2626',
          fontSize: 14,
          fontWeight: 500,
          border: `1px solid ${status.startsWith('✓') ? '#bbf7d0' : '#fecaca'}`,
        }}>
          {status}
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={html}
        onChange={e => setHtml(e.target.value)}
        placeholder="Paste your full HTML here..."
        style={{
          width: '100%',
          height: 600,
          fontFamily: 'Monaco, Menlo, "Courier New", monospace',
          fontSize: 13,
          lineHeight: 1.6,
          padding: 16,
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          resize: 'vertical',
          outline: 'none',
          color: '#1e293b',
          background: '#f8fafc',
          marginBottom: 16,
        }}
        spellCheck={false}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => save(true)}
          disabled={saving || !html.trim()}
          style={{
            padding: '12px 24px',
            background: '#b72301',
            color: '#ffffff',
            border: 'none',
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: 14,
            cursor: saving || !html.trim() ? 'not-allowed' : 'pointer',
            opacity: saving || !html.trim() ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {saving ? 'Saving...' : 'Save & Go Live'}
        </button>

        <button
          onClick={() => save(false)}
          disabled={saving}
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: '#475569',
            border: '1.5px solid #e2e8f0',
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: 14,
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          Save as Draft
        </button>

        {enabled && (
          <button
            onClick={() => save(false)}
            disabled={saving}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              color: '#dc2626',
              border: '1.5px solid #fecaca',
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: 14,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            Disable Override
          </button>
        )}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '12px 24px',
            background: '#f1f5f9',
            color: '#475569',
            border: 'none',
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          View Live Site ↗
        </a>
      </div>

      {/* Helper text */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: '#fffbeb',
        borderRadius: 10,
        border: '1px solid #fde68a',
        fontSize: 13,
        color: '#92400e',
        lineHeight: 1.6,
      }}>
        <strong>How to use:</strong> Paste your complete HTML (without &lt;html&gt;, &lt;head&gt;, nav or footer —
        those are already in the layout). Click &quot;Save &amp; Go Live&quot; to publish instantly.
        Click &quot;Disable Override&quot; to go back to the default React homepage.
      </div>
    </div>
  )
}
