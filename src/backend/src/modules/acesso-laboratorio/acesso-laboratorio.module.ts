import { Module } from '@nestjs/common';
import { AcessoLaboratorioController } from './acesso-laboratorio.controller';
import { AcessoLaboratorioService } from './acesso-laboratorio.service';

@Module({
  controllers: [AcessoLaboratorioController],
  providers: [AcessoLaboratorioService],
})
export class AcessoLaboratorioModule {}
