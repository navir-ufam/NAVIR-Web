import { api, withMock } from './api'
import { mockAcessoLaboratorio, MOCK_USER_IDS } from '@/mocks'
import { generateId } from '@/utils'
import type { AcessoLaboratorio } from '@/types'

export async function status(): Promise<AcessoLaboratorio[]> {
  return withMock(() => api.get<AcessoLaboratorio[]>('/acesso-laboratorio/solicitacoes'), mockAcessoLaboratorio)
}

export async function solicitar(): Promise<AcessoLaboratorio> {
  const agora = new Date().toISOString()
  const newSolicitacao: AcessoLaboratorio = {
    id: generateId(),
    usuario_id: MOCK_USER_IDS.maria,
    status: 'PENDENTE',
    data_solicitacao: agora,
    data_atualizacao: agora,
  }
  return withMock(() => api.post<AcessoLaboratorio>('/acesso-laboratorio/solicitacoes'), newSolicitacao)
}

export async function decidir(usuarioId: string, novoStatus: string) {
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
