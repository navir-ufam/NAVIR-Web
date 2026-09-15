import { StatusAcesso } from '@prisma/client';

export class AcessoLaboratorioEntity {
  id!: string;
  usuario_id!: string;
  status!: StatusAcesso;
  data_solicitacao!: Date;
  data_atualizacao!: Date;
}
