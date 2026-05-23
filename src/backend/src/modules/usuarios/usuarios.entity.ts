import { TipoUsuario, EstadoUsuario, StatusAcademico } from '@prisma/client';

export class UsuarioEntity {
  id!: string;
  nome!: string;
  email!: string;
  senha_hash!: string;
  tipo_usuario!: TipoUsuario;
  estado_usuario!: EstadoUsuario | null;
  status_academico!: StatusAcademico | null;
  aceite_termos!: boolean;
  data_criacao!: Date;
  data_atualizacao!: Date;
}
