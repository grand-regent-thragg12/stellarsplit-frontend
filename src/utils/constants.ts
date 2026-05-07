export const STELLAR_NETWORK = import.meta.env.VITE_STELLAR_NETWORK ?? 'testnet'
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? ''
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS ?? ''
export const HORIZON_URL =
  import.meta.env.VITE_HORIZON_URL ??
  (STELLAR_NETWORK === 'mainnet'
    ? 'https://horizon.stellar.org'
    : 'https://horizon-testnet.stellar.org')
export const SOROBAN_RPC_URL =
  import.meta.env.VITE_SOROBAN_RPC_URL ??
  (STELLAR_NETWORK === 'mainnet'
    ? 'https://soroban.stellar.org'
    : 'https://soroban-testnet.stellar.org')

export const USDC_ASSET_CODE = import.meta.env.VITE_USDC_ASSET_CODE ?? 'USDC'
export const USDC_ISSUER =
  import.meta.env.VITE_USDC_ISSUER ??
  'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5'

export const STELLAR_EXPLORER_BASE =
  STELLAR_NETWORK === 'mainnet'
    ? 'https://stellar.expert/explorer/public'
    : 'https://stellar.expert/explorer/testnet'
