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
            <form @submit.prevent="register">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="email"
                    placeholder="E-mail"
                    required
                    v-model="email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="password"
                    placeholder="Senha"
                    required
                    v-model="password"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-medium"
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    v-model="passwordConfirmation"
                  />
                </div>
              </div>
              <button
                class="button is-block is-primary is-fullwidth is-medium"
                :class="{ 'is-loading': loading }"
                :disabled="loading"
              >
                Cadastrar
              </button>
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
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { UserService } from '@/service/userService';
import { handlerError } from '@/utils/utils';
import { saveTokenToLocalStorage } from '@/utils/localStorageUtils';

const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const loading = ref(false);

async function register(): Promise<void> {
  try {
    validateRegister();
    loading.value = true;
    await UserService.register({
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value
    });
    await login();
  } catch (error: any) {
    loading.value = false;
    handlerError(error);
  }
}

function validateRegister(): void {
  if (password.value.length < 6) {
    throw new Error('A senha deve conter no mínimo 6 caracteres.');
  }
  if (password.value != passwordConfirmation.value) {
    throw new Error('As senhas digitadas estão diferentes, verifique novamente.');
  }
}

async function login(): Promise<void> {
  try {
    const response = await UserService.login({
      email: email.value,
      password: password.value
    });
    const accessToken = response.accessToken;
    saveTokenToLocalStorage(accessToken);
    redirect();
  } catch (error: any) {
    loading.value = false;
    handlerError(error);
  }
}

type RouteLocationRaw = import('vue-router').RouteLocationRaw;

const router = useRouter();

const redirect = () => {
  const rota: RouteLocationRaw = { name: 'panel-dashboard' };
  router.push(rota);
};
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
