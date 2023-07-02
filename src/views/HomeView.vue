<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <div class="is-size-3 is-uppercase has-text-weight-bold">Auto Test</div>
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item is-uppercase" href="#why">Por que usar?</a>
        <a class="navbar-item is-uppercase" href="#free">É grátis</a>
        <RouterLink to="/login" class="navbar-item is-uppercase">Login</RouterLink>
        <RouterLink to="/register" class="navbar-item is-uppercase">Criar conta</RouterLink>
      </div>
    </div>
  </nav>
  <section class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered reverse-columns">
          <div
            class="column is-10-mobile is-10-tablet is-5-desktop is-5-widescreen is-5-fullhd"
            data-aos="fade-down"
          >
            <h1 class="title titled is-1 mb-6">Ferramenta especial para testers!</h1>
            <div class="buttons">
              <button class="button">Cadastre-se</button>
              <button class="button">Ou acesse suas ferramentas agora</button>
            </div>
          </div>
          <div
            data-aos="fade-right"
            class="column is-10-mobile is-10-tablet is-4-desktop is-7-widescreen is-4-fullhd is-offset-1-fullhd"
          >
            <figure class="image is-square">
              <img src="@/assets/images/bg1.svg" alt="bg1 svg image" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="hero is-white is-fullheight" id="why">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div
            data-aos="fade-left"
            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
          >
            <figure class="image is-square">
              <img src="@/assets/images/bg2.svg" alt="bg2 svg image" />
            </figure>
          </div>
          <div
            data-aos="fade-down"
            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
          >
            <h1 class="titled title is-1 mb-6">uma inteligência artificial</h1>
            <h2 class="subtitled subtitle">
              Permita que a ferramenta gere vários testes, cenários com base de um contexto enviado
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="hero is-white is-fullheight" id="free">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered reverse-columns">
          <div
            data-aos="fade-right"
            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
          >
            <h1 class="title titled is-1 mb-6">conquiste com suas experiências</h1>
            <h2 class="subtitle subtitled">
              Desbloqueie novas ferramentas com suas experiências e pontos usando o Auto Test
            </h2>
          </div>
          <div
            data-aos="fade-down fade-up"
            class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
          >
            <figure class="image is-square">
              <img src="@/assets/images/bg3.svg" alt="bg3 svg image" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="hero is-medium has-text-centered">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div data-aos="zoom-in-up" class="column is-8">
            <h1 class="title titled is-1 mb-6">Tente <span>e ganhe</span></h1>
            <h2 class="subtitle subtitled">
              A ideia se trata de usar e ser recompensado, ao usar a plataforma você poderá ganhar
              pontos, conquistas, níveis e disputar classificações com outros testers, além de
              ganhar muitas experiências!
            </h2>
            <h2 class="subtitle subtitled">@CharlesLana</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.titled {
  font-family: 'Merriweather', serif !important;
  font-size: 58px !important;
  font-weight: 400 !important;
  line-height: 64px !important;
}
</style>
