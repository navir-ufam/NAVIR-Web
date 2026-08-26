import { api } from './api'

export async function listar(
  filtros?: Record<string, string | number | boolean | undefined | null>
) {
  return api.get('/projetos', filtros)
}

export async function buscarPorId(id: string | number) {
  return api.get(`/projetos/${id}`)
}

export async function criar(data: Record<string, unknown>) {
  return api.post('/projetos', data)
}

export async function finalizar(id: string | number) {
  return api.patch(`/projetos/${id}/finalizar`)
}

export const projetosService = {
  listar,
  buscarPorId,
  criar,
  finalizar,
}
