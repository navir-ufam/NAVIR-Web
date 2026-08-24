import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import type { AuthUser, AuthContextType, LoginResult, UserType, UserState } from '@/types/auth'
import { parseUserFromToken } from '@/utils/jwt'
import { loginRequest, fetchCurrentUser } from '@/services/authService'
import { AUTH_UNAUTHORIZED_EVENT } from '@/services/apiClient'
import { queryClient } from '@/app/queryClient'

const TOKEN_STORAGE_KEY = 'navir_token'

type AuthProviderProps = Readonly<{
  children: ReactNode
  initialToken?: string | null
  initialUser?: AuthUser | null
}>

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children, initialToken, initialUser }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    if (initialToken !== undefined) return initialToken
    if (initialUser) return 'initial_mock_token'
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY)
    } catch {
      return null
    }
  })

  const [user, setUser] = useState<AuthUser | null>(() => {
    if (initialUser !== undefined) return initialUser
    if (token) {
      return parseUserFromToken(token)
    }
    return null
  })

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    async function initSession() {
      if (initialToken !== undefined || initialUser !== undefined) {
        if (isMounted) setIsLoading(false)
        return
      }

      try {
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
        if (storedToken) {
          const parsedUser = parseUserFromToken(storedToken)
          if (parsedUser) {
            if (isMounted) {
              setToken(storedToken)
              setUser(parsedUser)
            }
          } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY)
            if (isMounted) {
              setToken(null)
              setUser(null)
            }
          }
        } else {
          const cookieUser = await fetchCurrentUser()
          if (cookieUser && isMounted) {
            setUser(cookieUser)
            setToken('cookie_session')
          }
        }
      } catch {
        if (isMounted) {
          setToken(null)
          setUser(null)
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    initSession()

    return () => {
      isMounted = false
    }
  }, [initialToken, initialUser])

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null)
      setToken(null)
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      queryClient.clear()
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized)
    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized)
    }
  }, [])

  const login = useCallback(async (email: string, senha: string): Promise<LoginResult> => {
    const result = await loginRequest(email, senha)

    if (result.status === 401) {
      return { success: false, type: 'INVALID_CREDENTIALS' }
    }

    if (result.status === 403 || result.data?.estado === 'NEGADO' || result.data?.usuario?.estado === 'NEGADO') {
      return { success: false, type: 'NEGADO' }
    }

    if (result.data?.mensagem || result.data?.tipo === 'INTERESSADO' || result.data?.usuario?.tipo === 'INTERESSADO') {
      return {
        success: false,
        type: 'INTERESSADO',
        mensagem: result.data.mensagem || 'Solicitação de interessado registrada.',
      }
    }

    const resUser = result.data?.usuario || result.data?.user

    if (result.data?.token || resUser) {
      const receivedToken = result.data?.token || 'cookie_session'
      if (result.data?.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, receivedToken)
      }

      const parsedUser = (result.data?.token ? parseUserFromToken(receivedToken) : null) || {
        id: resUser?.id || '1',
        tipo: (resUser?.tipo as UserType) || 'PESQUISADOR',
        estado: (resUser?.estado as UserState) || 'ACEITO',
        nome: resUser?.nome,
        email: resUser?.email || email,
      }

      setToken(receivedToken)
      setUser(parsedUser)
      return { success: true, user: parsedUser }
    }

    return { success: false, type: 'INVALID_CREDENTIALS' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    queryClient.clear()
  }, [])

  const setMockUser = useCallback((userData: AuthUser | null) => {
    setUser(userData)
    if (userData) {
      setToken('mock_jwt_token')
    } else {
      setToken(null)
      queryClient.clear()
    }
  }, [])

  const isAuthenticated = user !== null && token !== null

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      logout,
      setMockUser,
    }),
    [user, token, isAuthenticated, isLoading, login, logout, setMockUser]
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
