import { api } from './api'

export async function listar() {
  return api.get('/dispositivos')
}

export async function cadastrar(data: Record<string, unknown>) {
  return api.post('/dispositivos', data)
}

export async function ativar(id: string | number) {
  return api.patch(`/dispositivos/${id}/ativar`)
}

export async function inativar(id: string | number) {
  return api.patch(`/dispositivos/${id}/inativar`)
}

export const dispositivosService = {
  listar,
  cadastrar,
  ativar,
  inativar,
}
