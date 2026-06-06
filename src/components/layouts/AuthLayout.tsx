import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-navy-dark to-navy-light">
      {children}
    </div>
  )
}

export default AuthLayout
