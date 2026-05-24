import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class HistoricoService {
  processarHistorico(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
