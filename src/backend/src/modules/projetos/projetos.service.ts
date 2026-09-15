import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class ProjetosService {
  criar(): void {
    throw new NotImplementedException(
      'Método criar de ProjetosService em desenvolvimento (US futura)',
    );
  }

  listar(): void {
    throw new NotImplementedException(
      'Método listar de ProjetosService em desenvolvimento (US futura)',
    );
  }

  atualizar(): void {
    throw new NotImplementedException(
      'Método atualizar de ProjetosService em desenvolvimento (US futura)',
    );
  }

  finalizar(): void {
    throw new NotImplementedException(
      'Método finalizar de ProjetosService em desenvolvimento (US futura)',
    );
  }
}
