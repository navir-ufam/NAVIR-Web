import { api, withMock } from './api'
import { mockAcessoLaboratorio } from '@/mocks'
import type { AcessoLaboratorio } from '@/types'

export async function status(): Promise<AcessoLaboratorio[]> {
  return withMock(() => api.get<AcessoLaboratorio[]>('/acesso-laboratorio/solicitacoes'), mockAcessoLaboratorio)
}

export async function solicitar(): Promise<AcessoLaboratorio> {
  const newSolicitacao: AcessoLaboratorio = {
    id: Date.now(),
    usuario_id: 3,
    usuario_nome: 'Maria Pesquisadora Aceita',
    status: 'PENDENTE',
    data_solicitacao: new Date().toISOString(),
  }
  return withMock(() => api.post<AcessoLaboratorio>('/acesso-laboratorio/solicitacoes'), newSolicitacao)
}

export async function decidir(usuarioId: string | number, novoStatus: string) {
  return withMock(
    () => api.patch(`/acesso-laboratorio/${usuarioId}`, { status: novoStatus }),
    { success: true, mensagem: `Solicitação atualizada para ${novoStatus}.` }
  )
}

export const acessoLaboratorioService = {
  status,
  solicitar,
  decidir,
}
