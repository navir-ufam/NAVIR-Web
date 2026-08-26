import { api, withMock } from './api'
import { mockProjetos } from '@/mocks'
import type { Projeto } from '@/types'

function getSafeString(val: unknown, fallback: string): string {
  return typeof val === 'string' && val.trim() ? val : fallback
}

export async function listar(
  filtros?: Record<string, string | number | boolean | undefined | null>
): Promise<Projeto[]> {
  return withMock(() => api.get<Projeto[]>('/projetos', filtros), mockProjetos)
}

export async function buscarPorId(id: string | number): Promise<Projeto> {
  const mockItem = mockProjetos.find((p) => String(p.id) === String(id)) || mockProjetos[0]
  return withMock(() => api.get<Projeto>(`/projetos/${id}`), mockItem)
}

export async function criar(data: Record<string, unknown>): Promise<Projeto> {
  const newProjeto: Projeto = {
    id: Date.now(),
    titulo: getSafeString(data.titulo, 'Novo Projeto'),
    descricao: getSafeString(data.descricao, ''),
    tipo: getSafeString(data.tipo, 'PIBIC') as Projeto['tipo'],
    agencia_fomento: getSafeString(data.agencia_fomento, 'FAPEAM'),
    status: 'ATIVO',
    orientador_id: typeof data.orientador_id === 'number' ? data.orientador_id : 2,
    pesquisadores_ids: Array.isArray(data.pesquisadores_ids) ? (data.pesquisadores_ids as number[]) : [],
    data_inicio: new Date().toISOString().split('T')[0],
  }
  return withMock(() => api.post<Projeto>('/projetos', data), newProjeto)
}

export async function finalizar(id: string | number) {
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
