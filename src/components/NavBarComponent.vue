<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="@/assets/images/logo.png" alt="logo image" />
        </div>
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
import { ref } from 'vue';
import { removeTokenFromLocalStorage } from '@/utils/localStorageUtils';

type RouteLocationRaw = import('vue-router').RouteLocationRaw;

const router = useRouter();

const logout = (): void => {
  removeTokenFromLocalStorage();
  const route: RouteLocationRaw = { name: 'login' };
  router.push(route);
};

const isMenuActive = ref(false);

const toggleMenu = (): void => {
  isMenuActive.value = !isMenuActive.value;
};
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
