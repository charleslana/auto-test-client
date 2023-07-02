<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home page</RouterLink>
      <RouterLink to="/about">About page</RouterLink>
    </nav>
  </header> -->

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped></style>
