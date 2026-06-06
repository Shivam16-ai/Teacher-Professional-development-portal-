import { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const Card: FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseStyles = 'bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
  
  const classes = `${baseStyles} ${className}`
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card
