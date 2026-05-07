import { Link, NavLink } from 'react-router-dom'
import { WalletButton } from '@/components/wallet/WalletButton'
import { useWallet } from '@/hooks/useWallet'

export function Navbar() {
  const { isConnected } = useWallet()

  return (
    <header className="border-b border-white/10 bg-stellar-blue/80 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-2 font-bold text-white">
          <span aria-hidden="true">✦</span> StellarSplit
        </Link>

        {isConnected && (
          <div className="flex items-center gap-4 text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-stellar-cyan' : 'text-gray-400 hover:text-white'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? 'text-stellar-cyan' : 'text-gray-400 hover:text-white'
              }
            >
              History
            </NavLink>
          </div>
        )}

        <WalletButton />
      </nav>
    </header>
  )
}
