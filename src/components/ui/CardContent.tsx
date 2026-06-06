import { FC, ReactNode } from 'react'

interface CardContentProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const CardContent: FC<CardContentProps> = ({ children, className = '', padding = 'md' }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}

export default CardContent
