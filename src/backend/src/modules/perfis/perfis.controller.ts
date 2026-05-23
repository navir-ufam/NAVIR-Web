import { Controller } from '@nestjs/common';
import { PerfisService } from './perfis.service';

@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  // PUT /perfil — Atualiza perfil básico
}
