import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context'
import type { UserType } from '@/types'
import { hasPermission, type AppPermission } from '@/utils/permissions'

type ProtectedRouteProps = {
  allowedRoles?: UserType[]
  requiredPermission?: AppPermission | AppPermission[]
  children?: React.ReactNode
}

export function ProtectedRoute({
  allowedRoles,
  requiredPermission,
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user.tipo === 'INTERESSADO') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user.estado === 'NEGADO') {
    return <Navigate to="/acesso-negado" replace />
  }

  if (user.estado === 'PENDENTE') {
    return <Navigate to="/aguardando-aprovacao" replace />
  }

  if (requiredPermission) {
    if (!hasPermission(user, requiredPermission)) {
      return <Navigate to="/dashboard" replace />
    }
  } else if (allowedRoles && allowedRoles.length > 0) {
    if (!hasPermission(user, allowedRoles)) {
      return <Navigate to="/dashboard" replace />
    }
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
