import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ConfiguracoesPage from '@/pages/configuracoes'
import { ThemeProvider } from '@/context/ThemeContext'
import { toast } from 'sonner'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ConfiguracoesPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('renders page header, sections and theme buttons', () => {
    render(
      <ThemeProvider>
        <ConfiguracoesPage />
      </ThemeProvider>
    )

    expect(screen.getByText('Configurações do Sistema')).toBeDefined()
    expect(screen.getByText('Aparência e Tema')).toBeDefined()
    expect(screen.getByText('Notificações e Alertas')).toBeDefined()
    expect(screen.getByText('Alteração de Senha')).toBeDefined()
    expect(screen.getByText('Contato com o Administrador')).toBeDefined()
    expect(screen.getByText('Desativação de Conta')).toBeDefined()
  })

  it('switches themes dynamically and adds dark class to document element', () => {
    render(
      <ThemeProvider>
        <ConfiguracoesPage />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText('Escuro'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(toast.success).toHaveBeenCalledWith('Tema alterado para Escuro!')

    fireEvent.click(screen.getByText('Claro'))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(toast.success).toHaveBeenCalledWith('Tema alterado para Claro!')
  })

  it('allows changing password with validation', () => {
    render(
      <ThemeProvider>
        <ConfiguracoesPage />
      </ThemeProvider>
    )

    const inputs = screen.getAllByPlaceholderText(/••••••••|Mínimo 6 caracteres|Repita a nova senha/)
    expect(inputs.length).toBe(3)

    fireEvent.change(inputs[0], { target: { value: 'senha123' } })
    fireEvent.change(inputs[1], { target: { value: 'novasenha123' } })
    fireEvent.change(inputs[2], { target: { value: 'novasenha123' } })

    fireEvent.click(screen.getByText('Atualizar Senha'))
    expect(toast.success).toHaveBeenCalledWith('Senha alterada com sucesso!')
  })

  it('shows error if password confirmation does not match', () => {
    render(
      <ThemeProvider>
        <ConfiguracoesPage />
      </ThemeProvider>
    )

    const inputs = screen.getAllByPlaceholderText(/••••••••|Mínimo 6 caracteres|Repita a nova senha/)

    fireEvent.change(inputs[0], { target: { value: 'senha123' } })
    fireEvent.change(inputs[1], { target: { value: 'novasenha123' } })
    fireEvent.change(inputs[2], { target: { value: 'outrasenha' } })

    fireEvent.click(screen.getByText('Atualizar Senha'))
    expect(toast.error).toHaveBeenCalledWith('A nova senha e a confirmação não conferem.')
  })

  it('allows sending message to administrator', () => {
    render(
      <ThemeProvider>
        <ConfiguracoesPage />
      </ThemeProvider>
    )

    fireEvent.change(screen.getByPlaceholderText('Ex: Solicitacao de alteracao de perfil / duvida de acesso'), {
      target: { value: 'Dúvida de acesso ao laboratório' },
    })
    fireEvent.change(screen.getByPlaceholderText('Descreva o motivo do seu contato com detalhes...'), {
      target: { value: 'Gostaria de solicitar liberação para os finais de semana.' },
    })

    fireEvent.click(screen.getByText('Enviar Mensagem ao Administrador'))
    expect(toast.success).toHaveBeenCalledWith('Sua mensagem foi enviada ao administrador com sucesso!')
  })

  it('toggles account deactivation confirmation dialog', () => {
    render(
      <ThemeProvider>
        <ConfiguracoesPage />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText('Desativar Conta'))
    expect(screen.getByText('Confirma a solicitação de desativação?')).toBeDefined()

    fireEvent.click(screen.getByText('Sim, Desativar'))
    expect(toast.success).toHaveBeenCalledWith('Solicitação de desativação encaminhada ao administrador.')
  })
})
