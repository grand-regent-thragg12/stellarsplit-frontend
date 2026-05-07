/** Validate a Stellar public key (G... 56 chars) */
export function isValidPublicKey(key: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(key)
}

/** Validate pool creation form fields */
export function validatePoolForm(data: {
  name: string
  totalAmount: string
  deadline: string
}): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) errors.name = 'Pool name is required'
  if (data.name.trim().length > 60) errors.name = 'Name must be 60 characters or fewer'

  const amount = parseFloat(data.totalAmount)
  if (!data.totalAmount || isNaN(amount) || amount <= 0)
    errors.totalAmount = 'Enter a valid amount greater than 0'

  if (!data.deadline) {
    errors.deadline = 'Deadline is required'
  } else if (new Date(data.deadline) <= new Date()) {
    errors.deadline = 'Deadline must be in the future'
  }

  return errors
}
