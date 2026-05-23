import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificacoesService {
  async dispararEventoInterno(): Promise<void> {
    // Placeholder para escuta de eventos (novo_interessado, projeto_finalizado, etc.)
  }
}
