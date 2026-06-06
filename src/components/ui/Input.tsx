import { FC, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  rightElement?: ReactNode
}

const Input: FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  rightElement,
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-navy focus:border-transparent
            disabled:bg-gray-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${rightElement ? 'pr-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

export default Input
