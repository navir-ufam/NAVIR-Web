import { api, withMock } from './api'
import { mockDispositivos, MOCK_USER_IDS } from '@/mocks'
import { generateId } from '@/utils'
import type { Dispositivo } from '@/types'

function getSafeString(val: unknown, fallback: string): string {
  return typeof val === 'string' && val.trim() ? val : fallback
}

export async function listar(): Promise<Dispositivo[]> {
  return withMock(() => api.get<Dispositivo[]>('/dispositivos'), mockDispositivos)
}

export async function cadastrar(data: Record<string, unknown>): Promise<Dispositivo> {
  const newDispositivo: Dispositivo = {
    id: generateId(),
    usuario_id: getSafeString(data.usuario_id, MOCK_USER_IDS.maria),
    nome: getSafeString(data.nome, 'Novo Dispositivo'),
    tipo: typeof data.tipo === 'string' ? (data.tipo as Dispositivo['tipo']) : 'NOTEBOOK',
    mac_address: getSafeString(data.mac_address, '00:11:22:33:44:55'),
    status: 'PENDENTE',
  }
  return withMock(() => api.post<Dispositivo>('/dispositivos', data), newDispositivo)
}

export async function ativar(id: string) {
  return withMock(
    () => api.patch(`/dispositivos/${id}/ativar`),
    { success: true, mensagem: 'Dispositivo ativado com sucesso.' }
  )
}

export async function inativar(id: string) {
  return withMock(
    () => api.patch(`/dispositivos/${id}/inativar`),
    { success: true, mensagem: 'Dispositivo inativado com sucesso.' }
  )
}

export const dispositivosService = {
  listar,
  cadastrar,
  ativar,
  inativar,
}
