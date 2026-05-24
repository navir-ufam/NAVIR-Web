import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class StatusAcademicoService {
  executarClassificacaoAutomatica(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
