import BugReportView from '@/views/panel/BugReportView.vue';
import ConquestView from '@/views/panel/ConquestView.vue';
import DashboardView from '@/views/panel/DashboardView.vue';
import HistoricDetailsView from '@/views/panel/HistoricDetailsView.vue';
import HistoricView from '@/views/panel/HistoricView.vue';
import HomeView from '@/views/HomeView.vue';
import ItemsView from '@/views/panel/ItemsView.vue';
import LoginView from '@/views/LoginView.vue';
import QualityIndicatorView from '@/views/panel/QualityIndicatorView.vue';
import RankView from '@/views/panel/RankView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ShopView from '@/views/panel/ShopView.vue';
import StepGeneratorView from '@/views/panel/StepGeneratorView.vue';
import TestGeneratorView from '@/views/panel/TestGeneratorView.vue';
import TestPlanView from '@/views/panel/TestPlanView.vue';
import UserDetailsView from '@/views/panel/UserDetailsView.vue';
import UserProfileView from '@/views/panel/UserProfileView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Auto test - Ferramenta para testers!' }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Auto test - Login' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: 'Auto test - Cadastro' }
    },
    {
      path: '/panel/dashboard',
      name: 'panel-dashboard',
      component: DashboardView,
      meta: { title: 'Auto test - Dashboard' }
    },
    {
      path: '/panel/test-generator',
      name: 'panel-test-generator',
      component: TestGeneratorView,
      meta: { title: 'Auto test - Gerador de Testes' }
    },
    {
      path: '/panel/step-generator',
      name: 'panel-step-generator',
      component: StepGeneratorView,
      meta: { title: 'Auto test - Gerador de Passo a Passo' }
    },
    {
      path: '/panel/bug-report',
      name: 'panel-bug-report',
      component: BugReportView,
      meta: { title: 'Auto test - Relatório de Defeitos' }
    },
    {
      path: '/panel/test-plan',
      name: 'panel-test-plan',
      component: TestPlanView,
      meta: { title: 'Auto test - Plano de Testes' }
    },
    {
      path: '/panel/quality-indicator',
      name: 'panel-quality-indicator',
      component: QualityIndicatorView,
      meta: { title: 'Auto test - Indicadores de Qualidade' }
    },
    {
      path: '/panel/historic',
      name: 'panel-historic',
      component: HistoricView,
      meta: { title: 'Auto test - Histórico' }
    },
    {
      path: '/panel/historic/:id',
      name: 'panel-historic-details',
      component: HistoricDetailsView,
      meta: { title: 'Auto test - Histórico detalhes' }
    },
    {
      path: '/panel/user/details',
      name: 'panel-user-details',
      component: UserDetailsView,
      meta: { title: 'Auto test - Detalhes do usuário' }
    },
    {
      path: '/panel/conquest',
      name: 'panel-conquest',
      component: ConquestView,
      meta: { title: 'Auto test - Conquistas' }
    },
    {
      path: '/panel/shop',
      name: 'panel-shop',
      component: ShopView,
      meta: { title: 'Auto test - Loja' }
    },
    {
      path: '/panel/items',
      name: 'panel-items',
      component: ItemsView,
      meta: { title: 'Auto test - Meus itens' }
    },
    {
      path: '/panel/rank',
      name: 'panel-rank',
      component: RankView,
      meta: { title: 'Auto test - Classificação' }
    },
    {
      path: '/panel/profile/:id',
      name: 'panel-profile',
      component: UserProfileView,
      meta: { title: 'Auto test - Perfil' }
    }
  ]
});

interface RouteMeta {
  title?: string;
}

router.beforeEach((to, from, next) => {
  const meta = to.meta as RouteMeta;
  if (meta && meta.title) {
    document.title = meta.title;
  } else {
    document.title = 'Bem vindo';
  }
  next();
});

export default router;
