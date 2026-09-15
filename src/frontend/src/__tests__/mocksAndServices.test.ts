import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  mockUsuarios,
  mockProjetos,
  mockDispositivos,
  mockDashboardMetrics,
  mockPerfil,
  mockTiposProjeto,
  mockAgencias,
  mockHabilidades,
  mockAcessoLaboratorio,
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
    const pibic = mockProjetos.find((p) => p.tipo === 'PIBIC')
    const pibit = mockProjetos.find((p) => p.tipo === 'PIBIT')
    const independente = mockProjetos.find((p) => p.tipo === 'Independente')

    expect(pibic).toBeDefined()
    expect(pibit).toBeDefined()
    expect(independente).toBeDefined()

    const ativo = mockProjetos.find((p) => p.status === 'ATIVO')
    const finalizado = mockProjetos.find((p) => p.status === 'FINALIZADO')

    expect(ativo).toBeDefined()
    expect(finalizado).toBeDefined()
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
    expect(mockPerfil.usuario.id).toBe(3)
    expect(mockPerfil.habilidades.length).toBeGreaterThan(0)
    expect(mockTiposProjeto).toContain('PIBIC')
    expect(mockAgencias).toContain('FAPEAM')
    expect(mockHabilidades).toContain('Python')
    expect(mockAcessoLaboratorio.length).toBeGreaterThan(0)
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

    const usuario = await usuariosService.buscarPorId(1)
    expect(usuario.nome).toBe('Admin Silva')

    const resAprovar = await usuariosService.aprovar(4)
    expect(resAprovar.success).toBe(true)

    const resNegar = await usuariosService.negar(5, 'Documentação incompleta')
    expect(resNegar.success).toBe(true)

    const resConverter = await usuariosService.converter(6)
    expect(resConverter.success).toBe(true)
  })

  it('fetches mock data from projetosService, dispositivosService and dashboardService in mock mode', async () => {
    const projetos = await projetosService.listar()
    expect(projetos).toHaveLength(5)

    const projeto = await projetosService.buscarPorId(101)
    expect(projeto.titulo).toContain('NAVIR')

    const novoProjeto = await projetosService.criar({ titulo: 'Novo Teste', tipo: 'PIBIC' })
    expect(novoProjeto.titulo).toBe('Novo Teste')

    const resFinalizar = await projetosService.finalizar(101)
    expect(resFinalizar.success).toBe(true)

    const dispositivos = await dispositivosService.listar()
    expect(dispositivos).toHaveLength(4)

    const novoDisp = await dispositivosService.cadastrar({ nome: 'MacBook Teste' })
    expect(novoDisp.nome).toBe('MacBook Teste')

    const resAtivar = await dispositivosService.ativar(203)
    expect(resAtivar.success).toBe(true)

    const resInativar = await dispositivosService.inativar(201)
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

    const decAcesso = await acessoLaboratorioService.decidir(4, 'AUTORIZADO')
    expect(decAcesso.success).toBe(true)

    const notifs = await notificacoesService.listar()
    expect(notifs).toHaveLength(2)

    const resLida = await notificacoesService.marcarComoLida(1)
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
