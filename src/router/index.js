import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Importamos el nuevo componente
import ConsultarTodos from '../components/ConsultarTodos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/estudiantes/consultar',
    name: 'consultar-todos',
    component: ConsultarTodos
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router