import { Module } from '@nestjs/common';
import { DadosAcademicosController } from './dados-academicos.controller';
import { DadosAcademicosService } from './dados-academicos.service';

@Module({
  controllers: [DadosAcademicosController],
  providers: [DadosAcademicosService],
})
export class DadosAcademicosModule {}
