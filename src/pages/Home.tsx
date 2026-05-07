import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletButton } from '@/components/wallet/WalletButton'
import { useWallet } from '@/hooks/useWallet'

export default function Home() {
  const { isConnected } = useWallet()
  const navigate = useNavigate()

  useEffect(() => {
    if (isConnected) navigate('/dashboard')
  }, [isConnected, navigate])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stellar-blue px-4 text-center">
      <div className="mb-6 text-6xl" aria-hidden="true">✦</div>
      <h1 className="mb-3 text-4xl font-bold text-white">StellarSplit</h1>
      <p className="mb-8 max-w-md text-gray-400">
        Trustless bill splitting and payment pooling on Stellar. Create a pool, invite your group,
        and settle in USDC or XLM — no middlemen.
      </p>
      <WalletButton />
      <p className="mt-6 text-xs text-gray-600">
        Powered by Stellar · Non-custodial · Open source
      </p>
    </main>
  )
}
