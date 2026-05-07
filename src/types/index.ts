export type Currency = 'USDC' | 'XLM'

export type PoolStatus = 'open' | 'confirmed' | 'settled' | 'expired'

export type MemberStatus = 'pending' | 'confirmed' | 'paid'

export interface Member {
  publicKey: string
  displayName?: string
  share: number
  status: MemberStatus
}

export interface Pool {
  id: string
  name: string
  description?: string
  totalAmount: number
  currency: Currency
  status: PoolStatus
  creatorKey: string
  members: Member[]
  deadline: string // ISO date string
  createdAt: string
  contractTxHash?: string
}

export interface Transaction {
  id: string
  poolId: string
  poolName: string
  type: 'deposit' | 'settlement' | 'refund'
  amount: number
  currency: Currency
  from: string
  to: string
  txHash: string
  timestamp: string
}

export interface WalletState {
  publicKey: string | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
}
