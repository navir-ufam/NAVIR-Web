import { api, withMock } from './api'
import { mockNotificacoes } from '@/mocks'

export async function listar() {
  return withMock(() => api.get('/notificacoes'), mockNotificacoes)
}

export async function marcarComoLida(id: string) {
  return withMock(
    () => api.patch(`/notificacoes/${id}/lida`),
    { success: true, id }
  )
}

export async function contarNaoLidas() {
  return withMock(
    () => api.get<{ total: number }>('/notificacoes/nao-lidas/count'),
    { total: 2 }
  )
}

export const notificacoesService = {
  listar,
  marcarComoLida,
  contarNaoLidas,
}
