import { api } from './api'

export async function exportar(
  formato: string,
  filtros?: Record<string, string | number | boolean | undefined | null>
) {
  return api.get('/relatorios/export', { ...filtros, formato })
}

export const relatoriosService = {
  exportar,
}
