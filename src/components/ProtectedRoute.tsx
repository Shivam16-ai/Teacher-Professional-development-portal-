import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../utils/auth'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
