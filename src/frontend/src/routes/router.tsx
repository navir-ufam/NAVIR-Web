import type { ComponentType } from "react";
import {
  AcessoLaboratorioPage,
  AcessoNegadoPage,
  AtualizacoesPage,
  AguardandoAprovacaoPage,
  CadastroPage,
  CurriculoPage,
  DashboardPage,
  DispositivosPage,
  HistoricoPage,
  InteressadoFeedbackPage,
  LoginPage,
  PerfilPage,
  ProjetosPage,
  RelatoriosPage,
  UsuariosPage,
} from "@/pages";

export type AppRoute = {
  path: string;
  title: string;
  Component: ComponentType;
};

export const appRoutes: AppRoute[] = [
  { path: "/auth/login", title: "Login", Component: LoginPage },
  { path: "/auth/cadastro", title: "Cadastro", Component: CadastroPage },
  {
    path: "/auth/interessado-feedback",
    title: "Interessado Feedback",
    Component: InteressadoFeedbackPage,
  },
  {
    path: "/auth/aguardando-aprovacao",
    title: "Aguardando Aprovacao",
    Component: AguardandoAprovacaoPage,
  },
  {
    path: "/auth/acesso-negado",
    title: "Acesso Negado",
    Component: AcessoNegadoPage,
  },
  { path: "/dashboard", title: "Dashboard", Component: DashboardPage },
  { path: "/usuarios", title: "Usuarios", Component: UsuariosPage },
  { path: "/perfil", title: "Perfil", Component: PerfilPage },
  { path: "/curriculo", title: "Curriculo", Component: CurriculoPage },
  { path: "/historico", title: "Historico", Component: HistoricoPage },
  { path: "/atualizacoes", title: "Atualizacoes", Component: AtualizacoesPage },
  { path: "/projetos", title: "Projetos", Component: ProjetosPage },
  { path: "/dispositivos", title: "Dispositivos", Component: DispositivosPage },
  {
    path: "/acesso-laboratorio",
    title: "Acesso Laboratorio",
    Component: AcessoLaboratorioPage,
  },
  { path: "/relatorios", title: "Relatorios", Component: RelatoriosPage },
];
