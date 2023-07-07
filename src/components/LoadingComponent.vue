<template>
  <progress class="progress is-small is-info is-radiusless" max="100" v-if="loading"></progress>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped></style>
