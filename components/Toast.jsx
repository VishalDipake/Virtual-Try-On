'use client'

import { useEffect } from 'react'

const STYLES = {
  error: 'border-red-400/50 bg-red-500/15 text-red-100',
  success: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-100',
  info: 'border-accent/50 bg-accent/15 text-zinc-100'
}

export default function Toast({ message, type = 'error', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return undefined

    const timer = setTimeout(() => {
      if (typeof onClose === 'function') {
        onClose()
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  const tone = STYLES[type] || STYLES.error

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border px-4 py-3 text-sm shadow-xl ${tone}`}>
      <div className="flex items-center justify-between gap-4">
        <p>{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-white/20 px-2 py-0.5 text-xs hover:bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  )
}
