import { api, withMock } from './api'

export async function upload(arquivo: File) {
  const formData = new FormData()
  formData.append('historico', arquivo)
  return withMock(
    () => api.upload('/historico', formData),
    { success: true, mensagem: 'Histórico escolar enviado com sucesso.', nome: arquivo.name }
  )
}

export const historicoService = {
  upload,
}
