import { api, withMock } from './api'
import { mockUsuarios } from '@/mocks'
import type { Usuario } from '@/types'

export async function listar(
  filtros?: Record<string, string | number | boolean | undefined | null>
): Promise<Usuario[]> {
  return withMock(() => api.get<Usuario[]>('/usuarios', filtros), mockUsuarios)
}

export async function buscarPorId(id: string | number): Promise<Usuario> {
  const mockItem = mockUsuarios.find((u) => String(u.id) === String(id)) || mockUsuarios[0]
  return withMock(() => api.get<Usuario>(`/usuarios/${id}`), mockItem)
}

export async function aprovar(id: string | number) {
  return withMock(
    () => api.patch(`/usuarios/${id}/aprovacao`, { acao: 'ACEITAR' }),
    { success: true, mensagem: 'Usuário aprovado com sucesso.' }
  )
}

export async function negar(id: string | number, motivo: string) {
  return withMock(
    () => api.patch(`/usuarios/${id}/aprovacao`, { acao: 'NEGAR', motivo }),
    { success: true, mensagem: 'Solicitação de acesso negada.' }
  )
}

export async function converter(id: string | number) {
  return withMock(
    () => api.patch(`/usuarios/${id}/converter-para-pesquisador`),
    { success: true, mensagem: 'Usuário convertido em pesquisador com sucesso.' }
  )
}

export const usuariosService = {
  listar,
  buscarPorId,
  aprovar,
  negar,
  converter,
}
