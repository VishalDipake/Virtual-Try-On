'use client'

import Image from 'next/image'

function formatDate(value) {
  if (!value) return 'Unknown date'

  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default function HistoryGrid({ items }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const key = item?._id || item?.outputImage || `${item?.createdAt || 'record'}-${index}`

        return (
          <article
            key={key}
            className="surface-card overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/50"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border/70">
              <Image
                src={item.outputImage}
                alt="Completed virtual try-on"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                unoptimized
              />
            </div>

            <p className="mt-3 text-xs uppercase tracking-wide text-zinc-400">{formatDate(item.createdAt)}</p>
          </article>
        )
      })}
    </div>
  )
}
