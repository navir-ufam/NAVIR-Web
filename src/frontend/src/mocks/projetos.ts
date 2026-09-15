import type { Projeto, TipoProjetoResumo, AgenciaResumo } from '@/types'
import { MOCK_TIPOS_PROJETO } from './tipos-projeto'
import { MOCK_AGENCIAS } from './agencias'
import { MOCK_USER_IDS, mockUsuarios } from './usuarios'

function findTipo(sigla: string): TipoProjetoResumo {
  const tipo = MOCK_TIPOS_PROJETO.find((item) => item.sigla === sigla)
  if (!tipo) {
    throw new Error(`Fixture de tipo de projeto não encontrada: ${sigla}`)
  }
  return tipo
}

function findAgencia(sigla: string): AgenciaResumo {
  const agencia = MOCK_AGENCIAS.find((item) => item.sigla === sigla)
  if (!agencia) {
    throw new Error(`Fixture de agência não encontrada: ${sigla}`)
  }
  return agencia
}

function findUsuario(id: string): { id: string; nome: string } {
  const usuario = mockUsuarios.find((item) => item.id === id)
  if (!usuario) {
    throw new Error(`Fixture de usuário não encontrada: ${id}`)
  }
  return { id: usuario.id, nome: usuario.nome }
}

const PIBIT = findTipo('PIBIT')
const PIBIC = findTipo('PIBIC')
const INDEPENDENTE = findTipo('INDEPENDENTE')

export const mockProjetos: Projeto[] = [
  {
    id: 'a0000000-0000-4000-8000-000000000001',
    usuario_id: MOCK_USER_IDS.maria,
    titulo: 'Plataforma NAVIR - Monitoramento IoT e Inteligência Artificial',
    tipo_projeto_id: PIBIT.id,
    tipo_projeto: PIBIT,
    agencia_id: findAgencia('FAPEAM').id,
    agencia: findAgencia('FAPEAM'),
    codigo_projeto: 'PIBIT-2026-001',
    data_inicio: '2026-01-15',
    data_fim: '2026-12-31',
    professor_id: MOCK_USER_IDS.carlos,
    professor: findUsuario(MOCK_USER_IDS.carlos),
    remunerado: true,
    status: 'ATIVO',
    usuario: findUsuario(MOCK_USER_IDS.maria),
  },
  {
    id: 'a0000000-0000-4000-8000-000000000002',
    usuario_id: MOCK_USER_IDS.maria,
    titulo: 'Redes Sem Fio de Alta Densidade e Eficiência Energética',
    tipo_projeto_id: PIBIC.id,
    tipo_projeto: PIBIC,
    agencia_id: findAgencia('CNPq').id,
    agencia: findAgencia('CNPq'),
    codigo_projeto: 'PIBIC-2025-014',
    data_inicio: '2025-08-01',
    data_fim: '2026-07-31',
    professor_id: MOCK_USER_IDS.carlos,
    professor: findUsuario(MOCK_USER_IDS.carlos),
    remunerado: true,
    status: 'ATIVO',
    usuario: findUsuario(MOCK_USER_IDS.maria),
  },
  {
    id: 'a0000000-0000-4000-8000-000000000003',
    usuario_id: MOCK_USER_IDS.rafael,
    titulo: 'Sistema de Reconhecimento Facial para Controle de Acesso',
    tipo_projeto_id: INDEPENDENTE.id,
    tipo_projeto: INDEPENDENTE,
    agencia_id: findAgencia('UFAM').id,
    agencia: findAgencia('UFAM'),
    codigo_projeto: null,
    data_inicio: '2026-03-01',
    data_fim: '2026-11-30',
    professor_id: MOCK_USER_IDS.juliana,
    professor: findUsuario(MOCK_USER_IDS.juliana),
    remunerado: false,
    status: 'ATIVO',
    usuario: findUsuario(MOCK_USER_IDS.rafael),
  },
  {
    id: 'a0000000-0000-4000-8000-000000000004',
    usuario_id: MOCK_USER_IDS.rafael,
    titulo: 'Otimização de Tráfego de Dados em Sensores Industriais',
    tipo_projeto_id: PIBIC.id,
    tipo_projeto: PIBIC,
    agencia_id: findAgencia('CNPq').id,
    agencia: findAgencia('CNPq'),
    codigo_projeto: 'PIBIC-2024-088',
    data_inicio: '2024-08-01',
    data_fim: '2025-07-31',
    professor_id: MOCK_USER_IDS.carlos,
    professor: findUsuario(MOCK_USER_IDS.carlos),
    remunerado: true,
    status: 'FINALIZADO',
    usuario: findUsuario(MOCK_USER_IDS.rafael),
  },
  {
    id: 'a0000000-0000-4000-8000-000000000005',
    usuario_id: MOCK_USER_IDS.maria,
    titulo: 'Dashboard Analítico de Consumo Energético Predial',
    tipo_projeto_id: PIBIT.id,
    tipo_projeto: PIBIT,
    agencia_id: findAgencia('FAPEAM').id,
    agencia: findAgencia('FAPEAM'),
    codigo_projeto: 'PIBIT-2025-032',
    data_inicio: '2025-01-10',
    data_fim: '2025-12-20',
    professor_id: MOCK_USER_IDS.juliana,
    professor: findUsuario(MOCK_USER_IDS.juliana),
    remunerado: true,
    status: 'FINALIZADO',
    usuario: findUsuario(MOCK_USER_IDS.maria),
  },
]
