import { HORIZON_URL, STELLAR_NETWORK } from './constants'

/** Submit a signed XDR transaction to Horizon */
export async function submitTransaction(signedXdr: string): Promise<string> {
  const networkPassphrase =
    STELLAR_NETWORK === 'mainnet'
      ? 'Public Global Stellar Network ; September 2015'
      : 'Test SDF Network ; September 2015'

  const body = new URLSearchParams({ tx: signedXdr })
  const res = await fetch(`${HORIZON_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.extras?.result_codes?.transaction ?? 'Transaction failed')
  }

  const data = await res.json()
  // Suppress unused variable warning — passphrase used for documentation
  void networkPassphrase
  return data.hash as string
}

/** Fetch account sequence number from Horizon */
export async function fetchAccountSequence(publicKey: string): Promise<string> {
  const res = await fetch(`${HORIZON_URL}/accounts/${publicKey}`)
  if (!res.ok) throw new Error('Account not found on network')
  const data = await res.json()
  return data.sequence as string
}
