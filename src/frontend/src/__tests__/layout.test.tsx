import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { Sidebar, Header, AppLayout, PagePlaceholder } from '@/components/layout'
import { getNavItemsForUser } from '@/components/layout/Sidebar'
import type { AuthUser } from '@/types'

const adminUser: AuthUser = { id: '1', nome: 'Admin Silva', email: 'admin@ufam.edu.br', tipo: 'ADMIN', estado: 'ACEITO' }
const professorUser: AuthUser = { id: '2', nome: 'Carlos Professor', email: 'prof@ufam.edu.br', tipo: 'PROFESSOR', estado: 'ACEITO' }
const pesquisadorUser: AuthUser = { id: '3', nome: 'Maria Pesquisadora', email: 'pesquisador@ufam.edu.br', tipo: 'PESQUISADOR', estado: 'ACEITO' }

describe('Layout Components (Sidebar, Header, AppLayout & PagePlaceholder)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('correctly filters nav items for user in getNavItemsForUser helper', () => {
    expect(getNavItemsForUser(undefined)).toEqual([])
    expect(getNavItemsForUser(null)).toEqual([])
    expect(getNavItemsForUser('INTERESSADO')).toEqual([])

    const adminItems = getNavItemsForUser('ADMIN', adminUser)
    expect(adminItems.length).toBeGreaterThan(0)
  })

  it('renders correct navigation menu items for ADMIN role in Sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider initialUser={adminUser}>
          <Sidebar />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Usuários')).toBeDefined()
    expect(screen.getByText('Projetos')).toBeDefined()
    expect(screen.getByText('Dispositivos')).toBeDefined()
    expect(screen.getByText('Acesso Laboratório')).toBeDefined()
    expect(screen.getByText('Relatórios')).toBeDefined()
    expect(screen.getByText('Admin Silva')).toBeDefined()
    expect(screen.getByText('admin')).toBeDefined()
  })

  it('renders correct navigation menu items for PROFESSOR role in Sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider initialUser={professorUser}>
          <Sidebar />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard Orientandos')).toBeDefined()
    expect(screen.getByText('Pesquisar Pesquisadores')).toBeDefined()
    expect(screen.getByText('Projetos')).toBeDefined()
    expect(screen.getByText('Perfil')).toBeDefined()
  })

  it('renders correct navigation menu items for PESQUISADOR role in Sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider initialUser={pesquisadorUser}>
          <Sidebar />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Meu Dashboard')).toBeDefined()
    expect(screen.getByText('Meu Perfil')).toBeDefined()
    expect(screen.getByText('Meus Projetos')).toBeDefined()
    expect(screen.getByText('Dispositivos WiFi')).toBeDefined()
    expect(screen.getByText('Acesso Laboratório')).toBeDefined()
    expect(screen.getByText('Atualizações Acadêmicas')).toBeDefined()
  })

  it('renders Header with clean breadcrumb navigation and Notifications Popover', () => {
    render(
      <MemoryRouter initialEntries={['/usuarios']}>
        <AuthProvider initialUser={adminUser}>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Usuários')).toBeDefined()

    const notifBtn = screen.getByLabelText('Abrir Notificações')
    fireEvent.click(notifBtn)

    expect(screen.getByText('Notificações')).toBeDefined()
    expect(screen.getByText('Projeto Aprovado')).toBeDefined()

    const markReadBtn = screen.getByText('Marcar lidas')
    fireEvent.click(markReadBtn)
    expect(screen.queryByText('Marcar lidas')).toBeNull()
  })

  it('renders PagePlaceholder component correctly', () => {
    render(<PagePlaceholder title="Página Teste" description="Descrição teste do placeholder." />)
    expect(screen.getByText('Página Teste')).toBeDefined()
    expect(screen.getByText('Descrição teste do placeholder.')).toBeDefined()
  })

  it('renders AppLayout composing Sidebar, Header and Outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider initialUser={adminUser}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<div>Dashboard Outlet Content</div>} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard Outlet Content')).toBeDefined()
  })

  it('triggers logout from Sidebar Encerrar Sessão button', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider initialUser={adminUser}>
          <Routes>
            <Route path="/dashboard" element={<Sidebar />} />
            <Route path="/login" element={<div>Login Page Redirect Target</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTitle('Encerrar Sessão'))
    expect(screen.getByText('Login Page Redirect Target')).toBeDefined()
  })
})
