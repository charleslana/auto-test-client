<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.TestTranslator"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.TestTranslator"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.TestTranslator" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.TestTranslator }}</p>
              <p class="subtitle">
                Esta é a nossa ferramenta de tradução. Escolha o idioma, Insira seu caso de teste ou
                cenário
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"><span class="has-text-danger">*</span> Idioma:</label>
                  <div class="control">
                    <div class="dropdown" :class="{ 'is-active': isDropdownActive }">
                      <div class="dropdown-trigger">
                        <input
                          id="language-input"
                          class="input"
                          type="text"
                          placeholder="Digite o idioma"
                          v-model="inputValue"
                          @input="updateDropdown"
                          @focus="isDropdownActive = true"
                          @blur="closeDropdown"
                        />
                      </div>
                      <div class="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                          <a
                            class="dropdown-item"
                            v-for="language in filteredLanguages"
                            :key="language"
                            @mousedown="selectLanguage(language)"
                            >{{ language }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label"
                    ><span class="has-text-danger">*</span> Caso de Teste ou Cenário:</label
                  >
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
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
import { computed, onMounted, ref } from 'vue';
import UserItemService from '@/service/UserItemService';
import TestTypeEnum from '@/enum/TestTypeEnum';
import { handlerError, formatBreakLines, validateInput, scrollDown } from '@/utils/utils';
import BlockedPageComponent from '@/components/BlockedPageComponent.vue';
import OpenAIService from '@/service/OpenAIService';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { supportedLanguages } from '@/data/dataTranslator';

onMounted(async () => {
  await validateItem();
});

const loadingItem = ref(true);

const open = ref(false);

async function validateItem(): Promise<void> {
  try {
    open.value = (await UserItemService.validateItem(TestTypeEnum.TestTranslator)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  'O cartão deve ser bloqueado 5 dias após o vencimento da fatura\n\nCaso de Teste 1:\nPasso a Passo:\n1. Configure a data de vencimento da fatura para amanhã.\n2. Aguarde 5 dias.\n3. Verifique se o cartão foi bloqueado.\n\nResultado Esperado: O cartão deve ser bloqueado.\n\nCaso de Teste 2:\nPasso a Passo:\n1. Configure a data de vencimento da fatura para hoje.\n2. Verifique se o cartão foi bloqueado.\n\nResultado Esperado: O cartão não deve ser bloqueado.\n\nCaso de Teste 3:\nPasso a Passo:\n1. Configure a data de vencimento da fatura para 6 dias a partir de hoje.\n2. Verifique se o cartão foi bloqueado.\n\nResultado Esperado: O cartão não deve ser bloqueado.'
);

const loading = ref(false);

const result = ref<string | null>(null);

async function send(): Promise<void> {
  try {
    validateSupportedLanguage();
    validateInput(requirement.value);
    loading.value = true;
    result.value = null;
    const response = await OpenAIService.send({
      input: requirement.value,
      context: inputValue.value,
      type: TestTypeEnum.TestTranslator
    });
    result.value = response.message;
    scrollDown();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

const inputValue = ref(supportedLanguages[51]);

const isDropdownActive = ref(false);

const filteredLanguages = computed(() => {
  const lowercaseInput = inputValue.value.toLowerCase();
  return supportedLanguages.filter((language) => language.toLowerCase().includes(lowercaseInput));
});

function selectLanguage(language: string) {
  inputValue.value = language;
  isDropdownActive.value = false;
}

function updateDropdown(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
}

function closeDropdown() {
  setTimeout(() => {
    isDropdownActive.value = false;
  }, 200);
}

function validateSupportedLanguage() {
  if (!inputValue.value || !filteredLanguages.value.includes(inputValue.value)) {
    throw new Error('Por favor, preencha corretamente o campo de idioma.');
  }
}
</script>

<style scoped></style>
