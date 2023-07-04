<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.TestGenerator"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent pageName="Gerador de Testes"></BreadCrumbComponent>
        <BlockedPageComponent pageName="Gerador de Testes" v-if="open" />
        <div v-if="!open"><h1>Gerador de Testes</h1></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '../../components/NavBarComponent.vue';
import MenuComponent from '../../components/MenuComponent.vue';
import BreadCrumbComponent from '../../components/BreadCrumbComponent.vue';
import MenuComponentEnum from '../../enum/menuComponentEnum';
import { onMounted, ref } from 'vue';
import { UserItemService } from '@/service/userItemService';
import TestTypeEnum from '@/enum/testTypeEnum';
import { handlerError } from '@/utils/utils';
import BlockedPageComponent from '../../components/BlockedPageComponent.vue';

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
</script>

<style scoped></style>
