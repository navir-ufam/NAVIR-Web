import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoadingState, EmptyState, ErrorState, Toaster } from '@/components/ui'
import { ThemeProvider } from '@/context'
import { toast } from 'sonner'
import { Database, Plus } from 'lucide-react'

describe('Global Feedback Components (LoadingState, EmptyState, ErrorState, Toaster)', () => {
  it('renders LoadingState with default spinner variant', () => {
    render(<LoadingState text="Buscando projetos..." />)
    expect(screen.getByText('Buscando projetos...')).toBeDefined()
    expect(screen.getByLabelText('Buscando projetos...')).toBeDefined()
  })

  it('renders LoadingState table, cards and page variants', () => {
    const { rerender } = render(<LoadingState variant="table" count={4} text="Carregando tabela..." />)
    expect(screen.getByLabelText('Carregando tabela...')).toBeDefined()

    rerender(<LoadingState variant="cards" count={3} text="Carregando cards..." />)
    expect(screen.getByLabelText('Carregando cards...')).toBeDefined()

    rerender(<LoadingState variant="page" text="Carregando página..." />)
    expect(screen.getByLabelText('Carregando página...')).toBeDefined()
  })

  it('renders EmptyState with custom icon, title, description and action CTA button', () => {
    const handleCreate = vi.fn()

    render(
      <EmptyState
        icon={Database}
        title="Nenhum dispositivo encontrado"
        description="Cadastre o primeiro dispositivo WiFi no laboratório."
        action={{
          label: 'Cadastrar Dispositivo',
          onClick: handleCreate,
          icon: Plus,
        }}
      />
    )

    expect(screen.getByText('Nenhum dispositivo encontrado')).toBeDefined()
    expect(screen.getByText('Cadastre o primeiro dispositivo WiFi no laboratório.')).toBeDefined()

    const btn = screen.getByText('Cadastrar Dispositivo')
    fireEvent.click(btn)
    expect(handleCreate).toHaveBeenCalledTimes(1)
  })

  it('renders ErrorState with title, description and triggers onRetry handler', () => {
    const handleRetry = vi.fn()

    render(
      <ErrorState
        title="Erro de conexão com a API"
        description="Não foi possível conectar ao servidor backend."
        onRetry={handleRetry}
      />
    )

    expect(screen.getByText('Erro de conexão com a API')).toBeDefined()
    expect(screen.getByText('Não foi possível conectar ao servidor backend.')).toBeDefined()

    const retryBtn = screen.getByText('Tentar novamente')
    fireEvent.click(retryBtn)
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  it('renders Toaster component connected to ThemeProvider and dispatches toast notifications', () => {
    render(
      <ThemeProvider>
        <Toaster position="top-right" />
        <button type="button" onClick={() => toast.success('Operação realizada com sucesso!')}>
          Disparar Toast
        </button>
      </ThemeProvider>
    )

    const btn = screen.getByText('Disparar Toast')
    expect(btn).toBeDefined()

    fireEvent.click(btn)
    expect(screen.getByText('Disparar Toast')).toBeDefined()
  })
})
