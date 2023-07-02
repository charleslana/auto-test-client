<template>
  <div class="is-flex is-justify-content-center is-align-items-center" style="height: 100vh">
    <div class="columns is-vcentered">
      <div class="is-half mr-5 mb-5">
        <img src="@/assets/images/404.svg" alt="404 svg image" />
      </div>
      <div class="has-text-centered is-half ml-4 mr-4 mt-5">
        <h1 class="is-size-1 has-text-weight-bold">404</h1>
        <p class="is-size-5 has-text-weight-medium">Ops! Página não encontrada.</p>
        <p class="is-size-6 mb-2">
          A página solicitada não existe, certifique-se que voce digitou a url corretamente
        </p>
        <RouterLink to="/" class="button">Ir para página inicial</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
