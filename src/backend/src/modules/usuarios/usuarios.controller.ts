import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  criar(@Body() dto: CriarUsuarioDto) {
    return this.usuariosService.criar(dto);
  }

  // GET /usuarios — Listar com filtros (ADMIN/PROFESSOR)

  // GET /usuarios/:id — Detalhe do perfil completo

  // PATCH /usuarios/:id/aprovacao — Aprovar/Negar cadastro (ADMIN)

  // PATCH /usuarios/:id/converter-para-pesquisador — Conversão (ADMIN)
}
