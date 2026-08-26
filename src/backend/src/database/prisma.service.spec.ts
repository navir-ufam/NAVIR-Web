import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  it('deve chamar $connect no onModuleInit', async () => {
    jest.spyOn(service, '$connect').mockResolvedValue(undefined);
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalled();
  });

  it('deve chamar $disconnect no onModuleDestroy', async () => {
    jest.spyOn(service, '$disconnect').mockResolvedValue(undefined);
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalled();
  });
});
