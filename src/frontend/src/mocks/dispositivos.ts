import type { Dispositivo } from '@/types'

export const mockDispositivos: Dispositivo[] = [
  {
    id: 201,
    nome: 'MacBook Pro M2 (Maria)',
    tipo: 'NOTEBOOK',
    mac_address: 'AA:BB:CC:11:22:33',
    usuario_id: 3,
    usuario_nome: 'Maria Pesquisadora Aceita',
    status: 'ATIVO',
    data_cadastro: '2026-02-05T10:00:00.000Z',
  },
  {
    id: 202,
    nome: 'Samsung Galaxy S23 Ultra',
    tipo: 'CELULAR',
    mac_address: '44:55:66:77:88:99',
    usuario_id: 3,
    usuario_nome: 'Maria Pesquisadora Aceita',
    status: 'ATIVO',
    data_cadastro: '2026-02-10T14:30:00.000Z',
  },
  {
    id: 203,
    nome: 'iPad Air 5a Geração',
    tipo: 'TABLET',
    mac_address: '11:22:33:44:55:66',
    usuario_id: 4,
    usuario_nome: 'Lucas Pesquisador Pendente',
    status: 'PENDENTE',
    data_cadastro: '2026-08-21T09:15:00.000Z',
  },
  {
    id: 204,
    nome: 'Dell Latitude 5420',
    tipo: 'NOTEBOOK',
    mac_address: 'DE:LL:11:22:33:44',
    usuario_id: 10,
    usuario_nome: 'Fernando Pesquisador Inativo',
    status: 'INATIVO',
    data_cadastro: '2025-06-01T11:00:00.000Z',
  },
]
