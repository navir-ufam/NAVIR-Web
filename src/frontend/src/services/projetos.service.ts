import { api, withMock } from './api'
import { mockProjetos, MOCK_TIPOS_PROJETO, MOCK_USER_IDS } from '@/mocks'
import { generateId } from '@/utils'
import type { Projeto } from '@/types'

function getSafeString(val: unknown, fallback: string): string {
  return typeof val === 'string' && val.trim() ? val : fallback
}

export async function listar(
  filtros?: Record<string, string | number | boolean | undefined | null>
): Promise<Projeto[]> {
  return withMock(() => api.get<Projeto[]>('/projetos', filtros), mockProjetos)
}

export async function buscarPorId(id: string): Promise<Projeto> {
  const mockItem = mockProjetos.find((p) => String(p.id) === String(id)) || mockProjetos[0]
  return withMock(() => api.get<Projeto>(`/projetos/${id}`), mockItem)
}

export async function criar(data: Record<string, unknown>): Promise<Projeto> {
  const newProjeto: Projeto = {
    id: generateId(),
    usuario_id: getSafeString(data.usuario_id, MOCK_USER_IDS.maria),
    titulo: getSafeString(data.titulo, 'Novo Projeto'),
    tipo_projeto_id: getSafeString(data.tipo_projeto_id, MOCK_TIPOS_PROJETO[0].id),
    agencia_id: typeof data.agencia_id === 'string' ? data.agencia_id : null,
    codigo_projeto: typeof data.codigo_projeto === 'string' ? data.codigo_projeto : null,
    data_inicio: getSafeString(data.data_inicio, new Date().toISOString().split('T')[0]),
    data_fim: typeof data.data_fim === 'string' ? data.data_fim : null,
    professor_id: getSafeString(data.professor_id, MOCK_USER_IDS.carlos),
    remunerado: typeof data.remunerado === 'boolean' ? data.remunerado : null,
    status: 'ATIVO',
  }
  return withMock(() => api.post<Projeto>('/projetos', data), newProjeto)
}

export async function finalizar(id: string) {
  return withMock(
    () => api.patch(`/projetos/${id}/finalizar`),
    { success: true, mensagem: 'Projeto finalizado com sucesso.' }
  )
}

export const projetosService = {
  listar,
  buscarPorId,
  criar,
  finalizar,
}
