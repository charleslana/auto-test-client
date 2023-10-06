<template>
  <div>
    <NavBarBlogComponent :isDetails="true" />
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <figure class="image is-16by9">
                <img src="@/assets/images/post-details.png" alt="post image" />
              </figure>
            </div>
          </div>
          <LoadingComponent :loading="loading" />
          <div v-if="!loading && result">
            <section class="section">
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <RouterLink to="/blog" class="button mb-3">Voltar</RouterLink>
                  <div class="content is-medium">
                    <h2 class="subtitle is-4">
                      {{ formatDateToCustomFormat(result.createdAt.toString()) }}
                    </h2>
                    <small>Publicado por {{ result.user.name }}</small>
                    <div class="control">
                      <span class="tag is-info is-uppercase">QA</span>
                    </div>
                    <div class="control">
                      <span class="tag is-info is-uppercase">Tester</span>
                    </div>
                    <h1 class="title">{{ result.title }}</h1>
                    <div v-html="formatBreakLines(result.description)"></div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <div class="is-divider"></div>
                  <div class="is-size-3 mb-5">Comentários</div>
                  <div class="box" v-if="getTokenFromLocalStorage() != null && result.enable">
                    <div class="field">
                      <p class="control">
                        <textarea
                          class="textarea"
                          placeholder="Enviar comentário"
                          v-model="message"
                        ></textarea>
                      </p>
                    </div>
                    <button
                      type="button"
                      class="button is-info"
                      @click="sendComment"
                      v-bind="getCommentButtonAttributes"
                      :class="{ 'is-loading': loadingCommentButton }"
                    >
                      Enviar
                    </button>
                  </div>
                  <div v-if="results.length === 0" class="has-text-grey">
                    Nenhum comentário nesta postagem
                  </div>
                  <div v-else>
                    <article class="media" v-for="comment in results" :key="comment.id">
                      <figure class="media-left">
                        <p class="image is-64x64">
                          <img
                            src="@/assets/images/comment.jpg"
                            alt="comment image"
                            class="is-rounded"
                          />
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{{ comment.user.name }}</strong
                            >&nbsp;
                            <small>{{ formatTextDate(comment.createdAt.toString()) }}</small>
                          </p>
                          <div v-html="formatBreakLines(comment.message)"></div>
                        </div>
                        <!-- <nav class="level is-mobile">
                          <div class="level-left">
                            <a class="level-item">
                              <span class="icon is-small">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                              </span>
                            </a>
                          </div>
                        </nav> -->
                      </div>
                      <!-- <div class="media-right">
                        <button class="button">
                          <font-awesome-icon :icon="['fas', 'trash']" class="has-text-danger" />
                        </button>
                      </div> -->
                    </article>
                    <div class="box has-text-centered mt-5">
                      <button
                        class="button bd-fat-button is-info m-2 is-centered"
                        @click="moreComments"
                        v-bind="getMoreButtonAttributes"
                        :class="{ 'is-loading': loadingButton }"
                      >
                        Carregar mais
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
    <FooterBlogComponent />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type IPost from '@/interface/IPost';
import BlogService from '@/service/BlogService';
import {
  handlerError,
  formatDateToCustomFormat,
  formatBreakLines,
  formatTextDate,
  showToast
} from '@/utils/utils';
import NavBarBlogComponent from '@/components/NavBarBlogComponent.vue';
import { useRouter } from 'vue-router';
import FooterBlogComponent from '@/components/FooterBlogComponent.vue';
import type IComment from '@/interface/IComment';
import ToastEnum from '@/enum/ToastEnum';
import { getTokenFromLocalStorage } from '@/utils/localStorageUtils';

const router = useRouter();

const id = router.currentRoute.value.params.id as string;

const loading = ref(true);

onMounted(async () => {
  await getPostDetails();
});

const result = ref<IPost | null>(null);

async function getPostDetails(): Promise<void> {
  try {
    loading.value = true;
    const response = await BlogService.get(id);
    result.value = response as IPost;
    await getCommentPaginated();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

const page = ref<undefined | number>(1);

const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const hasNextPage = ref(false);

const results = ref<IComment[]>([]);

const loadingButton = ref(true);

async function getCommentPaginated(): Promise<void> {
  try {
    loadingButton.value = true;
    const response = await BlogService.getCommentsPaginated(id, page.value);
    const comments = response.results as IComment[];
    for (const comment of comments) {
      results.value.push(comment);
    }
    totalCount.value = response.totalCount as number;
    totalPages.value = response.totalPages as number;
    currentPage.value = response.currentPage as number;
    hasNextPage.value = response.hasNextPage as boolean;
  } catch (error: any) {
    handlerError(error);
  } finally {
    loadingButton.value = false;
  }
}

async function moreComments(): Promise<void> {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    page.value = currentPage.value;
    await getCommentPaginated();
  }
}

const getMoreButtonAttributes = computed(() => {
  if (!hasNextPage.value || loadingButton.value) {
    return {
      disabled: true
    };
  }
  return {
    disabled: undefined
  };
});

const loadingCommentButton = ref(false);

const getCommentButtonAttributes = computed(() => {
  if (!message.value.trim() || loadingCommentButton.value) {
    return {
      disabled: true
    };
  }
  return {
    disabled: undefined
  };
});

const message = ref('');

async function sendComment(): Promise<void> {
  try {
    loadingCommentButton.value = true;
    const response = await BlogService.sendComment(parseInt(id), message.value);
    showToast(response.message, ToastEnum.Success);
    results.value = [];
    message.value = '';
    page.value = 1;
    await getCommentPaginated();
  } catch (error: any) {
    handlerError(error);
  } finally {
    loadingCommentButton.value = false;
  }
}
</script>

<style scoped></style>
