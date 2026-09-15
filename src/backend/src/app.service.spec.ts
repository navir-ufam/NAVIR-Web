import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('deve retornar "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });
});
