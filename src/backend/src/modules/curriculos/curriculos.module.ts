import { Module } from '@nestjs/common';
import { CurriculosController } from './curriculos.controller';
import { CurriculosService } from './curriculos.service';

@Module({
  controllers: [CurriculosController],
  providers: [CurriculosService],
})
export class CurriculosModule {}
