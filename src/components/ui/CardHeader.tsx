import { FC, ReactNode } from 'react'

interface CardHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}

const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`mb-4 pb-4 border-b border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-navy-dark flex items-center gap-2">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}

export default CardHeader
