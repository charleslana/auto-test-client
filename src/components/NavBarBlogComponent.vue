<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="@/assets/images/logo-blog.png" alt="logo image" />
        </div>
        <span
          class="navbar-burger"
          :class="{ 'is-active': isMenuOpen }"
          data-target="navbarMenu"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <div class="navbar-end">
          <div v-if="!isDetails" class="navbar-item">
            <div class="control has-icons-left">
              <input
                class="input is-rounded"
                type="text"
                v-model="searchTerm"
                @keydown.enter="setSearchTerm"
                placeholder="Pesquisar por título"
              />
              <span class="icon is-left">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </span>
            </div>
          </div>
          <RouterLink to="/blog" class="navbar-item is-size-5 has-text-weight-semibold"
            >Blog</RouterLink
          >
          <RouterLink to="/" class="navbar-item is-size-5 has-text-weight-semibold"
            >Home</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '@/store/searchStore';

const isMenuOpen = ref(false);
const searchTerm = ref('');
const searchStore = useSearchStore();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const setSearchTerm = () => {
  searchStore.setSearchTerm(searchTerm.value);
};

defineProps({
  isDetails: {
    type: Boolean
  }
});
</script>

<style scoped>
nav.navbar {
  height: 6rem !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
}
</style>
