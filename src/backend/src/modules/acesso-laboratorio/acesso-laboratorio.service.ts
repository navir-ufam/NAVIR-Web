import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AcessoLaboratorioService {
  solicitarAcesso(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }

  decidirAcesso(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
