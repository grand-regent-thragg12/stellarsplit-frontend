import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { WalletProvider } from '@/context/WalletContext'
import { PoolProvider } from '@/context/PoolContext'
import { Navbar } from '@/components/common/Navbar'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import CreatePool from '@/pages/CreatePool'
import PoolDetail from '@/pages/PoolDetail'
import History from '@/pages/History'
import { useWallet } from '@/hooks/useWallet'
import type { ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isConnected } = useWallet()
  return isConnected ? <>{children}</> : <Navigate to="/" replace />
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-stellar-blue font-sans text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/pools/new"
          element={<ProtectedRoute><CreatePool /></ProtectedRoute>}
        />
        <Route
          path="/pools/:id"
          element={<ProtectedRoute><PoolDetail /></ProtectedRoute>}
        />
        <Route
          path="/history"
          element={<ProtectedRoute><History /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <PoolProvider>
          <AppRoutes />
        </PoolProvider>
      </WalletProvider>
    </BrowserRouter>
  )
}
