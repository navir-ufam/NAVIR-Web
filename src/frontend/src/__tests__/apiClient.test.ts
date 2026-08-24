import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiFetch, triggerUnauthorized, AUTH_UNAUTHORIZED_EVENT } from '@/services/apiClient'

describe('apiClient service', () => {
  beforeEach(() => {
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

  it('performs apiFetch successfully on 200 response', async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 })
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse)

    const response = await apiFetch('/api/test')
    expect(response.status).toBe(200)
  })

  it('triggers unauthorized event on 401 response', async () => {
    const listener = vi.fn()
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, listener)

    const mockResponse = new Response(null, { status: 401 })
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse)

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
