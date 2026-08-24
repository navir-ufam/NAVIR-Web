import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context'
import type { UserType } from '@/types'

function LoginPage() {
  const { login, setMockUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const result = await login(email, senha)

      if (result.success) {
        if (result.user.estado === 'PENDENTE') {
          navigate('/aguardando-aprovacao', { replace: true })
        } else {
          navigate(from, { replace: true })
        }
      } else if (result.type === 'INTERESSADO') {
        navigate('/interessado-feedback', {
          state: { mensagem: result.mensagem },
          replace: true,
        })
      } else if (result.type === 'NEGADO') {
        navigate('/acesso-negado', { replace: true })
      } else {
        setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha.')
      }
    } catch {
      setErrorMessage('Erro ao se comunicar com o servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMockLogin = (tipo: UserType) => {
    if (setMockUser) {
      setMockUser({
        id: '1',
        nome: `Usuário ${tipo}`,
        email: `${tipo.toLowerCase()}@ufam.edu.br`,
        tipo,
        estado: 'ACEITO',
      })
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full p-8 bg-card border rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-primary">Autenticação NAVIR</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Entre com suas credenciais ou selecione um perfil de teste.
          </p>
        </div>

        {location.state?.from?.pathname && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs text-amber-600 dark:text-amber-400">
            Você foi redirecionado da rota: <code className="font-bold">{location.state.from.pathname}</code>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-xs text-destructive font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email-input" className="block text-xs font-semibold text-muted-foreground mb-1">
              E-mail
            </label>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ufam.edu.br"
              className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password-input" className="block text-xs font-semibold text-muted-foreground mb-1">
              Senha
            </label>
            <input
              id="password-input"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-border" />
          <span className="flex-shrink mx-4 text-xs text-muted-foreground font-medium">
            ou teste rápido
          </span>
          <div className="flex-grow border-t border-border" />
        </div>

        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => handleMockLogin('ADMIN')}
            className="w-full py-2 px-3 text-xs bg-muted text-foreground font-medium rounded-md hover:bg-accent transition-colors"
          >
            Simular Admin
          </button>

          <button
            type="button"
            onClick={() => handleMockLogin('PROFESSOR')}
            className="w-full py-2 px-3 text-xs bg-muted text-foreground font-medium rounded-md hover:bg-accent transition-colors"
          >
            Simular Professor
          </button>

          <button
            type="button"
            onClick={() => handleMockLogin('PESQUISADOR')}
            className="w-full py-2 px-3 text-xs bg-muted text-foreground font-medium rounded-md hover:bg-accent transition-colors"
          >
            Simular Pesquisador
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
