import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class DispositivosService {
  cadastrar(): void {
    throw new NotImplementedException(
      'Método cadastrar de DispositivosService em desenvolvimento (US futura)',
    );
  }

  ativar(): void {
    throw new NotImplementedException(
      'Método ativar de DispositivosService em desenvolvimento (US futura)',
    );
  }

  inativar(): void {
    throw new NotImplementedException(
      'Método inativar de DispositivosService em desenvolvimento (US futura)',
    );
  }
}
