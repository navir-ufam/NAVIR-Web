import type { UserType, UserState } from './index'

export type { UserType, UserState }

export interface AuthUser {
  id: string | number
  tipo: UserType
  estado: UserState
  nome?: string
  email?: string
}

export type LoginResult =
  | { success: true; user: AuthUser }
  | { success: false; type: 'INTERESSADO'; mensagem: string }
  | { success: false; type: 'NEGADO' }
  | { success: false; type: 'INVALID_CREDENTIALS' }

export interface AuthContextType {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<LoginResult>
  logout: () => void
  setMockUser?: (userData: AuthUser | null) => void
}

export interface JwtPayload {
  sub?: string | number
  id?: string | number
  tipo?: UserType
  role?: UserType
  estado?: UserState
  state?: UserState
  nome?: string
  name?: string
  email?: string
  exp?: number
}
