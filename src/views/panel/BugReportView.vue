<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.BugReport"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-generator', name: 'Ferramentas iniciais' }]"
          :pageName="MenuComponentEnum.BugReport"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.BugReport" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.BugReport }}</p>
              <p class="subtitle">
                Você está prestes a usar a ferramenta Relatório de defeitos para reportar um defeito
                encontrado no software. Por favor, preencha as informações solicitadas com precisão.
                Esses detalhes são importantes para ajudar os desenvolvedores a entenderem e
                corrigirem o defeito de forma eficiente.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"><span class="has-text-danger">*</span> Defeito:</label>
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Contexto:</label>
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.BugReport)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  '1. Identificação do Defeito:\n   - Título/Resumo do Defeito: Botão "Enviar" não está funcional\n   - ID do Defeito (se aplicável): 0002\n   - Data de Identificação: 01/05/2023\n   - Prioridade: Alta\n   - Severidade: Média\n\n2. Descrição do Defeito:\nAo clicar no botão "Enviar" no formulário de contato, nada acontece. O botão não está funcional e não realiza nenhuma ação. Não há mensagens de erro exibidas.\n\n\n\n3. Passos para Reproduzir o Defeito:\n   \n1. Acesse a página de contato do site.\n2. Preencha todos os campos obrigatórios do formulário.\n3. Clique no botão "Enviar".\n\n4. Comportamento Esperado:\nApós clicar no botão "Enviar", o formulário deveria ser submetido e uma mensagem de confirmação deveria ser exibida ao usuário.\n\n\n\n5. Contexto e Ambiente:\n   - Ambiente de Teste: \nWindows 10, Google Chrome versão 90.0.4430.212\n\n \n6. Dados de Entrada:\n   - Valores Inseridos nos Campos: \nNome: João Silva, E-mail: joao@example.com, Mensagem: "Teste de contato."\n  \n7. Observações Adicionais:\nO botão "Enviar" é fundamental para que os usuários possam entrar em contato conosco. É importante corrigir esse defeito o mais rápido possível \n\n'
);

const context = ref<string | undefined>(
  'Ex.: Sistema de Academia X\nRelease de julho\nTestes UAT\n\n'
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
      type: TestTypeEnum.BugReport
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
