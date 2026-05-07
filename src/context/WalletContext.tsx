import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { WalletState } from '@/types'

interface WalletContextValue extends WalletState {
  connect: () => Promise<void>
  disconnect: () => void
  signTransaction: (xdr: string) => Promise<string>
}

const WalletContext = createContext<WalletContextValue | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  })

  const connect = useCallback(async () => {
    setState(s => ({ ...s, isConnecting: true, error: null }))
    try {
      // Stellar Wallets Kit integration point
      // In production: const kit = new StellarWalletsKit({ ... })
      // const { address } = await kit.getAddress()
      // For now we simulate a successful connection with a placeholder
      await new Promise(r => setTimeout(r, 800))
      setState({
        publicKey: 'GDEMO...REPLACE_WITH_REAL_KEY',
        isConnected: true,
        isConnecting: false,
        error: null,
      })
    } catch (err) {
      setState(s => ({
        ...s,
        isConnecting: false,
        error: err instanceof Error ? err.message : 'Connection failed',
      }))
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({ publicKey: null, isConnected: false, isConnecting: false, error: null })
  }, [])

  const signTransaction = useCallback(async (xdr: string): Promise<string> => {
    if (!state.isConnected) throw new Error('Wallet not connected')
    // In production: return await kit.signTransaction(xdr, { network })
    return xdr // passthrough stub
  }, [state.isConnected])

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect, signTransaction }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWalletContext must be used inside WalletProvider')
  return ctx
}
