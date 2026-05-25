import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { EstadoUsuario } from '@prisma/client';
import { RequestWithUser } from './auth.guard';

@Injectable()
export class StateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return true;
    }

    if (user.estado === EstadoUsuario.NEGADO) {
      throw new ForbiddenException('Seu acesso foi negado.');
    }

    return true;
  }
}
