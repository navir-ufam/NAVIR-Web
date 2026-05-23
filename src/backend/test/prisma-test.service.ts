import { PrismaClient } from '@prisma/client';

export class PrismaTestService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    await this.usuario.deleteMany();
  }
}