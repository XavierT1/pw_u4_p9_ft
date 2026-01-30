import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/consultar', component: () => import('../components/ConsultarTodos.vue') },
  { path: '/consultar-id', component: () => import('../components/ConsultarPorId.vue') },
  { path: '/guardar', component: () => import('../components/GuardarEstudiante.vue') },
  { path: '/actualizar', component: () => import('../components/ActualizarEstudiante.vue') },
  { path: '/eliminar', component: () => import('../components/EliminarEstudiante.vue') },
  { path: '/actualizar-parcial', component: () => import('../components/ActualizarParcial.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router