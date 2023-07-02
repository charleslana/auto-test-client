<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2 register">
        <div class="columns">
          <div class="column left">
            <h1 class="title is-1">Auto Test</h1>
            <h2 class="subtitle is-4">Ferramentas para testers!</h2>
            <p>
              Cadastre-se agora gratuitamente, utilize ferramentas de I.A para automatizar a vida
              cotidiana do tester, descubra e trilhe sua jornada e com suas experiências faça o seu
              mundo melhor!
            </p>
          </div>
          <div class="column right has-text-centered">
            <h1 class="title is-4">Cadastre-se agora</h1>
            <p class="description">Ao infinito e além</p>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="email" placeholder="E-mail" required />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="password" placeholder="Senha" required />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="password"
                    placeholder="Confirme a senha"
                    required
                  />
                </div>
              </div>
              <button class="button is-block is-primary is-fullwidth is-medium">Cadastrar</button>
              <br />
              <small
                ><em
                  >Ao cadastrar, somente você terá acesso a sua conta, não compartilhe ela.</em
                ></small
              >
              <p class="has-text-grey mt-1">
                <RouterLink to="/">Página inicial</RouterLink> &nbsp;·&nbsp;
                <RouterLink to="/login">Login</RouterLink>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div class="column is-8 is-offset-2">
        <br />
        <nav class="level">
          <small class="level-item">@CharlesLana</small>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.field:not(:last-child) {
  margin-bottom: 1rem;
}

.register {
  margin-top: 1rem;
  background: white;
  border-radius: 10px;
}

.left,
.right {
  padding: 4.5rem;
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left p {
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  font-size: 1.15rem;
}

input {
  font-size: 1rem;
}
</style>
