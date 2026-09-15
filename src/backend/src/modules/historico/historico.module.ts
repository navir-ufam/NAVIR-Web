import { Module } from '@nestjs/common';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';

@Module({
  controllers: [HistoricoController],
  providers: [HistoricoService],
})
export class HistoricoModule {}
