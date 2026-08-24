import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context'

type PublicRouteProps = {
  children?: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated && user?.estado === 'ACEITO') {
    return <Navigate to="/dashboard" replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default PublicRoute
