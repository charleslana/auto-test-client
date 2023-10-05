<template>
  <div>
    <NavBarBlogComponent />
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <figure class="image is-16by9">
                <img src="@/assets/images/post.png" alt="post image" />
              </figure>
            </div>
          </div>
          <LoadingComponent :loading="loading" id="results-section" />
          <div v-if="!loading">
            <div v-for="post in results" :key="post.id">
              <RouterLink :to="'/blog/' + post.id">
                <section class="section">
                  <div class="columns">
                    <div class="column is-8 is-offset-2">
                      <div class="content is-medium">
                        <h2 class="subtitle is-4">
                          {{ formatDateToCustomFormat(post.createdAt.toString()) }}
                        </h2>
                        <h1 class="title">{{ post.title }}</h1>
                        <p class="text-black">{{ truncateText(post.description, 100) }}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </RouterLink>
              <div class="is-divider"></div>
            </div>
            <div class="container">
              <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a
                  class="button bd-fat-button is-info is-light bd-pagination-prev m-2"
                  @click="previousPage"
                  v-bind="getPreviousButtonAttributes"
                >
                  <span class="icon is-left">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                  </span>
                  <span>
                    <strong>Artigos anteriores</strong>
                  </span>
                </a>
                <a
                  class="button bd-fat-button is-info is-light bd-pagination-prev m-2"
                  @click="nextPage"
                  v-bind="getNextButtonAttributes"
                >
                  <strong>Próximos artigos</strong>
                  <span class="icon is-left">
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FooterBlogComponent />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type IPost from '@/interface/IPost';
import BlogService from '@/service/BlogService';
import { handlerError, truncateText, formatDateToCustomFormat } from '@/utils/utils';
import NavBarBlogComponent from '@/components/NavBarBlogComponent.vue';
import { useSearchStore } from '@/store/searchStore';
import { RouterLink } from 'vue-router';
import FooterBlogComponent from '@/components/FooterBlogComponent.vue';

const loading = ref(true);

onMounted(async () => {
  await getPostPaginated();
});

const page = ref<undefined | number>(1);

const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const hasNextPage = ref(false);

const results = ref<IPost[]>([]);

async function getPostPaginated(): Promise<void> {
  try {
    loading.value = true;
    const response = await BlogService.getPaginated({
      page: page.value
    });
    results.value = response.results as IPost[];
    totalCount.value = response.totalCount as number;
    totalPages.value = response.totalPages as number;
    currentPage.value = response.currentPage as number;
    hasNextPage.value = response.hasNextPage as boolean;
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}

async function previousPage(): Promise<void> {
  if (currentPage.value > 1) {
    currentPage.value--;
    page.value = currentPage.value;
    await getPostPaginated();
  }
}

async function nextPage(): Promise<void> {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    page.value = currentPage.value;
    await getPostPaginated();
  }
}

const getNextButtonAttributes = computed(() => {
  if (!hasNextPage.value) {
    return {
      disabled: true
    };
  }
  return {
    disabled: undefined
  };
});

const getPreviousButtonAttributes = computed(() => {
  if (currentPage.value === 1) {
    return {
      disabled: true
    };
  }
  return {
    disabled: undefined
  };
});

const searchStore = useSearchStore();

const searchTerm = computed(() => searchStore.searchTerm);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(searchTerm, (newTerm, _oldTerm) => {
  searchByTitle(newTerm);
});

async function searchByTitle(term: string): Promise<void> {
  if (term.trim() == '') {
    getPostPaginated();
    return;
  }
  try {
    loading.value = true;
    const response = await BlogService.searchByTitle(term);
    results.value = response as IPost[];
    totalCount.value = 0;
    totalPages.value = 0;
    currentPage.value = 1;
    hasNextPage.value = false;
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
    scrollToResults();
  }
}

function scrollToResults(): void {
  const resultsSection = document.getElementById('results-section');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style scoped>
a {
  color: black;
}
</style>
