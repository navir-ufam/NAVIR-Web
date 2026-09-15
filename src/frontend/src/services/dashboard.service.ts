import { api, withMock } from './api'
import { mockDashboardMetrics } from '@/mocks'
import type { DashboardMetrics } from '@/types'

export async function buscarMetricas(): Promise<DashboardMetrics> {
  return withMock(() => api.get<DashboardMetrics>('/dashboard'), mockDashboardMetrics)
}

export const dashboardService = {
  buscarMetricas,
}
