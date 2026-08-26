import { api, withMock } from './api'

const mockNotificacoesList = [
  { id: 1, titulo: 'Projeto Aprovado', mensagem: 'Seu projeto PIBIT foi aprovado pela coordenação.', lida: false, data: '2026-08-25T14:30:00.000Z' },
  { id: 2, titulo: 'Dispositivo Ativado', mensagem: 'O MacBook Pro M2 foi ativado no sistema.', lida: false, data: '2026-08-24T18:00:00.000Z' },
]

export async function listar() {
  return withMock(() => api.get('/notificacoes'), mockNotificacoesList)
}

export async function marcarComoLida(id: string | number) {
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
