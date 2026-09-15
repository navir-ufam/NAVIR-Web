import type { AcessoLaboratorio } from '@/types'
import { MOCK_USER_IDS, mockUsuarios } from './usuarios'

function findUsuario(id: string): { id: string; nome: string } {
  const usuario = mockUsuarios.find((item) => item.id === id)
  if (!usuario) {
    throw new Error(`Fixture de usuário não encontrada: ${id}`)
  }
  return { id: usuario.id, nome: usuario.nome }
}

export const mockAcessoLaboratorio: AcessoLaboratorio[] = [
  {
    id: 'e0000000-0000-4000-8000-000000000001',
    usuario_id: MOCK_USER_IDS.maria,
    status: 'AUTORIZADO',
    data_solicitacao: '2026-02-01T10:00:00.000Z',
    data_atualizacao: '2026-02-01T11:30:00.000Z',
    usuario: findUsuario(MOCK_USER_IDS.maria),
  },
  {
    id: 'e0000000-0000-4000-8000-000000000002',
    usuario_id: MOCK_USER_IDS.lucas,
    status: 'PENDENTE',
    data_solicitacao: '2026-08-21T09:00:00.000Z',
    data_atualizacao: '2026-08-21T09:00:00.000Z',
    usuario: findUsuario(MOCK_USER_IDS.lucas),
  },
  {
    id: 'e0000000-0000-4000-8000-000000000003',
    usuario_id: MOCK_USER_IDS.ana,
    status: 'BLOQUEADO',
    data_solicitacao: '2026-03-05T14:00:00.000Z',
    data_atualizacao: '2026-03-06T09:00:00.000Z',
    usuario: findUsuario(MOCK_USER_IDS.ana),
  },
]
