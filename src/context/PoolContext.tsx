import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { Pool } from '@/types'
import { BACKEND_URL } from '@/utils/constants'

interface PoolContextValue {
  pools: Pool[]
  loading: boolean
  error: string | null
  fetchPools: (publicKey: string) => Promise<void>
  getPool: (id: string) => Pool | undefined
  addPool: (pool: Pool) => void
  updatePool: (pool: Pool) => void
}

const PoolContext = createContext<PoolContextValue | null>(null)

export function PoolProvider({ children }: { children: ReactNode }) {
  const [pools, setPools] = useState<Pool[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPools = useCallback(async (publicKey: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BACKEND_URL}/pools?member=${publicKey}`)
      if (!res.ok) throw new Error('Failed to fetch pools')
      const data: Pool[] = await res.json()
      setPools(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  const getPool = useCallback((id: string) => pools.find(p => p.id === id), [pools])

  const addPool = useCallback((pool: Pool) => setPools(prev => [pool, ...prev]), [])

  const updatePool = useCallback(
    (pool: Pool) => setPools(prev => prev.map(p => (p.id === pool.id ? pool : p))),
    [],
  )

  return (
    <PoolContext.Provider value={{ pools, loading, error, fetchPools, getPool, addPool, updatePool }}>
      {children}
    </PoolContext.Provider>
  )
}

export function usePoolContext() {
  const ctx = useContext(PoolContext)
  if (!ctx) throw new Error('usePoolContext must be used inside PoolProvider')
  return ctx
}
