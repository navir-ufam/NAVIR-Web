import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class NotificacoesService {
  dispararEventoInterno(): void {
    throw new NotImplementedException(
      'Método dispararEventoInterno de NotificacoesService em desenvolvimento (US futura)',
    );
  }
}
