import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EstadoUsuario, TipoUsuario } from '@prisma/client';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(dto.email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const senhaValida = await bcrypt.compare(dto.senha, usuario.senha_hash);
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    if (usuario.estado_usuario === EstadoUsuario.NEGADO) {
      throw new ForbiddenException('Acesso negado.');
    }

    if (usuario.tipo_usuario === TipoUsuario.INTERESSADO) {
      return {
        mensagem:
          'Entraremos em contato quando surgir uma oportunidade compatível com seu perfil.',
      };
    }

    const payload = {
      sub: usuario.id,
      tipo: usuario.tipo_usuario,
      estado: usuario.estado_usuario,
    };

    return {
      token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        tipo: usuario.tipo_usuario,
        estado: usuario.estado_usuario,
      },
    };
  }
}
