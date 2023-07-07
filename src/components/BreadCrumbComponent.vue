<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <RouterLink :to="link.to">{{ link.name }}</RouterLink>
      </li>
      <li class="is-active">
        <a href="#" aria-current="page">{{ pageName }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface BreadcrumbItem {
  to: string;
  name: string;
}

defineProps({
  links: {
    type: Array as () => BreadcrumbItem[],
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
});
</script>
