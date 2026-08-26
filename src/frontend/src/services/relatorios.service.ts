import { api, withMock } from './api'

export async function exportar(
  formato: string,
  filtros?: Record<string, string | number | boolean | undefined | null>
) {
  return withMock(
    () => api.get('/relatorios/export', { ...filtros, formato }),
    { success: true, url: `/relatorios/export/relatorio-navir.${formato}` }
  )
}

export const relatoriosService = {
  exportar,
}
