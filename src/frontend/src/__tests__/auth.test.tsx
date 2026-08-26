import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuth, AuthProvider } from '@/context'

describe('AuthContext (Smoke Test)', () => {
  it('fornece estado inicial com user null e isAuthenticated false', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }: { readonly children: React.ReactNode }) => (
        <AuthProvider initialUser={null}>{children}</AuthProvider>
      ),
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
