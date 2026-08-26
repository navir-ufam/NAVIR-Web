import { BadRequestException, ConflictException, NotImplementedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EstadoUsuario, TipoUsuario, Usuario } from '@prisma/client';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../../database/prisma.service';

jest.mock('bcrypt');

describe('UsuariosService', () => {
  let service: UsuariosService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    prisma = {
      usuario: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    } as unknown as jest.Mocked<PrismaService>;

    service = new UsuariosService(prisma);
  });

  it('deve criar um usuário PESQUISADOR com estado PENDENTE', async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_pass');

    const createdUsuario = {
      id: 1,
      nome: 'Carlos Pesquisador',
      email: 'carlos@ufam.edu.br',
      tipo_usuario: TipoUsuario.PESQUISADOR,
      estado_usuario: EstadoUsuario.PENDENTE,
      data_criacao: new Date('2026-01-01'),
    } as unknown as Usuario;

    (prisma.usuario.create as jest.Mock).mockResolvedValue(createdUsuario);

    const dto = {
      nome: 'Carlos Pesquisador',
      email: 'carlos@ufam.edu.br',
      senha: 'pass',
      tipo: TipoUsuario.PESQUISADOR,
      aceite_termos: true,
    };

    const result = await service.criar(dto);

    expect(result).toEqual({
      id: 1,
      nome: 'Carlos Pesquisador',
      email: 'carlos@ufam.edu.br',
      tipo: TipoUsuario.PESQUISADOR,
      estado: EstadoUsuario.PENDENTE,
      data_criacao: createdUsuario.data_criacao,
    });
  });

  it('deve criar usuário INTERESSADO com estado null', async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_pass');

    const createdUsuario = {
      id: 2,
      nome: 'Ana Interessada',
      email: 'ana@ufam.edu.br',
      tipo_usuario: TipoUsuario.INTERESSADO,
      estado_usuario: null,
      data_criacao: new Date('2026-01-01'),
    } as unknown as Usuario;

    (prisma.usuario.create as jest.Mock).mockResolvedValue(createdUsuario);

    const dto = {
      nome: 'Ana Interessada',
      email: 'ana@ufam.edu.br',
      senha: 'pass',
      tipo: TipoUsuario.INTERESSADO,
      aceite_termos: true,
    };

    const result = await service.criar(dto);

    expect(result.estado).toBeNull();
  });

  it('deve lançar BadRequestException se aceite_termos for falso', async () => {
    const dto = {
      nome: 'Carlos',
      email: 'carlos@ufam.edu.br',
      senha: 'pass',
      tipo: TipoUsuario.PESQUISADOR,
      aceite_termos: false,
    };

    await expect(service.criar(dto)).rejects.toThrow(BadRequestException);
  });

  it('deve lançar ConflictException se o e-mail já existir', async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({ id: 10 } as Usuario);

    const dto = {
      nome: 'Carlos',
      email: 'existente@ufam.edu.br',
      senha: 'pass',
      tipo: TipoUsuario.PESQUISADOR,
      aceite_termos: true,
    };

    await expect(service.criar(dto)).rejects.toThrow(ConflictException);
  });

  it('deve buscar usuário por e-mail', async () => {
    const mockUser = { id: 1, email: 'test@ufam.edu.br' } as Usuario;
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.findByEmail('test@ufam.edu.br');
    expect(result).toBe(mockUser);
  });

  it('deve lançar NotImplementedException nos métodos placeholder', () => {
    expect(() => service.listarTodos()).toThrow(NotImplementedException);
    expect(() => service.buscarPorId()).toThrow(NotImplementedException);
    expect(() => service.aprovadoOuNegado()).toThrow(NotImplementedException);
    expect(() => service.converterInteressado()).toThrow(NotImplementedException);
  });
});
