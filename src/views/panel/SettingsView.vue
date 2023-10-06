<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.NavBar"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent
          :links="[{ to: '/panel/dashboard', name: 'Geral' }]"
          :pageName="MenuComponentEnum.Dashboard"
        >
        </BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">Configurações</p>
            <p class="subtitle">Altere as configurações da sua conta</p>
            <div class="tabs is-toggle is-fullwidth">
              <ul>
                <li :class="{ 'is-active': activeTab === 'name' }">
                  <a @click="activeTab = 'name'">Configurações da Conta</a>
                </li>
                <li :class="{ 'is-active': activeTab === 'password' }">
                  <a @click="activeTab = 'password'">Configurações de Senha</a>
                </li>
                <li :class="{ 'is-active': activeTab === 'comment' }">
                  <a @click="activeTab = 'comment'">Comentários no blog</a>
                </li>
              </ul>
            </div>
            <div v-if="activeTab === 'name'" class="tab-content">
              <div class="level">
                <div class="level-left">
                  <h2>Configurações da Conta</h2>
                </div>
                <div class="level-right">
                  <h2 v-if="!loading">Você possui {{ formatNumber(score) }} pontos</h2>
                  <h2 class="skeletor-score" v-else>
                    <Skeletor />
                  </h2>
                </div>
              </div>
              <form @submit.prevent="submitNameForm">
                <div class="field">
                  <label class="label">Seu e-mail</label>
                  <small>O e-mail não pode ser alterado</small>
                  <div class="control" v-if="!loading">
                    <input type="text" class="input" disabled :value="email" />
                  </div>
                  <div class="control" v-else>
                    <Skeletor />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Alterar seu nome</label>
                  <div class="control" v-if="!loading">
                    <input type="text" class="input" v-model.trim="name" />
                  </div>
                  <div class="control" v-else>
                    <Skeletor />
                  </div>
                </div>
                <div class="field">
                  <div class="control" v-if="!loading">
                    <button class="button is-primary" v-if="score >= price">
                      Alterar por {{ formatNumber(price) }} pontos
                    </button>
                    <button class="button disabled" disabled v-else>
                      Pontos insuficiente, requer {{ formatNumber(price) }} pontos
                    </button>
                  </div>
                  <div class="control" v-else>
                    <Skeletor />
                  </div>
                </div>
              </form>
            </div>
            <div v-if="activeTab === 'password'" class="tab-content">
              <h2 class="mb-5">Configurações de Senha</h2>
              <form @submit.prevent="submitPasswordForm">
                <div class="field">
                  <label class="label">Senha atual</label>
                  <div class="control">
                    <input type="password" class="input" v-model="currentPassword" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Nova senha</label>
                  <div class="control">
                    <input type="password" class="input" v-model="newPassword" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Repita a nova senha</label>
                  <div class="control">
                    <input type="password" class="input" v-model="confirmPassword" />
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button
                      class="button is-primary"
                      :class="{ 'is-loading': loading }"
                      :disabled="loading"
                    >
                      Alterar senha
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div v-if="activeTab === 'comment'" class="tab-content">
              <h2 class="mb-5">Listagem de comentários comentado por você</h2>
              <div v-if="!loading">
                <div v-if="results.length === 0" class="has-text-grey">
                  Nenhum comentário postado,
                  <RouterLink to="/blog">visite o blog acessando aqui</RouterLink>
                </div>
                <div v-else>
                  <div class="card mb-5" v-for="comment in results" :key="comment.id">
                    <header class="card-header">
                      <p class="card-header-title">Comentário #{{ comment.id }}</p>
                      <button class="card-header-icon" aria-label="more options">
                        <a :href="'/blog/' + comment.postId" target="_blank">Link da postagem</a>
                      </button>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        <div class="field">
                          <p class="control">
                            <textarea
                              class="textarea"
                              placeholder="Enviar comentário"
                              v-model="comment.message"
                            ></textarea>
                          </p>
                        </div>
                        <br />
                        <time>{{ formatTextDate(comment.createdAt.toString()) }}</time>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a
                        @click="updateComment(comment.id, comment.message)"
                        class="card-footer-item"
                        :class="{ 'no-pointer': loadingCommentButton }"
                        >Editar</a
                      >
                      <a
                        @click="deleteComment(comment.id)"
                        class="card-footer-item has-text-danger"
                        :class="{ 'no-pointer': loadingCommentButton }"
                        >Excluir</a
                      >
                    </footer>
                  </div>
                </div>
              </div>
              <div class="control" v-else>
                <Skeletor />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComponent from '@/components/NavBarComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
