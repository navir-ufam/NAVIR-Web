import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EstadoUsuario, TipoUsuario } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CriarUsuarioDto) {
    if (!dto.aceite_termos) {
      throw new BadRequestException('Aceite dos termos é obrigatório.');
    }

    const existe = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (existe) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const senha_hash = await bcrypt.hash(dto.senha, 10);

    const estado_usuario =
      dto.tipo === TipoUsuario.INTERESSADO ? null : EstadoUsuario.PENDENTE;

    const usuario = await this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha_hash,
        tipo_usuario: dto.tipo,
        estado_usuario,
        aceite_termos: dto.aceite_termos,
        ...(dto.link_lattes && {
          curriculo: { create: { link_lattes: dto.link_lattes } },
        }),
      },
    });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo_usuario,
      estado: usuario.estado_usuario,
      data_criacao: usuario.data_criacao,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  // --- Placeholders para funcionalidades futuras ---

  async listarTodos(): Promise<void> {
    // Placeholder para listagem e busca com filtros
  }

  async buscarPorId(): Promise<void> {
    // Placeholder para retornar o detalhe completo do usuário
  }

  async aprovarOuNegar(): Promise<void> {
    // Placeholder para mudar estado de PENDENTE para ACEITO ou NEGADO
  }

  async converterInteressado(): Promise<void> {
    // Placeholder para transformar INTERESSADO em PESQUISADOR
  }
}
