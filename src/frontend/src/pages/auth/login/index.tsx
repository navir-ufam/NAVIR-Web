import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context'
import type { UserType } from '@/types'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Captura o destino original ou redireciona para /dashboard
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard'

  const handleMockLogin = (tipo: UserType) => {
    login({
      id: '1',
      nome: `Usuário ${tipo}`,
      email: `${tipo.toLowerCase()}@ufam.edu.br`,
      tipo,
      estado: 'ACEITO',
    })
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full p-8 bg-card border rounded-xl shadow-lg space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Autenticação NAVIR</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Selecione um perfil para simular o login e testar os redirecionamentos.
          </p>
        </div>

        {location.state?.from?.pathname && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs text-amber-600 dark:text-amber-400">
            Você foi redirecionado da rota: <code className="font-bold">{location.state.from.pathname}</code>
          </div>
        )}

        <div className="grid gap-3">
          <button
            onClick={() => handleMockLogin('ADMIN')}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Entrar como Administrador
          </button>

          <button
            onClick={() => handleMockLogin('PROFESSOR')}
            className="w-full py-2.5 px-4 bg-secondary text-secondary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Entrar como Professor
          </button>

          <button
            onClick={() => handleMockLogin('PESQUISADOR')}
            className="w-full py-2.5 px-4 bg-accent text-accent-foreground border font-medium rounded-lg hover:bg-accent/80 transition-colors"
          >
            Entrar como Pesquisador
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
