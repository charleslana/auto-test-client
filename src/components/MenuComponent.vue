<template>
  <aside class="menu is-hidden-mobile">
    <p class="menu-label">Geral</p>
    <ul class="menu-list">
      <li>
        <RouterLink
          to="/panel/dashboard"
          :class="{ 'is-active': activePage === MenuComponentEnum.Dashboard }"
          >{{ MenuComponentEnum.Dashboard }}</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/panel/user/details"
          :class="{ 'is-active': activePage === MenuComponentEnum.Profile }"
          >{{ MenuComponentEnum.Profile }}</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/panel/items"
          :class="{ 'is-active': activePage === MenuComponentEnum.Items }"
          >{{ MenuComponentEnum.Items }}</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/panel/historic"
          :class="{ 'is-active': activePage === MenuComponentEnum.Historic }"
          >{{ MenuComponentEnum.Historic }}</RouterLink
        >
      </li>
    </ul>
    <p class="menu-label">Ferramentas iniciais</p>
    <ul class="menu-list">
      <li>
        <RouterLink
          to="/panel/test-generator"
          :class="{ 'is-active': activePage === MenuComponentEnum.TestGenerator }"
          >{{ MenuComponentEnum.TestGenerator }}</RouterLink
        >
      </li>
      <!-- <li>
        <a>Menu</a>
        <ul>
          <li><a>Submenu</a></li>
          <li><a>Submenu</a></li>
          <li><a>Submenu</a></li>
          <li><a>Submenu</a></li>
        </ul>
      </li> -->
      <li>
        <RouterLink
          to="/panel/step-generator"
          :class="{ 'is-active': activePage === MenuComponentEnum.StepGenerator }"
          >{{ MenuComponentEnum.StepGenerator }}</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/panel/bug-report"
          :class="{ 'is-active': activePage === MenuComponentEnum.BugReport }"
          >{{ MenuComponentEnum.BugReport }}</RouterLink
        >
      </li>
    </ul>
    <p class="menu-label">Ferramentas avançadas</p>
    <ul class="menu-list">
      <li><a>Plano de Testes</a></li>
      <li><a>Indicadores de Qualidade</a></li>
      <li><a>Tradutor de Testes</a></li>
      <li><a>Casos de Testes de Usabilidade (UX)</a></li>
      <li><a>Gerador de Massa de Testes</a></li>
      <li><a>Linguagem Gherkin</a></li>
      <li><a>Testes de Segurança</a></li>
      <li><a>Testes de Performance</a></li>
      <li><a>Testes de API</a></li>
      <li><a>Construtor de Query SQL</a></li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
// import { RouterLink } from 'vue-router';
import MenuComponentEnum from '../enum/menuComponentEnum';
defineProps({
  activePage: {
    type: String as () => MenuComponentEnum,
    required: true
  }
});
</script>

<style scoped>
.menu-label {
  color: #8f99a3;
  letter-spacing: 1.3;
  font-weight: 700;
}

.menu-list a {
  color: #0f1d38;
  font-size: 14px;
  font-weight: 700;
}

.menu-list a:hover {
  background-color: transparent;
  color: #276cda;
}

.menu-list a.is-active {
  background-color: transparent;
  color: #276cda;
  font-weight: 700;
}
</style>
