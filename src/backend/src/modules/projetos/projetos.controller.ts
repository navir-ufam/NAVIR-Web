import { Controller } from '@nestjs/common';
import { ProjetosService } from './projetos.service';

@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  // POST /projetos — Criar projeto (PESQUISADOR)
  // GET /projetos — Listar com filtros (status, professor, tipo)
  // PATCH /projetos/:id — Atualiza projeto
  // PATCH /projetos/:id/finalizar — Finalização manual ou por permissão
}
