import type { AcessoLaboratorio } from '@/types'

export const mockAcessoLaboratorio: AcessoLaboratorio[] = [
  {
    id: 301,
    usuario_id: 3,
    usuario_nome: 'Maria Pesquisadora Aceita',
    status: 'AUTORIZADO',
    data_solicitacao: '2026-02-01T10:00:00.000Z',
    data_aprovacao: '2026-02-01T11:30:00.000Z',
    horario_permitido: '08:00 - 22:00',
  },
  {
    id: 302,
    usuario_id: 4,
    usuario_nome: 'Lucas Pesquisador Pendente',
    status: 'PENDENTE',
    data_solicitacao: '2026-08-21T09:00:00.000Z',
  },
  {
    id: 303,
    usuario_id: 5,
    usuario_nome: 'Ana Pesquisadora Negada',
    status: 'BLOQUEADO',
    data_solicitacao: '2026-03-05T14:00:00.000Z',
  },
]
