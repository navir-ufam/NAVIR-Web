export type UserType = 'ADMIN' | 'PROFESSOR' | 'PESQUISADOR' | 'INTERESSADO'

export type UserState = 'PENDENTE' | 'ACEITO' | 'NEGADO' | null

export type AcademicStatus = 'REGULAR' | 'FINALISTA' | 'INATIVO' | 'EGRESSO' | 'DESISTENTE'

export type StatusProjeto = 'ATIVO' | 'FINALIZADO'

export type StatusDispositivo = 'PENDENTE' | 'ATIVO' | 'INATIVO'

export type TipoDispositivo = 'NOTEBOOK' | 'CELULAR' | 'TABLET' | 'OUTRO'

export type StatusAcessoLab = 'PENDENTE' | 'AUTORIZADO' | 'BLOQUEADO'

export interface Usuario {
  id: string
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
  id?: string
  nome?: string
  email?: string
  tipo: UserType
  estado: UserState
}

export interface UsuarioResumo {
  id: string
  nome: string
}

export interface TipoProjetoResumo {
  id: string
  nome: string
  sigla: string
}

export interface AgenciaResumo {
  id: string
  nome: string
  sigla: string
}

export interface Projeto {
  id: string
  usuario_id: string
  titulo: string
  tipo_projeto_id: string
  agencia_id: string | null
  codigo_projeto: string | null
  data_inicio: string
  data_fim: string | null
  professor_id: string
  remunerado: boolean | null
  status: StatusProjeto
  tipo_projeto?: TipoProjetoResumo
  agencia?: AgenciaResumo | null
  professor?: UsuarioResumo
  usuario?: UsuarioResumo
}

export interface Dispositivo {
  id: string
  usuario_id: string
  nome: string
  tipo: TipoDispositivo
  mac_address: string
  status: StatusDispositivo
  usuario?: UsuarioResumo
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
  id: string
  usuario_id: string
  status: StatusAcessoLab
  data_solicitacao: string
  data_atualizacao: string
  usuario?: UsuarioResumo
}

export * from './auth'
