<template>
  <div>
    <a
      role="button"
      class="navbar-burger is-hidden-desktop is-hidden-tablet m-0"
      :class="{ 'is-active': !isMobileMenuOpen }"
      aria-label="menu"
      aria-expanded="false"
      data-target="mobileMenu"
      @click="toggleMobileMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    <aside class="menu" :class="{ 'is-hidden-mobile': isMobileMenuOpen }">
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
        <li>
          <RouterLink
            to="/panel/test-plan"
            :class="{ 'is-active': activePage === MenuComponentEnum.TestPlan }"
            >{{ MenuComponentEnum.TestPlan }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/quality-indicator"
            :class="{ 'is-active': activePage === MenuComponentEnum.QualityIndicator }"
            >{{ MenuComponentEnum.QualityIndicator }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/test-translator"
            :class="{ 'is-active': activePage === MenuComponentEnum.TestTranslator }"
            >{{ MenuComponentEnum.TestTranslator }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/usability-test-case"
            :class="{ 'is-active': activePage === MenuComponentEnum.UsabilityTestCase }"
            >{{ MenuComponentEnum.UsabilityTestCase }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/test-mass-generator"
            :class="{ 'is-active': activePage === MenuComponentEnum.TestMassGenerator }"
            >{{ MenuComponentEnum.TestMassGenerator }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/gherkin-language"
            :class="{ 'is-active': activePage === MenuComponentEnum.GherkinLanguage }"
            >{{ MenuComponentEnum.GherkinLanguage }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/security-test"
            :class="{ 'is-active': activePage === MenuComponentEnum.SecurityTest }"
            >{{ MenuComponentEnum.SecurityTest }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/performance-test"
            :class="{ 'is-active': activePage === MenuComponentEnum.PerformanceTest }"
            >{{ MenuComponentEnum.PerformanceTest }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/api-test"
            :class="{ 'is-active': activePage === MenuComponentEnum.APITest }"
            >{{ MenuComponentEnum.APITest }}</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/panel/sql-query-builder"
            :class="{ 'is-active': activePage === MenuComponentEnum.SQLQueryBuilder }"
            >{{ MenuComponentEnum.SQLQueryBuilder }}</RouterLink
          >
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import MenuComponentEnum from '@/enum/MenuComponentEnum';
import { ref } from 'vue';

const isMobileMenuOpen = ref(true);

defineProps({
  activePage: {
    type: String as () => MenuComponentEnum,
    required: true
  }
});

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
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
