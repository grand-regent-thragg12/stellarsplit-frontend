import { Link } from 'react-router-dom'
import type { Pool } from '@/types'
import { Badge } from '@/components/common/Badge'
import { formatAmount, formatDate, isExpired } from '@/utils/format'
const statusVariant: Record<Pool['status'], 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  open: 'info',
  confirmed: 'warning',
  settled: 'success',
  expired: 'error',
}

interface PoolCardProps {
  pool: Pool
}

export function PoolCard({ pool }: PoolCardProps) {
  const paidCount = pool.members.filter(m => m.status === 'paid').length
  const progress = pool.members.length > 0 ? (paidCount / pool.members.length) * 100 : 0
  const expired = isExpired(pool.deadline) && pool.status === 'open'

  return (
    <Link
      to={`/pools/${pool.id}`}
      className="block rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-stellar-purple/50 hover:bg-white/10"
      aria-label={`View pool ${pool.name}`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{pool.name}</h3>
        <Badge variant={expired ? 'error' : statusVariant[pool.status]}>
          {expired ? 'expired' : pool.status}
        </Badge>
      </div>

      <p className="mb-4 text-xl font-bold text-stellar-cyan">
        {formatAmount(pool.totalAmount, pool.currency)}
      </p>

      <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
        <span>{paidCount} / {pool.members.length} paid</span>
        <span>Due {formatDate(pool.deadline)}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-stellar-purple transition-all"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${Math.round(progress)}% settled`}
        />
      </div>
    </Link>
  )
}
