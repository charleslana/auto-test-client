<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.GherkinLanguage"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.GherkinLanguage"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.GherkinLanguage" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.GherkinLanguage }}</p>
              <p class="subtitle">
                Apresentamos o Gerador de Testes em Linguagem Gherkin, uma ferramenta poderosa e
                intuitiva projetada para simplificar a criação de casos de teste. Com nossa
                ferramenta, você pode facilmente gerar casos de teste em Gherkin, uma linguagem
                simples e legível, ideal para especificações de comportamento. Automatize seus
                testes com facilidade, economizando tempo valioso no desenvolvimento de software.
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
                    <textarea
                      class="textarea is-medium"
                      v-model="context"
                      placeholder="Entre com informações sobre o ambiente, atores envolvidos e etapas principais ou variáveis para criar cenários mais detalhados"
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.GherkinLanguage)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  'O sistema deve permitir que os usuários se cadastrem fornecendo seu nome, e-mail e senha. e mostrar uma mensagem de erro caso algum campo não seja preenchido'
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
      type: TestTypeEnum.GherkinLanguage
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
