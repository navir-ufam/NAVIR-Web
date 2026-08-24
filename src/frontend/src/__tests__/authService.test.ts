import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loginRequest, fetchCurrentUser, refreshTokenRequest } from '@/services/authService'
import * as apiClient from '@/services/apiClient'

describe('authService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('performs loginRequest and returns 200 response data', async () => {
    const mockResponse = new Response(JSON.stringify({ token: 'jwt_token_xyz' }), { status: 200 })
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(mockResponse)

    const result = await loginRequest('admin@ufam.edu.br', 'senha123')

    expect(result.status).toBe(200)
    expect(result.data?.token).toBe('jwt_token_xyz')
  })

  it('handles 401 response in loginRequest', async () => {
    const mockResponse = new Response(null, { status: 401 })
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(mockResponse)

    const result = await loginRequest('wrong@ufam.edu.br', 'wrong')

    expect(result.status).toBe(401)
  })

  it('fetches current user via fetchCurrentUser (me endpoint)', async () => {
    const mockResponse = new Response(
      JSON.stringify({ user: { id: '1', tipo: 'ADMIN', estado: 'ACEITO' } }),
      { status: 200 }
    )
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(mockResponse)

    const user = await fetchCurrentUser()
    expect(user).not.toBeNull()
    expect(user?.tipo).toBe('ADMIN')
  })

  it('handles refreshTokenRequest and returns new token', async () => {
    const mockResponse = new Response(JSON.stringify({ token: 'refreshed_token' }), { status: 200 })
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(mockResponse)

    const token = await refreshTokenRequest()
    expect(token).toBe('refreshed_token')
  })

  it('handles fetch exception gracefully in loginRequest', async () => {
    vi.spyOn(apiClient, 'apiFetch').mockRejectedValue(new Error('Network Error'))

    const result = await loginRequest('user@ufam.edu.br', 'senha')

    expect(result.status).toBe(500)
  })
})
