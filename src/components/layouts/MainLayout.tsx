import { FC, ReactNode } from 'react'
import Navigation from '../Navigation'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
