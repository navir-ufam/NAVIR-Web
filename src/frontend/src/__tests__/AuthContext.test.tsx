import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import type { User } from '@/types'

function TestComponent() {
  const { user, isAuthenticated, login, logout, setMockUser } = useAuth()

  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="user-email">{user?.email || 'none'}</span>
      <button
        type="button"
        data-testid="login-btn"
        onClick={() => login({ id: '1', email: 'test@ufam.edu.br', tipo: 'ADMIN', estado: 'ACEITO' })}
      >
        Login
      </button>
      <button type="button" data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button
        type="button"
        data-testid="mock-user-btn"
        onClick={() => setMockUser({ id: '2', email: 'mock@ufam.edu.br', tipo: 'PROFESSOR', estado: 'ACEITO' })}
      >
        Set Mock User
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides authentication state and methods', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated')

    act(() => {
      screen.getByTestId('login-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated')
    expect(screen.getByTestId('user-email').textContent).toBe('test@ufam.edu.br')

    act(() => {
      screen.getByTestId('mock-user-btn').click()
    })
    expect(screen.getByTestId('user-email').textContent).toBe('mock@ufam.edu.br')

    act(() => {
      screen.getByTestId('logout-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated')
  })

  it('throws error when useAuth is used outside AuthProvider', () => {
    const consoleError = console.error
    console.error = () => {}

    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider')

    console.error = consoleError
  })

  it('loads stored user from localStorage on mount', () => {
    const storedUser: User = { id: '9', email: 'stored@ufam.edu.br', tipo: 'PESQUISADOR', estado: 'ACEITO' }
    localStorage.setItem('navir_auth_user', JSON.stringify(storedUser))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated')
    expect(screen.getByTestId('user-email').textContent).toBe('stored@ufam.edu.br')
  })
})
