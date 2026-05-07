import type { Member } from '@/types'
import { Badge } from '@/components/common/Badge'
import { AddressDisplay } from '@/components/wallet/AddressDisplay'
import { formatAmount } from '@/utils/format'
import type { Currency } from '@/types'

const memberStatusVariant: Record<Member['status'], 'info' | 'warning' | 'success'> = {
  pending: 'info',
  confirmed: 'warning',
  paid: 'success',
}

interface MemberListProps {
  members: Member[]
  currency: Currency
}

export function MemberList({ members, currency }: MemberListProps) {
  if (members.length === 0) {
    return <p className="text-sm text-gray-500">No members yet. Invite someone to get started.</p>
  }

  return (
    <ul className="flex flex-col gap-2" aria-label="Pool members">
      {members.map(member => (
        <li
          key={member.publicKey}
          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
        >
          <div className="flex flex-col gap-0.5">
            {member.displayName && (
              <span className="text-sm font-medium text-white">{member.displayName}</span>
            )}
            <AddressDisplay publicKey={member.publicKey} link />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">
              {formatAmount(member.share, currency)}
            </span>
            <Badge variant={memberStatusVariant[member.status]}>{member.status}</Badge>
          </div>
        </li>
      ))}
    </ul>
  )
}
