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
          pageName="Loja"
        ></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">Loja</p>
            <p class="subtitle">
              Adquira novos itens para desbloquear novas ferramentas de testes!
            </p>
            <LoadingComponent :loading="loading" />
            <div v-if="!loading">
              <div class="is-size-5 mb-5">
                Você possui
                <span class="has-text-weight-bold">{{ formatNumber(score) }}</span> pontos
                <span
                  class="has-tooltip-multiline"
                  data-tooltip="Para adquirir pontos, você deve usar as outras ferramentas liberadas, elas te ajudarão no seu progresso."
                  ><font-awesome-icon :icon="['fas', 'circle-info']" class="has-text-info"
                /></span>
              </div>
              <div v-if="shop.length === 0" class="no-results">Nenhuma conquista por enquanto.</div>
              <div v-else class="card mb-5" v-for="item in shop" :key="item.id">
                <div class="card-content">
                  <p class="title has-text-info">{{ item.item.name }}</p>
                  <p class="subtitle">
                    {{ item.item.description }}
                  </p>
                  <small class="has-text-danger" v-if="item.item.expiryDay > 0"
                    >Ao comprar o item ele expira em {{ item.item.expiryDay }} dias</small
                  >
                  <small class="has-text-success" v-else>Item permanente</small>
                </div>
                <footer class="card-footer">
                  <div
                    v-if="isItemPurchased(item.itemId)"
                    class="button card-footer-item has-text-success"
                    disabled
                  >
                    Item já comprado
                  </div>
                  <div
                    v-else-if="score < item.score"
                    class="button card-footer-item disabled"
                    disabled
                  >
                    Insuficiente, preço: {{ formatNumber(item.score) }} pontos
                  </div>
                  <button
                    v-else
                    class="button card-footer-item has-text-info"
                    @click="shopModal(item.id)"
                  >
                    Comprar com {{ formatNumber(item.score) }} Pontos
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'is-active': modal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        Tem certeza que deseja comprar este item agora? O dono da loja não aceita devoluções heim!
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          :class="{ 'is-loading': loadingButton }"
          :disabled="loadingButton"
          @click="buy"
        >
          Comprar
        </button>
        <button
          class="button"
          @click="hideShopModal"
          :class="{ 'is-loading': loadingButton }"
          :disabled="loadingButton"
        >
          Cancelar
        </button>
      </footer>
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
import ShopService from '@/service/ShopService';
import {
  handlerError,
  formatNumber,
  showToast,
  addOverflowHidden,
  removeOverflowHidden
} from '@/utils/utils';
import type IShop from '@/interface/IShop';
import UserService from '@/service/UserService';
import type IUser from '@/interface/IUser';
import ToastEnum from '@/enum/ToastEnum';
import type IUserItem from '@/interface/IUserItem';
import UserItemService from '@/service/UserItemService';

const loading = ref(true);

onMounted(async () => {
  await init();
});

async function init(): Promise<void> {
  await getShop();
  await getUserDetails();
  await getUserItem();
}

const shop = ref<IShop[]>([]);

async function getShop(): Promise<void> {
  try {
    loading.value = true;
    const response = (await ShopService.getAll()) as IShop[];
    shop.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const score = ref<number>(0);

async function getUserDetails(): Promise<void> {
  try {
    loading.value = true;
    const response = (await UserService.getDetails()) as IUser;
    score.value = response.score;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

const modal = ref(false);

const id = ref<number>(0);

const loadingButton = ref<boolean>(false);

async function shopModal(i: string): Promise<void> {
  addOverflowHidden();
  id.value = +i;
  modal.value = true;
}

function hideShopModal() {
  removeOverflowHidden();
  modal.value = false;
}

async function buy(): Promise<void> {
  try {
    loadingButton.value = true;
    const response = await ShopService.buy(id.value);
    showToast(response.message, ToastEnum.Success);
    hideShopModal();
    await init();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loadingButton.value = false;
  }
}

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

function isItemPurchased(itemId: string): boolean {
  return userItems.value.some((userItem) => userItem.itemId === itemId);
}
</script>

<style scoped></style>
