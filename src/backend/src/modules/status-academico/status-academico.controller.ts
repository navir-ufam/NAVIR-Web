import { Controller } from '@nestjs/common';
import { StatusAcademicoService } from './status-academico.service';

@Controller('status-academico')
export class StatusAcademicoController {
  constructor(
    private readonly statusAcademicoService: StatusAcademicoService,
  ) {}

  // Módulo interno — Executado via triggers (login/histórico/lattes) ou rotinas cron diárias
}
