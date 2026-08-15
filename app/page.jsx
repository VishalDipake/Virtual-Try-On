'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import ResultViewer from '@/components/ResultViewer'
import Toast from '@/components/Toast'
import { submitTryon } from '@/lib/apiClient'

export default function HomePage() {
  const [modelImage, setModelImage] = useState(null)
  const [garmentImage, setGarmentImage] = useState(null)
  const [status, setStatus] = useState(null)
  const [outputImage, setOutputImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statusText, setStatusText] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const handleUploadError = (message) => {
    setError(message)
    setToastMessage(message)
  }

  const handleSubmit = async () => {
    if (!modelImage || !garmentImage || isLoading) return

    try {
      setIsLoading(true)
      setError(null)
      setOutputImage(null)
      setStatus('processing')
      setStatusText('processing')

      const formData = new FormData()
      formData.append('humanImage', modelImage.file)
      formData.append('garmentImage', garmentImage.file)

      const data = await submitTryon(formData)

      if (!data?.outputImage) {
        throw new Error('No generated output image returned from API')
      }

      setOutputImage(data.outputImage)
      setStatus('completed')
      setStatusText('completed')
      setIsLoading(false)
    } catch (submitError) {
      const message = submitError?.response?.data?.error || submitError.message || 'Submission failed'
      setError(message)
      setToastMessage(message)
      setStatus('failed')
      setStatusText('failed')
      setIsLoading(false)
    }
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
          Virtual Styling Studio
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
          See your outfit before you buy.
        </h1>
        <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
          Upload your photo and a clothing image, then generate an AI try-on in seconds.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ImageUploader
          label="Your Photo"
          onImageSelect={setModelImage}
          preview={modelImage?.preview || null}
          onError={handleUploadError}
        />
        <ImageUploader
          label="Clothing Item"
          onImageSelect={setGarmentImage}
          preview={garmentImage?.preview || null}
          onError={handleUploadError}
        />
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!modelImage || !garmentImage || isLoading}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-accent px-7 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Generating...
            </span>
          ) : (
            'Try It On'
          )}
        </button>

        {status ? (
          <p className="text-xs uppercase tracking-wide text-zinc-400">Current status: {status}</p>
        ) : null}
      </div>

      <ResultViewer outputImage={outputImage} isLoading={isLoading} statusText={statusText} error={error} />

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </section>
  )
}
