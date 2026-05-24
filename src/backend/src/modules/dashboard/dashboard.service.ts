import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class DashboardService {
  obterMetricasAgregadas(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
