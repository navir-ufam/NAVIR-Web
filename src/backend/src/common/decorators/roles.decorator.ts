import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '@prisma/client';

export const ROLES_KEY = 'roles'; // Esta constante OBRIGATORIAMENTE precisa do "export"
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(ROLES_KEY, roles);
