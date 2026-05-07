import { Modal } from '@/components/common/Modal'
import { useWallet } from '@/hooks/useWallet'

const WALLETS = [
  { id: 'freighter', name: 'Freighter', icon: '🔑' },
  { id: 'lobstr', name: 'Lobstr', icon: '🦞' },
  { id: 'xbull', name: 'xBull', icon: '🐂' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
]

interface WalletModalProps {
  open: boolean
  onClose: () => void
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const { connect, isConnecting, error } = useWallet()

  const handleConnect = async () => {
    await connect()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Connect Wallet">
      <p className="mb-4 text-sm text-gray-400">
        Choose a Stellar wallet to connect to StellarSplit.
      </p>
      <div className="flex flex-col gap-2">
        {WALLETS.map(wallet => (
          <button
            key={wallet.id}
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-left text-white transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            <span className="text-xl" aria-hidden="true">{wallet.icon}</span>
            <span className="font-medium">{wallet.name}</span>
          </button>
        ))}
      </div>
      {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}
    </Modal>
  )
}
