<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.Items"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/dashboard', name: 'Geral' }]"
          :pageName="MenuComponentEnum.Items"
        ></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">{{ MenuComponentEnum.Items }}</p>
            <p class="subtitle">
              Estes são seus itens, eles servem para ter acesso a outras áreas.
            </p>
            <LoadingComponent :loading="loading" />
            <div v-if="!loading">
              <div v-if="userItems.length === 0" class="no-results">
                Nenhuma conquista por enquanto.
              </div>
              <div v-else class="card mb-5" v-for="item in userItems" :key="item.id">
                <div class="card-content">
                  <p class="title has-text-info">{{ item.item.name }}</p>
                  <p class="subtitle">
                    {{ item.item.description }}
                  </p>
                  <small class="has-text-danger" v-if="item.expirationDate !== null"
                    >O item tem expiração,
                    {{ getRemainingTime(new Date(item.expirationDate.toString())) }}
                  </small>
                  <small class="has-text-success" v-else
                    >Item permanente, você adquiriu ele em: {{ formatDate(item.createdAt) }}</small
                  >
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
import type IUserItem from '@/interface/IUserItem';
import UserItemService from '@/service/UserItemService';
import { formatDate, handlerError, getRemainingTime } from '@/utils/utils';

const loading = ref(true);

onMounted(async () => {
  await getUserItem();
});

const userItems = ref<IUserItem[]>([]);

async function getUserItem(): Promise<void> {
  try {
    loading.value = true;
    const response = (await UserItemService.getAll()) as IUserItem[];
    userItems.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}
</script>

<style scoped></style>
