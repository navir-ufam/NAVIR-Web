import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { PerfisModule } from './modules/perfis/perfis.module';
import { DadosAcademicosModule } from './modules/dados-academicos/dados-academicos.module';
import { CurriculosModule } from './modules/curriculos/curriculos.module';
import { HistoricoModule } from './modules/historico/historico.module';
import { ProjetosModule } from './modules/projetos/projetos.module';
import { DispositivosModule } from './modules/dispositivos/dispositivos.module';
import { AcessoLaboratorioModule } from './modules/acesso-laboratorio/acesso-laboratorio.module';
import { StatusAcademicoModule } from './modules/status-academico/status-academico.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';
import { NotificacoesModule } from './modules/notificacoes/notificacoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (envConfig: Record<string, unknown>) => {
        const schema = Joi.object<Record<string, string | number>>({
          PORT: Joi.number().default(3000),
          NODE_ENV: Joi.string()
            .valid('development', 'production', 'test')
            .default('development'),
          DB_HOST: Joi.string().required(),
          DB_PORT: Joi.number().default(5432),
          DB_USERNAME: Joi.string().required(),
          DB_PASSWORD: Joi.string().required(),
          DB_DATABASE: Joi.string().required(),
          DATABASE_URL: Joi.string().required(),
          ADMIN_EMAIL: Joi.string().required(),
          ADMIN_PASSWORD: Joi.string().required(),
          JWT_SECRET: Joi.string().required(),
          JWT_EXPIRATION: Joi.string().default('24h'),
          CORS_ORIGIN: Joi.string().required(),
        });

        const validationResult = schema.validate(envConfig, {
          abortEarly: false,
          allowUnknown: true,
        });
        if (validationResult.error) {
          const logger = new Logger('ConfigValidation');
          logger.error(
            '❌ Falha ao iniciar a aplicação: Variáveis de ambiente ausentes ou inválidas:',
          );

          validationResult.error.details.forEach((err) => {
            logger.error(`--> ${err.message}`);
          });

          process.exit(1);
        }
        return validationResult.value;
      },
    }),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    PerfisModule,
    DadosAcademicosModule,
    CurriculosModule,
    HistoricoModule,
    ProjetosModule,
    DispositivosModule,
    AcessoLaboratorioModule,
    StatusAcademicoModule,
    DashboardModule,
    RelatoriosModule,
    NotificacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
