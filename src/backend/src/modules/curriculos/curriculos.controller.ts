import { Controller } from '@nestjs/common';
import { CurriculosService } from './curriculos.service';

@Controller('curriculo')
export class CurriculosController {
  constructor(private readonly curriculosService: CurriculosService) {}

  // PUT /curriculo — Atualiza dados do currículo lattes
}
