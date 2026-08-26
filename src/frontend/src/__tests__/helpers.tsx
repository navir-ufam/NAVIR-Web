import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/app/queryClient'
import { AuthProvider, ThemeProvider } from '@/context'
import type { AuthUser } from '@/types'

export type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
  user?: AuthUser | null
  initialRoute?: string
}

export function renderWithProviders(
  ui: ReactElement,
  {
    user = null,
    initialRoute = '/',
    ...renderOptions
  }: Readonly<RenderWithProvidersOptions> = {}
) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider initialUser={user}>
          <MemoryRouter initialEntries={[initialRoute]}>{ui}</MemoryRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>,
    renderOptions
  )
}
