import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class StatusAcademicoService {
  executarClassificacaoAutomatica(): void {
    throw new NotImplementedException(
      'Método executarClassificacaoAutomatica de StatusAcademicoService em desenvolvimento (US futura)',
    );
  }
}
