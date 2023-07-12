<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.QualityIndicator"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.QualityIndicator"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.QualityIndicator" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.QualityIndicator }}</p>
              <p class="subtitle">
                Olá! Bem-vindo à nossa ferramenta de geração de indicadores de qualidade para
                avaliação de projetos de software. Com base na documentação fornecida ou em
                requisitos específicos, nossa ferramenta é capaz de calcular uma variedade de
                indicadores que podem ajudar a monitorar a qualidade do seu projeto.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <div class="control">
                    <p><span class="has-text-danger">*</span> Status do projeto</p>
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <p>Contexto</p>
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
import { handlerError, formatBreakLines, validateInput, scrollDown } from '@/utils/utils';
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.QualityIndicator)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  '[TOTAL DE CASOS DE TESTE]: 620\n[CASOS DE TESTE EXECUTADOS]: 231\n[CASOS DE TESTE COM FALHA]: 113\n[TOTAL DE DEFEITOS ENCONTRADOS]: 120\n[DEFEITOS CORRIGIDOS]: 65\n[DEFEITOS REABERTOS]: 30\n[DEFEITOS EM ABERTO]: 82\n[DEFEITOS REJEITADOS]: 3'
);

const context = ref(
  'A taxa de sucesso do meu projeto é medida pelos testes passed sobre os testes executados\nA densidade de defeitos de meu projeto é calculada pelo numero de defeitos encontrados dividido pela quantidade de testes executados\n\n'
);

const loading = ref(false);

const result = ref<string | null>(null);

async function send(): Promise<void> {
  try {
    validateInput(requirement.value);
    loading.value = true;
    result.value = null;
    const response = await OpenAIService.send({
      input: requirement.value,
      context: context.value,
      type: TestTypeEnum.QualityIndicator
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
