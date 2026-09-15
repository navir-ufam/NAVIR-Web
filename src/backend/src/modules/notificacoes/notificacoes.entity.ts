export class NotificacaoEntity {
  id!: string;
  usuario_destino_id!: string;
  tipo!: string;
  mensagem!: string;
  lida!: boolean;
  data_criacao!: Date;
}
