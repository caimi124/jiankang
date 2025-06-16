'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
  ariaLabel?: string
  ariaDescribedBy?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    className = '',
    disabled,
    ariaLabel,
    ariaDescribedBy,
    leftIcon,
    rightIcon,
    ...props
  }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'rounded-lg shadow-sm hover:shadow-md active:shadow-sm transform active:scale-95'
    ].join(' ')

    const variantClasses = {
      primary: 'bg-green-600 text-white hover:bg-green-700 border-2 border-green-600',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-100',
      outline: 'bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-2 border-transparent'
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]'
    }

    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      loading && 'cursor-wait',
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        role="button"
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {leftIcon && !loading && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        <span>{children}</span>
        
        {rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'

export default AccessibleButton 