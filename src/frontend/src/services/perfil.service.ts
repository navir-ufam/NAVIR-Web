import { api } from './api'

export async function atualizar(data: Record<string, unknown>) {
  return api.put('/perfil', data)
}

export const perfilService = {
  atualizar,
}
