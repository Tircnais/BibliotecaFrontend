import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// CRUD Libros
import ListaLibrosView from '../views/Libros/ListaLibros.vue'
import NuevoLibroView from '../views/Libros/NuevoLibro.vue'
import EditarLibroView from '../views/Libros/EditarLibro.vue'
// CRUD Autores
import ListaAutoresView from '../views/Autores/ListaAutores.vue'
// Graficos
import GraficosView from '../views/Graficas/Estadisticas.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // CRUD Libros
  {
    path: '/Libro/ListaLibros',
    name: 'ListaLibros',
    component: ListaLibrosView
  },
  {
    path: '/Libro/EditarLibro/:id',
    name: 'EditarLibro',
    component: EditarLibroView,
    props: true // Permite pasar los parámetros de la ruta como props al componente
  },
  {
    path: '/Libro/NuevoLibro',
    name: 'NuevoLibro',
    component: NuevoLibroView
  },
  // CRUD Autores
  {
    path: '/Autores/ListaAutores',
    name: 'ListaAutores',
    component: ListaAutoresView
  },
  {
    path: '/Graficos/Estadisticos',
    name: 'Graficos',
    component: GraficosView
  },
  // URL por defecto
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
