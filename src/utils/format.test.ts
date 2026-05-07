import { describe, it, expect } from 'vitest'
import { truncateAddress, formatAmount, isExpired } from './format'

describe('truncateAddress', () => {
  it('truncates a long key', () => {
    const key = 'GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    expect(truncateAddress(key, 4)).toBe('GABC...WXYZ')
  })

  it('returns short strings unchanged', () => {
    expect(truncateAddress('GABC', 4)).toBe('GABC')
  })
})

describe('formatAmount', () => {
  it('formats USDC', () => {
    expect(formatAmount(100, 'USDC')).toBe('100.00 USDC')
  })

  it('formats XLM', () => {
    expect(formatAmount(50.5, 'XLM')).toBe('50.50 XLM')
  })
})

describe('isExpired', () => {
  it('returns true for past dates', () => {
    expect(isExpired('2020-01-01')).toBe(true)
  })

  it('returns false for future dates', () => {
    expect(isExpired('2099-01-01')).toBe(false)
  })
})
