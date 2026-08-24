import type { AuthUser, JwtPayload } from '@/types/auth'

export function decodeJwtPayload(token: string): JwtPayload | null {
  if (!token || typeof token !== 'string') {
    return null
  }

  try {
    const parts = token.split('.')
    if (parts.length < 2) {
      return null
    }

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    )

    return JSON.parse(jsonPayload) as JwtPayload
  } catch {
    return null
  }
}

export function parseUserFromToken(token: string): AuthUser | null {
  const payload = decodeJwtPayload(token)
  if (!payload) return null

  if (payload.exp && payload.exp * 1000 < Date.now()) {
    return null
  }

  const id = payload.id ?? payload.sub ?? '1'
  const tipo = payload.tipo ?? payload.role ?? 'PESQUISADOR'
  const estado = payload.estado ?? payload.state ?? 'ACEITO'
  const nome = payload.nome ?? payload.name
  const email = payload.email

  return {
    id,
    tipo,
    estado,
    nome,
    email,
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token)
  if (!payload || !payload.exp) {
    return false
  }
  return payload.exp * 1000 < Date.now()
}
