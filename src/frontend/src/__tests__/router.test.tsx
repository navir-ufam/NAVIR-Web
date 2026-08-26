import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { PublicRoute } from '@/components/common/PublicRoute'
import { AuthProvider } from '@/context/AuthContext'
import { triggerUnauthorized } from '@/services/apiClient'
import type { User } from '@/types'

function LocationTracker() {
  const location = useLocation()
  return (
    <div>
      <span data-testid="pathname">{location.pathname}</span>
      <span data-testid="from-pathname font-bold">
        {(location.state as { from?: { pathname?: string } })?.from?.pathname || 'none'}
      </span>
    </div>
  )
}

function renderWithAuth(initialPath: string, user: User | null, routes: React.ReactNode) {
  return render(
    <AuthProvider initialUser={user}>
      <MemoryRouter initialEntries={[initialPath]}>{routes}</MemoryRouter>
    </AuthProvider>
  )
}

describe('Route Guards & Enterprise Auth Security', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('ProtectedRoute', () => {
    it('redirects unauthenticated user to /login and preserves state.from', () => {
      renderWithAuth(
        '/projetos/123/editar',
        null,
        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <span>LoginPage</span>
                <LocationTracker />
              </div>
            }
          />
          <Route
            path="/projetos/:id/editar"
            element={
              <ProtectedRoute requiredPermission="projects:edit">
                <div>Edit Project Page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('LoginPage')).toBeDefined()
      expect(screen.getByTestId('from-pathname font-bold').textContent).toBe('/projetos/123/editar')
    })

    it('redirects user with state NEGADO to /acesso-negado', () => {
      const user: User = { tipo: 'PESQUISADOR', estado: 'NEGADO' }

      renderWithAuth(
        '/dashboard',
        user,
        <Routes>
          <Route path="/acesso-negado" element={<div>Acesso Negado Page</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'PROFESSOR', 'PESQUISADOR']}>
                <div>Protected Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Acesso Negado Page')).toBeDefined()
    })

    it('redirects user with state PENDENTE to /aguardando-aprovacao', () => {
      const user: User = { tipo: 'PESQUISADOR', estado: 'PENDENTE' }

      renderWithAuth(
        '/dashboard',
        user,
        <Routes>
          <Route path="/aguardando-aprovacao" element={<div>Aguardando Aprovacao Page</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'PROFESSOR', 'PESQUISADOR']}>
                <div>Protected Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Aguardando Aprovacao Page')).toBeDefined()
    })

    it('redirects INTERESSADO user attempting to access protected route to /login', () => {
      const user: User = { tipo: 'INTERESSADO', estado: 'ACEITO' }

      renderWithAuth(
        '/dashboard',
        user,
        <Routes>
          <Route path="/login" element={<div>LoginPage</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'PROFESSOR', 'PESQUISADOR']}>
                <div>Protected Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('LoginPage')).toBeDefined()
    })

    it('validates granual RBAC permission (requiredPermission)', () => {
      const user: User = { tipo: 'PESQUISADOR', estado: 'ACEITO' }

      renderWithAuth(
        '/relatorios',
        user,
        <Routes>
          <Route path="/dashboard" element={<div>Dashboard Fallback</div>} />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute requiredPermission="reports:read">
                <div>Admin Relatorios</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Dashboard Fallback')).toBeDefined()
    })

    it('renders protected content when user has required RBAC permission', () => {
      const user: User = { tipo: 'ADMIN', estado: 'ACEITO' }

      renderWithAuth(
        '/relatorios',
        user,
        <Routes>
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute requiredPermission="reports:read">
                <div>Admin Relatorios Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Admin Relatorios Content')).toBeDefined()
    })
  })

  describe('PublicRoute', () => {
    it('renders public children when user is not authenticated', () => {
      renderWithAuth(
        '/login',
        null,
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div>Public Login Content</div>
              </PublicRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Public Login Content')).toBeDefined()
    })

    it('redirects authenticated user with state ACEITO to /dashboard', () => {
      const user: User = { tipo: 'PESQUISADOR', estado: 'ACEITO' }

      renderWithAuth(
        '/login',
        user,
        <Routes>
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div>Public Login Content</div>
              </PublicRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Dashboard Page')).toBeDefined()
    })
  })

  describe('Zero-Trust Session Interception (401/403 HTTP Events)', () => {
    it('logs out user automatically when triggerUnauthorized event fires', () => {
      const user: User = { tipo: 'ADMIN', estado: 'ACEITO' }

      renderWithAuth(
        '/dashboard',
        user,
        <Routes>
          <Route path="/login" element={<div>LoginPage Logged Out</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredPermission="dashboard:view">
                <div>Protected Dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      )

      expect(screen.getByText('Protected Dashboard')).toBeDefined()

      act(() => {
        triggerUnauthorized()
      })

      expect(screen.getByText('LoginPage Logged Out')).toBeDefined()
    })
  })
})
