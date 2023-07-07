<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.Historic"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[
            { to: '/panel/dashboard', name: 'Geral' },
            { to: '/panel/historic', name: 'Histórico' }
          ]"
          pageName="Detalhes do histórico"
        ></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">{{ MenuComponentEnum.Historic }}</p>
            <LoadingComponent :loading="loading" />
            <div v-if="!loading">
              <p class="subtitle has-text-weight-bold">
                Ferramenta:
                <span class="has-text-weight-normal">{{
                  getMenuComponentTitle(historic!.type)
                }}</span>
              </p>
              <p class="subtitle has-text-weight-bold">Entrada de dados:</p>
              <p class="subtitle" v-html="formatBreakLines(historic!.input)"></p>
              <p class="subtitle has-text-weight-bold">Saída de dados:</p>
              <p class="subtitle" v-html="formatBreakLines(historic!.output)"></p>
              <time class="subtitle has-text-weight-bold"
                >Data:
                <span class="has-text-weight-normal">{{
                  formatDate(historic!.createdAt)
                }}</span></time
              >
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '../../components/NavBarComponent.vue';
import MenuComponent from '../../components/MenuComponent.vue';
import BreadCrumbComponent from '../../components/BreadCrumbComponent.vue';
import MenuComponentEnum from '../../enum/menuComponentEnum';
import { useRouter } from 'vue-router';
import UserHistoricService from '@/service/userHistoricService';
import { handlerError, formatBreakLines, getMenuComponentTitle, formatDate } from '@/utils/utils';
import { onMounted, ref } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type IUserHistoric from '@/interface/IUserHistoric';

const router = useRouter();

const id = router.currentRoute.value.params.id as string;

const loading = ref(true);

const historic = ref<IUserHistoric>();

onMounted(async () => {
  await get();
});

async function get(): Promise<void> {
  try {
    loading.value = true;
    const response = (await UserHistoricService.get(+id)) as IUserHistoric;
    historic.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
    router.push({ name: 'panel-historic' });
  }
}
</script>

<style scoped></style>
