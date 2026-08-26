import type { User, UserType } from '@/types'

export type AppPermission =
  | 'dashboard:view'
  | 'users:read'
  | 'users:write'
  | 'users:detail'
  | 'profile:view'
  | 'projects:read'
  | 'projects:create'
  | 'projects:edit'
  | 'dispositivos:read'
  | 'acesso-laboratorio:read'
  | 'reports:read'
  | 'curriculo:read'
  | 'historico:read'
  | 'atualizacoes:read'

export const ROLE_PERMISSIONS: Record<UserType, AppPermission[]> = {
  ADMIN: [
    'dashboard:view',
    'users:read',
    'users:write',
    'users:detail',
    'profile:view',
    'projects:read',
    'dispositivos:read',
    'acesso-laboratorio:read',
    'reports:read',
  ],
  PROFESSOR: ['dashboard:view', 'users:read', 'users:detail', 'profile:view', 'projects:read'],
  PESQUISADOR: [
    'dashboard:view',
    'profile:view',
    'projects:read',
    'projects:create',
    'projects:edit',
    'dispositivos:read',
    'acesso-laboratorio:read',
    'curriculo:read',
    'historico:read',
    'atualizacoes:read',
  ],
  INTERESSADO: [],
}

export function hasPermission(
  user: User | null | undefined,
  required: AppPermission | AppPermission[] | UserType[]
): boolean {
  if (user?.estado !== 'ACEITO' || !user?.tipo) {
    return false
  }

  if (
    Array.isArray(required) &&
    required.length > 0 &&
    (required.includes('ADMIN') ||
      required.includes('PROFESSOR') ||
      required.includes('PESQUISADOR') ||
      required.includes('INTERESSADO'))
  ) {
    return (required as UserType[]).includes(user.tipo)
  }

  const userPermissions = ROLE_PERMISSIONS[user.tipo] || []

  if (Array.isArray(required)) {
    return (required as AppPermission[]).every((perm) => userPermissions.includes(perm))
  }

  return userPermissions.includes(required as AppPermission)
}
