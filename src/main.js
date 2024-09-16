import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// importamos las lib instaladas
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Esto incluye Popper.js

// lib paginacion
import VueAwesomePaginate from "vue-awesome-paginate";
// lib estilos paginacion
import "vue-awesome-paginate/dist/style.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Esto incluye Popper.js

const app = createApp(App);

app.use(store).use(router).use(VueAwesomePaginate).mount('#app');

// createApp(App).use(store).use(router).mount('#app')
