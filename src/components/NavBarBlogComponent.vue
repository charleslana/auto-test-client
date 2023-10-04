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
          <div class="navbar-item">
            <div class="control has-icons-left">
              <input
                class="input is-rounded"
                type="email"
                placeholder="Pesquisar em breve"
                disabled
              />
              <span class="icon is-left"></span>
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

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped></style>
