import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { EstadoUsuario } from '@prisma/client';
import { StateGuard } from './state.guard';

describe('StateGuard', () => {
  let guard: StateGuard;

  beforeEach(() => {
    guard = new StateGuard();
  });

  const createMockContext = (estado?: EstadoUsuario | null) => {
    const request = {
      user: estado !== undefined ? { estado } : null,
    };

    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  it('deve permitir acesso quando não houver usuário na requisição', () => {
    const context = createMockContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve permitir acesso para usuário com estado ACEITO', () => {
    const context = createMockContext(EstadoUsuario.ACEITO);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve permitir acesso para usuário com estado PENDENTE', () => {
    const context = createMockContext(EstadoUsuario.PENDENTE);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('deve lançar ForbiddenException para usuário com estado NEGADO', () => {
    const context = createMockContext(EstadoUsuario.NEGADO);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
