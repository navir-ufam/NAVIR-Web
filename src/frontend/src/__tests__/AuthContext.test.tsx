import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import * as authService from '@/services/authService'

function createMockJwt(payload: object): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '')
  return `${header}.${body}.signature`
}

function TestComponent() {
  const { user, token, isAuthenticated, isLoading, login, logout, setMockUser } = useAuth()

  return (
    <div>
      <span data-testid="is-loading">{isLoading ? 'loading' : 'idle'}</span>
      <span data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="token">{token || 'none'}</span>
      <span data-testid="user-email">{user?.email || 'none'}</span>
      <button
        type="button"
        data-testid="login-success-btn"
        onClick={async () => {
          await login('user@ufam.edu.br', 'senha123')
        }}
      >
        Login
      </button>
      <button type="button" data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button
        type="button"
        data-testid="mock-user-btn"
        onClick={() =>
          setMockUser?.({ id: '2', email: 'mock@ufam.edu.br', tipo: 'PROFESSOR', estado: 'ACEITO' })
        }
      >
        Set Mock User
      </button>
    </div>
  )
}

describe('AuthContext SCRUM-42 Requirements', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('manages isLoading and loads active session from navir_token on mount', () => {
    const validToken = createMockJwt({
      sub: '5',
      tipo: 'PESQUISADOR',
      estado: 'ACEITO',
      email: 'stored@ufam.edu.br',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
    localStorage.setItem('navir_token', validToken)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('is-loading').textContent).toBe('idle')
    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated')
    expect(screen.getByTestId('user-email').textContent).toBe('stored@ufam.edu.br')
  })

  it('handles success login flow and stores navir_token', async () => {
    const mockToken = createMockJwt({
      sub: '1',
      tipo: 'ADMIN',
      estado: 'ACEITO',
      email: 'admin@ufam.edu.br',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 200,
      data: { token: mockToken },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login-success-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated')
    expect(localStorage.getItem('navir_token')).toBe(mockToken)
  })

  it('handles 401 invalid credentials login flow without storing token', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 401,
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login-success-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated')
    expect(localStorage.getItem('navir_token')).toBeNull()
  })

  it('handles 403 / NEGADO login flow without storing token', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 403,
      data: { estado: 'NEGADO' },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login-success-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated')
    expect(localStorage.getItem('navir_token')).toBeNull()
  })

  it('handles INTERESSADO response login flow without storing token', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 200,
      data: { tipo: 'INTERESSADO', mensagem: 'Solicitação registrada com sucesso' },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      screen.getByTestId('login-success-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated')
    expect(localStorage.getItem('navir_token')).toBeNull()
  })

  it('clears state and navir_token on logout', () => {
    const validToken = createMockJwt({
      sub: '5',
      tipo: 'PESQUISADOR',
      estado: 'ACEITO',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
    localStorage.setItem('navir_token', validToken)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated')

    act(() => {
      screen.getByTestId('logout-btn').click()
    })

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated')
    expect(localStorage.getItem('navir_token')).toBeNull()
  })
})
