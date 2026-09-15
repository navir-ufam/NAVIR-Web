import { Controller } from '@nestjs/common';
import { DispositivosService } from './dispositivos.service';

@Controller('dispositivos')
export class DispositivosController {
  constructor(private readonly dispositivosService: DispositivosService) {}

  // POST /dispositivos — Cadastrar dispositivo (PESQUISADOR)
  // PATCH /dispositivos/:id/ativar — Ativar dispositivo (ADMIN)
  // PATCH /dispositivos/:id/inativar — Inativar dispositivo (ADMIN)
}
