<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.LoadTesting"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.LoadTesting"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.LoadTesting" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.LoadTesting }}</p>
              <p class="subtitle">
                Precisando de ajuda para realizar testes de cargas? Esta é a ferramenta certa.
                Escolha um framework, forneça a feature e o cenário a ser realizado a carga para
                gerar o código para você!
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label">Framework:</label>
                  <div class="control">
                    <div v-for="(f, index) in frameworks" :key="index">
                      <label>
                        <input type="radio" v-model="framework" :value="f" />
                        {{ f }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label"
                    ><span class="has-text-danger">*</span> Feature (Funcionalidade):</label
                  >
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Cenário:</label>
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="context"></textarea>
                  </div>
                </div>
                <small>Esta ação pode demorar um pouco.</small>
                <button
                  class="button is-large is-info is-fullwidth"
                  :class="{ 'is-loading': loading }"
                  :disabled="loading"
                >
                  Gerar
                </button>
              </form>
              <div v-if="result != null">
                <div class="level">
                  <div class="level-left"><div class="is-size-1">Resultado:</div></div>
                  <div class="level-right">
                    <button class="button copy-button" @click="copyToClipboard">
                      Copiar Texto
                    </button>
                  </div>
                </div>
                <div v-html="formatBreakLines(result)"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '@/components/NavBarComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
import MenuComponentEnum from '@/enum/MenuComponentEnum';
import { onMounted, ref } from 'vue';
import UserItemService from '@/service/UserItemService';
import TestTypeEnum from '@/enum/TestTypeEnum';
import {
  handlerError,
  formatBreakLines,
  scrollDown,
  validateInput,
  copyText,
  getInput
} from '@/utils/utils';
import BlockedPageComponent from '@/components/BlockedPageComponent.vue';
import OpenAIService from '@/service/OpenAIService';
import LoadingComponent from '@/components/LoadingComponent.vue';

onMounted(async () => {
  await validateItem();
});

const loadingItem = ref(true);

const open = ref(false);

async function validateItem(): Promise<void> {
  try {
    open.value = (await UserItemService.validateItem(TestTypeEnum.LoadTesting)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const frameworks = ref(['k6 (Javascript)', 'Artillery', 'Apache JMeter (Java)', 'Vegeta (Go)']);

const framework = ref(frameworks.value[0]);

const requirement = ref(
  'Funcionalidade: Login no sistema\nComo um usuário Eu quero poder fazer login no sistema Para acessar as funcionalidades restritas'
);

const context = ref<string | undefined>(
  'Cenário: Login com sucesso\nDeve ter uma duração de 60 segundos com uma capacidade de 1000 usuários'
);

const loading = ref(false);

const result = ref<string | null>(null);

async function send(): Promise<void> {
  try {
    validateInput(requirement.value);
    context.value = getInput(context.value);
    loading.value = true;
    result.value = null;
    const response = await OpenAIService.send({
      input: requirement.value,
      context: context.value,
      output: framework.value,
      type: TestTypeEnum.LoadTesting
    });
    result.value = response.message;
    scrollDown();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

function copyToClipboard() {
  copyText(result.value ?? '');
}
</script>

<style scoped></style>
