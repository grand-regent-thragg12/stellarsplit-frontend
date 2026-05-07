import { truncateAddress } from '@/utils/format'
import { STELLAR_EXPLORER_BASE } from '@/utils/constants'

interface AddressDisplayProps {
  publicKey: string
  link?: boolean
  chars?: number
}

export function AddressDisplay({ publicKey, link = false, chars = 4 }: AddressDisplayProps) {
  const display = truncateAddress(publicKey, chars)

  if (link) {
    return (
      <a
        href={`${STELLAR_EXPLORER_BASE}/account/${publicKey}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-stellar-cyan hover:underline"
        aria-label={`View account ${publicKey} on Stellar Explorer`}
      >
        {display}
      </a>
    )
  }

  return <span className="font-mono text-gray-300">{display}</span>
}
