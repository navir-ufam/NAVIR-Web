import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiFetch, triggerUnauthorized, AUTH_UNAUTHORIZED_EVENT } from '@/services/apiClient'

describe('apiClient service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('triggers custom unauthorized event via triggerUnauthorized', () => {
    const listener = vi.fn()
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, listener)

    triggerUnauthorized()

    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, listener)
  })

  it('performs apiFetch successfully on 200 response with Bearer token header', async () => {
    localStorage.setItem('navir_token', 'token_123')
    const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 })
    const fetchSpy = vi.fn().mockResolvedValue(mockResponse)
    globalThis.fetch = fetchSpy

    const response = await apiFetch('/api/test')
    expect(response.status).toBe(200)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('attempts silent token refresh on 401 response and retries request if refresh succeeds', async () => {
    const firstResponse = new Response(null, { status: 401 })
    const refreshResponse = new Response(JSON.stringify({ token: 'new_token_456' }), { status: 200 })
    const retryResponse = new Response(JSON.stringify({ success: true }), { status: 200 })

    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(refreshResponse)
      .mockResolvedValueOnce(retryResponse)

    globalThis.fetch = fetchSpy

    const response = await apiFetch('/api/data')
    expect(response.status).toBe(200)
    expect(localStorage.getItem('navir_token')).toBe('new_token_456')
  })

  it('triggers unauthorized event on 401 response if silent refresh fails', async () => {
    const listener = vi.fn()
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, listener)

    const firstResponse = new Response(null, { status: 401 })
    const refreshResponse = new Response(null, { status: 401 })

    globalThis.fetch = vi.fn().mockResolvedValueOnce(firstResponse).mockResolvedValueOnce(refreshResponse)

    await apiFetch('/api/protected')

    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, listener)
  })

  it('triggers unauthorized event on 403 response', async () => {
    const listener = vi.fn()
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, listener)

    const mockResponse = new Response(null, { status: 403 })
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse)

    await apiFetch('/api/forbidden')

    expect(listener).toHaveBeenCalledTimes(1)
    window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, listener)
  })
})
