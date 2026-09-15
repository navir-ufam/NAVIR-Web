import { StatusProjeto } from '@prisma/client';

export class ProjetoEntity {
  id!: string;
  usuario_id!: string;
  titulo!: string;
  tipo_projeto_id!: string;
  agencia_id!: string | null;
  codigo_projeto!: string | null;
  data_inicio!: Date;
  data_fim!: Date | null;
  professor_id!: string;
  remunerado!: boolean | null;
  status!: StatusProjeto;
}
