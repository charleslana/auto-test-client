<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.Profile"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/dashboard', name: 'Geral' }]"
          :pageName="MenuComponentEnum.Profile"
        ></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">{{ MenuComponentEnum.Profile }}</p>
            <LoadingComponent :loading="loading" />
            <div v-if="!loading">
              <p class="subtitle has-text-weight-bold">{{ user?.name ?? 'Sem nome' }}</p>
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">ID</p>
                    <p class="title">#{{ user!.id }}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Nível</p>
                    <p class="title">{{ user!.level }}</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div :data-tooltip="formatNumber(user!.score)">
                    <p class="heading">Pontos</p>
                    <p class="title">
                      {{ formatCompactNumber(user!.score) }}
                      <font-awesome-icon :icon="['fas', 'circle-info']" class="has-text-info" />
                    </p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Data do cadastro</p>
                    <p class="title">{{ formatTextDate(user!.createdAt.toString()) }}</p>
                  </div>
                </div>
              </nav>
              <div class="is-divider" data-content="EXPERIÊNCIA"></div>
              <progress
                class="progress is-large is-radiusless is-success"
                :value="calculateExperiencePercentage(user!.experience, user!.maximumExperience)"
                max="100"
              ></progress>
              <div class="level">
                <div class="level-left is-size-4">{{ user!.experience }}</div>
                <div class="level-right is-size-4">{{ user!.maximumExperience }}</div>
              </div>
              <p class="title">Conquistas</p>
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
import LoadingComponent from '@/components/LoadingComponent.vue';
import { onMounted, ref } from 'vue';
import { formatTextDate, handlerError, formatNumber, formatCompactNumber } from '@/utils/utils';
import UserService from '@/service/userService';
import type IUser from '@/interface/IUser';

const loading = ref(true);

onMounted(async () => {
  await getUserDetails();
});

const user = ref<IUser>();

async function getUserDetails(): Promise<void> {
  try {
    const response = (await UserService.getDetails()) as IUser;
    user.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

function calculateExperiencePercentage(minExperience: number, maxExperience: number): number {
  const percentage = (minExperience / maxExperience) * 100;
  return Math.min(percentage, 100);
}
</script>

<style scoped></style>
