import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async obterMetricasAgregadas(): Promise<void> {
    // Placeholder para consultas cross-module (métricas de usuários, status, projetos)
  }
}
