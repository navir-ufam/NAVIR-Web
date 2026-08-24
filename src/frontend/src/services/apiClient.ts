export const AUTH_UNAUTHORIZED_EVENT = 'navir:auth:unauthorized'

export function triggerUnauthorized() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT))
  }
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init)

  if (response.status === 401 || response.status === 403) {
    triggerUnauthorized()
  }

  return response
}
