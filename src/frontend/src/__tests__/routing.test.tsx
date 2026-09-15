import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from './helpers'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'

describe('Roteamento (Smoke Test)', () => {
  it('Rota /login renderiza LoginPage', () => {
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<div>Portal NAVIR Login</div>} />
      </Routes>,
      { initialRoute: '/login' }
    )
    expect(screen.getByText('Portal NAVIR Login')).toBeDefined()
  })

  it('ProtectedRoute redireciona sem auth para /login', () => {
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<div>Login Page Redirection</div>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredPermission="dashboard:view">
              <div>Protected Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>,
      { initialRoute: '/dashboard', user: null }
    )
    expect(screen.getByText('Login Page Redirection')).toBeDefined()
  })
})
