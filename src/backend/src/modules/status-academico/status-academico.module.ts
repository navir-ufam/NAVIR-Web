import { Module } from '@nestjs/common';
import { StatusAcademicoController } from './status-academico.controller';
import { StatusAcademicoService } from './status-academico.service';

@Module({
  controllers: [StatusAcademicoController],
  providers: [StatusAcademicoService],
})
export class StatusAcademicoModule {}
