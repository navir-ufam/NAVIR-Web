import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react'
import type { User } from '@/types'
import { AUTH_UNAUTHORIZED_EVENT } from '@/services/apiClient'

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
  setMockUser: (userData: User | null) => void
}

type AuthProviderProps = Readonly<{
  children: ReactNode
  initialUser?: User | null
}>

const AUTH_STORAGE_KEY = 'navir_auth_user'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    if (initialUser !== undefined) return initialUser
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null)
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized)
    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized)
    }
  }, [])

  const login = useCallback((userData: User) => {
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const setMockUser = useCallback((userData: User | null) => {
    setUser(userData)
  }, [])

  const isAuthenticated = user !== null

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      setMockUser,
    }),
    [user, isAuthenticated, login, logout, setMockUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
