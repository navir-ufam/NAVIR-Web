import { api } from './api'

export async function upload(arquivo: File) {
  const formData = new FormData()
  formData.append('historico', arquivo)
  return api.upload('/historico', formData)
}

export const historicoService = {
  upload,
}
