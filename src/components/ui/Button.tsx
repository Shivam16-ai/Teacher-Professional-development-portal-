import { FC, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  icon?: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  icon,
  className = '',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-dark focus:ring-navy shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-green text-white hover:bg-green-dark focus:ring-green shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-navy text-navy hover:bg-navy-faint focus:ring-navy',
    ghost: 'text-navy hover:bg-navy-faint focus:ring-navy'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
