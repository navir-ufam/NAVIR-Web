import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class CurriculosService {
  atualizarCurriculo(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
