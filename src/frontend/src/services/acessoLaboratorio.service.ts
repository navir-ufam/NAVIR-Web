import { api } from './api'

export async function status() {
  return api.get('/acesso-laboratorio/solicitacoes')
}

export async function solicitar() {
  return api.post('/acesso-laboratorio/solicitacoes')
}

export async function decidir(usuarioId: string | number, status: string) {
  return api.patch(`/acesso-laboratorio/${usuarioId}`, { status })
}

export const acessoLaboratorioService = {
  status,
  solicitar,
  decidir,
}
