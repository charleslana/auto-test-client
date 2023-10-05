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
            </section>
          </div>
        </div>
      </div>
    </section>
    <FooterBlogComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type IPost from '@/interface/IPost';
import BlogService from '@/service/BlogService';
import { handlerError, formatDateToCustomFormat, formatBreakLines } from '@/utils/utils';
import NavBarBlogComponent from '@/components/NavBarBlogComponent.vue';
import { useRouter } from 'vue-router';
import FooterBlogComponent from '@/components/FooterBlogComponent.vue';

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
  } catch (error: any) {
    handlerError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
