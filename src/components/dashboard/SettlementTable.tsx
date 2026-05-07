import type { Pool } from '@/types'
import { Badge } from '@/components/common/Badge'
import { AddressDisplay } from '@/components/wallet/AddressDisplay'
import { formatAmount } from '@/utils/format'

interface SettlementTableProps {
  pool: Pool
}

export function SettlementTable({ pool }: SettlementTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-left text-xs text-gray-400">
            <th className="px-4 py-3 font-medium">Member</th>
            <th className="px-4 py-3 font-medium">Share</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {pool.members.map(member => (
            <tr key={member.publicKey} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  {member.displayName && (
                    <span className="font-medium text-white">{member.displayName}</span>
                  )}
                  <AddressDisplay publicKey={member.publicKey} link />
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-white">
                {formatAmount(member.share, pool.currency)}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant={
                    member.status === 'paid'
                      ? 'success'
                      : member.status === 'confirmed'
                      ? 'warning'
                      : 'info'
                  }
                >
                  {member.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
