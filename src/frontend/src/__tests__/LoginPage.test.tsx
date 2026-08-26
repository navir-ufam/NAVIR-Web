import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/auth/login'
import { AuthProvider } from '@/context/AuthContext'
import * as authService from '@/services/authService'

describe('LoginPage Component', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('renders login form and mock buttons', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Autenticação NAVIR')).toBeDefined()
    expect(screen.getByPlaceholderText('usuario@ufam.edu.br')).toBeDefined()
    expect(screen.getByText('Simular Admin')).toBeDefined()
  })

  it('handles successful submit form and navigates to dashboard', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 200,
      data: {
        token: 'mock_jwt_token',
        user: { id: '1', tipo: 'ADMIN', estado: 'ACEITO' },
      },
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<div>Dashboard Page Target</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('usuario@ufam.edu.br'), {
      target: { value: 'admin@ufam.edu.br' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'senha123' },
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Entrar'))
    })

    expect(screen.getByText('Dashboard Page Target')).toBeDefined()
  })

  it('displays inline error message on invalid credentials 401', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 401,
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('usuario@ufam.edu.br'), {
      target: { value: 'wrong@ufam.edu.br' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'wrong' },
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Entrar'))
    })

    expect(screen.getByText('Credenciais inválidas. Verifique seu e-mail e senha.')).toBeDefined()
  })

  it('handles PENDENTE user response navigating to /aguardando-aprovacao', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 200,
      data: {
        token: 'mock_jwt_token',
        user: { id: '2', tipo: 'PESQUISADOR', estado: 'PENDENTE' },
      },
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/aguardando-aprovacao" element={<div>Aguardando Target</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('usuario@ufam.edu.br'), {
      target: { value: 'pendente@ufam.edu.br' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'senha' },
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Entrar'))
    })

    expect(screen.getByText('Aguardando Target')).toBeDefined()
  })

  it('handles INTERESSADO response navigating to /interessado-feedback', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 200,
      data: {
        mensagem: 'Solicitação registrada.',
        tipo: 'INTERESSADO',
      },
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/interessado-feedback" element={<div>Feedback Target</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('usuario@ufam.edu.br'), {
      target: { value: 'interessado@ufam.edu.br' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'senha' },
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Entrar'))
    })

    expect(screen.getByText('Feedback Target')).toBeDefined()
  })

  it('handles NEGADO response navigating to /acesso-negado', async () => {
    vi.spyOn(authService, 'loginRequest').mockResolvedValue({
      status: 403,
      data: { estado: 'NEGADO' },
    })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/acesso-negado" element={<div>Acesso Negado Target</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('usuario@ufam.edu.br'), {
      target: { value: 'negado@ufam.edu.br' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'senha' },
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Entrar'))
    })

    expect(screen.getByText('Acesso Negado Target')).toBeDefined()
  })

  it('supports quick mock login buttons', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<div>Dashboard Page Target</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    await act(async () => {
      fireEvent.click(screen.getByText('Simular Admin'))
    })

    expect(screen.getByText('Dashboard Page Target')).toBeDefined()
  })
})
