import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api, get, post, put, patch, del, upload } from '@/services/api'
import * as apiClient from '@/services/apiClient'
import { toast } from 'sonner'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

function createJsonResponse(data: object, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function createTextResponse(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: { 'content-type': 'text/plain' },
  })
}

describe('Service Base (api.ts)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('performs GET request with query params successfully', async () => {
    const apiFetchSpy = vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ data: 'ok' }))

    const result = await get<{ data: string }>('/usuarios', { status: 'ACEITO', page: 1 })
    expect(result.data).toBe('ok')
    expect(apiFetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/usuarios?status=ACEITO&page=1'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('performs POST request with JSON body successfully', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ id: 1 }))

    const result = await post<{ id: number }>('/projetos', { titulo: 'Novo Projeto' })
    expect(result.id).toBe(1)
  })

  it('performs PUT request successfully', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ updated: true }))

    const result = await put<{ updated: boolean }>('/perfil', { bio: 'Bio' })
    expect(result.updated).toBe(true)
  })

  it('performs PATCH request successfully', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ patched: true }))

    const result = await patch<{ patched: boolean }>('/projetos/1/finalizar')
    expect(result.patched).toBe(true)
  })

  it('performs DELETE request successfully via del and api.delete', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ deleted: true }))

    const result1 = await del<{ deleted: boolean }>('/items/1')
    const result2 = await api.delete<{ deleted: boolean }>('/items/2')
    expect(result1.deleted).toBe(true)
    expect(result2.deleted).toBe(true)
  })

  it('performs FormData upload successfully', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ uploaded: true }))

    const formData = new FormData()
    formData.append('file', new File([''], 'test.pdf'))

    const result = await upload<{ uploaded: boolean }>('/historico', formData)
    expect(result.uploaded).toBe(true)
  })

  it('handles plain text non-json responses in parseResponseData', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createTextResponse('Plain Text Response'))

    const result = await get<string>('/text-endpoint')
    expect(result).toBe('Plain Text Response')
  })

  it('handles 403 Forbidden with toast notification', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ mensagem: 'Acesso Proibido' }, 403))

    await expect(get('/admin')).rejects.toThrow('Acesso Proibido')
    expect(toast.error).toHaveBeenCalledWith('Acesso Proibido')
  })

  it('handles 404 Not Found with toast notification', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({}, 404))

    await expect(get('/not-found')).rejects.toThrow('HTTP 404')
    expect(toast.error).toHaveBeenCalledWith('Recurso não encontrado.')
  })

  it('handles 409 Conflict with toast notification', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ mensagem: 'Email já existe' }, 409))

    await expect(post('/usuarios', {})).rejects.toThrow('Email já existe')
    expect(toast.error).toHaveBeenCalledWith('Email já existe')
  })

  it('handles 422 Bad Request with toast notification', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({ mensagem: 'Dados inválidos' }, 422))

    await expect(post('/usuarios', {})).rejects.toThrow('Dados inválidos')
    expect(toast.error).toHaveBeenCalledWith('Dados inválidos')
  })

  it('handles 500 Internal Server Error with toast notification', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockImplementation(async () => createJsonResponse({}, 500))

    await expect(get('/error')).rejects.toThrow('HTTP 500')
    expect(toast.error).toHaveBeenCalledWith('Erro interno do servidor. Tente novamente.')
  })

  it('handles network error exception with toast notification on all HTTP verbs', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockRejectedValue(new Error('Network Failure'))

    await expect(get('/net')).rejects.toThrow('Network Failure')
    await expect(post('/net')).rejects.toThrow('Network Failure')
    await expect(put('/net')).rejects.toThrow('Network Failure')
    await expect(patch('/net')).rejects.toThrow('Network Failure')
    await expect(del('/net')).rejects.toThrow('Network Failure')
    await expect(upload('/net', new FormData())).rejects.toThrow('Network Failure')

    expect(toast.error).toHaveBeenCalledWith('Sem conexão com o servidor.')
  })
})
