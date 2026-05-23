import { Injectable } from '@nestjs/common';

@Injectable()
export class DispositivosService {
  async cadastrar(): Promise<void> {
    // Placeholder para cadastro de dispositivo por pesquisador
  }

  async ativar(): Promise<void> {
    // Placeholder para ativação de dispositivo (ADMIN)
  }

  async inativar(): Promise<void> {
    // Placeholder para inativação de dispositivo (ADMIN)
  }
}
