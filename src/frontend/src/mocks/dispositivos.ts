import type { Dispositivo } from '@/types'
import { MOCK_USER_IDS, mockUsuarios } from './usuarios'

function findUsuario(id: string): { id: string; nome: string } {
  const usuario = mockUsuarios.find((item) => item.id === id)
  if (!usuario) {
    throw new Error(`Fixture de usuário não encontrada: ${id}`)
  }
  return { id: usuario.id, nome: usuario.nome }
}

export const mockDispositivos: Dispositivo[] = [
  {
    id: 'd0000000-0000-4000-8000-000000000001',
    usuario_id: MOCK_USER_IDS.maria,
    nome: 'MacBook Pro M2 (Maria)',
    tipo: 'NOTEBOOK',
    mac_address: 'AA:BB:CC:11:22:33',
    status: 'ATIVO',
    usuario: findUsuario(MOCK_USER_IDS.maria),
  },
  {
    id: 'd0000000-0000-4000-8000-000000000002',
    usuario_id: MOCK_USER_IDS.maria,
    nome: 'Samsung Galaxy S23 Ultra',
    tipo: 'CELULAR',
    mac_address: '44:55:66:77:88:99',
    status: 'ATIVO',
    usuario: findUsuario(MOCK_USER_IDS.maria),
  },
  {
    id: 'd0000000-0000-4000-8000-000000000003',
    usuario_id: MOCK_USER_IDS.lucas,
    nome: 'iPad Air 5a Geração',
    tipo: 'TABLET',
    mac_address: '11:22:33:44:55:66',
    status: 'PENDENTE',
    usuario: findUsuario(MOCK_USER_IDS.lucas),
  },
  {
    id: 'd0000000-0000-4000-8000-000000000004',
    usuario_id: MOCK_USER_IDS.fernando,
    nome: 'Dell Latitude 5420',
    tipo: 'NOTEBOOK',
    mac_address: 'DE:LL:11:22:33:44',
    status: 'INATIVO',
    usuario: findUsuario(MOCK_USER_IDS.fernando),
  },
]
