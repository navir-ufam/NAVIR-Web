import { api, withMock } from './api'

export async function atualizar(data: Record<string, unknown>) {
  return withMock(
    () => api.put('/curriculo', data),
    { success: true, mensagem: 'Currículo atualizado com sucesso.' }
  )
}

export const curriculoService = {
  atualizar,
}
