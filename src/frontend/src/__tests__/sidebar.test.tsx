import { describe, it, expect } from 'vitest'
import { getNavItemsForUser } from '@/components/layout/Sidebar'
import type { AuthUser } from '@/types'

const adminUser: AuthUser = { id: 1, tipo: 'ADMIN', estado: 'ACEITO' }
const pesquisadorUser: AuthUser = { id: 3, tipo: 'PESQUISADOR', estado: 'ACEITO' }
const professorUser: AuthUser = { id: 2, tipo: 'PROFESSOR', estado: 'ACEITO' }

describe('Sidebar Renderização por Role (Smoke Test)', () => {
  it('ADMIN e PESQUISADOR veem 6 itens, PROFESSOR vê 4 itens', () => {
    const adminItems = getNavItemsForUser('ADMIN', adminUser)
    const pesquisadorItems = getNavItemsForUser('PESQUISADOR', pesquisadorUser)
    const professorItems = getNavItemsForUser('PROFESSOR', professorUser)

    expect(adminItems).toHaveLength(6)
    expect(pesquisadorItems).toHaveLength(6)
    expect(professorItems).toHaveLength(4)
  })
})
