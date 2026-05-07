import { useEffect, useState } from 'react'
import { Badge } from '@/components/common/Badge'
import { AddressDisplay } from '@/components/wallet/AddressDisplay'
import { formatAmount, formatDate } from '@/utils/format'
import { useWallet } from '@/hooks/useWallet'
import { BACKEND_URL, STELLAR_EXPLORER_BASE } from '@/utils/constants'
import type { Transaction } from '@/types'

export default function History() {
  const { publicKey } = useWallet()
  const [txs, setTxs] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!publicKey) return
    setLoading(true)
    fetch(`${BACKEND_URL}/transactions?account=${publicKey}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load history')
        return r.json() as Promise<Transaction[]>
      })
      .then(setTxs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [publicKey])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Transaction History</h1>

      {loading && <p className="text-gray-400" aria-live="polite">Loading...</p>}
      {error && <p className="text-red-400" role="alert">{error}</p>}

      {!loading && txs.length === 0 && (
        <p className="text-gray-500">No transactions yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {txs.map(tx => (
          <div
            key={tx.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-white">{tx.poolName}</span>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <AddressDisplay publicKey={tx.from} />
                <span>→</span>
                <AddressDisplay publicKey={tx.to} />
              </div>
              <span className="text-xs text-gray-500">{formatDate(tx.timestamp)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-stellar-cyan">
                {formatAmount(tx.amount, tx.currency)}
              </span>
              <Badge variant={tx.type === 'settlement' ? 'success' : tx.type === 'refund' ? 'warning' : 'info'}>
                {tx.type}
              </Badge>
              <a
                href={`${STELLAR_EXPLORER_BASE}/tx/${tx.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-stellar-cyan"
                aria-label={`View transaction ${tx.txHash} on Stellar Explorer`}
              >
                ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
