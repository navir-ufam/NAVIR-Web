import { TipoDispositivo, StatusDispositivo } from '@prisma/client';

export class DispositivoEntity {
  id!: string;
  usuario_id!: string;
  nome!: string;
  mac_address!: string;
  tipo!: TipoDispositivo;
  status!: StatusDispositivo;
}
