<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.StepGenerator"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-generator', name: 'Ferramentas iniciais' }]"
          :pageName="MenuComponentEnum.StepGenerator"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.StepGenerator" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.StepGenerator }}</p>
              <p class="subtitle">
                Gere todo passo a passo de seu caso de teste, forneça o nome, descrição de seu caso
                de teste.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"><span class="has-text-danger">*</span> Caso de Teste:</label>
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.StepGenerator)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref('Ex.: Login com sucesso com redirecionamento para contratação de planos');

const context = ref<string | undefined>('Ex.: Sistema de academia');

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
      type: TestTypeEnum.StepGenerator
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
