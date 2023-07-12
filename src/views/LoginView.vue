<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">Faça login para continuar.</p>
          <div class="box">
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    v-model="email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Sua senha"
                    required
                    v-model="password"
                  />
                </div>
              </div>
              <button
                class="button is-block is-info is-large is-fullwidth"
                :class="{ 'is-loading': loading }"
                :disabled="loading"
              >
                Login <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <RouterLink to="/">Página inicial</RouterLink> &nbsp;·&nbsp;
            <RouterLink to="/register">Cadastre-se</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import UserService from '@/service/UserService';
import { handlerError, redirectToDashboardPage } from '@/utils/utils';
import { saveTokenToLocalStorage } from '@/utils/localStorageUtils';

onMounted(() => {
  redirectToDashboardPage();
});

const email = ref('');
const password = ref('');
const loading = ref(false);

async function login(): Promise<void> {
  try {
    loading.value = true;
    const response = await UserService.login({
      email: email.value,
      password: password.value
    });
    const accessToken = response.accessToken;
    saveTokenToLocalStorage(accessToken);
    redirect();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

type RouteLocationRaw = import('vue-router').RouteLocationRaw;

const router = useRouter();

const redirect = (): void => {
  const route: RouteLocationRaw = { name: 'panel-dashboard' };
  router.push(route);
};
</script>

<style scoped></style>
