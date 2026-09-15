import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AcessoLaboratorioService {
  solicitarAcesso(): void {
    throw new NotImplementedException(
      'Método solicitarAcesso de AcessoLaboratorioService em desenvolvimento (US futura)',
    );
  }

  decidirAcesso(): void {
    throw new NotImplementedException(
      'Método decidirAcesso de AcessoLaboratorioService em desenvolvimento (US futura)',
    );
  }
}
