import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { PoolCard } from '@/components/pool/PoolCard'
import { SummaryStats } from '@/components/dashboard/SummaryStats'
import { usePools } from '@/hooks/usePool'

export default function Dashboard() {
  const { pools, loading, error } = usePools()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <Link to="/pools/new">
          <Button>+ New Pool</Button>
        </Link>
      </div>

      <SummaryStats pools={pools} />

      <section className="mt-8" aria-label="Your pools">
        <h2 className="mb-4 text-lg font-semibold text-white">Your Pools</h2>

        {loading && (
          <p className="text-gray-400" aria-live="polite">Loading pools...</p>
        )}

        {error && (
          <p className="text-red-400" role="alert">{error}</p>
        )}

        {!loading && !error && pools.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center">
            <p className="mb-4 text-gray-400">No pools yet. Create one to get started.</p>
            <Link to="/pools/new">
              <Button variant="secondary">Create your first pool</Button>
            </Link>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {pools.map(pool => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </section>
    </div>
  )
}
