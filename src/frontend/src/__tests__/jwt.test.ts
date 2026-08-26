import { describe, it, expect } from 'vitest'
import { decodeJwtPayload, parseUserFromToken, isTokenExpired } from '@/utils/jwt'

function createMockJwt(payload: object): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '')
  return `${header}.${body}.signature`
}

describe('jwt utility (decodeJwtPayload & parseUserFromToken)', () => {
  it('returns null for empty or invalid JWT format', () => {
    expect(decodeJwtPayload('')).toBeNull()
    expect(decodeJwtPayload('invalid_token')).toBeNull()
    expect(parseUserFromToken('')).toBeNull()
  })

  it('decodes payload and parses user correctly from valid JWT token', () => {
    const mockToken = createMockJwt({
      sub: '10',
      tipo: 'ADMIN',
      estado: 'ACEITO',
      nome: 'Administrador Teste',
      email: 'admin@ufam.edu.br',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const user = parseUserFromToken(mockToken)
    expect(user).not.toBeNull()
    expect(user?.id).toBe('10')
    expect(user?.tipo).toBe('ADMIN')
    expect(user?.estado).toBe('ACEITO')
    expect(user?.email).toBe('admin@ufam.edu.br')
  })

  it('returns null for expired JWT token', () => {
    const expiredToken = createMockJwt({
      sub: '10',
      tipo: 'ADMIN',
      estado: 'ACEITO',
      exp: Math.floor(Date.now() / 1000) - 3600,
    })

    expect(isTokenExpired(expiredToken)).toBe(true)
    expect(parseUserFromToken(expiredToken)).toBeNull()
  })
})
