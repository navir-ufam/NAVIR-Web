import { Controller } from '@nestjs/common';
import { DadosAcademicosService } from './dados-academicos.service';

@Controller('dados-academicos')
export class DadosAcademicosController {
  constructor(
    private readonly dadosAcademicosService: DadosAcademicosService,
  ) {}

  // Módulo consumido internamente através do processamento de histórico
}
