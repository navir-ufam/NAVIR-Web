import { Controller } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';

@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  // Módulo de infraestrutura e eventos de persistência/notificação interna
}
