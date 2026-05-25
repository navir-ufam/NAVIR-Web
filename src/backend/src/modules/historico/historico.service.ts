import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class HistoricoService {
  processarHistorico(): void {
    throw new NotImplementedException(
      'Método processarHistorico de HistoricoService em desenvolvimento (US futura)',
    );
  }
}
