import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { validatePoolForm } from '@/utils/validation'
import { usePoolContext } from '@/context/PoolContext'
import { useWallet } from '@/hooks/useWallet'
import { useCurrency } from '@/hooks/useCurrency'
import type { Currency, Pool } from '@/types'
import { BACKEND_URL } from '@/utils/constants'

export function PoolForm() {
  const navigate = useNavigate()
  const { addPool } = usePoolContext()
  const { publicKey } = useWallet()
  const { currency, toggle } = useCurrency('USDC')

  const [form, setForm] = useState({ name: '', description: '', totalAmount: '', deadline: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validatePoolForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)

    try {
      const payload = {
        name: form.name,
        description: form.description,
        totalAmount: parseFloat(form.totalAmount),
        currency: currency as Currency,
        deadline: new Date(form.deadline).toISOString(),
        creatorKey: publicKey!,
      }

      const res = await fetch(`${BACKEND_URL}/pools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to create pool')
      const pool: Pool = await res.json()
      addPool(pool)
      navigate(`/pools/${pool.id}`)
    } catch {
      setErrors({ submit: 'Failed to create pool. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Input label="Pool Name" value={form.name} onChange={set('name')} error={errors.name} placeholder="e.g. Bali Trip 2025" required />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-300">Description (optional)</label>
        <textarea
          id="description"
          value={form.description}
          onChange={set('description')}
          rows={2}
          placeholder="What's this pool for?"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-stellar-purple"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input label="Total Amount" type="number" min="0" step="any" value={form.totalAmount} onChange={set('totalAmount')} error={errors.totalAmount} placeholder="0.00" required />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">Currency</span>
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-stellar-cyan hover:bg-white/10"
            aria-label={`Switch to ${currency === 'USDC' ? 'XLM' : 'USDC'}`}
          >
            {currency}
          </button>
        </div>
      </div>

      <Input label="Deadline" type="date" value={form.deadline} onChange={set('deadline')} error={errors.deadline} required />

      {errors.submit && <p className="text-sm text-red-400" role="alert">{errors.submit}</p>}

      <Button type="submit" loading={submitting} size="lg">
        Create Pool
      </Button>
    </form>
  )
}
