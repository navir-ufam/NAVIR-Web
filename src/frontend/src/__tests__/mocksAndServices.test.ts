import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  mockUsuarios,
  mockProjetos,
  mockDispositivos,
  mockDashboardMetrics,
  mockPerfil,
  mockNotificacoes,
  mockHabilidades,
  mockAcessoLaboratorio,
  MOCK_AGENCIAS,
  MOCK_TIPOS_PROJETO,
  MOCK_USER_IDS,
} from '@/mocks'
import {
  usuariosService,
  projetosService,
  dispositivosService,
  dashboardService,
  perfilService,
  acessoLaboratorioService,
  notificacoesService,
  curriculoService,
  historicoService,
  relatoriosService,
} from '@/services'
import { withMock } from '@/services/api'

describe('Mock Data Fixtures & Services Integration (SCRUM-46)', () => {
  beforeEach(() => {
    import.meta.env.VITE_USE_MOCKS = 'true'
  })

  afterEach(() => {
    import.meta.env.VITE_USE_MOCKS = 'true'
  })

  it('contains consistent usuarios mock data with all roles and states', () => {
    expect(mockUsuarios).toHaveLength(10)

    const admin = mockUsuarios.find((u) => u.tipo === 'ADMIN')
    expect(admin).toBeDefined()
    expect(admin?.estado).toBe('ACEITO')

    const professor = mockUsuarios.find((u) => u.tipo === 'PROFESSOR')
    expect(professor).toBeDefined()

    const pendente = mockUsuarios.find((u) => u.estado === 'PENDENTE')
    expect(pendente).toBeDefined()

    const negado = mockUsuarios.find((u) => u.estado === 'NEGADO')
    expect(negado).toBeDefined()

    const interessado = mockUsuarios.find((u) => u.tipo === 'INTERESSADO')
    expect(interessado).toBeDefined()

    const finalista = mockUsuarios.find((u) => u.status_academico === 'FINALISTA')
    expect(finalista).toBeDefined()
  })

  it('contains consistent projetos mock data with varied types and statuses', () => {
    expect(mockProjetos).toHaveLength(5)
    const pibic = mockProjetos.find((p) => p.tipo_projeto?.sigla === 'PIBIC')
    const pibit = mockProjetos.find((p) => p.tipo_projeto?.sigla === 'PIBIT')
    const independente = mockProjetos.find((p) => p.tipo_projeto?.sigla === 'INDEPENDENTE')

    expect(pibic).toBeDefined()
    expect(pibit).toBeDefined()
    expect(independente).toBeDefined()

    const ativo = mockProjetos.find((p) => p.status === 'ATIVO')
    const finalizado = mockProjetos.find((p) => p.status === 'FINALIZADO')

    expect(ativo).toBeDefined()
    expect(finalizado).toBeDefined()
    expect(pibic?.codigo_projeto).toBeTruthy()
    expect(mockProjetos.every((p) => typeof p.professor_id === 'string')).toBe(true)
  })

  it('contains consistent dispositivos mock data', () => {
    expect(mockDispositivos).toHaveLength(4)
    const notebook = mockDispositivos.find((d) => d.tipo === 'NOTEBOOK')
    const celular = mockDispositivos.find((d) => d.tipo === 'CELULAR')
    const tablet = mockDispositivos.find((d) => d.tipo === 'TABLET')

    expect(notebook).toBeDefined()
    expect(celular).toBeDefined()
    expect(tablet).toBeDefined()
  })

  it('contains consistent dashboard metrics mock data', () => {
    expect(mockDashboardMetrics.total_usuarios).toBe(10)
    expect(mockDashboardMetrics.pendentes).toBe(1)
    expect(mockDashboardMetrics.total_projetos).toBe(5)
    expect(mockDashboardMetrics.total_dispositivos).toBe(4)
  })

  it('contains consistent perfil, agencias, habilidades and tipos-projeto fixtures', () => {
    expect(mockPerfil.usuario.id).toBe(MOCK_USER_IDS.maria)
    expect(mockPerfil.habilidades.length).toBeGreaterThan(0)
    expect(MOCK_TIPOS_PROJETO.some((tipo) => tipo.sigla === 'PIBIC')).toBe(true)
    expect(MOCK_AGENCIAS.some((agencia) => agencia.sigla === 'FAPEAM')).toBe(true)
    expect(mockHabilidades).toContain('Python')
    expect(mockAcessoLaboratorio.length).toBeGreaterThan(0)
  })

  it('keeps fixture ids as valid UUID v4 with referential integrity', () => {
    const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    const userIds = new Set(mockUsuarios.map((u) => u.id))
    const tipoIds = new Set(MOCK_TIPOS_PROJETO.map((t) => t.id))
    const agenciaIds = new Set(MOCK_AGENCIAS.map((a) => a.id))

    for (const usuario of mockUsuarios) {
      expect(usuario.id).toMatch(UUID_V4)
    }

    for (const projeto of mockProjetos) {
      expect(projeto.id).toMatch(UUID_V4)
      expect(userIds.has(projeto.usuario_id)).toBe(true)
      expect(userIds.has(projeto.professor_id)).toBe(true)
      expect(tipoIds.has(projeto.tipo_projeto_id)).toBe(true)
      if (projeto.agencia_id) {
        expect(agenciaIds.has(projeto.agencia_id)).toBe(true)
      }
    }

    for (const dispositivo of mockDispositivos) {
      expect(dispositivo.id).toMatch(UUID_V4)
      expect(userIds.has(dispositivo.usuario_id)).toBe(true)
    }

    for (const acesso of mockAcessoLaboratorio) {
      expect(acesso.id).toMatch(UUID_V4)
      expect(userIds.has(acesso.usuario_id)).toBe(true)
    }
  })

  it('withMock helper resolves mockData when VITE_USE_MOCKS is true', async () => {
    const mockResult = { test: true }
    const realCall = () => Promise.resolve({ test: false })

    const result = await withMock(realCall, mockResult)
    expect(result).toEqual(mockResult)
  })

  it('fetches mock data from usuariosService in mock mode', async () => {
    const usuarios = await usuariosService.listar()
    expect(usuarios).toHaveLength(10)

    const usuario = await usuariosService.buscarPorId(MOCK_USER_IDS.admin)
    expect(usuario.nome).toBe('Admin Silva')

    const resAprovar = await usuariosService.aprovar(MOCK_USER_IDS.lucas)
    expect(resAprovar.success).toBe(true)

    const resNegar = await usuariosService.negar(MOCK_USER_IDS.ana, 'Documentação incompleta')
    expect(resNegar.success).toBe(true)

    const resConverter = await usuariosService.converter(MOCK_USER_IDS.pedro)
    expect(resConverter.success).toBe(true)
  })

  it('fetches mock data from projetosService, dispositivosService and dashboardService in mock mode', async () => {
    const projetos = await projetosService.listar()
    expect(projetos).toHaveLength(5)

    const projeto = await projetosService.buscarPorId(mockProjetos[0].id)
    expect(projeto.titulo).toContain('NAVIR')

    const novoProjeto = await projetosService.criar({ titulo: 'Novo Teste', tipo_projeto_id: mockProjetos[0].tipo_projeto_id })
    expect(novoProjeto.titulo).toBe('Novo Teste')
    expect(typeof novoProjeto.id).toBe('string')

    const resFinalizar = await projetosService.finalizar(mockProjetos[0].id)
    expect(resFinalizar.success).toBe(true)

    const dispositivos = await dispositivosService.listar()
    expect(dispositivos).toHaveLength(4)

    const novoDisp = await dispositivosService.cadastrar({ nome: 'MacBook Teste' })
    expect(novoDisp.nome).toBe('MacBook Teste')

    const resAtivar = await dispositivosService.ativar(mockDispositivos[2].id)
    expect(resAtivar.success).toBe(true)

    const resInativar = await dispositivosService.inativar(mockDispositivos[0].id)
    expect(resInativar.success).toBe(true)

    const metricas = await dashboardService.buscarMetricas()
    expect(metricas.total_usuarios).toBe(10)
  })

  it('fetches mock data from perfil, acessoLaboratorio, notificacoes, curriculo, historico and relatorios services', async () => {
    const perfil = await perfilService.obter()
    expect(perfil.usuario.nome).toBe('Maria Pesquisadora Aceita')

    const perfilAtu = await perfilService.atualizar({ biografia: 'Bio atualizada' })
    expect(perfilAtu.biografia).toBe('Bio atualizada')

    const acessos = await acessoLaboratorioService.status()
    expect(acessos.length).toBeGreaterThan(0)

    const solAcesso = await acessoLaboratorioService.solicitar()
    expect(solAcesso.status).toBe('PENDENTE')

    const decAcesso = await acessoLaboratorioService.decidir(MOCK_USER_IDS.lucas, 'AUTORIZADO')
    expect(decAcesso.success).toBe(true)

    const notifs = await notificacoesService.listar()
    expect(notifs).toHaveLength(2)

    const resLida = await notificacoesService.marcarComoLida(mockNotificacoes[0].id)
    expect(resLida.success).toBe(true)

    const countNaoLidas = await notificacoesService.contarNaoLidas()
    expect(countNaoLidas.total).toBe(2)

    const resCurr = await curriculoService.atualizar({ lattes: 'http://lattes...' })
    expect(resCurr.success).toBe(true)

    const dummyFile = new File(['conteudo'], 'historico.pdf', { type: 'application/pdf' })
    const resHist = await historicoService.upload(dummyFile)
    expect(resHist.success).toBe(true)

    const resRel = await relatoriosService.exportar('pdf')
    expect(resRel.success).toBe(true)
  })
})
