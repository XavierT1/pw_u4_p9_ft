import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/consultar', component: () => import('../components/ConsultarTodos.vue'),
    meta: {
    requiereAutorizacion: false,
    esPublica: true
    } 
   },
  { path: '/consultar-id', component: () => import('../components/ConsultarPorId.vue'),
    meta: {
    requiereAutorizacion: false,
    esPublica: true
    } 
   },
  { path: '/guardar', component: () => import('../components/GuardarEstudiante.vue'),
    meta: {
    requiereAutorizacion: false,
    esPublica: true
    } 
   },
  { path: '/actualizar', component: () => import('../components/ActualizarEstudiante.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: false
    } 
   },
  { path: '/eliminar', component: () => import('../components/EliminarEstudiante.vue'), 
    meta: {
    requiereAutorizacion: true,
    esPublica: false
    } 
  },
  { path: '/actualizar-parcial', component: () => import('../components/ActualizarParcial.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: false
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
/*Configuracion del Guardian*/
/*to: es a la pagina que estoy intentando acceder
from: de donde estoy viniendo, desde que pagina vengo
next: es una variable que me permite decir si le permito irse a la pagina o si le redirecciono 
avance a la pagina o no avance a la pagina*/
router.beforeEach((to, from, next) => {
  if(to.meta.requiereAutorizacion){
    /*le envio a una pagina de login*/
    console.log("Requiere autorizacion")

  }else{
    /*le dejo sin validaciones*/
    console.log("Pase libre")
    next()
  }
})



export default router