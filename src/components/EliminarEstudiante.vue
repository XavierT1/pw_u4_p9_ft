<template>
  <div class="container">
    <h2 class="titulo">Eliminar Estudiante</h2>

    <div class="buscador-wrapper">
      <input 
        v-model="idBusqueda" 
        type="number" 
        placeholder="Ingrese ID para eliminar" 
        class="input-id"
        @keyup.enter="buscarEstudiante"
      />
      <button @click="buscarEstudiante" class="btn-buscar">
        Buscar
      </button>
    </div>

    <div v-if="mensaje" :class="{'exito': exito, 'error': !exito}" class="mensaje-alerta">
      {{ mensaje }}
    </div>

    <div v-if="estudiante" class="confirmacion">
      <h3>¿Estás seguro de eliminar a este estudiante?</h3>
      
      <div class="tarjeta-datos">
        <p><strong>ID:</strong> {{ estudiante.id }}</p>
        <p><strong>Nombre:</strong> {{ estudiante.nombre }} {{ estudiante.apellido }}</p>
        <p><strong>Provincia:</strong> {{ estudiante.provincia }}</p>
      </div>

      <div class="botones-accion">
        <button @click="eliminarEstudiante" class="btn-eliminar" :disabled="procesando">
          {{ procesando ? 'Eliminando...' : 'Sí, Eliminar Definitivamente' }}
        </button>
        <button @click="cancelar" class="btn-cancelar">
          Cancelar
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { consultarPorIdFachada, eliminarFachada } from '@/clients/MatriculaClient';

export default {
  name: 'EliminarEstudiante',
  data() {
    return {
      idBusqueda: '',
      estudiante: null,
      mensaje: '',
      exito: false,
      procesando: false
    }
  },
  methods: {
    // 1. Buscar
    async buscarEstudiante() {
      if (!this.idBusqueda) {
        this.mostrarMensaje("Ingresa un ID primero.", false);
        return;
      }
      
      this.mensaje = '';
      this.estudiante = null;

      try {
        const data = await consultarPorIdFachada(this.idBusqueda);
        if (data) {
          this.estudiante = data;
          this.mostrarMensaje("Estudiante encontrado. Confirma la eliminación abajo.", true);
        } else {
          this.mostrarMensaje("No existe ningún estudiante con ese ID.", false);
        }
      } catch (error) {
        console.error(error);
        this.mostrarMensaje("Error al buscar el estudiante.", false);
      }
    },

    // 2. Eliminar
    async eliminarEstudiante() {

      this.procesando = true;
      try {
        await eliminarFachada(this.estudiante.id);
        
        this.mostrarMensaje("¡Estudiante eliminado correctamente!", true);
        this.estudiante = null; 
        this.idBusqueda = '';   

      } catch (error) {
        console.error(error);
        this.mostrarMensaje("Error al intentar eliminar.", false);
      } finally {
        this.procesando = false;
      }
    },

    cancelar() {
      this.estudiante = null;
      this.mensaje = '';
      this.idBusqueda = '';
    },

    mostrarMensaje(texto, esExito) {
      this.mensaje = texto;
      this.exito = esExito;
    }
  }
}
</script>

<style scoped>
.container { 
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px; 
  text-align: center; 
}
.titulo { 
  color: #c0392b; 
  margin-bottom: 25px; 
} 

/* Buscador */
.buscador-wrapper { 
  margin-bottom: 20px; 
  display: flex; 
  justify-content: center; 
  gap: 10px; 
}
.input-id { 
  padding: 10px; 
  border: 1px solid #ddd;
  border-radius: 4px; width: 200px; 
}
.btn-buscar { 
  padding: 10px 20px; 
  background: #2c3e50; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}

/* Confirmación */
.confirmacion { 
  background: #fff5f5; 
  border: 1px solid #feb2b2; 
  padding: 20px; 
  border-radius: 8px; 
  margin-top: 20px; 
}
.confirmacion h3 { 
  color: #c0392b; 
  margin-top: 0; 
}

.tarjeta-datos { 
  background: white; 
  padding: 15px; 
  border-radius: 4px; 
  border: 1px solid #eee; 
  margin: 15px 0; 
  text-align: left; 
}
.tarjeta-datos p { 
  margin: 5px 0; 
  color: #555; 
}

/* Botones */
.botones-accion { 
  display: flex; 
  gap: 15px; 
  justify-content: center; 
}
.btn-eliminar { 
  padding: 12px 20px; 
  background: #c0392b; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  font-weight: bold; 
}
.btn-eliminar:hover { 
  background: #a93226; 
}
.btn-cancelar { 
  padding: 12px 20px; 
  background: #95a5a6; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}
.btn-cancelar:hover { 
  background: #7f8c8d; 
}

/* Mensajes */
.mensaje-alerta { 
  padding: 10px; 
  margin-top: 15px; 
  border-radius: 4px; 
  font-weight: bold; 
}
.exito { 
  color: #27ae60; 
  background: #d5f5e3; 
  border: 1px solid #abebc6; 
}
.error { 
  color: #e74c3c; 
  background: #fadbd8; 
  border: 1px solid #f5b7b1; 
}
</style>