import { useParams, Link } from 'react-router-dom'
import { usePool } from '@/hooks/usePool'
import { useWallet } from '@/hooks/useWallet'
import { MemberList } from '@/components/pool/MemberList'
import { ShareConfirm } from '@/components/pool/ShareConfirm'
import { SettlementTable } from '@/components/dashboard/SettlementTable'
import { Badge } from '@/components/common/Badge'
import { formatAmount, formatDate } from '@/utils/format'
import { STELLAR_EXPLORER_BASE } from '@/utils/constants'

export default function PoolDetail() {
  const { id } = useParams<{ id: string }>()
  const pool = usePool(id ?? '')
  const { publicKey } = useWallet()

  if (!pool) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-400">Pool not found.</p>
        <Link to="/dashboard" className="mt-4 inline-block text-stellar-cyan hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    )
  }

  const myMember = pool.members.find(m => m.publicKey === publicKey)
  const canSettle = myMember && myMember.status !== 'paid' && pool.status !== 'settled'

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-2 flex items-center gap-3">
        <Link to="/dashboard" className="text-gray-400 hover:text-white">← Back</Link>
        <h1 className="text-2xl font-bold text-white">{pool.name}</h1>
        <Badge variant={pool.status === 'settled' ? 'success' : pool.status === 'open' ? 'info' : 'warning'}>
          {pool.status}
        </Badge>
      </div>

      {pool.description && (
        <p className="mb-4 text-gray-400">{pool.description}</p>
      )}

      <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-400">
        <span>Total: <strong className="text-stellar-cyan">{formatAmount(pool.totalAmount, pool.currency)}</strong></span>
        <span>Deadline: <strong className="text-white">{formatDate(pool.deadline)}</strong></span>
        <span>Members: <strong className="text-white">{pool.members.length}</strong></span>
        {pool.contractTxHash && (
          <a
            href={`${STELLAR_EXPLORER_BASE}/tx/${pool.contractTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stellar-cyan hover:underline"
          >
            View on Explorer ↗
          </a>
        )}
      </div>

      {canSettle && (
        <div className="mb-6">
          <ShareConfirm
            pool={pool}
            memberShare={myMember.share}
            onSettled={(txHash) => console.log('Settled:', txHash)}
          />
        </div>
      )}

      <section aria-label="Settlement status" className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Settlement Status</h2>
        <SettlementTable pool={pool} />
      </section>

      <section aria-label="Members">
        <h2 className="mb-3 text-lg font-semibold text-white">Members</h2>
        <MemberList members={pool.members} currency={pool.currency} />
      </section>
    </div>
  )
}
