'use client'

import Image from 'next/image'
import { useId, useRef, useState } from 'react'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-accent" aria-hidden="true">
      <path
        d="M12 16V6m0 0-4 4m4-4 4 4M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ImageUploader({ label, onImageSelect, preview, onError }) {
  const inputId = useId()
  const inputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)

  const notifyError = (message) => {
    if (typeof onError === 'function') {
      onError(message)
      return
    }

    alert(message)
  }

  const handleFile = (file) => {
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      notifyError('Only JPG, PNG, WEBP allowed')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      notifyError('Image must be under 10MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      onImageSelect(
        reader.result
          ? {
              file,
              preview: reader.result.toString()
            }
          : null
      )
    }
    reader.readAsDataURL(file)
  }

  const openPicker = () => inputRef.current?.click()

  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-200">{label}</p>

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openPicker()
          }
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`surface-card group relative h-[360px] cursor-pointer overflow-hidden transition ${
          dragActive ? 'border-accent shadow-lg shadow-accent/20' : 'hover:border-accent/60'
        }`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt={`${label} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  openPicker()
                }}
                className="rounded-lg border border-zinc-400/40 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-100 transition hover:bg-zinc-800"
              >
                Change
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onImageSelect(null)
                }}
                className="rounded-lg border border-red-400/50 bg-red-500/10 px-3 py-1.5 text-xs text-red-200 transition hover:bg-red-500/20"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <UploadIcon />
            <div>
              <p className="text-base font-semibold text-zinc-100">Drop your image here</p>
              <p className="mt-1 text-sm text-zinc-400">or click to browse JPG, PNG, WEBP files</p>
            </div>
            <p className="rounded-lg border border-border bg-zinc-900/70 px-3 py-1 text-xs text-zinc-400">
              Max size: 10MB
            </p>
          </div>
        )}

        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleFile(event.target.files?.[0])}
          className="hidden"
        />
      </div>
    </div>
  )
}
