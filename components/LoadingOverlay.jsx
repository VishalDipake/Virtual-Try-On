'use client'

const STATUS_MESSAGES = {
  starting: 'Submitting your images...',
  'in-queue': 'In queue, please wait...',
  processing: 'AI is generating your try-on...',
  completed: 'Done!',
  failed: 'Something went wrong'
}

export default function LoadingOverlay({ statusText }) {
  const statusKey = typeof statusText === 'string' ? statusText.toLowerCase() : ''
  const message = STATUS_MESSAGES[statusKey] || STATUS_MESSAGES.starting

  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card/70">
      <span className="relative inline-flex h-14 w-14">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30" />
        <span className="relative inline-flex h-14 w-14 animate-spin rounded-full border-4 border-accent/25 border-t-accent" />
      </span>
      <p className="text-sm font-medium text-zinc-200">{message}</p>
    </div>
  )
}
