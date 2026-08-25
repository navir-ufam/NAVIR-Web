import { useState } from 'react'
import { Settings, Bell, Moon, Sun, Monitor, Check, Lock, UserX, Mail, Send, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useTheme, type ThemeMode } from '@/context'

export function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [systemAlerts, setSystemAlerts] = useState(true)

  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')

  const [assuntoSuporte, setAssuntoSuporte] = useState('')
  const [mensagemSuporte, setMensagemSuporte] = useState('')

  const [showConfirmDesativar, setShowConfirmDesativar] = useState(false)

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme)
    const label = newTheme === 'light' ? 'Claro' : newTheme === 'dark' ? 'Escuro' : 'Sistema'
    toast.success(`Tema alterado para ${label}!`)
  }

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault()

    if (!senhaAtual || !novaSenha || !confirmacaoSenha) {
      toast.error('Preencha todos os campos de senha.')
      return
    }

    if (novaSenha !== confirmacaoSenha) {
      toast.error('A nova senha e a confirmação não conferem.')
      return
    }

    if (novaSenha.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres.')
      return
    }

    toast.success('Senha alterada com sucesso!')
    setSenhaAtual('')
    setNovaSenha('')
    setConfirmacaoSenha('')
  }

  const handleEnviarMensagemSuporte = (e: React.FormEvent) => {
    e.preventDefault()

    if (!assuntoSuporte.trim() || !mensagemSuporte.trim()) {
      toast.error('Preencha o assunto e a mensagem para o administrador.')
      return
    }

    toast.success('Sua mensagem foi enviada ao administrador com sucesso!')
    setAssuntoSuporte('')
    setMensagemSuporte('')
  }

  const handleDesativarConta = () => {
    toast.success('Solicitação de desativação encaminhada ao administrador.')
    setShowConfirmDesativar(false)
  }

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Configurações do Sistema</h1>
          <p className="text-xs text-muted-foreground">
            Gerencie preferências de aparência, notificações, segurança e contato com a administração.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <section className="bg-card border rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base border-b pb-3">
            <Sun className="h-5 w-5 text-amber-500" />
            <h2>Aparência e Tema</h2>
          </div>

          <p className="text-xs text-muted-foreground">
            Escolha como a interface é exibida no seu dispositivo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`flex items-center justify-between p-4 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer outline-none select-none ${
                theme === 'light'
                  ? 'border-2 border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 shadow-xs ring-2 ring-sky-500/20'
                  : 'border-border bg-card text-muted-foreground hover:border-sky-500/40 hover:bg-sky-500/5 hover:text-foreground shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-amber-500' : ''}`} />
                <span>Claro</span>
              </div>
              {theme === 'light' && <Check className="h-4 w-4 text-sky-500 font-bold" />}
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`flex items-center justify-between p-4 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer outline-none select-none ${
                theme === 'dark'
                  ? 'border-2 border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 shadow-xs ring-2 ring-sky-500/20'
                  : 'border-border bg-card text-muted-foreground hover:border-sky-500/40 hover:bg-sky-500/5 hover:text-foreground shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-indigo-400' : ''}`} />
                <span>Escuro</span>
              </div>
              {theme === 'dark' && <Check className="h-4 w-4 text-sky-500 font-bold" />}
            </button>

            <button
              type="button"
              onClick={() => handleThemeChange('system')}
              className={`flex items-center justify-between p-4 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer outline-none select-none ${
                theme === 'system'
                  ? 'border-2 border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 shadow-xs ring-2 ring-sky-500/20'
                  : 'border-border bg-card text-muted-foreground hover:border-sky-500/40 hover:bg-sky-500/5 hover:text-foreground shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Monitor className={`h-4 w-4 ${theme === 'system' ? 'text-sky-500' : ''}`} />
                <span>Sistema</span>
              </div>
              {theme === 'system' && <Check className="h-4 w-4 text-sky-500 font-bold" />}
            </button>
          </div>
        </section>

        <section className="bg-card border rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base border-b pb-3">
            <Bell className="h-5 w-5 text-blue-500" />
            <h2>Notificações e Alertas</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground block">Notificações por E-mail</span>
                <span className="text-xs text-muted-foreground">
                  Receba relatórios e atualizações dos seus projetos diretamente no e-mail.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <span className="text-sm font-medium text-foreground block">Alertas de Dispositivos</span>
                <span className="text-xs text-muted-foreground">
                  Notificar quando novos dispositivos WiFi forem cadastrados ou alterados.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSystemAlerts(!systemAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${systemAlerts ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${systemAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-card border rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base border-b pb-3">
            <Lock className="h-5 w-5 text-emerald-500" />
            <h2>Alteração de Senha</h2>
          </div>

          <form onSubmit={handleAlterarSenha} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Senha Atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmacaoSenha}
                  onChange={(e) => setConfirmacaoSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs"
              >
                Atualizar Senha
              </button>
            </div>
          </form>
        </section>

        <section className="bg-card border rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base border-b pb-3">
            <Mail className="h-5 w-5 text-indigo-500" />
            <h2>Contato com o Administrador</h2>
          </div>

          <p className="text-xs text-muted-foreground">
            Caso precise alterar dados cadastrais restritos ou precise de auxílio técnico, envie uma mensagem direta ao administrador.
          </p>

          <form onSubmit={handleEnviarMensagemSuporte} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Assunto</label>
              <input
                type="text"
                value={assuntoSuporte}
                onChange={(e) => setAssuntoSuporte(e.target.value)}
                placeholder="Ex: Solicitacao de alteracao de perfil / duvida de acesso"
                className="w-full px-3 py-2 border rounded-lg text-xs bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Mensagem</label>
              <textarea
                rows={3}
                value={mensagemSuporte}
                onChange={(e) => setMensagemSuporte(e.target.value)}
                placeholder="Descreva o motivo do seu contato com detalhes..."
                className="w-full px-3 py-2 border rounded-lg text-xs bg-background text-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Enviar Mensagem ao Administrador</span>
              </button>
            </div>
          </form>
        </section>

        <section className="bg-card border border-rose-500/30 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-base border-b border-rose-500/20 pb-3">
            <UserX className="h-5 w-5 text-rose-500" />
            <h2>Desativação de Conta</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground block">Desativar Conta de Acesso</span>
              <span className="text-xs text-muted-foreground">
                Sua conta será suspensa no sistema. Esta ação pode ser revertida mediante solicitação ao administrador.
              </span>
            </div>

            {!showConfirmDesativar ? (
              <button
                type="button"
                onClick={() => setShowConfirmDesativar(true)}
                className="px-4 py-2.5 bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-xs shrink-0 cursor-pointer"
              >
                Desativar Conta
              </button>
            ) : (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-3 shrink-0 max-w-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Confirma a solicitação de desativação?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDesativarConta}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-md transition-colors shadow-xs cursor-pointer"
                  >
                    Sim, Desativar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmDesativar(false)}
                    className="px-3.5 py-1.5 bg-card border border-border text-foreground hover:bg-accent text-xs font-medium rounded-md transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ConfiguracoesPage
