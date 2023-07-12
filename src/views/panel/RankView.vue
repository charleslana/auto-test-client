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
          pageName="Classificação"
        ></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">Classificação</p>
            <p class="subtitle">Veja o perfil e classificação de outros testers!</p>
            <LoadingComponent :loading="loading" />
            <div v-if="!loading">
              <div class="level" ref="levelRef">
                <div class="level-left">
                  <div class="select is-medium">
                    <select @change="handleSelectChange" v-model="selectedRank">
                      <option :value="RankFilterEnum.Level">Nível</option>
                      <option :value="RankFilterEnum.Score">Pontos</option>
                    </select>
                  </div>
                </div>
                <div v-if="selectedRank === RankFilterEnum.Level" class="level-right">
                  Seu rank de nível é: {{ rank }}º
                </div>
                <div v-else class="level-right">Seu rank de pontos é: {{ rank }}º</div>
              </div>
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th><abbr data-tooltip="Posição" title="">Pos</abbr></th>
                    <th>Nome</th>
                    <th><abbr data-tooltip="Pontos" title="">Pts</abbr></th>
                    <th><abbr data-tooltip="Nível" title="">Nv.</abbr></th>
                    <th><abbr data-tooltip="Experiência" title="">Exp.</abbr></th>
                    <th>Perfil</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th><abbr data-tooltip="Posição" title="">Pos</abbr></th>
                    <th>Nome</th>
                    <th><abbr data-tooltip="Pontos" title="">Pts</abbr></th>
                    <th><abbr data-tooltip="Nível" title="">Nv.</abbr></th>
                    <th><abbr data-tooltip="Experiência" title="">Exp.</abbr></th>
                    <th>Perfil</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr
                    v-for="(item, index) in result"
                    :key="item.id"
                    :class="{ 'is-selected': rank == (currentPage - 1) * 10 + index + 1 }"
                  >
                    <th>{{ (currentPage - 1) * 10 + index + 1 }}º</th>
                    <td>{{ item.name }}</td>
                    <td>{{ formatNumber(item.score) }}</td>
                    <td>{{ item.level }}</td>
                    <td>{{ item.experience }}</td>
                    <td>
                      <RouterLink :to="'/panel/profile/' + item.id">Ver perfil</RouterLink>
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav class="pagination is-centered mt-5" role="navigation" aria-label="pagination">
                <a
                  class="pagination-previous"
                  @click="previousPage"
                  v-bind="getPreviousButtonAttributes"
                  >Anterior</a
                >
                <a class="pagination-next" @click="nextPage" v-bind="getNextButtonAttributes"
                  >Próximo</a
                >
                <ul class="pagination-list">
                  <li v-for="page in displayedPages" :key="page">
                    <a
                      class="pagination-link"
                      :class="{ 'is-current': page === currentPage }"
                      @click="gotoPage(page)"
                    >
                      {{ page }}
                    </a>
                  </li>
                </ul>
              </nav>
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
import LoadingComponent from '@/components/LoadingComponent.vue';
import RankFilterEnum from '@/enum/RankFilterEnum';
import { computed, onMounted, ref } from 'vue';
import UserService from '@/service/UserService';
import type IUser from '@/interface/IUser';
import { formatNumber, handlerError } from '@/utils/utils';
import { RouterLink } from 'vue-router';

const loading = ref(true);

onMounted(async () => {
  await getUserPaginated();
});

const selectedRank = ref<RankFilterEnum>(RankFilterEnum.Level);

async function handleSelectChange() {
  currentPage.value = 1;
  page.value = currentPage.value;
  await getUserPaginated();
}

const page = ref<undefined | number>(undefined);

const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const hasNextPage = ref(false);

const result = ref<IUser[]>([]);

const levelRef = ref<HTMLElement | null>(null);

const rank = ref<number>(0);

async function getUserPaginated(): Promise<void> {
  try {
    loading.value = true;
    const response = await UserService.getPaginated({
      page: page.value,
      filterType: selectedRank.value
    });
    result.value = response.results as IUser[];
    totalCount.value = response.totalCount as number;
    totalPages.value = response.totalPages as number;
    currentPage.value = response.currentPage as number;
    hasNextPage.value = response.hasNextPage as boolean;
    rank.value = response.rank;
    setTimeout(() => {
      if (levelRef.value !== null) {
        levelRef.value.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
    await getUserPaginated();
  }
}

async function nextPage(): Promise<void> {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    page.value = currentPage.value;
    await getUserPaginated();
  }
}

async function gotoPage(p: number): Promise<void> {
  if (p != currentPage.value) {
    currentPage.value = p;
    page.value = currentPage.value;
    await getUserPaginated();
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

const displayedPages = computed(() => {
  const startPage = Math.max(currentPage.value - 3, 1);
  const endPage = Math.min(currentPage.value + 3, totalPages.value);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});
</script>

<style scoped></style>
