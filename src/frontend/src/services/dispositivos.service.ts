import { api, withMock } from './api'
import { mockDispositivos } from '@/mocks'
import type { Dispositivo } from '@/types'

function getSafeString(val: unknown, fallback: string): string {
  return typeof val === 'string' && val.trim() ? val : fallback
}

export async function listar(): Promise<Dispositivo[]> {
  return withMock(() => api.get<Dispositivo[]>('/dispositivos'), mockDispositivos)
}

export async function cadastrar(data: Record<string, unknown>): Promise<Dispositivo> {
  const newDispositivo: Dispositivo = {
    id: Date.now(),
    nome: getSafeString(data.nome, 'Novo Dispositivo'),
    tipo: typeof data.tipo === 'string' ? (data.tipo as Dispositivo['tipo']) : 'NOTEBOOK',
    mac_address: getSafeString(data.mac_address, '00:11:22:33:44:55'),
    usuario_id: typeof data.usuario_id === 'number' ? data.usuario_id : 3,
    status: 'PENDENTE',
    data_cadastro: new Date().toISOString(),
  }
  return withMock(() => api.post<Dispositivo>('/dispositivos', data), newDispositivo)
}

export async function ativar(id: string | number) {
  return withMock(
    () => api.patch(`/dispositivos/${id}/ativar`),
    { success: true, mensagem: 'Dispositivo ativado com sucesso.' }
  )
}

export async function inativar(id: string | number) {
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
