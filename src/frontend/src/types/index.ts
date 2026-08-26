export type UserType = 'ADMIN' | 'PROFESSOR' | 'PESQUISADOR' | 'INTERESSADO'

export type UserState = 'PENDENTE' | 'ACEITO' | 'NEGADO' | null

export type AcademicStatus = 'REGULAR' | 'FINALISTA' | 'INATIVO' | 'EGRESSO' | 'DESISTENTE'

export interface User {
  id?: string
  nome?: string
  email?: string
  tipo: UserType
  estado: UserState
}

export * from './auth'
