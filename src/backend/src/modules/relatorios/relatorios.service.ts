import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class RelatoriosService {
  exportarDados(): void {
    throw new NotImplementedException(
      'Método exportarDados de RelatoriosService em desenvolvimento (US futura)',
    );
  }
}
