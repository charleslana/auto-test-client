<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.TestingStrategy"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-generator', name: 'Ferramentas iniciais' }]"
          :pageName="MenuComponentEnum.TestingStrategy"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.TestingStrategy" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.TestingStrategy }}</p>
              <p class="subtitle">
                Nossa ferramenta de geração de estratégia de testes vai te ajudar a gerar uma
                estratégia que segue a abordagem e as etapas definidas pelo modelo ISTQB,
                proporcionando uma estrutura sólida para o processo de teste do software. Por favor,
                forneça-nos um trecho da documentação do software ou um ou mais requisitos que
                deseja validar e informações relevantes como Contexto do projeto, Objetivos de
                teste, Tipos de teste, Abordagem de teste, Ambiente de teste, Critérios de
                aceitação, Estratégia de relatórios, Prazos e restrições. Com base nessa entrada,
                vai gerar a melhor estratégia de testes para você.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"
                    ><span class="has-text-danger">*</span> Informações úteis ao projeto de
                    testes:</label
                  >
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Contexto:</label>
                  <div class="control">
                    <textarea
                      class="textarea is-medium"
                      v-model="context"
                      placeholder="Entre com informações sobre o ambiente, atores envolvidos e etapas principais ou variáveis especificas do seu projeto"
                    ></textarea>
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.TestingStrategy)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  'Como parte do desenvolvimento de um aplicativo de compras online para uma grande varejista de moda, precisamos criar uma estratégia de testes completa com as melhores práticas de qualidade. O aplicativo deve permitir que os usuários pesquisem produtos, adicionem itens ao carrinho, realizem pagamentos, visualizem detalhes do pedido e recebam confirmações por e-mail. Os principais objetivos de teste são garantir a funcionalidade correta, identificar e corrigir falhas, e melhorar a experiência do usuário durante o processo de compra. \n\nOs tipos de teste que desejamos incluir são testes funcionais, testes de integração, testes de desempenho e testes de usabilidade. A abordagem de teste será uma combinação de testes manuais para cenários críticos de negócio e testes automatizados para casos de teste repetitivos.\n\nPara realizar os testes, precisaremos de dispositivos móveis (iOS e Android) e navegadores (Chrome, Firefox, Safari) em diferentes sistemas operacionais. Os critérios de aceitação incluem um tempo de resposta inferior a 2 segundos, uma taxa de sucesso de pagamento superior a 95% e a aprovação de todos os principais fluxos de compra.\n\nA estratégia de relatórios envolverá relatórios de bugs detalhados com capturas de tela, registros de erros e passos para reprodução. Além disso, relatórios de métricas de teste, como cobertura de testes, tempo de execução e resultados, serão fornecidos.\n\nNosso prazo para o lançamento do aplicativo é de 2 meses e temos restrições de orçamento para ferramentas de teste. Com base nessas informações, gostaríamos que você nos fornecesse uma estratégia de testes completa, considerando as melhores práticas de qualidade.'
);

const context = ref<string | undefined>(undefined);

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
      type: TestTypeEnum.TestingStrategy
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