import MenuComponentEnum from '@/enum/MenuComponentEnum';
import { onMounted, ref } from 'vue';
import UserService from '@/service/UserService';
import type IUser from '@/interface/IUser';
import { formatNumber, handlerError, showToast, formatTextDate } from '@/utils/utils';
import { Skeletor } from 'vue-skeletor';
import ToastEnum from '@/enum/ToastEnum';
import type IComment from '@/interface/IComment';
import BlogService from '@/service/BlogService';

onMounted(async () => {
  await getUserDetails();
  await getBuyName();
  await getAllComments();
});

const activeTab = ref('name');
const email = ref('');
const name = ref<string | null>(null);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(true);
const score = ref(0);
const price = ref(0);

async function getUserDetails(): Promise<void> {
  try {
    const response = (await UserService.getDetails()) as IUser;
    score.value = response.score;
    email.value = response.email;
    if (response.name === null) {
      name.value = 'Sem nome';
    } else {
      name.value = response.name;
    }
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

async function getBuyName(): Promise<void> {
  try {
    loading.value = true;
    const response = (await UserService.getBuyName()) as number;
    price.value = response;
    loading.value = false;
  } catch (error: any) {
    handlerError(error);
  }
}

async function buyName(): Promise<void> {
  try {
    loading.value = true;
    const response = await UserService.buyName(name.value!);
    showToast(response.message, ToastEnum.Success);
    await getUserDetails();
  } catch (error: any) {
    handlerError(error);
    loading.value = false;
  }
}

async function changePassword(): Promise<void> {
  try {
    loading.value = true;
    const response = await UserService.changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      passwordConfirmation: confirmPassword.value
    });
    showToast(response.message, ToastEnum.Success);
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

const submitNameForm = async () => {
  if (name.value!.trim() === '') {
    showToast('Nome não pode ser vazio', ToastEnum.Danger);
    return;
  }
  await buyName();
};

const submitPasswordForm = async () => {
  if (currentPassword.value === '') {
    showToast('Senha atual não pode ser vazia', ToastEnum.Danger);
    return;
  }
  if (newPassword.value.length < 6) {
    showToast('Nova senha deve ter pelo menos 6 caracteres', ToastEnum.Danger);
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    showToast('A nova senha e a confirmação da senha não coincidem', ToastEnum.Danger);
    return;
  }
  await changePassword();
};

const results = ref<IComment[]>([]);

async function getAllComments(): Promise<void> {
  try {
    loading.value = true;
    const response = await BlogService.getAllComments();
    results.value = response as IComment[];
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

const loadingCommentButton = ref(false);

async function updateComment(id: string, message: string): Promise<void> {
  try {
    loadingCommentButton.value = true;
    const response = await BlogService.update(parseInt(id), message);
    showToast(response.message, ToastEnum.Success);
  } catch (error: any) {
    handlerError(error);
  } finally {
    loadingCommentButton.value = false;
  }
}

async function deleteComment(id: string): Promise<void> {
  try {
    loadingCommentButton.value = true;
    const response = await BlogService.delete(id);
    showToast(response.message, ToastEnum.Success);
    await getAllComments();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loadingCommentButton.value = false;
  }
}
</script>

<style scoped>
.skeletor-score {
  width: 50px;
}
</style>
