import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class DadosAcademicosService {
  salvarDadosExtraidos(): void {
    throw new NotImplementedException(
      'Método salvarDadosExtraidos de DadosAcademicosService em desenvolvimento (US futura)',
    );
  }
}
