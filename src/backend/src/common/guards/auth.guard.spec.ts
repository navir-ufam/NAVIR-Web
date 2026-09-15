import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, JwtPayload } from './auth.guard';
import { EstadoUsuario, TipoUsuario } from '@prisma/client';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    configService = {
      get: jest.fn().mockReturnValue('supersecret'),
    } as unknown as jest.Mocked<ConfigService>;

    guard = new AuthGuard(jwtService, configService);
  });

  const createMockContext = (authHeader?: string) => {
    const request = {
      headers: {
        authorization: authHeader,
      },
      user: null as JwtPayload | null,
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    return { context, request };
  };

  it('deve permitir acesso com token Bearer válido', async () => {
    const payload: JwtPayload = {
      sub: '1',
      tipo: TipoUsuario.ADMIN,
      estado: EstadoUsuario.ACEITO,
    };
    jwtService.verifyAsync.mockResolvedValue(payload);

    const { context, request } = createMockContext('Bearer validtoken');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request.user).toEqual(payload);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('validtoken', {
      secret: 'supersecret',
    });
  });

  it('deve lançar UnauthorizedException se o cabeçalho Authorization ausente', async () => {
    const { context } = createMockContext();
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve lançar UnauthorizedException se o formato do token for inválido', async () => {
    const { context } = createMockContext('Basic 12345');
    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve lançar UnauthorizedException se o token estiver expirado ou for inválido', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('Jwt expired'));
    const { context } = createMockContext('Bearer invalidtoken');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
