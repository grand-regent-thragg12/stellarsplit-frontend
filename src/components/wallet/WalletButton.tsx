import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { WalletModal } from './WalletModal'
import { AddressDisplay } from './AddressDisplay'
import { useWallet } from '@/hooks/useWallet'

export function WalletButton() {
  const { isConnected, publicKey, disconnect } = useWallet()
  const [showModal, setShowModal] = useState(false)

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <AddressDisplay publicKey={publicKey} link />
        <Button variant="ghost" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Connect Wallet</Button>
      <WalletModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
