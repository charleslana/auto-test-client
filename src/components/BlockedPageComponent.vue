<template>
  <div class="notification is-danger">
    <strong>O acesso a página {{ pageName }} está bloqueado.</strong>
    <p>
      Você pode desbloquear este acesso adquirindo o item na loja comprando com pontos!
      <RouterLink to="/panel/shop">Clique aqui para ir na loja!</RouterLink>
    </p>
  </div>
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
