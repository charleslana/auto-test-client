<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><RouterLink to="/panel/dashboard">Painel</RouterLink></li>
      <li class="is-active">
        <a href="#" aria-current="page">{{ pageName }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
  pageName: {
    type: String,
    required: true
  }
});
</script>
