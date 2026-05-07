import { describe, it, expect } from 'vitest'
import { isValidPublicKey, validatePoolForm } from './validation'

describe('isValidPublicKey', () => {
  it('accepts a valid Stellar public key', () => {
    expect(isValidPublicKey('GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5')).toBe(true)
  })

  it('rejects invalid keys', () => {
    expect(isValidPublicKey('not-a-key')).toBe(false)
    expect(isValidPublicKey('')).toBe(false)
  })
})

describe('validatePoolForm', () => {
  it('returns errors for empty fields', () => {
    const errs = validatePoolForm({ name: '', totalAmount: '', deadline: '' })
    expect(errs.name).toBeDefined()
    expect(errs.totalAmount).toBeDefined()
    expect(errs.deadline).toBeDefined()
  })

  it('returns no errors for valid input', () => {
    const errs = validatePoolForm({
      name: 'Trip',
      totalAmount: '100',
      deadline: '2099-12-31',
    })
    expect(Object.keys(errs)).toHaveLength(0)
  })
})
