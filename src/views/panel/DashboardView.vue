<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.Dashboard"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/dashboard', name: 'Geral' }]"
          :pageName="MenuComponentEnum.Dashboard"
        ></BreadCrumbComponent>
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title" v-if="loadingName"><Skeletor /></h1>
              <h1 class="title" v-if="!loadingName">Olá, {{ name }}, {{ greeting }}.</h1>
              <h2 class="subtitle">Espero que você esteja tendo um ótimo dia!</h2>
              <span>Aqui está suas execuções de testes realizadas totais</span>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.testGenerator) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.TestGenerator }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.stepGenerator) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.StepGenerator }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.bugReport) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.BugReport }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.testPlan) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.TestPlan }}</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.qualityIndicator) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.QualityIndicator }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.testTranslator) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.TestTranslator }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.usabilityTestCase) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.UsabilityTestCase }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.testMassGenerator) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.TestMassGenerator }}</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.gherkinLanguage) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.GherkinLanguage }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.securityTest) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.SecurityTest }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.performanceTest) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.PerformanceTest }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.apiTest) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.APITest }}</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.sqlQueryBuilder) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.SQLQueryBuilder }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.cucumberCode) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.CucumberCode }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.automationCode) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.AutomationCode }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.testingStrategy) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.TestingStrategy }}</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title" v-if="!loadingCount">
                  {{ formatCompactNumber(response.loadTesting) }}
                </p>
                <p class="title" v-if="loadingCount"><Skeletor /></p>
                <p class="subtitle">{{ MenuComponentEnum.LoadTesting }}</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'is-active': beginner }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Novo por aqui?</p>
      </header>
      <section class="modal-card-body">
        <p>Parece que você é novo aqui!, vamos completar seu cadastro, é fácil!</p>
        <br />
        <div class="notification is-warning">
          Seu nome é único, você pode inserir um apelido, mas fique tranquilo que você poderá
          alterar-lo depois!
        </div>
        <form @submit.prevent="updateUserName">
          <div class="field">
            <div class="control">
              <input
                class="input is-large"
                type="text"
                placeholder="Seu nome"
                required
                v-model="newName"
              />
            </div>
          </div>
          <button
            class="button is-block is-info is-large is-fullwidth"
            :class="{ 'is-loading': loading }"
            :disabled="loading"
          >
            Completar cadastro <i class="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </form>
      </section>
    </div>
  </div>
  <div class="modal" :class="{ 'is-active': success }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Parabéns</p>
      </header>
      <section class="modal-card-body">
        <p>
          Seja bem vindo {{ name }}, você adquiriu 5.000 pontos para gastar na loja, descubra várias
          ferramentas e comece agora!
        </p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="success = false">Começar!</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '@/components/NavBarComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
import MenuComponentEnum from '@/enum/MenuComponentEnum';
import { ref, onMounted } from 'vue';
import { formatCompactNumber } from '@/utils/utils';
import UserService from '@/service/UserService';
import { handlerError, addOverflowHidden, removeOverflowHidden } from '@/utils/utils';
import type IUser from '@/interface/IUser';
import type ITest from '@/interface/ITest';
import { Skeletor } from 'vue-skeletor';

const greeting = ref('');

function getGreeting(): string {
  const date = new Date();
  const hour = date.getHours();
  const greetingMessage =
    hour >= 6 && hour < 12 ? 'Bom dia' : hour >= 12 && hour < 18 ? 'Boa tarde' : 'Boa noite';
  return greetingMessage;
}

onMounted(async () => {
  greeting.value = getGreeting();
  await getUserDetails();
  await getUserTestCount();
});

const loadingName = ref(true);

async function getUserDetails(): Promise<void> {
  try {
    const response = (await UserService.getDetails()) as IUser;
    showUserNameModal(response.name);
    loadingName.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const beginner = ref(false);

const success = ref(false);

function showUserNameModal(getName: string | null): void {
  if (getName == null) {
    addOverflowHidden();
    beginner.value = true;
    return;
  }
  name.value = getName;
}

const loading = ref(false);
const newName = ref('');
const name = ref('Sem nome');

async function updateUserName(): Promise<void> {
  try {
    validateUserName(newName.value);
    loading.value = true;
    await UserService.updateName(newName.value);
    beginner.value = false;
    name.value = newName.value;
    success.value = true;
  } catch (error: any) {
    loading.value = false;
    handlerError(error);
  } finally {
    removeOverflowHidden();
  }
}

function validateUserName(name: string): void {
  if (name.trim() == '') {
    throw new Error('Você deve preencher seu nome corretamente');
  }
}

const loadingCount = ref(true);

const response = ref<ITest>(createEmptyTest());

function createEmptyTest(): ITest {
  return {
    testGenerator: 0,
    stepGenerator: 0,
    bugReport: 0,
    testPlan: 0,
    qualityIndicator: 0,
    testTranslator: 0,
    usabilityTestCase: 0,
    testMassGenerator: 0,
    gherkinLanguage: 0,
    securityTest: 0,
    performanceTest: 0,
    apiTest: 0,
    sqlQueryBuilder: 0,
    cucumberCode: 0,
    automationCode: 0,
    testingStrategy: 0,
    loadTesting: 0
  };
}

async function getUserTestCount(): Promise<void> {
  try {
    response.value = (await UserService.getTestCount()) as ITest;
    loadingCount.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}
</script>

<style scoped>
.columns {
  width: 100%;
  height: 100%;
  margin-left: 0;
}

.info-tiles {
  margin: 1rem 0;
}

.info-tiles .subtitle {
  font-weight: 300;
  color: #8f99a3;
}

.hero.welcome.is-info {
  background: #36d1dc;
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
  background: linear-gradient(to right, #5b86e5, #36d1dc);
}

.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
</style>
