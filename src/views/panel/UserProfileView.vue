<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.NavBar"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/rank', name: 'Classificação' }]"
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
              <div class="mb-5">
                Última vez conectado:
                {{ calculateElapsedTime(new Date(user!.updatedAt.toString())) }}
              </div>
              <p class="title">Conquistas</p>
              <div v-if="userConquest.length === 0">Nenhuma conquista por enquanto.</div>
              <div class="list" v-else>
                <div class="list-item" v-for="item in userConquest" :key="item.id">
                  <div class="list-item-image">
                    <font-awesome-icon
                      :icon="['fas', 'medal']"
                      size="4x"
                      class="has-text-primary"
                    />
                  </div>
                  <div class="list-item-content">
                    <div class="list-item-title">{{ item.conquest.name }}</div>
                    <div class="list-item-description">{{ item.conquest.description }}</div>
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
import {
  formatTextDate,
  handlerError,
  formatNumber,
  formatCompactNumber,
  calculateElapsedTime
} from '@/utils/utils';
import UserService from '@/service/UserService';
import type IUser from '@/interface/IUser';
import UserConquestService from '@/service/UserConquestService';
import type IUserConquest from '@/interface/IUserConquest';
import router from '@/router';

const id = router.currentRoute.value.params.id as string;

const loading = ref(true);

onMounted(async () => {
  await getUserProfile();
  await getUserByIdConquest();
});

const user = ref<IUser>();

async function getUserProfile(): Promise<void> {
  try {
    const response = (await UserService.getProfile(id)) as IUser;
    user.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
    router.push({ name: 'panel-rank' });
  }
}

const userConquest = ref<IUserConquest[]>([]);

async function getUserByIdConquest(): Promise<void> {
  try {
    loading.value = true;
    const response = (await UserConquestService.getAllById(id)) as IUserConquest[];
    userConquest.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}
</script>

<style scoped></style>
