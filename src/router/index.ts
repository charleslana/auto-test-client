import DashboardView from '../views/panel/DashboardView.vue';
import HistoricView from '../views/panel/HistoricView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TestGeneratorView from '../views/panel/TestGeneratorView.vue';
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
      path: '/panel/historic',
      name: 'panel-historic',
      component: HistoricView,
      meta: { title: 'Auto test - Histórico' }
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
