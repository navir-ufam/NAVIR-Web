import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ComponentShowcase } from '@/components/ComponentShowcase'
import DispositivosPage from '@/pages/dispositivos'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver
Element.prototype.scrollIntoView = vi.fn()

describe('Showcase & Pages Smoke Tests', () => {
  it('renders DispositivosPage placeholder correctly', () => {
    render(<DispositivosPage />)
    expect(screen.getByText('Dispositivos')).toBeInTheDocument()
  })

  it('renders ComponentShowcase completely without crashing', () => {
    render(<ComponentShowcase />)
    expect(screen.getByText('Catálogo Completo de Componentes & Paleta NAVIR')).toBeInTheDocument()
  })
})
