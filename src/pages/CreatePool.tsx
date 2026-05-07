import { Link } from 'react-router-dom'
import { PoolForm } from '@/components/pool/PoolForm'

export default function CreatePool() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/dashboard" className="text-gray-400 hover:text-white" aria-label="Back to dashboard">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-white">Create Pool</h1>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <PoolForm />
      </div>
    </div>
  )
}
