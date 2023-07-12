<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.NavBar"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/dashboard', name: 'Geral' }]"
          pageName="Conquistas"
        ></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">Conquistas</p>
            <p class="subtitle">Veja todas as conquistas que falta para você ganhar!</p>
            <LoadingComponent :loading="loading" />
            <div v-if="!loading">
              <div v-if="showNoResults" class="no-results">Nenhuma conquista por enquanto.</div>
              <div class="list" v-if="!showNoResults">
                <div class="list-item" v-for="item in conquests" :key="item.id">
                  <div class="list-item-image">
                    <font-awesome-icon
                      :icon="['fas', 'medal']"
                      size="4x"
                      class="has-text-primary"
                    />
                  </div>
                  <div class="list-item-content">
                    <div class="list-item-title">{{ item.name }}</div>
                    <div class="list-item-description">{{ item.description }}</div>
                    <div class="level mb-0">
                      <div class="level-left has-text-weight-bold">
                        {{ formatNumber(getTestValue(item.type)) }}
                      </div>
                      <div class="level-right">{{ formatNumber(item.experience) }}</div>
                    </div>
                    <progress
                      class="progress"
                      :value="
                        calculateExperiencePercentage(getTestValue(item.type), item.experience)
                      "
                      max="100"
                      v-if="getTestValue(item.type) < item.experience"
                    ></progress>
                    <div class="has-text-success has-text-weight-bold" v-else>
                      <font-awesome-icon :icon="['fas', 'circle-check']" /> Você completou!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '@/components/NavBarComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
import MenuComponentEnum from '@/enum/MenuComponentEnum';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { onMounted, ref } from 'vue';
import type IConquest from '@/interface/IConquest';
import ConquestService from '@/service/ConquestService';
import UserService from '@/service/UserService';
import { formatNumber, handlerError, calculateExperiencePercentage } from '@/utils/utils';
import TestTypeEnum from '@/enum/TestTypeEnum';

const loading = ref(true);

onMounted(async () => {
  await getConquests();
  await getUserExperience();
});

const showNoResults = ref(false);

const conquests = ref<IConquest[]>([]);

async function getConquests(): Promise<void> {
  try {
    loading.value = true;
    const response = (await ConquestService.getAll()) as IConquest[];
    if (!response.length) {
      showNoResults.value = true;
    } else {
      conquests.value = response;
    }
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const enumRef = ref<TestType[]>([]);

type TestType = {
  key: TestTypeEnum;
  value: number;
};

async function getUserExperience(): Promise<void> {
  try {
    loading.value = true;
    const response = await UserService.getUserExperience();
    enumRef.value = Object.entries(response).map(([key, value]) => ({
      key: key as TestTypeEnum,
      value: value as number
    }));
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const getTestValue = (testType: TestTypeEnum): number => {
  const testItem = enumRef.value.find((enumItem) => enumItem.key === testType);
  return testItem ? testItem.value : 0;
};
</script>

<style scoped></style>
