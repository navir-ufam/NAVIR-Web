import { Controller } from '@nestjs/common';
import { AcessoLaboratorioService } from './acesso-laboratorio.service';

@Controller('acesso-laboratorio')
export class AcessoLaboratorioController {
  constructor(
    private readonly acessoLaboratorioService: AcessoLaboratorioService,
  ) {}

  // POST /acesso-laboratorio/solicitacoes — Solicitação de acesso (PESQUISADOR)
  // PATCH /acesso-laboratorio/:usuarioId — Decidir status de acesso (ADMIN)
}
