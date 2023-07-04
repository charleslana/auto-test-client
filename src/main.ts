import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import './assets/lib/bulma/css/bulma.min.css';
import './assets/lib/aos/aos.css';
import './assets/main.css';
import 'animate.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
