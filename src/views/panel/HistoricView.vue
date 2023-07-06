<template>
  <NavBarComponent></NavBarComponent>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <MenuComponent :activePage="MenuComponentEnum.Historic"></MenuComponent>
      </div>
      <div class="column is-9">
        <BreadCrumbComponent :pageName="MenuComponentEnum.Historic"></BreadCrumbComponent>
        <section class="hero">
          <div class="hero-body">
            <p class="title">{{ MenuComponentEnum.Historic }}</p>
            <p class="subtitle has-text-grey">
              Aqui estão seus últimos casos de testes, cenários, massas de dados e tudo mais que
              você gerou.
            </p>
            <p class="subtitle has-text-grey">
              Você pode remover os itens que não gostaria de manter em seu histórico de consultas
            </p>
            <p class="subtitle has-text-grey">
              E você pode exportar um relatório de todos os seus históricos.
            </p>
            <div class="level" ref="levelRef">
              <div class="level-left">
                <div class="select is-medium">
                  <select @change="handleSelectChange" v-model="selectedTestType">
                    <option value="">Todos</option>
                    <option
                      v-for="(key, index) in menuOptionsKeys"
                      :key="index"
                      :value="getKeyFirstLetterLowercase(key)"
                    >
                      {{ menuOptions[index] }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="level-right">
                <button class="button">Exportar em Excel</button>
              </div>
            </div>
            <div v-if="showNoResults" class="no-results">Nenhum resultado encontrado</div>
            <progress
              class="progress is-small is-info is-radiusless"
              max="100"
              v-if="loading"
            ></progress>
            <div v-if="!loading">
              <div class="card mb-2" v-for="item in result" :key="item.id">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ getMenuComponentTitle(item.type) }}</p>
                    </div>
                  </div>
                  <div class="content">
                    {{ item.input }}
                    <br />
                    <time>{{ formatDate(item.createdAt) }}</time>
                    <div class="level mt-2">
                      <div class="level-left">
                        <button class="button is-info">Visualizar</button>
                      </div>
                      <div class="level-right">
                        <button class="button is-danger">Excluir</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
import NavBarComponent from '../../components/NavBarComponent.vue';
import MenuComponent from '../../components/MenuComponent.vue';
import BreadCrumbComponent from '../../components/BreadCrumbComponent.vue';
import MenuComponentEnum from '../../enum/menuComponentEnum';
import { ref, onMounted, computed } from 'vue';
import { formatDate } from '../../utils/utils';
import UserHistoricService from '../../service/userHistoricService';
import type IUserHistoric from '../../interface/IUserHistoric';
import type TestTypeEnum from '@/enum/testTypeEnum';

const menuOptionsKeys = ref(Object.keys(MenuComponentEnum).slice(4));
const menuOptions = ref(Object.values(MenuComponentEnum).slice(4));

const selectedTestType = ref<string | undefined>('');

async function handleSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  selectedTestType.value = target.value;
  if (selectedTestType.value != '') {
    filter.value = selectedTestType.value as TestTypeEnum;
  } else {
    filter.value = undefined;
  }
  currentPage.value = 1;
  page.value = currentPage.value;
  await getUserHistoric();
}

function getKeyFirstLetterLowercase(key: string): string {
  if (key === 'APITest' || key === 'SQLQueryBuilder') {
    return key.charAt(0).toLowerCase() + key.slice(1, 3).toLowerCase() + key.slice(3);
  }
  return key.charAt(0).toLowerCase() + key.slice(1);
}

const loading = ref(true);

onMounted(async () => {
  await getUserHistoric();
});

const page = ref<undefined | number>(undefined);

const filter = ref<undefined | TestTypeEnum>(undefined);

const result = ref<IUserHistoric[]>([]);

const levelRef = ref<HTMLElement | null>(null);

const showNoResults = ref(false);

async function getUserHistoric(): Promise<void> {
  try {
    showNoResults.value = false;
    loading.value = true;
    const response = await UserHistoricService.getPaginated({
      page: page.value,
      filterType: filter.value
    });
    result.value = response.results as IUserHistoric[];
    totalCount.value = response.totalCount as number;
    totalPages.value = response.totalPages as number;
    currentPage.value = response.currentPage as number;
    hasNextPage.value = response.hasNextPage as boolean;
    setTimeout(() => {
      if (levelRef.value !== null) {
        levelRef.value.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } catch (error: any) {
    showNoResults.value = true;
    result.value = [];
    totalPages.value = 0;
    totalCount.value = 0;
    hasNextPage.value = false;
  } finally {
    loading.value = false;
  }
}

function getMenuComponentTitle(type: string): string {
  let key = '';
  if (type === 'sqlQueryBuilder' || type === 'apiTest') {
    key = type.charAt(0).toUpperCase() + type.slice(1, 3).toUpperCase() + type.slice(3);
  } else {
    key = type.charAt(0).toUpperCase() + type.slice(1);
  }
  const enumValue = MenuComponentEnum[key as keyof typeof MenuComponentEnum];
  if (enumValue) {
    return enumValue;
  }
  throw new Error(`Invalid MenuComponentEnum value: ${type}`);
}

const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const hasNextPage = ref(false);

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    page.value = currentPage.value;
    await getUserHistoric();
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    page.value = currentPage.value;
    await getUserHistoric();
  }
}

async function gotoPage(p: number) {
  currentPage.value = p;
  page.value = currentPage.value;
  await getUserHistoric();
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

<style scoped>
.content {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
