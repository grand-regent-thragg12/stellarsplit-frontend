import type { Pool } from '@/types'

interface SummaryStatsProps {
  pools: Pool[]
}

export function SummaryStats({ pools }: SummaryStatsProps) {
  const total = pools.length
  const settled = pools.filter(p => p.status === 'settled').length
  const open = pools.filter(p => p.status === 'open').length
  const totalValue = pools.reduce((sum, p) => sum + p.totalAmount, 0)

  const stats = [
    { label: 'Total Pools', value: total },
    { label: 'Open', value: open },
    { label: 'Settled', value: settled },
    { label: 'Total Value (USDC)', value: totalValue.toFixed(2) },
  ]

  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <dt className="text-xs text-gray-400">{stat.label}</dt>
          <dd className="mt-1 text-2xl font-bold text-white">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
