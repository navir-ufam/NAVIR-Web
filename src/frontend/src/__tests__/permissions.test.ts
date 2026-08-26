import { describe, it, expect } from 'vitest'
import { hasPermission, ROLE_PERMISSIONS } from '@/utils/permissions'
import type { User } from '@/types'

describe('permissions utility (hasPermission & ROLE_PERMISSIONS)', () => {
  const adminUser: User = { id: '1', tipo: 'ADMIN', estado: 'ACEITO' }
  const professorUser: User = { id: '2', tipo: 'PROFESSOR', estado: 'ACEITO' }
  const pesquisadorUser: User = { id: '3', tipo: 'PESQUISADOR', estado: 'ACEITO' }
  const interessadoUser: User = { id: '4', tipo: 'INTERESSADO', estado: 'ACEITO' }
  const pendenteUser: User = { id: '5', tipo: 'PESQUISADOR', estado: 'PENDENTE' }

  it('defines valid ROLE_PERMISSIONS mapping', () => {
    expect(ROLE_PERMISSIONS.ADMIN).toBeDefined()
    expect(ROLE_PERMISSIONS.PESQUISADOR).toBeDefined()
  })


  it('returns false for undefined, null, or non-ACEITO users', () => {
    expect(hasPermission(null, 'dashboard:view')).toBe(false)
    expect(hasPermission(undefined, 'dashboard:view')).toBe(false)
    expect(hasPermission(pendenteUser, 'dashboard:view')).toBe(false)
  })

  it('correctly evaluates permissions for ADMIN role', () => {
    expect(hasPermission(adminUser, 'dashboard:view')).toBe(true)
    expect(hasPermission(adminUser, 'reports:read')).toBe(true)
    expect(hasPermission(adminUser, 'users:read')).toBe(true)
  })

  it('correctly evaluates permissions for PROFESSOR role', () => {
    expect(hasPermission(professorUser, 'dashboard:view')).toBe(true)
    expect(hasPermission(professorUser, 'users:read')).toBe(true)
    expect(hasPermission(professorUser, 'reports:read')).toBe(false)
  })

  it('correctly evaluates permissions for PESQUISADOR role', () => {
    expect(hasPermission(pesquisadorUser, 'projects:create')).toBe(true)
    expect(hasPermission(pesquisadorUser, 'curriculo:read')).toBe(true)
    expect(hasPermission(pesquisadorUser, 'reports:read')).toBe(false)
  })

  it('returns false for INTERESSADO role on all protected permissions', () => {
    expect(hasPermission(interessadoUser, 'dashboard:view')).toBe(false)
    expect(hasPermission(interessadoUser, 'projects:read')).toBe(false)
  })

  it('supports legacy role arrays for backwards compatibility', () => {
    expect(hasPermission(adminUser, ['ADMIN', 'PROFESSOR'])).toBe(true)
    expect(hasPermission(pesquisadorUser, ['ADMIN', 'PROFESSOR'])).toBe(false)
  })

  it('supports checking multiple permissions as an array', () => {
    expect(hasPermission(adminUser, ['dashboard:view', 'reports:read'])).toBe(true)
    expect(hasPermission(pesquisadorUser, ['dashboard:view', 'reports:read'])).toBe(false)
  })
})
