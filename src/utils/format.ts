import type { Currency } from '@/types'

/** Truncate a Stellar public key for display: GABC...XYZ */
export function truncateAddress(key: string, chars = 4): string {
  if (!key || key.length < chars * 2 + 3) return key
  return `${key.slice(0, chars)}...${key.slice(-chars)}`
}

/** Format an amount with currency label */
export function formatAmount(amount: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 7,
  }).format(amount)
  return `${formatted} ${currency}`
}

/** Format an ISO date string to a readable date */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** Returns true if the deadline has passed */
export function isExpired(deadline: string): boolean {
  return new Date(deadline) < new Date()
}
