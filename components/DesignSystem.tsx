// Design System - Colors, Typography, Spacing
export const designSystem = {
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7', 
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main brand color
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    accent: {
      orange: '#fb923c',
      blue: '#3b82f6',
      purple: '#8b5cf6',
      teal: '#14b8a6'
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    }
  },
  
  typography: {
    fontFamily: {
      primary: 'var(--font-inter)',
      secondary: 'var(--font-noto-sans-sc)'
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px  
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem'  // 60px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem'      // 96px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  },
  
  animations: {
    transition: {
      fast: '150ms ease-in-out',
      normal: '200ms ease-in-out',
      slow: '300ms ease-in-out'
    }
  }
}

// Component Style Variants
export const componentStyles = {
  button: {
    sizes: {
      sm: 'px-3 py-2 text-sm min-h-[36px]',
      md: 'px-4 py-3 text-base min-h-[44px]', 
      lg: 'px-6 py-4 text-lg min-h-[52px]'
    },
    variants: {
      primary: `
        bg-green-600 text-white border-green-600
        hover:bg-green-700 hover:border-green-700
        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500
      `,
      secondary: `
        bg-white text-green-600 border-2 border-green-600
        hover:bg-green-50 hover:border-green-700 hover:text-green-700
        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-400
      `,
      ghost: `
        bg-transparent text-green-600 border-transparent
        hover:bg-green-50 hover:text-green-700
        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        disabled:text-gray-400
      `
    }
  },
  
  card: {
    base: `
      bg-white rounded-xl border border-gray-200 
      shadow-sm hover:shadow-md transition-shadow duration-200
    `,
    interactive: `
      cursor-pointer transform hover:-translate-y-1 
      transition-all duration-200 ease-out
    `,
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
  },
  
  input: {
    base: `
      w-full px-4 py-3 text-base border rounded-xl
      transition-all duration-200 ease-in-out
      focus:outline-none placeholder-gray-500
      min-h-[48px]
    `,
    states: {
      default: 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100',
      error: 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100',
      success: 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-100'
    }
  }
}

// Accessibility Constants
export const a11y = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
  srOnly: 'sr-only',
  minTouchTarget: 'min-h-[44px] min-w-[44px]', // WCAG AA compliant
  colorContrast: {
    // Ensure 4.5:1 contrast ratio for normal text
    // Ensure 3:1 contrast ratio for large text
    textOnLight: 'text-gray-900',
    textOnDark: 'text-white',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500'
  }
}

// Media Queries
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Animation Presets
export const animations = {
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  scaleIn: 'animate-scaleIn',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin'
} 