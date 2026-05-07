import { useEffect } from 'react'
import { usePoolContext } from '@/context/PoolContext'
import { useWallet } from './useWallet'

export function usePools() {
  const { pools, loading, error, fetchPools } = usePoolContext()
  const { publicKey, isConnected } = useWallet()

  useEffect(() => {
    if (isConnected && publicKey) {
      fetchPools(publicKey)
    }
  }, [isConnected, publicKey, fetchPools])

  return { pools, loading, error }
}

export function usePool(id: string) {
  const { getPool } = usePoolContext()
  return getPool(id)
}
