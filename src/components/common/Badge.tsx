type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  error: 'bg-red-500/20 text-red-400',
  info: 'bg-stellar-cyan/20 text-stellar-cyan',
  neutral: 'bg-white/10 text-gray-300',
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
