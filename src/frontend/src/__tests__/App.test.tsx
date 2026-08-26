import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/app/App'

describe('App Component (Smoke Test)', () => {
  it('renders App without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeDefined()
    expect(screen.getByText('Carregando módulo...')).toBeDefined()
  })
})
