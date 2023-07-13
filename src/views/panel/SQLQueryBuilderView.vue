<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.SQLQueryBuilder"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/test-plan', name: 'Ferramentas avançadas' }]"
          :pageName="MenuComponentEnum.SQLQueryBuilder"
        ></BreadCrumbComponent>
        <LoadingComponent :loading="loadingItem" />
        <div v-if="!loadingItem">
          <BlockedPageComponent :pageName="MenuComponentEnum.SQLQueryBuilder" v-if="!open" />
          <section class="hero" v-if="open">
            <div class="hero-body">
              <p class="title">{{ MenuComponentEnum.SQLQueryBuilder }}</p>
              <p class="subtitle">
                Este é o construtor de Queries SQL. A partir de uma descrição em linguagem natural
                do que você precisa buscar na sua base de dados, a IA irá gerar a consulta SQL
                necessária para você obter a massa de dados necessária para seu teste.
              </p>
              <form @submit.prevent="send">
                <div class="field">
                  <label class="label"><span class="has-text-danger">*</span> Consulta:</label>
                  <div class="control">
                    <textarea class="textarea is-medium" v-model="requirement" required></textarea>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tabelas:</label>
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
    open.value = (await UserItemService.validateItem(TestTypeEnum.SQLQueryBuilder)) as boolean;
    loadingItem.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const requirement = ref(
  'Suponha que temos duas tabelas: "clientes" e "pedidos". A tabela "clientes" armazena informações sobre os clientes, como ID, nome, idade e cidade, enquanto a tabela "pedidos" armazena informações sobre os pedidos feitos pelos clientes, como ID do pedido, data e valor. Quero buscar todos os clientes com mais de 60 anos que vivem em são paulo e fizeram pedido nos últimos 30 dias'
);

const context = ref<string | undefined>(
  'Tabela cliente\nID | nome | cidade | idade | endereço\n\nTabela pedidos\nID | data | valor\n\n'
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
      type: TestTypeEnum.SQLQueryBuilder
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
