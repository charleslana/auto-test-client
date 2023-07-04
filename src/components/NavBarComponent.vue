<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item brand-text">Auto Test</div>
        <div class="navbar-burger" @click="toggleMenu" :class="{ 'is-active': isMenuActive }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
        <div class="navbar-start">
          <RouterLink to="/panel/dashboard" class="navbar-item">Dashboard</RouterLink>
          <RouterLink to="/panel/settings" class="navbar-item">Configurações</RouterLink>
          <RouterLink to="/panel/conquest" class="navbar-item">Conquistas</RouterLink>
          <RouterLink to="/panel/shop" class="navbar-item">Loja</RouterLink>
          <RouterLink to="/panel/rank" class="navbar-item">Classificação</RouterLink>
          <a class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { removeTokenFromLocalStorage } from '@/utils/localStorageUtils';
import { UserService } from '@/service/userService';
import { handlerError } from '@/utils/utils';

type RouteLocationRaw = import('vue-router').RouteLocationRaw;

const router = useRouter();

const logout = () => {
  removeTokenFromLocalStorage();
  const rota: RouteLocationRaw = { name: 'home' };
  router.push(rota);
};

const isMenuActive = ref(false);

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

onMounted(() => {
  getUserDetails();
});

async function getUserDetails() {
  try {
    const response = await UserService.getDetails();
  } catch (error: any) {
    handlerError(error);
  }
}
</script>

<style scoped>
nav.navbar {
  border-top: 4px solid #276cda;
  margin-bottom: 1rem;
}

.navbar-item.brand-text {
  font-weight: 300;
}

.navbar-item {
  font-size: 14px;
  font-weight: 700;
}
</style>
