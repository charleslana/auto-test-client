<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.APITest"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.APITest"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.APITest" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.APITest }}</p>
              <p class="subtitle">
                Este é o gerador de testes de API. Por favor, forneça-nos uma API com detalhes como
                endpoint, parâmetros de entrada e saída e se possível um exemplo de chamada e
                resposta da API.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"
                    ><span class="has-text-danger">*</span> API ou trecho da documentação:</label
                  >
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Requisição e Resposta:</label>
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
  validateInput,
  scrollDown,
  getInput,
  copyText
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.APITest)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  'API de Previsão do Tempo\n\nEndpoint: https://api.weatherforecast.com/forecast\n\nParâmetros:\n\nlocation: A localização para a qual deseja obter a previsão do tempo (obrigatório)\ndate: A data para a qual deseja obter a previsão do tempo (opcional)\nFormato de Resposta:\nA API retorna os dados em formato JSON com as seguintes informações:\n\ntemperature: Temperatura atual\ndescription: Descrição do clima\nhumidity: Umidade\nwind_speed: Velocidade do vento'
);

const context = ref<string | undefined>(
  'Exemplo de chamada de API:\n\nEndpoint: https://api.weatherforecast.com/forecast?location=New+York\n\nExemplo de resposta da API:\n{\n  "temperature": 25,\n  "description": "Ensolarado",\n  "humidity": 60,\n  "wind_speed": 10\n}\n\n'
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
      type: TestTypeEnum.APITest
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
