import { apiFetch } from './apiClient'
import type { AuthUser } from '@/types/auth'

export interface LoginApiResponse {
  token?: string
  mensagem?: string
  estado?: string
  tipo?: string
  user?: AuthUser
  usuario?: AuthUser
}

export async function loginRequest(
  email: string,
  senha: string
): Promise<{ status: number; data?: LoginApiResponse }> {
  try {
    const response = await apiFetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })

    const data = (await response.json().catch(() => ({}))) as LoginApiResponse
    return {
      status: response.status,
      data,
    }
  } catch {
    return {
      status: 500,
    }
  }
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await apiFetch('/api/v1/auth/me', {
      method: 'GET',
    })

    if (!response.ok) return null
    const data = await response.json().catch(() => null)
    return (data?.usuario || data?.user || data) as AuthUser | null
  } catch {
    return null
  }
}

export async function refreshTokenRequest(): Promise<string | null> {
  try {
    const response = await apiFetch('/api/v1/auth/refresh', {
      method: 'POST',
    })

    if (!response.ok) return null
    const data = await response.json().catch(() => ({}))
    return data.token || null
  } catch {
    return null
  }
}
