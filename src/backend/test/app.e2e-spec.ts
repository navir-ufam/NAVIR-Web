import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { PrismaClient, EstadoUsuario, TipoUsuario } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaTestService } from './prisma-test.service';

describe('Auth Flow E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaTestService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();

    prisma = new PrismaTestService();
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('POST /api/v1/usuarios (Cadastro básico)', () => {
    it('deve criar usuário válido e retornar 201 sem senha no response', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/usuarios')
        .send({
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: 'senha12345',
          tipo: TipoUsuario.PESQUISADOR,
          aceite_termos: true,
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('nome', 'João Silva');
      expect(response.body).toHaveProperty('email', 'joao@teste.com');
      expect(response.body).toHaveProperty('tipo', TipoUsuario.PESQUISADOR);
      expect(response.body).toHaveProperty('estado', EstadoUsuario.PENDENTE);
      expect(response.body).not.toHaveProperty('senha');
      expect(response.body).not.toHaveProperty('senha_hash');
    });
  });

  describe('POST /api/v1/usuarios (Email duplicado)', () => {
    it('deve retornar 409 ao tentar cadastrar email duplicado', async () => {
      const senhaHash = await bcrypt.hash('senha12345', 10);
      await prisma.usuario.create({
        data: {
          nome: 'Usuário Existente',
          email: 'existente@teste.com',
          senha_hash: senhaHash,
          tipo_usuario: TipoUsuario.PESQUISADOR,
          estado_usuario: EstadoUsuario.PENDENTE,
          aceite_termos: true,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/usuarios')
        .send({
          nome: 'Novo Usuário',
          email: 'existente@teste.com',
          senha: 'senha12345',
          tipo: TipoUsuario.PESQUISADOR,
          aceite_termos: true,
        })
        .expect(409);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('E-mail já cadastrado');
    });
  });

  describe('POST /api/v1/auth/login (Credenciais válidas)', () => {
    it('deve retornar 200 com token e usuario ao fazer login com usuário ACEITO', async () => {
      const senhaHash = await bcrypt.hash('senha12345', 10);
      await prisma.usuario.create({
        data: {
          nome: 'Usuario Aceito',
          email: 'aceito@teste.com',
          senha_hash: senhaHash,
          tipo_usuario: TipoUsuario.PROFESSOR,
          estado_usuario: EstadoUsuario.ACEITO,
          aceite_termos: true,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'aceito@teste.com',
          senha: 'senha12345',
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('usuario');
      expect(response.body.usuario).toHaveProperty('id');
      expect(response.body.usuario).toHaveProperty('tipo', TipoUsuario.PROFESSOR);
      expect(response.body.usuario).toHaveProperty('estado', EstadoUsuario.ACEITO);
    });
  });

  describe('POST /api/v1/auth/login (Credenciais inválidas)', () => {
    it('deve retornar 401 ao tentar login com senha errada', async () => {
      const senhaHash = await bcrypt.hash('senha12345', 10);
      await prisma.usuario.create({
        data: {
          nome: 'Usuario Teste',
          email: 'semba@teste.com',
          senha_hash: senhaHash,
          tipo_usuario: TipoUsuario.PESQUISADOR,
          estado_usuario: EstadoUsuario.ACEITO,
          aceite_termos: true,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'semba@teste.com',
          senha: 'senhaerrada',
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Credenciais inválidas');
    });
  });

  describe('POST /api/v1/auth/login (Usuário NEGADO)', () => {
    it('deve retornar 403 ao tentar login com usuário NEGADO', async () => {
      const senhaHash = await bcrypt.hash('senha12345', 10);
      await prisma.usuario.create({
        data: {
          nome: 'Usuario Negado',
          email: 'negado@teste.com',
          senha_hash: senhaHash,
          tipo_usuario: TipoUsuario.PESQUISADOR,
          estado_usuario: EstadoUsuario.NEGADO,
          aceite_termos: true,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'negado@teste.com',
          senha: 'senha12345',
        })
        .expect(403);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Acesso negado');
    });
  });

  describe('POST /api/v1/auth/login (INTERESSADO)', () => {
    it('deve retornar 200 com mensagem (sem token JWT) para tipo INTERESSADO', async () => {
      const senhaHash = await bcrypt.hash('senha12345', 10);
      await prisma.usuario.create({
        data: {
          nome: 'Interessado Teste',
          email: 'interessado@teste.com',
          senha_hash: senhaHash,
          tipo_usuario: TipoUsuario.INTERESSADO,
          aceite_termos: true,
        },
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'interessado@teste.com',
          senha: 'senha12345',
        })
        .expect(200);

      expect(response.body).not.toHaveProperty('token');
      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.mensagem).toContain(
        'Entraremos em contato quando surgir uma oportunidade',
      );
    });
  });

  describe('GET /api/v1/usuarios (Rota protegida sem token)', () => {
    it('deve retornar 401 ao acessar rota protegida sem token', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/usuarios')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/v1/usuarios (Rota protegida role errado)', () => {
    it('deve retornar 403 ao acessar rota de ADMIN com token de PESQUISADOR', async () => {
      const senhaHash = await bcrypt.hash('senha12345', 10);
      const usuarioPesquisador = await prisma.usuario.create({
        data: {
          nome: 'Pesquisador Teste',
          email: 'pesquisador@teste.com',
          senha_hash: senhaHash,
          tipo_usuario: TipoUsuario.PESQUISADOR,
          estado_usuario: EstadoUsuario.ACEITO,
          aceite_termos: true,
        },
      });

      const loginResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'pesquisador@teste.com',
          senha: 'senha12345',
        })
        .expect(200);

      const token = loginResponse.body.token;

      await request(app.getHttpServer())
        .get('/api/v1/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    });
  });
});