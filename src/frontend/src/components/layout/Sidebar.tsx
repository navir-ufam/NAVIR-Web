import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context'
import type { UserType } from '@/types'
import { hasPermission, type AppPermission } from '@/utils/permissions'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Wifi,
  Fingerprint,
  FileText,
  Search,
  User,
  GraduationCap,
  LogOut,
  ChevronRight,
  Settings,
} from 'lucide-react'
import logoSvg from '@/assets/logo.svg'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type NavItemConfig = {
  id: string
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  permission?: AppPermission
  roles: UserType[]
  labelByRole?: Partial<Record<UserType, string>>
}

export const ALL_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    permission: 'dashboard:view',
    roles: ['ADMIN', 'PROFESSOR', 'PESQUISADOR'],
    labelByRole: {
      ADMIN: 'Dashboard',
      PROFESSOR: 'Dashboard Orientandos',
      PESQUISADOR: 'Meu Dashboard',
    },
  },
  {
    id: 'usuarios',
    label: 'Usuários',
    path: '/usuarios',
    icon: Users,
    permission: 'users:read',
    roles: ['ADMIN', 'PROFESSOR'],
    labelByRole: {
      ADMIN: 'Usuários',
      PROFESSOR: 'Pesquisar Pesquisadores',
    },
  },
  {
    id: 'perfil',
    label: 'Perfil',
    path: '/perfil',
    icon: User,
    permission: 'profile:view',
    roles: ['PROFESSOR', 'PESQUISADOR'],
    labelByRole: {
      PROFESSOR: 'Perfil',
      PESQUISADOR: 'Meu Perfil',
    },
  },
  {
    id: 'projetos',
    label: 'Projetos',
    path: '/projetos',
    icon: FolderKanban,
    permission: 'projects:read',
    roles: ['ADMIN', 'PROFESSOR', 'PESQUISADOR'],
    labelByRole: {
      ADMIN: 'Projetos',
      PROFESSOR: 'Projetos',
      PESQUISADOR: 'Meus Projetos',
    },
  },
  {
    id: 'dispositivos',
    label: 'Dispositivos',
    path: '/dispositivos',
    icon: Wifi,
    permission: 'dispositivos:read',
    roles: ['ADMIN', 'PESQUISADOR'],
    labelByRole: {
      ADMIN: 'Dispositivos',
      PESQUISADOR: 'Dispositivos WiFi',
    },
  },
  {
    id: 'acesso-laboratorio',
    label: 'Acesso Laboratório',
    path: '/acesso-laboratorio',
    icon: Fingerprint,
    permission: 'acesso-laboratorio:read',
    roles: ['ADMIN', 'PESQUISADOR'],
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    path: '/relatorios',
    icon: FileText,
    permission: 'reports:read',
    roles: ['ADMIN'],
  },
  {
    id: 'atualizacoes',
    label: 'Atualizações Acadêmicas',
    path: '/atualizacoes',
    icon: GraduationCap,
    permission: 'atualizacoes:read',
    roles: ['PESQUISADOR'],
  },
]

type SidebarContentProps = Readonly<{
  onItemClick?: () => void
}>

export function getNavItemsForUser(userType?: UserType | null, userObj?: Parameters<typeof hasPermission>[0]): NavItemConfig[] {
  if (!userType) return []

  return ALL_NAV_ITEMS.filter((item) => {
    if (!item.roles.includes(userType)) {
      return false
    }
    if (userObj && item.permission) {
      return hasPermission(userObj, item.permission)
    }
    return true
  })
}

function getInitialLetter(name?: string, email?: string): string {
  if (name && name.trim()) {
    return name.trim()[0].toUpperCase()
  }
  if (email && email.trim()) {
    return email.trim()[0].toUpperCase()
  }
  return 'U'
}

export function SidebarContent({ onItemClick }: SidebarContentProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
    onItemClick?.()
  }

  const userRole = user?.tipo
  const visibleNavItems = getNavItemsForUser(userRole, user)

  const handleNavigatePerfil = () => {
    navigate('/perfil')
    onItemClick?.()
  }

  const handleNavigateConfiguracoes = () => {
    navigate('/configuracoes')
    onItemClick?.()
  }

  return (
    <div className="h-full flex flex-col justify-between bg-navy-gradient text-white select-none">
      <div>
        <div className="h-20 px-6 flex items-center justify-center border-b border-white/10 py-3">
          <Link to="/dashboard" onClick={onItemClick} className="flex items-center justify-center">
            <img src={logoSvg} alt="NAVIR" className="h-12 w-auto object-contain transition-transform hover:scale-105" />
          </Link>
        </div>

        <nav className="p-4 space-y-1.5" aria-label="Navegação Principal">
          {visibleNavItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            const displayLabel = (userRole && item.labelByRole?.[userRole]) || item.label

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onItemClick}
                className={`
                  flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold border-l-4 border-cyan-400 pl-2.5 shadow-sm'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-300' : 'text-slate-300'}`} />
                  <span>{displayLabel}</span>
                </div>
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-cyan-300 opacity-80" />}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <DropdownMenu>
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors">
            <DropdownMenuTrigger asChild>
              <button type="button" className="flex items-center gap-3 flex-1 min-w-0 text-left outline-none cursor-pointer">
                <Avatar className="h-10 w-10 border-2 border-sky-400/50 shadow-md">
                  <AvatarFallback className="bg-sky-500 text-white font-bold text-base">
                    {getInitialLetter(user?.nome, user?.email)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-bold text-white truncate leading-snug">
                    {user?.nome || 'Administrador'}
                  </span>
                  <span className="text-xs text-slate-300 font-normal leading-tight capitalize">
                    {user?.tipo ? user.tipo.toLowerCase() : 'Admin'}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-slate-300 hover:text-rose-300 hover:bg-rose-500/20 rounded-lg transition-colors"
              title="Encerrar Sessão"
              aria-label="Encerrar Sessão"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          <DropdownMenuContent side="top" align="start" className="w-56 bg-slate-900 border-white/10 text-white shadow-2xl p-1.5">
            <DropdownMenuItem onClick={handleNavigatePerfil} className="cursor-pointer hover:bg-white/10 text-xs py-2 gap-2.5">
              <User className="h-4 w-4 text-cyan-300" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleNavigateConfiguracoes} className="cursor-pointer hover:bg-white/10 text-xs py-2 gap-2.5">
              <Settings className="h-4 w-4 text-cyan-300" />
              <span>Configurações</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/10 my-1" />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-rose-500/20 text-rose-300 text-xs py-2 gap-2.5">
              <LogOut className="h-4 w-4" />
              <span>Encerrar Sessão</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:block w-60 h-screen sticky top-0 flex-shrink-0 border-r border-navy/20 shadow-xl z-20">
      <SidebarContent />
    </aside>
  )
}

export default Sidebar
