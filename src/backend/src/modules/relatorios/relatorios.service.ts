import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class RelatoriosService {
  exportarDados(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
