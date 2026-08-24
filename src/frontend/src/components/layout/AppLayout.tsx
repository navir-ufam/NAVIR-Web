import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context'
import type { UserType } from '@/types'
import { hasPermission, type AppPermission } from '@/utils/permissions'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Cpu,
  DoorOpen,
  FileText,
  User,
  GraduationCap,
  History,
  RefreshCw,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

type NavItem = {
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  permission?: AppPermission
  roles?: UserType[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    permission: 'dashboard:view',
  },
  {
    label: 'Usuários',
    path: '/usuarios',
    icon: Users,
    permission: 'users:read',
  },
  {
    label: 'Projetos',
    path: '/projetos',
    icon: FolderKanban,
    permission: 'projects:read',
  },
  {
    label: 'Dispositivos',
    path: '/dispositivos',
    icon: Cpu,
    permission: 'dispositivos:read',
  },
  {
    label: 'Acesso Laboratório',
    path: '/acesso-laboratorio',
    icon: DoorOpen,
    permission: 'acesso-laboratorio:read',
  },
  {
    label: 'Relatórios',
    path: '/relatorios',
    icon: FileText,
    permission: 'reports:read',
  },
  {
    label: 'Perfil',
    path: '/perfil',
    icon: User,
    permission: 'profile:view',
  },
  {
    label: 'Currículo (Lattes)',
    path: '/curriculo',
    icon: GraduationCap,
    permission: 'curriculo:read',
  },
  {
    label: 'Histórico Escolar',
    path: '/historico',
    icon: History,
    permission: 'historico:read',
  },
  {
    label: 'Atualizações',
    path: '/atualizacoes',
    icon: RefreshCw,
    permission: 'atualizacoes:read',
  },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const filteredNavItems = NAV_ITEMS.filter((item) =>
    hasPermission(user, item.permission || item.roles || [])
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="h-16 border-b bg-card px-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label="Alternar menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <span>NAVIR</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              Web
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium">{user?.nome || user?.email || 'Usuário'}</span>
            <span className="text-xs text-muted-foreground font-semibold">{user?.tipo}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
            title="Sair da conta"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-16 left-0 z-20 w-64 bg-card border-r flex flex-col transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-10 md:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
