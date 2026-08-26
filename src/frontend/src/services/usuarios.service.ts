import { api } from './api'

export async function listar(
  filtros?: Record<string, string | number | boolean | undefined | null>
) {
  return api.get('/usuarios', filtros)
}

export async function buscarPorId(id: string | number) {
  return api.get(`/usuarios/${id}`)
}

export async function aprovar(id: string | number) {
  return api.patch(`/usuarios/${id}/aprovacao`, { acao: 'ACEITAR' })
}

export async function negar(id: string | number, motivo: string) {
  return api.patch(`/usuarios/${id}/aprovacao`, { acao: 'NEGAR', motivo })
}

export async function converter(id: string | number) {
  return api.patch(`/usuarios/${id}/converter-para-pesquisador`)
}

export const usuariosService = {
  listar,
  buscarPorId,
  aprovar,
  negar,
  converter,
}
