import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PerfisService {
  atualizarPerfil(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
