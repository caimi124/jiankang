import { FC } from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

interface SkeletonProps {
  className?: string
  lines?: number
  animate?: boolean
}

interface ButtonLoadingProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

// Basic Spinner Component
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }
  
  const colorClasses = {
    primary: 'text-green-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  }

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <svg 
        className="animate-spin" 
        fill="none" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
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
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

// Skeleton Loading Component
export const SkeletonLoader: FC<SkeletonProps> = ({ 
  className = '',
  lines = 3,
  animate = true
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded ${
            animate ? 'animate-pulse' : ''
          } ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}

// Button with Loading State
export const ButtonWithLoading: FC<ButtonLoadingProps> = ({
  loading,
  children,
  className = '',
  disabled = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        relative inline-flex items-center justify-center
        transition-all duration-200 ease-in-out
        ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}

// Page Loading Overlay
export const PageLoadingOverlay: FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}

// Search Loading State
export const SearchLoadingState: FC = () => (
  <div className="p-6 text-center">
    <LoadingSpinner size="md" />
    <p className="mt-3 text-gray-600">Searching our database...</p>
    <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
  </div>
)

// Card Loading Skeleton
export const CardSkeleton: FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
          <div className="h-6 bg-gray-200 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
          <div className="mt-4 h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    ))}
  </div>
) 