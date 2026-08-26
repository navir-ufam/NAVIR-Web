import { api } from './api'

export async function listar() {
  return api.get('/notificacoes')
}

export async function marcarComoLida(id: string | number) {
  return api.patch(`/notificacoes/${id}/lida`)
}

export async function contarNaoLidas() {
  return api.get('/notificacoes/nao-lidas/count')
}

export const notificacoesService = {
  listar,
  marcarComoLida,
  contarNaoLidas,
}
