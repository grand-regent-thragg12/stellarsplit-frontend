import { useState } from 'react'
import type { Currency } from '@/types'

export function useCurrency(initial: Currency = 'USDC') {
  const [currency, setCurrency] = useState<Currency>(initial)

  const toggle = () => setCurrency(c => (c === 'USDC' ? 'XLM' : 'USDC'))

  return { currency, setCurrency, toggle }
}
