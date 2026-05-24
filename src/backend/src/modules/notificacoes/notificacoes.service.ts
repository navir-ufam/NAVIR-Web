import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class NotificacoesService {
  dispararEventoInterno(): void {
    throw new NotImplementedException(
      'Funcionalidade em desenvolvimento (US futura)',
    );
  }
}
