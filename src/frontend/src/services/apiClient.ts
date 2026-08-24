export const AUTH_UNAUTHORIZED_EVENT = 'navir:auth:unauthorized'
const TOKEN_STORAGE_KEY = 'navir_token'

let isRefreshing = false

export function triggerUnauthorized() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT))
  }
}

function resolveUrlString(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (input instanceof URL) return input.href
  return input.url
}

async function tryRefreshToken(
  input: RequestInfo | URL,
  init: RequestInit,
  headers: Headers
): Promise<Response | null> {
  if (isRefreshing) return null
  isRefreshing = true

  try {
    const refreshResponse = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    if (refreshResponse.ok) {
      const data = await refreshResponse.json().catch(() => ({}))
      if (data.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
        headers.set('Authorization', `Bearer ${data.token}`)
      }
      return await fetch(input, { ...init, headers })
    }
  } catch {
  } finally {
    isRefreshing = false
  }

  return null
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlString = resolveUrlString(input)
  const headers = new Headers(init?.headers || {})

  if (typeof window !== 'undefined' && !headers.has('Authorization')) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const modifiedInit: RequestInit = {
    ...init,
    headers,
    credentials: 'include',
  }

  const response = await fetch(input, modifiedInit)

  if (response.status === 401 && !urlString.includes('/auth/login') && !urlString.includes('/auth/refresh')) {
    const retryResult = await tryRefreshToken(input, modifiedInit, headers)
    if (retryResult) return retryResult
    triggerUnauthorized()
  } else if (response.status === 403) {
    triggerUnauthorized()
  }

  return response
}
