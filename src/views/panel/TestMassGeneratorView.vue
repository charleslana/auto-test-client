<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.TestMassGenerator"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.TestMassGenerator"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.TestMassGenerator" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.TestMassGenerator }}</p>
              <p class="subtitle">
                Precisando de Massas para seus testes? esta é a ferramenta certa. Escolha a
                quantidade e o tipo de massa, a massa de dados pode ser múltiplas.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label">Quantidade:</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="quantity">
                        <option value="10">10 massas</option>
                        <option value="30">30 massas</option>
                        <option value="50">50 massas</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tipo de Massa:</label>
                  <div class="control">
                    <div class="buttons">
                      <button
                        v-for="option in massTypes"
                        :key="option"
                        class="button"
                        :class="{ 'is-info': selectedMassTypes.includes(option) }"
                        @click.prevent="toggleMassType(option)"
                      >
                        {{ option }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Dados:</label>
                  <div class="control">
                    <label class="radio">
                      <input type="radio" v-model="validData" value="somente dados válidos" />
                      Válidos
                    </label>
                    <label class="radio">
                      <input type="radio" v-model="validData" value="somente dados inválidos" />
                      Inválidos
                    </label>
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
import { handlerError, formatBreakLines, scrollDown, validateInput, copyText } from '@/utils/utils';
import BlockedPageComponent from '@/components/BlockedPageComponent.vue';
import OpenAIService from '@/service/OpenAIService';
import LoadingComponent from '@/components/LoadingComponent.vue';

onMounted(async () => {
  await validateItem();
  selectedMassTypes.value.push('CPFs');
});

const loadingItem = ref(true);

const open = ref(false);

async function validateItem(): Promise<void> {
  try {
    open.value = (await UserItemService.validateItem(TestTypeEnum.TestMassGenerator)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const quantity = ref('10');

const massTypes = ref([
  'CPFs',
  'CNPJs',
  'Nomes',
  'E-mails',
  'URLs',
  'Celulares',
  'CEPs',
  'Números de cartão de crédito',
  'Senhas',
  'UFs',
  'Países',
  'Estados',
  'Cidades',
  'Bancos',
  'Produtos'
]);

const selectedMassTypes = ref<string[]>([]);

const validData = ref('somente dados válidos');

function toggleMassType(option: string) {
  const index = selectedMassTypes.value.indexOf(option);
  if (index > -1) {
    selectedMassTypes.value.splice(index, 1);
  } else {
    selectedMassTypes.value.push(option);
  }
}

const loading = ref(false);

const result = ref<string | null>(null);

async function send(): Promise<void> {
  try {
    const massTypesString = selectedMassTypes.value.join(', ');
    const massTypesFormatted = massTypesString.replace(/,\s*$/, '');
    validateInput(massTypesFormatted);
    loading.value = true;
    result.value = null;
    const response = await OpenAIService.send({
      input: massTypesFormatted,
      context: quantity.value,
      output: validData.value,
      type: TestTypeEnum.TestMassGenerator
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
