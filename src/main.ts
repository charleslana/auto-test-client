import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faCircleInfo,
  faMagnifyingGlass,
  faMedal,
  faPenToSquare,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { pinia } from '@/store/pinia';
import './assets/lib/bulma/css/bulma.min.css';
import './assets/main.css';
import './assets/extension/bulma-divider.min.css';
import './assets/extension/bulma-tooltip.min.css';
import './assets/extension/bulma-list.css';
import 'animate.css';
import 'vue-skeletor/dist/vue-skeletor.css';

library.add(
  faCircleInfo,
  faTrash,
  faMagnifyingGlass,
  faMedal,
  faCircleCheck,
  faArrowRight,
  faArrowLeft,
  faPenToSquare
);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.use(pinia);

app.mount('#app');
