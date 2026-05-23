import { Injectable } from '@nestjs/common';

@Injectable()
export class AcessoLaboratorioService {
  async solicitarAcesso(): Promise<void> {
    // Placeholder para receber solicitações de acesso (PESQUISADOR)
  }

  async decidirAcesso(): Promise<void> {
    // Placeholder para permitir autorização ou bloqueio pelo admin
  }
}
