import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class DashboardService {
  obterMetricasAgregadas(): void {
    throw new NotImplementedException(
      'Método obterMetricasAgregadas de DashboardService em desenvolvimento (US futura)',
    );
  }
}
