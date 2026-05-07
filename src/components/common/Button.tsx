import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-stellar-purple text-white hover:bg-purple-700 focus-visible:ring-purple-500',
  secondary: 'bg-stellar-cyan text-stellar-blue hover:bg-cyan-400 focus-visible:ring-cyan-400',
  ghost: 'bg-transparent text-gray-300 hover:bg-white/10 focus-visible:ring-white/30',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
