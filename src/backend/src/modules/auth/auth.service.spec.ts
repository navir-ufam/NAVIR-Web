import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EstadoUsuario, TipoUsuario, Usuario } from '@prisma/client';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usuariosService: jest.Mocked<UsuariosService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    usuariosService = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UsuariosService>;

    jwtService = {
      sign: jest.fn().mockReturnValue('mocked_jwt_token'),
    } as unknown as jest.Mocked<JwtService>;

    service = new AuthService(usuariosService, jwtService);
  });

  it('deve realizar login com sucesso para usuário ACEITO', async () => {
    const mockUsuario = {
      id: 1,
      nome: 'João Prof',
      email: 'prof@ufam.edu.br',
      senha_hash: 'hashedpassword',
      tipo_usuario: TipoUsuario.PROFESSOR,
      estado_usuario: EstadoUsuario.ACEITO,
    } as Usuario;

    usuariosService.findByEmail.mockResolvedValue(mockUsuario);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({
      email: 'prof@ufam.edu.br',
      senha: 'password123',
    });

    expect(result).toEqual({
      token: 'mocked_jwt_token',
      usuario: {
        id: 1,
        tipo: TipoUsuario.PROFESSOR,
        estado: EstadoUsuario.ACEITO,
      },
    });
  });

  it('deve retornar mensagem amigável para usuário INTERESSADO sem emitir token', async () => {
    const mockUsuario = {
      id: 2,
      nome: 'Maria Interessada',
      email: 'interessada@ufam.edu.br',
      senha_hash: 'hashedpassword',
      tipo_usuario: TipoUsuario.INTERESSADO,
      estado_usuario: null,
    } as unknown as Usuario;

    usuariosService.findByEmail.mockResolvedValue(mockUsuario);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({
      email: 'interessada@ufam.edu.br',
      senha: 'password123',
    });

    expect(result).toHaveProperty('mensagem');
    expect(result).not.toHaveProperty('token');
  });

  it('deve lançar UnauthorizedException se o e-mail não existir', async () => {
    usuariosService.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({ email: 'inexistente@ufam.edu.br', senha: '123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se a senha for incorreta', async () => {
    const mockUsuario = {
      id: 1,
      email: 'user@ufam.edu.br',
      senha_hash: 'hashedpassword',
    } as Usuario;

    usuariosService.findByEmail.mockResolvedValue(mockUsuario);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ email: 'user@ufam.edu.br', senha: 'wrongpassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar ForbiddenException para usuário com estado NEGADO', async () => {
    const mockUsuario = {
      id: 3,
      email: 'negado@ufam.edu.br',
      senha_hash: 'hashedpassword',
      tipo_usuario: TipoUsuario.PESQUISADOR,
      estado_usuario: EstadoUsuario.NEGADO,
    } as Usuario;

    usuariosService.findByEmail.mockResolvedValue(mockUsuario);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await expect(
      service.login({ email: 'negado@ufam.edu.br', senha: 'password123' }),
    ).rejects.toThrow(ForbiddenException);
  });
});
