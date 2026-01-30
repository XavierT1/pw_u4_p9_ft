<template>
  <div class="container">
    <h2 class="titulo">Actualizar Estudiante</h2>

    <div class="buscador-wrapper">
      <input 
        v-model="idBusqueda" 
        type="number" 
        placeholder="Ingrese el ID a modificar" 
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

    <div v-if="estudiante" class="formulario">
      <h3 class="subtitulo">Editando datos del ID: {{ estudiante.id }}</h3>

      <div class="campo">
        <label>Nombre:</label>
        <input v-model="estudiante.nombre" type="text" />
      </div>

      <div class="campo">
        <label>Apellido:</label>
        <input v-model="estudiante.apellido" type="text" />
      </div>

      <div class="campo">
        <label>Fecha de Nacimiento:</label>
        <input v-model="estudiante.fechaNacimiento" type="date" />
      </div>

      <div class="campo">
        <label>Provincia:</label>
        <input v-model="estudiante.provincia" type="text" />
      </div>

      <div class="campo">
        <label>Género:</label>
        <select v-model="estudiante.genero">
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>

      <div class="botones-accion">
        <button @click="guardarCambios" class="btn-actualizar" :disabled="procesando">
          {{ procesando ? 'Guardando...' : 'Actualizar Datos' }}
        </button>
        <button @click="cancelarEdicion" class="btn-cancelar">
          Cancelar
        </button>
      </div>
    </div>

  </div>
</template>

<script>
// Importamos ambas fachadas: una para buscar y otra para actualizar
import { consultarPorIdFachada, actualizarFachada } from '@/clients/MatriculaClient';

export default {
  name: 'ActualizarEstudiante',
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
    // 1. Buscar primero el estudiante
    async buscarEstudiante() {
      if (!this.idBusqueda) {
        this.mostrarMensaje("Ingrese un ID primero", false);
        return;
      }
      
      this.estudiante = null;
      this.mensaje = '';

      try {
        const data = await consultarPorIdFachada(this.idBusqueda);
        if (data) {
          this.estudiante = data;
          this.mostrarMensaje("Usuario encontrado. Puede editar los datos.", true);
        } else {
          this.mostrarMensaje("No se encontró ningún estudiante con ese ID.", false);
        }
      } catch (error) {
        console.error(error);
        this.mostrarMensaje("Error al buscar (Revise conexión o ID).", false);
      }
    },

    // 2. Enviar los cambios (PUT)
    async guardarCambios() {
      this.procesando = true;
      try {
        // Llamamos a la fachada de actualizar pasando el ID y el OBJETO completo
        await actualizarFachada(this.estudiante.id, this.estudiante);
        
        this.mostrarMensaje("¡Datos actualizados correctamente!", true);
  
      } catch (error) {
        console.error(error);
        this.mostrarMensaje("Error al intentar actualizar.", false);
      } finally {
        this.procesando = false;
      }
    },

    cancelarEdicion() {
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
  color: #2c3e50; 
  margin-bottom: 25px; 
}
.subtitulo { 
  color: #42b983; 
  margin-bottom: 15px; 
  border-bottom: 2px solid #eee; 
  padding-bottom: 10px; 
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
  border-radius: 4px; 
  width: 200px; 
}
.btn-buscar { 
  padding: 10px 20px; 
  background: #2c3e50; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}
.btn-buscar:hover { 
  background: #34495e; 
}

/* Formulario */
.formulario { 
  background: #f9f9f9; 
  padding: 30px; 
  border-radius: 8px; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
  text-align: left; 
}
.campo { 
  margin-bottom: 15px; 
}
.campo label { 
  display: block; 
  font-weight: bold; 
  margin-bottom: 5px; 
  color: #555; 
}
.campo input, .campo select { 
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 4px; 
  box-sizing: border-box; 
}

/* Botones Acción */
.botones-accion { 
  display: flex; 
  gap: 10px; 
  margin-top: 20px; 
}
.btn-actualizar { 
  flex: 1; 
  padding: 12px; 
  background: #42b983; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  font-weight: bold; 
}
.btn-actualizar:hover { 
  background: #3aa876; 
}
.btn-cancelar { 
  padding: 12px 20px; 
  background: #e74c3c; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}
.btn-cancelar:hover { 
  background: #c0392b; 
}

/* Mensajes */
.mensaje-alerta { 
  padding: 10px; 
  margin-bottom: 15px; 
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