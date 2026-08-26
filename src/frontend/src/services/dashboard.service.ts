import { api } from './api'

export async function buscarMetricas() {
  return api.get('/dashboard')
}

export const dashboardService = {
  buscarMetricas,
}
