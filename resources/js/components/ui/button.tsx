// components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'secondary' | 'green' | 'red'  | 'light' | 'dark' | 'outline' | 'neutral'
  loading?: boolean;
}


const colorClasses: Record<NonNullable<ButtonProps['color']>, string> = {
  default:
    'text-white bg-primary-500 hover:bg-primary-600 focus:ring-blue-300',
  secondary: "text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-300",
  neutral: "text-white bg-gray-500 hover:bg-dray-300",
  outline: "text-primary-600 border-2 border-primary-600",
  green:
    'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300',
  red:
    'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300',
  light:
    'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100',
  dark:
    'text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 border-gray-700',
}

export const Button = forwardRef<HTMLButtonElement,ButtonProps>( ({
    children,
    color = 'default',
    className = '',
    loading = false,
    ...props
  },ref) => {
    return (
        <button
        ref={ref}
          className={cn('text-sm font-medium rounded-lg px-5 py-2.5  focus:outline-none focus:ring-4 inline-flex items-center justify-center rounded-full',colorClasses[color], className)}
          {...props}
        >
             {loading && <Loader2 className="animate-spin mr-2" />}
          {children}
        </button>
      )
})

Button.displayName = 'Button'
