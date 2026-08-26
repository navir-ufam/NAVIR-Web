import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  authService,
  usuariosService,
  perfilService,
  historicoService,
  curriculoService,
  projetosService,
  dispositivosService,
  acessoLaboratorioService,
  dashboardService,
  relatoriosService,
  notificacoesService,
} from '@/services'
import * as apiModule from '@/services/api'

describe('Domain Services (Scaffolding)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    import.meta.env.VITE_USE_MOCKS = 'false'
  })

  it('tests authService methods', async () => {
    const postSpy = vi.spyOn(apiModule.api, 'post').mockResolvedValue({ success: true })

    await authService.login('user@ufam.edu.br', 'senha')
    await authService.register({ nome: 'Teste' })

    expect(postSpy).toHaveBeenCalledTimes(2)
  })

  it('tests usuariosService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })
    const patchSpy = vi.spyOn(apiModule.api, 'patch').mockResolvedValue({ success: true })

    await usuariosService.listar({ tipo: 'ADMIN' })
    await usuariosService.buscarPorId('1')
    await usuariosService.aprovar('1')
    await usuariosService.negar('1', 'motivo')
    await usuariosService.converter('1')

    expect(getSpy).toHaveBeenCalledTimes(2)
    expect(patchSpy).toHaveBeenCalledTimes(3)
  })

  it('tests perfilService methods', async () => {
    const putSpy = vi.spyOn(apiModule.api, 'put').mockResolvedValue({ success: true })

    await perfilService.atualizar({ bio: 'Bio' })

    expect(putSpy).toHaveBeenCalledTimes(1)
  })

  it('tests historicoService methods', async () => {
    const uploadSpy = vi.spyOn(apiModule.api, 'upload').mockResolvedValue({ success: true })

    await historicoService.upload(new File([''], 'historico.pdf'))

    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })

  it('tests curriculoService methods', async () => {
    const putSpy = vi.spyOn(apiModule.api, 'put').mockResolvedValue({ success: true })

    await curriculoService.atualizar({ link_lattes: 'https://...' })

    expect(putSpy).toHaveBeenCalledTimes(1)
  })

  it('tests projetosService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })
    const postSpy = vi.spyOn(apiModule.api, 'post').mockResolvedValue({ success: true })
    const patchSpy = vi.spyOn(apiModule.api, 'patch').mockResolvedValue({ success: true })

    await projetosService.listar({ status: 'ATIVO' })
    await projetosService.buscarPorId('1')
    await projetosService.criar({ titulo: 'Projeto' })
    await projetosService.finalizar('1')

    expect(getSpy).toHaveBeenCalledTimes(2)
    expect(postSpy).toHaveBeenCalledTimes(1)
    expect(patchSpy).toHaveBeenCalledTimes(1)
  })

  it('tests dispositivosService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })
    const postSpy = vi.spyOn(apiModule.api, 'post').mockResolvedValue({ success: true })
    const patchSpy = vi.spyOn(apiModule.api, 'patch').mockResolvedValue({ success: true })

    await dispositivosService.listar()
    await dispositivosService.cadastrar({ nome: 'Notebook' })
    await dispositivosService.ativar('1')
    await dispositivosService.inativar('1')

    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(postSpy).toHaveBeenCalledTimes(1)
    expect(patchSpy).toHaveBeenCalledTimes(2)
  })

  it('tests acessoLaboratorioService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })
    const postSpy = vi.spyOn(apiModule.api, 'post').mockResolvedValue({ success: true })
    const patchSpy = vi.spyOn(apiModule.api, 'patch').mockResolvedValue({ success: true })

    await acessoLaboratorioService.status()
    await acessoLaboratorioService.solicitar()
    await acessoLaboratorioService.decidir('1', 'AUTORIZADO')

    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(postSpy).toHaveBeenCalledTimes(1)
    expect(patchSpy).toHaveBeenCalledTimes(1)
  })

  it('tests dashboardService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })

    await dashboardService.buscarMetricas()

    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  it('tests relatoriosService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })

    await relatoriosService.exportar('csv', { tipo: 'ADMIN' })

    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  it('tests notificacoesService methods', async () => {
    const getSpy = vi.spyOn(apiModule.api, 'get').mockResolvedValue({ success: true })
    const patchSpy = vi.spyOn(apiModule.api, 'patch').mockResolvedValue({ success: true })

    await notificacoesService.listar()
    await notificacoesService.marcarComoLida('1')
    await notificacoesService.contarNaoLidas()

    expect(getSpy).toHaveBeenCalledTimes(2)
    expect(patchSpy).toHaveBeenCalledTimes(1)
  })
})
