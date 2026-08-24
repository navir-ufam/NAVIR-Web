import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicRoute, PageLoader } from '@/components/common'
import { AppLayout } from '@/components/layout'

const LoginPage = lazy(() => import('@/pages/auth/login'))
const CadastroPage = lazy(() => import('@/pages/auth/cadastro'))
const CadastroPesquisadorPage = lazy(() => import('@/pages/auth/cadastro/pesquisador'))
const CadastroProfessorPage = lazy(() => import('@/pages/auth/cadastro/professor'))
const CadastroInteressadoPage = lazy(() => import('@/pages/auth/cadastro/interessado'))
const InteressadoFeedbackPage = lazy(() => import('@/pages/auth/interessado-feedback'))
const AguardandoAprovacaoPage = lazy(() => import('@/pages/auth/aguardando-aprovacao'))
const AcessoNegadoPage = lazy(() => import('@/pages/auth/acesso-negado'))

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UsuariosPage = lazy(() => import('@/pages/usuarios'))
const UsuarioDetalhePage = lazy(() => import('@/pages/usuarios/detalhe'))
const PerfilPage = lazy(() => import('@/pages/perfil'))
const ProjetosPage = lazy(() => import('@/pages/projetos'))
const ProjetoFormPage = lazy(() => import('@/pages/projetos/form'))
const DispositivosPage = lazy(() => import('@/pages/dispositivos'))
const AcessoLaboratorioPage = lazy(() => import('@/pages/acesso-laboratorio'))
const RelatoriosPage = lazy(() => import('@/pages/relatorios'))
const CurriculoPage = lazy(() => import('@/pages/curriculo'))
const HistoricoPage = lazy(() => import('@/pages/historico'))
const AtualizacoesPage = lazy(() => import('@/pages/atualizacoes'))

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <PublicRoute>{withSuspense(LoginPage)}</PublicRoute>,
  },
  {
    path: '/cadastro',
    element: <PublicRoute>{withSuspense(CadastroPage)}</PublicRoute>,
  },
  {
    path: '/cadastro/pesquisador',
    element: <PublicRoute>{withSuspense(CadastroPesquisadorPage)}</PublicRoute>,
  },
  {
    path: '/cadastro/professor',
    element: <PublicRoute>{withSuspense(CadastroProfessorPage)}</PublicRoute>,
  },
  {
    path: '/cadastro/interessado',
    element: <PublicRoute>{withSuspense(CadastroInteressadoPage)}</PublicRoute>,
  },
  {
    path: '/interessado-feedback',
    element: withSuspense(InteressadoFeedbackPage),
  },
  {
    path: '/aguardando-aprovacao',
    element: withSuspense(AguardandoAprovacaoPage),
  },
  {
    path: '/acesso-negado',
    element: withSuspense(AcessoNegadoPage),
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute requiredPermission="dashboard:view">
            {withSuspense(DashboardPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/usuarios',
        element: (
          <ProtectedRoute requiredPermission="users:read">
            {withSuspense(UsuariosPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/usuarios/:id',
        element: (
          <ProtectedRoute requiredPermission="users:detail">
            {withSuspense(UsuarioDetalhePage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/perfil',
        element: (
          <ProtectedRoute requiredPermission="profile:view">
            {withSuspense(PerfilPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/projetos',
        element: (
          <ProtectedRoute requiredPermission="projects:read">
            {withSuspense(ProjetosPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/projetos/novo',
        element: (
          <ProtectedRoute requiredPermission="projects:create">
            {withSuspense(ProjetoFormPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/projetos/:id/editar',
        element: (
          <ProtectedRoute requiredPermission="projects:edit">
            {withSuspense(ProjetoFormPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/dispositivos',
        element: (
          <ProtectedRoute requiredPermission="dispositivos:read">
            {withSuspense(DispositivosPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/acesso-laboratorio',
        element: (
          <ProtectedRoute requiredPermission="acesso-laboratorio:read">
            {withSuspense(AcessoLaboratorioPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/relatorios',
        element: (
          <ProtectedRoute requiredPermission="reports:read">
            {withSuspense(RelatoriosPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/curriculo',
        element: (
          <ProtectedRoute requiredPermission="curriculo:read">
            {withSuspense(CurriculoPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/historico',
        element: (
          <ProtectedRoute requiredPermission="historico:read">
            {withSuspense(HistoricoPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/atualizacoes',
        element: (
          <ProtectedRoute requiredPermission="atualizacoes:read">
            {withSuspense(AtualizacoesPage)}
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])

export default router
