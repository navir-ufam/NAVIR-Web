import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class CurriculosService {
  atualizarCurriculo(): void {
    throw new NotImplementedException(
      'Método atualizarCurriculo de CurriculosService em desenvolvimento (US futura)',
    );
  }
}
