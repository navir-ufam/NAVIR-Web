import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TipoUsuario } from '@prisma/client';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: jest.Mocked<UsuariosService>;

  beforeEach(() => {
    service = {
      criar: jest.fn(),
      listarTodos: jest.fn(),
    } as unknown as jest.Mocked<UsuariosService>;

    controller = new UsuariosController(service);
  });

  it('deve chamar usuariosService.criar ao criar usuário', async () => {
    const dto = {
      nome: 'Teste',
      email: 'teste@ufam.edu.br',
      senha: 'pass',
      tipo: TipoUsuario.PESQUISADOR,
      aceite_termos: true,
    };
    const expected = { id: 1, ...dto, estado: null, data_criacao: new Date() };
    service.criar.mockResolvedValue(expected as any);

    const result = await controller.criar(dto);

    expect(service.criar).toHaveBeenCalledWith(dto);
    expect(result).toBe(expected);
  });

  it('deve chamar usuariosService.listarTodos ao listar usuários', () => {
    controller.listar();
    expect(service.listarTodos).toHaveBeenCalled();
  });
});
