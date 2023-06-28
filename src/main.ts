import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import './assets/lib/bulma/css/bulma.min.css';
import './assets/main.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
