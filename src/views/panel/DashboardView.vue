<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.Dashboard"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent pageName="Dashboard"></BreadCrumbComponent>
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">Olá, Charles, {{ greeting }}.</h1>
              <h2 class="subtitle">Espero que você esteja tendo um ótimo dia!</h2>
              <span>Aqui está suas execuções de testes realizadas totais</span>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{ numberFormat(439215) }}</p>
                <p class="subtitle">Gerador de Testes</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">59k</p>
                <p class="subtitle">Gerador de Passo a Passo</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">3.4k</p>
                <p class="subtitle">Bug Report</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">19</p>
                <p class="subtitle">Plano de Testes</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Indicadores de Qualidade</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Tradutor de Testes</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Casos de Testes de Usabilidade (UX)</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Gerador de Massa de Testes</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Linguagem Gherkin</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Testes de Segurança</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Testes de Performance</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Testes de API</p>
              </article>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">0</p>
                <p class="subtitle">Construtor de Query SQL</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '../../components/NavBarComponent.vue';
import MenuComponent from '../../components/MenuComponent.vue';
import BreadCrumbComponent from '../../components/BreadCrumbComponent.vue';
import MenuComponentEnum from '../../enum/menuComponentEnum';
import { ref, onMounted } from 'vue';
import { numberFormat } from '../../utils/utils';

const greeting = ref('');

function getGreeting(): string {
  const date = new Date();
  const hour = date.getHours();
  const greetingMessage =
    hour >= 6 && hour < 12 ? 'Bom dia' : hour >= 12 && hour < 18 ? 'Boa tarde' : 'Boa noite';
  return greetingMessage;
}

onMounted(() => {
  greeting.value = getGreeting();
});
</script>

<style scoped>
.columns {
  width: 100%;
  height: 100%;
  margin-left: 0;
}

.info-tiles {
  margin: 1rem 0;
}

.info-tiles .subtitle {
  font-weight: 300;
  color: #8f99a3;
}

.hero.welcome.is-info {
  background: #36d1dc;
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
  background: linear-gradient(to right, #5b86e5, #36d1dc);
}

.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
</style>
