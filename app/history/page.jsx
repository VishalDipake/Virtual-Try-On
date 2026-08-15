'use client'

import { useEffect, useState } from 'react'
import HistoryGrid from '@/components/HistoryGrid'
import Toast from '@/components/Toast'
import { fetchTryonHistory } from '@/lib/apiClient'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchHistory = async () => {
      try {
        const data = await fetchTryonHistory()
        if (mounted) {
          setHistory(Array.isArray(data?.history) ? data.history : [])
        }
      } catch (fetchError) {
        console.error(fetchError)
        if (mounted) {
          setError('Failed to load history.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchHistory()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Your Try-On History</h1>
        <p className="text-sm text-zinc-300">Latest completed looks are saved automatically.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="surface-card animate-pulse p-4">
              <div className="aspect-[4/5] rounded-xl bg-zinc-800/80" />
              <div className="mt-3 h-4 w-2/3 rounded bg-zinc-800/80" />
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && history.length === 0 ? (
        <div className="surface-card p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">No completed try-ons yet</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Generate your first outfit preview from the Home page to see it here.
          </p>
        </div>
      ) : null}

      {!isLoading && history.length > 0 ? <HistoryGrid items={history} /> : null}

      <Toast message={error} onClose={() => setError('')} />
    </section>
  )
}
