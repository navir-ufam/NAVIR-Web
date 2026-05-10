import { Module } from '@nestjs/common';
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
