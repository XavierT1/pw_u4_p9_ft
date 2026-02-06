import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  
  { path: '/consultar', component: () => import('../components/ConsultarTodos.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: true
    } 
   },
  { path: '/consultar-id', component: () => import('../components/ConsultarPorId.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: true
    } 
   },
  { path: '/guardar', component: () => import('../components/GuardarEstudiante.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: true
    } 
   },
  { path: '/actualizar', component: () => import('../components/ActualizarEstudiante.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: true
    } 
   },
  { path: '/eliminar', component: () => import('../components/EliminarEstudiante.vue'), 
    meta: {
    requiereAutorizacion: true,
    esPublica: true
    } 
  },
  { path: '/actualizar-parcial', component: () => import('../components/ActualizarParcial.vue'),
    meta: {
    requiereAutorizacion: true,
    esPublica: true
    }
  },
  { path: '/login',
    name: 'login',
    component: LoginView
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
    const estaAutenticado = localStorage.getItem("estaAutenticado");
    const token = localStorage.getItem("token");
    
    if(!estaAutenticado){
    console.log("Requiere autorizacion")
    next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
        next();
    }
  }else{
    /*le dejo sin validaciones*/
    
    next()
  }
})



export default router