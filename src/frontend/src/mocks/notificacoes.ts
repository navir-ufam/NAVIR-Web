export interface NotificacaoMock {
  id: string
  titulo: string
  mensagem: string
  lida: boolean
  data: string
}

export const mockNotificacoes: NotificacaoMock[] = [
  {
    id: 'f0000000-0000-4000-8000-000000000001',
    titulo: 'Projeto Aprovado',
    mensagem: 'Seu projeto PIBIT foi aprovado pela coordenação.',
    lida: false,
    data: '2026-08-25T14:30:00.000Z',
  },
  {
    id: 'f0000000-0000-4000-8000-000000000002',
    titulo: 'Dispositivo Ativado',
    mensagem: 'O MacBook Pro M2 foi ativado no sistema.',
    lida: false,
    data: '2026-08-24T18:00:00.000Z',
  },
]
