import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, ChevronRight, Home, Bell, CheckCheck, FolderKanban, Wifi, Fingerprint } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SidebarContent } from './Sidebar'

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  usuarios: 'Usuários',
  projetos: 'Projetos',
  novo: 'Novo Cadastro',
  editar: 'Edição',
  dispositivos: 'Dispositivos WiFi',
  'acesso-laboratorio': 'Acesso Laboratório',
  relatorios: 'Relatórios',
  curriculo: 'Currículo Lattes',
  historico: 'Histórico Escolar',
  atualizacoes: 'Atualizações Acadêmicas',
  perfil: 'Meu Perfil',
  configuracoes: 'Configurações',
}

type NotificationItem = {
  id: string
  title: string
  description: string
  time: string
  unread: boolean
  icon: React.ComponentType<{ className?: string }>
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Projeto Aprovado',
    description: 'Seu projeto "Interface Sensorial IoT" foi aprovado pelo orientador.',
    time: 'Há 15 min',
    unread: true,
    icon: FolderKanban,
  },
  {
    id: '2',
    title: 'Novo Dispositivo WiFi',
    description: 'Dispositivo "ESP32-NAVIR-04" cadastrado na rede do laboratório.',
    time: 'Há 2 horas',
    unread: true,
    icon: Wifi,
  },
  {
    id: '3',
    title: 'Acesso Autorizado',
    description: 'Solicitação de acesso ao Laboratório NAVIR autorizada para o final de semana.',
    time: 'Há 1 dia',
    unread: true,
    icon: Fingerprint,
  },
]

export function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const pathSegments = location.pathname.split('/').filter(Boolean)

  return (
    <header className="h-16 border-b bg-card px-4 md:px-6 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      <div className="flex items-center gap-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r-0 w-[260px] bg-navy-gradient">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu NAVIR</SheetTitle>
            </SheetHeader>
            <SidebarContent onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Início</span>
          </Link>

          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`
            const isLast = index === pathSegments.length - 1
            const label = ROUTE_LABELS[segment] || segment

            return (
              <div key={path} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                {isLast ? (
                  <span className="font-semibold text-foreground capitalize">{label}</span>
                ) : (
                  <Link to={path} className="hover:text-foreground transition-colors capitalize">
                    {label}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors outline-none cursor-pointer"
              title="Notificações"
              aria-label="Abrir Notificações"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-sky-500 ring-2 ring-card animate-pulse" />
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-80 sm:w-96 p-0 shadow-xl border-border bg-card">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-foreground">Notificações</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full border border-sky-500/20">
                    {unreadCount} novas
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  <span>Marcar lidas</span>
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-border">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  Nenhuma notificação por enquanto.
                </div>
              ) : (
                notifications.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 flex items-start gap-3 transition-colors hover:bg-muted/50 ${
                        item.unread ? 'bg-sky-500/5' : ''
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-foreground truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {item.unread && (
                        <span className="h-2 w-2 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export default Header
