'use client'
import { useEffect, useRef } from 'react'

interface Props {
  initialData?: object
  initialHtml?: string
  onSave: (data: { html: string; css: string; json: object }) => void
  onClose: () => void
}

export default function LayoutEditor({ initialData, initialHtml, onSave, onClose }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let editor: any

    Promise.all([
      import('grapesjs'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore — grapesjs-preset-webpage has no .d.ts
      import('grapesjs-preset-webpage'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ]).then(([gjs, preset]: [any, any]) => {
      editor = gjs.default.init({
        container: containerRef.current!,
        height: '100%',
        width: '100%',
        plugins: [preset.default],
        storageManager: false,
        blockManager: { appendTo: '#grapes-blocks' },
        styleManager: { appendTo: '#grapes-styles' },
        layerManager: { appendTo: '#grapes-layers' },
      })
      if (initialData) editor.loadProjectData(initialData)
      else if (initialHtml) editor.setComponents(initialHtml)
      editorRef.current = editor
    })

    return () => { if (editor) editor.destroy() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = () => {
    if (!editorRef.current) return
    onSave({
      html: editorRef.current.getHtml(),
      css:  editorRef.current.getCss(),
      json: editorRef.current.getProjectData(),
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: '#1a1a2e' }}>
        <span style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>Layout editor</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #555', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 13 }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#EE4D34', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Save layout</button>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div id="grapes-blocks" style={{ width: 200, borderRight: '1px solid #e5e7eb', overflowY: 'auto', background: '#f9fafb' }} />
        <div ref={containerRef} style={{ flex: 1 }} />
        <div style={{ width: 240, borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
          <div id="grapes-layers" style={{ flex: '0 0 50%', overflowY: 'auto', borderBottom: '1px solid #e5e7eb' }} />
          <div id="grapes-styles" style={{ flex: '0 0 50%', overflowY: 'auto' }} />
        </div>
      </div>
    </div>
  )
}
