import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from '@prisma/client';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;

    guard = new RolesGuard(reflector);
  });

  const createMockContext = (userType?: TipoUsuario) => {
    const request = {
      user: userType ? { tipo: userType } : null,
    };

    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  it('deve permitir acesso quando não houver roles requeridas', () => {
    reflector.getAllAndOverride.mockReturnValue(null);
    const context = createMockContext(TipoUsuario.PESQUISADOR);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve permitir acesso quando o usuário possuir uma role requerida', () => {
    reflector.getAllAndOverride.mockReturnValue([
      TipoUsuario.ADMIN,
      TipoUsuario.PROFESSOR,
    ]);
    const context = createMockContext(TipoUsuario.ADMIN);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve lançar ForbiddenException quando o usuário não tiver a role requerida', () => {
    reflector.getAllAndOverride.mockReturnValue([TipoUsuario.ADMIN]);
    const context = createMockContext(TipoUsuario.PESQUISADOR);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('deve lançar ForbiddenException quando o perfil do usuário não for identificado', () => {
    reflector.getAllAndOverride.mockReturnValue([TipoUsuario.ADMIN]);
    const context = createMockContext();

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
