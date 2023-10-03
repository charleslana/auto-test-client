import APITestView from '@/views/panel/APITestView.vue';
import AutomationCodeView from '@/views/panel/AutomationCodeView.vue';
import BugReportView from '@/views/panel/BugReportView.vue';
import ConquestView from '@/views/panel/ConquestView.vue';
import CucumberCodeView from '@/views/panel/CucumberCodeView.vue';
import DashboardView from '@/views/panel/DashboardView.vue';
import GherkinLanguageView from '@/views/panel/GherkinLanguageView.vue';
import HistoricDetailsView from '@/views/panel/HistoricDetailsView.vue';
import HistoricView from '@/views/panel/HistoricView.vue';
import HomeView from '@/views/HomeView.vue';
import ItemsView from '@/views/panel/ItemsView.vue';
import LoginView from '@/views/LoginView.vue';
import PerformanceTestView from '@/views/panel/PerformanceTestView.vue';
import QualityIndicatorView from '@/views/panel/QualityIndicatorView.vue';
import RankView from '@/views/panel/RankView.vue';
import RegisterView from '@/views/RegisterView.vue';
import SecurityTestView from '@/views/panel/SecurityTestView.vue';
import SettingsView from '@/views/panel/SettingsView.vue';
import ShopView from '@/views/panel/ShopView.vue';
import SQLQueryBuilderView from '@/views/panel/SQLQueryBuilderView.vue';
import StepGeneratorView from '@/views/panel/StepGeneratorView.vue';
import TestGeneratorView from '@/views/panel/TestGeneratorView.vue';
import TestingStrategyView from '@/views/panel/TestingStrategyView.vue';
import TestMassGeneratorView from '@/views/panel/TestMassGeneratorView.vue';
import TestPlanView from '@/views/panel/TestPlanView.vue';
import TestTranslatorView from '@/views/panel/TestTranslatorView.vue';
import UsabilityTestCaseView from '@/views/panel/UsabilityTestCaseView.vue';
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
      path: '/panel/test-translator',
      name: 'panel-test-translator',
      component: TestTranslatorView,
      meta: { title: 'Auto test - Tradutor de Testes' }
    },
    {
      path: '/panel/usability-test-case',
      name: 'panel-usability-test-case',
      component: UsabilityTestCaseView,
      meta: { title: 'Auto test - Casos de Testes de Usabilidade (UX)' }
    },
    {
      path: '/panel/test-mass-generator',
      name: 'panel-test-mass-generator',
      component: TestMassGeneratorView,
      meta: { title: 'Auto test - Gerador de Massa de Testes' }
    },
    {
      path: '/panel/gherkin-language',
      name: 'panel-gherkin-language',
      component: GherkinLanguageView,
      meta: { title: 'Auto test - Linguagem Gherkin' }
    },
    {
      path: '/panel/security-test',
      name: 'panel-security-test',
      component: SecurityTestView,
      meta: { title: 'Auto test - Testes de Segurança' }
    },
    {
      path: '/panel/performance-test',
      name: 'panel-performance-test',
      component: PerformanceTestView,
      meta: { title: 'Auto test - Testes de Performance' }
    },
    {
      path: '/panel/api-test',
      name: 'panel-api-test',
      component: APITestView,
      meta: { title: 'Auto test - Testes de API' }
    },
    {
      path: '/panel/sql-query-builder',
      name: 'panel-sql-query-builder',
      component: SQLQueryBuilderView,
      meta: { title: 'Auto test - Construtor de Query SQL' }
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
    },
    {
      path: '/panel/settings',
      name: 'panel-settings',
      component: SettingsView,
      meta: { title: 'Auto test - Configurações' }
    },
    {
      path: '/panel/cucumber-code',
      name: 'panel-cucumber-code',
      component: CucumberCodeView,
      meta: { title: 'Auto test - Código Cucumber' }
    },
    {
      path: '/panel/automation-code',
      name: 'panel-automation-code',
      component: AutomationCodeView,
      meta: { title: 'Auto test - Código Frameworks de Automação' }
    },
    {
      path: '/panel/testing-strategy',
      name: 'panel-testing-strategy',
      component: TestingStrategyView,
      meta: { title: 'Auto test - Gerador de Estratégia de Testes' }
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
