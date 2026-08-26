import { api } from './api'

export async function atualizar(data: Record<string, unknown>) {
  return api.put('/curriculo', data)
}

export const curriculoService = {
  atualizar,
}
