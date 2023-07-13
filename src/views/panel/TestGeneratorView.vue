<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.TestGenerator"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-generator', name: 'Ferramentas iniciais' }]"
          :pageName="MenuComponentEnum.TestGenerator"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.TestGenerator" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.TestGenerator }}</p>
              <p class="subtitle">
                Olá! Bem-vindo(a) à nossa ferramenta de geração de casos de teste para validação de
                software. Por favor, forneça-nos um trecho da documentação do software ou um
                requisito específico que deseja validar. Com base nessa entrada, nosso sistema
                gerará casos de teste funcionais para você
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"
                    ><span class="has-text-danger">*</span> Requisito ou trecho da
                    documentação:</label
                  >
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
                <div class="is-size-1">Resultado:</div>
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
import { handlerError, formatBreakLines, validateInput, scrollDown, getInput } from '@/utils/utils';
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.TestGenerator)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  'Ex.: o cartão de credito deve ser bloqueado 5 dias após o vencimento da fatura se o cliente não pagar'
);

const context = ref<string | undefined>('Ex.: Sistema de cartão de credito de um banco');

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
      type: TestTypeEnum.TestGenerator
    });
    result.value = response.message;
    scrollDown();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
