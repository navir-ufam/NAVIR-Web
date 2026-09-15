import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { TipoUsuario } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(@Body() dto: CriarUsuarioDto) {
    return this.usuariosService.criar(dto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADMIN)
  listar() {
    return this.usuariosService.listarTodos();
  }

  // GET /usuarios/:id — Detalhe do perfil completo

  // PATCH /usuarios/:id/aprovacao — Aprovar/Negar cadastro (ADMIN)

  // PATCH /usuarios/:id/converter-para-pesquisador — Conversão (ADMIN)
}
