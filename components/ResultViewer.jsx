'use client'

import Image from 'next/image'
import LoadingOverlay from '@/components/LoadingOverlay'

export default function ResultViewer({ outputImage, isLoading, statusText, error }) {
  if (isLoading) {
    return (
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Result</h2>
        <LoadingOverlay statusText={statusText} />
      </section>
    )
  }

  if (error) {
    return (
      <section className="surface-card p-6 text-red-200">
        <h2 className="text-xl font-semibold text-red-200">Result</h2>
        <p className="mt-2 text-sm">{error}</p>
      </section>
    )
  }

  if (outputImage) {
    return (
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Result</h2>

        <div className="surface-card overflow-hidden p-4">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-border/80">
            <Image
              src={outputImage}
              alt="Generated virtual try-on result"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
              unoptimized
            />
          </div>

          <div className="mt-4 flex justify-center">
            <a
              href={outputImage}
              download="virtual-tryon-result.png"
              className="inline-flex items-center rounded-xl border border-accent/50 bg-accent/15 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/25"
            >
              Download Result
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="surface-card p-8 text-center">
      <h2 className="text-xl font-semibold text-foreground">Result</h2>
      <p className="mt-2 text-sm text-zinc-400">Your generated try-on image will appear here.</p>
    </section>
  )
}
