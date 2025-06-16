'use client'

import { useState, FC, InputHTMLAttributes } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'

interface MobileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: string
  helperText?: string
  icon?: React.ReactNode
}

interface MobileSelectProps {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
}

interface MobileTextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  rows?: number
}

// Mobile-Optimized Input Component
export const MobileInput: FC<MobileInputProps> = ({
  label,
  error,
  success,
  helperText,
  icon,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {/* Input */}
        <input
          {...props}
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full 
            ${icon ? 'pl-12' : 'pl-4'} 
            ${isPassword ? 'pr-12' : 'pr-4'}
            py-4 
            text-base 
            border rounded-xl 
            transition-all duration-200 ease-in-out
            ${isFocused ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-300'}
            ${error ? 'border-red-500 ring-2 ring-red-100' : ''}
            ${success ? 'border-green-500 ring-2 ring-green-100' : ''}
            focus:outline-none
            placeholder-gray-500
            min-h-[48px] /* Ensure minimum touch target */
          `}
        />
        
        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        
        {/* Success/Error Icons */}
        {(success || error) && !isPassword && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {success && <Check size={20} className="text-green-500" />}
            {error && <X size={20} className="text-red-500" />}
          </div>
        )}
      </div>
      
      {/* Helper Text */}
      {helperText && !error && !success && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      
      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <X size={16} className="mr-1" />
          {error}
        </p>
      )}
      
      {/* Success Message */}
      {success && (
        <p className="text-sm text-green-600 flex items-center">
          <Check size={16} className="mr-1" />
          {success}
        </p>
      )}
    </div>
  )
}

// Mobile-Optimized Select Component
export const MobileSelect: FC<MobileSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = 'Select an option...'
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-4 text-base
          border rounded-xl
          transition-all duration-200 ease-in-out
          ${error ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'}
          focus:outline-none
          appearance-none
          bg-white
          min-h-[48px]
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <X size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

// Mobile-Optimized Textarea Component
export const MobileTextarea: FC<MobileTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 4
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-4 text-base
          border rounded-xl
          transition-all duration-200 ease-in-out
          ${isFocused ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-300'}
          ${error ? 'border-red-500 ring-2 ring-red-100' : ''}
          focus:outline-none
          placeholder-gray-500
          resize-y
          min-h-[120px]
        `}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <X size={16} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

// Mobile-Optimized Form Container
export const MobileFormContainer: FC<{ 
  children: React.ReactNode
  className?: string 
}> = ({ children, className = '' }) => {
  return (
    <div className={`
      max-w-md mx-auto p-6 space-y-6
      ${className}
    `}>
      {children}
    </div>
  )
}

// Mobile-Optimized Button
export const MobileButton: FC<{
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button'
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    min-h-[48px] min-w-[48px]
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
  `
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-4 text-base',
    lg: 'px-8 py-5 text-lg'
  }
  
  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
} 