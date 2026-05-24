import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class DadosAcademicosService {
  salvarDadosExtraidos(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
