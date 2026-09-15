export class ProjetoEntity {
  id!: string;
  titulo!: string;
  tipoProjetoId!: number;
  agenciaId?: number;
  codigoProjeto?: string;
  dataInicio!: Date;
  dataFim!: Date;
  professorId!: string;
  remunerado!: boolean;
  status!: string;
}
