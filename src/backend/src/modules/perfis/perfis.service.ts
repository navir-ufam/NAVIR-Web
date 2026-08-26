import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PerfisService {
  atualizarPerfil(): void {
    throw new NotImplementedException(
      'Método atualizarPerfil de PerfisService em desenvolvimento (US futura)',
    );
  }
}
