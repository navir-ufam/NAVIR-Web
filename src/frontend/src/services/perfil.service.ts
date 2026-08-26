import { api, withMock } from './api'
import { mockPerfil } from '@/mocks'
import type { PerfilPesquisador } from '@/types'

export async function obter(): Promise<PerfilPesquisador> {
  return withMock(() => api.get<PerfilPesquisador>('/perfil'), mockPerfil)
}

export async function atualizar(data: Record<string, unknown>): Promise<PerfilPesquisador> {
  return withMock(() => api.put<PerfilPesquisador>('/perfil', data), {
    ...mockPerfil,
    curriculo_lattes: typeof data.curriculo_lattes === 'string' ? data.curriculo_lattes : mockPerfil.curriculo_lattes,
    link_github: typeof data.link_github === 'string' ? data.link_github : mockPerfil.link_github,
    biografia: typeof data.biografia === 'string' ? data.biografia : mockPerfil.biografia,
  })
}

export const perfilService = {
  obter,
  atualizar,
}
