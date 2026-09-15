import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(() => {
    service = {
      login: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    controller = new AuthController(service);
  });

  it('deve chamar authService.login com o dto fornecido', async () => {
    const dto = { email: 'test@ufam.edu.br', senha: 'password' };
    const expectedResponse = { token: 'mocked_token' };
    service.login.mockResolvedValue(expectedResponse as any);

    const result = await controller.login(dto);

    expect(service.login).toHaveBeenCalledWith(dto);
    expect(result).toBe(expectedResponse);
  });
});
