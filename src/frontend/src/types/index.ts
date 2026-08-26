export type UserType = 'ADMIN' | 'PROFESSOR' | 'PESQUISADOR' | 'INTERESSADO'

export type UserState = 'PENDENTE' | 'ACEITO' | 'NEGADO' | null

export type AcademicStatus =
  | 'REGULAR'
  | 'FINALISTA'
  | 'INATIVO'
  | 'EGRESSO'
  | 'DESISTENTE'

export type StatusProjeto = 'ATIVO' | 'FINALIZADO'

export type StatusDispositivo = 'PENDENTE' | 'ATIVO' | 'INATIVO'

export type TipoDispositivo = 'NOTEBOOK' | 'CELULAR' | 'TABLET' | 'OUTRO'

export type StatusAcessoLab = 'PENDENTE' | 'AUTORIZADO' | 'BLOQUEADO'

export interface Usuario {
  id: number
  nome: string
  email: string
  tipo: UserType
  estado: UserState
  status_academico: AcademicStatus | null
  aceite_termos: boolean
  data_criacao: string
  data_atualizacao: string
}

export interface User {
  id?: string | number
  nome?: string
  email?: string
  tipo: UserType
  estado: UserState
}

export interface Projeto {
  id: number
  titulo: string
  descricao: string
  tipo: 'PIBIC' | 'PIBIT' | 'Independente' | string
  agencia_fomento?: string
  status: StatusProjeto
  orientador_id: number
  orientador_nome?: string
  pesquisadores_ids: number[]
  data_inicio: string
  data_fim?: string
}

export interface Dispositivo {
  id: number
  nome: string
  tipo: TipoDispositivo
  mac_address: string
  usuario_id: number
  usuario_nome?: string
  status: StatusDispositivo
  data_cadastro: string
}

export interface DashboardMetrics {
  total_usuarios: number
  pendentes: number
  regular: number
  finalista: number
  inativo: number
  egresso: number
  disponiveis: number
  total_projetos?: number
  projetos_ativos?: number
  total_dispositivos?: number
}

export interface FormacaoAcademica {
  curso: string
  instituicao: string
  ano_inicio: number
  ano_conclusao?: number
}

export interface PerfilPesquisador {
  usuario: Usuario
  curriculo_lattes?: string
  link_github?: string
  biografia?: string
  habilidades: string[]
  projetos: Projeto[]
  formacao_academica?: FormacaoAcademica[]
}

export interface AcessoLaboratorio {
  id: number
  usuario_id: number
  usuario_nome: string
  status: StatusAcessoLab
  data_solicitacao: string
  data_aprovacao?: string
  horario_permitido?: string
}

export * from './auth'
