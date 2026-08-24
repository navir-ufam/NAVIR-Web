export const AUTH_UNAUTHORIZED_EVENT = 'navir:auth:unauthorized'
const TOKEN_STORAGE_KEY = 'navir_token'

let isRefreshing = false

export function triggerUnauthorized() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT))
  }
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlString = typeof input === 'string' ? input : input.toString()
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
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refreshResponse = await fetch('/api/v1/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        })

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json().catch(() => ({}))
          if (refreshData.token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, refreshData.token)
            headers.set('Authorization', `Bearer ${refreshData.token}`)
          }
          isRefreshing = false
          return fetch(input, { ...modifiedInit, headers })
        }
      } catch {
      } finally {
        isRefreshing = false
      }
    }

    triggerUnauthorized()
  } else if (response.status === 403) {
    triggerUnauthorized()
  }

  return response
}
