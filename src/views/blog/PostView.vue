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
          <LoadingComponent :loading="loading" />
          <div v-if="!loading">
            <div v-for="post in result" :key="post.id">
              <section class="section">
                <div class="columns">
                  <div class="column is-8 is-offset-2">
                    <div class="content is-medium">
                      <h2 class="subtitle is-4">
                        {{ formatDateToCustomFormat(post.createdAt.toString()) }}
                      </h2>
                      <h1 class="title">{{ post.title }}</h1>
                      <p>{{ truncateText(post.description, 100) }}</p>
                    </div>
                  </div>
                </div>
              </section>
              <div class="is-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>@CharlesLana</strong>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type IPost from '@/interface/IPost';
import BlogService from '@/service/BlogService';
import { handlerError, truncateText, formatDateToCustomFormat } from '@/utils/utils';
import NavBarBlogComponent from '@/components/NavBarBlogComponent.vue';

const loading = ref(true);

onMounted(async () => {
  await getUserPaginated();
});

const page = ref<undefined | number>(1);

const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const hasNextPage = ref(false);

const result = ref<IPost[]>([]);

async function getUserPaginated(): Promise<void> {
  try {
    loading.value = true;
    const response = await BlogService.getPaginated({
      page: page.value
    });
    result.value = response.results as IPost[];
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
</script>

<style scoped></style>
