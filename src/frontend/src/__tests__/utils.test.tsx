import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('Utility - cn() (Smoke Test)', () => {
  it('merge classes corretamente resolvendo conflitos do tailwind', () => {
    const result = cn('p-4', 'p-2')
    expect(result).toBe('p-2')
  })
})
