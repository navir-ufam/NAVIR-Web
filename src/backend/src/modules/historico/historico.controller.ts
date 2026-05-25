import { Controller } from '@nestjs/common';
import { HistoricoService } from './historico.service';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  // POST /historico — Upload e processamento para extração de dados acadêmicos
}
