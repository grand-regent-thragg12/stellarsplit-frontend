import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { formatAmount } from '@/utils/format'
import { useContract } from '@/hooks/useContract'
import type { Pool } from '@/types'

interface ShareConfirmProps {
  pool: Pool
  memberShare: number
  onSettled: (txHash: string) => void
}

export function ShareConfirm({ pool, memberShare, onSettled }: ShareConfirmProps) {
  const { settleShare } = useContract()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSettle = async () => {
    setLoading(true)
    setError(null)
    try {
      const txHash = await settleShare(pool.id, memberShare, pool.currency)
      onSettled(txHash)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Settlement failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-stellar-purple/40 bg-stellar-purple/10 p-5">
      <h3 className="mb-1 font-semibold text-white">Your Share</h3>
      <p className="mb-4 text-2xl font-bold text-stellar-cyan">
        {formatAmount(memberShare, pool.currency)}
      </p>
      <p className="mb-4 text-sm text-gray-400">
        Confirming will sign and submit a transaction to the StellarSplit contract. Your wallet will
        prompt you to approve.
      </p>
      {error && <p className="mb-3 text-sm text-red-400" role="alert">{error}</p>}
      <Button onClick={handleSettle} loading={loading} className="w-full">
        Confirm &amp; Settle
      </Button>
    </div>
  )
}
