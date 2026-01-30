<template>
  <div class="container">
    <h2 class="titulo">Actualizar Parcial</h2>

    <div class="buscador-wrapper">
      <input 
        v-model="idBusqueda" 
        type="number" 
        placeholder="ID del estudiante" 
        class="input-id"
        @keyup.enter="buscarEstudiante"
      />
      <button @click="buscarEstudiante" class="btn-buscar">Buscar</button>
    </div>

    <transition name="fade">
      <div v-if="mensaje" :class="['mensaje-alerta', exito ? 'mensaje-exito' : 'mensaje-error']">
        <span v-if="exito">{{ mensaje }}</span>
        <span v-else>{{ mensaje }}</span>
      </div>
    </transition>

    <div v-if="estudianteActual" class="zona-edicion">
      
      <div class="datos-actuales">
        <h3>Datos Actuales</h3>
        <p><strong>Nombre:</strong> {{ estudianteActual.nombre }}</p>
        <p><strong>Apellido:</strong> {{ estudianteActual.apellido }}</p>
        <p><strong>Provincia:</strong> {{ estudianteActual.provincia }}</p>
        <p><strong>Género:</strong> {{ estudianteActual.genero || 'N/A' }}</p>
      </div>

      <div class="formulario-cambios">
        <h3>¿Qué deseas cambiar?</h3>
        <small class="texto-ayuda">Deja en blanco o sin seleccionar lo que NO quieras modificar.</small>

        <div class="campo">
          <input v-model="cambios.nombre" placeholder="Nuevo Nombre (Opcional)" />
        </div>
        <div class="campo">
          <input v-model="cambios.apellido" placeholder="Nuevo Apellido (Opcional)" />
        </div>
        <div class="campo">
          <input v-model="cambios.provincia" placeholder="Nueva Provincia (Opcional)" />
        </div>
        
        <div class="campo">
          <select v-model="cambios.genero" :class="{'placeholder-style': !cambios.genero}">
            <option value="">-- Género (Sin cambios) --</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        
        <button @click="ejecutarCambios" class="btn-patch" :disabled="procesando">
          {{ procesando ? 'Guardando...' : 'Aplicar Cambios Parciales' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { consultarPorIdFachada, actualizarParcialFachada } from '@/clients/MatriculaClient';

export default {
  name: 'ActualizarParcial',
  data() {
    return {
      idBusqueda: '',
      estudianteActual: null,
      cambios: {
        nombre: '',
        apellido: '',
        provincia: '',
        genero: ''
      },
      mensaje: '',
      exito: false,
      procesando: false
    }
  },
  methods: {
    async buscarEstudiante() {
      if (!this.idBusqueda) return;
     
      this.mensaje = '';
      this.estudianteActual = null;
      this.cambios = { nombre: '', apellido: '', provincia: '', genero: '' };

      try {
        const data = await consultarPorIdFachada(this.idBusqueda);
        if (data) {
          this.estudianteActual = data;
        } else {
          this.mostrarMensaje("Estudiante no encontrado", false);
        }
      } catch (error) {
        this.mostrarMensaje("Error de conexión al buscar", false);
      }
    },

    async ejecutarCambios() {
      this.procesando = true;
      this.mensaje = '';

      const objetoPatch = {};
      
      if (this.cambios.nombre) objetoPatch.nombre = this.cambios.nombre;
      if (this.cambios.apellido) objetoPatch.apellido = this.cambios.apellido;
      if (this.cambios.provincia) objetoPatch.provincia = this.cambios.provincia;
      if (this.cambios.genero) objetoPatch.genero = this.cambios.genero;

      if (Object.keys(objetoPatch).length === 0) {
        this.mostrarMensaje("No has escrito ningún cambio", false);
        this.procesando = false;
        return;
      }

      try {
        // 1. Enviamos los cambios (PATCH)
        await actualizarParcialFachada(this.estudianteActual.id, objetoPatch);
        
        // 2. Refrescamos los datos
        const dataRefrescada = await consultarPorIdFachada(this.idBusqueda);
        this.estudianteActual = dataRefrescada;

        // 3. Limpiamos los campos del formulario
        this.cambios = { nombre: '', apellido: '', provincia: '', genero: '' };

        // 4. Mostramos el mensaje
        this.mostrarMensaje("Datos actualizados correctamente", true);

      } catch (error) {
        console.error(error);
        this.mostrarMensaje("Error al aplicar cambios", false);
      } finally {
        this.procesando = false;
      }
    },

    mostrarMensaje(texto, esExito) {
      this.mensaje = texto;
      this.exito = esExito;
      
      if (esExito) {
        setTimeout(() => {
           if(this.exito) this.mensaje = ''; 
        }, 4000);
      }
    }
  }
}
</script>

<style scoped>
.container { 
    max-width: 800px; 
    margin: 0 auto; 
    padding: 20px; 
    text-align: center; 
}
.titulo {
    color: #d35400; 
    margin-bottom: 25px; 
}

.buscador-wrapper { 
    margin-bottom: 30px; 
    display: flex; 
    justify-content: center; 
    gap: 10px; 
}
.input-id { 
    padding: 10px; 
    border: 1px solid #ddd; 
    width: 150px; 
    border-radius: 4px; 
}
.btn-buscar { 
    padding: 10px 20px; 
    background: #2c3e50; 
    color: white; 
    border: none; 
    border-radius: 4px; 
    cursor: pointer; 
}

/* ESTILOS DE LOS MENSAJES */
.mensaje-alerta { 
  padding: 15px; 
  margin-bottom: 20px; 
  font-weight: bold; 
  border-radius: 6px; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

/* Estilo Verde (Éxito) */
.mensaje-exito { 
  color: #155724; 
  background-color: #d4edda; 
  border: 1px solid #c3e6cb; 
}

/* Estilo Rojo (Error) */
.mensaje-error { 
  color: #721c24; 
  background-color: #f8d7da; 
  border: 1px solid #f5c6cb; 
}

/* Animación de entrada/salida */
.fade-enter-active, .fade-leave-active { 
    transition: opacity 0.5s; 
}
.fade-enter-from, .fade-leave-to { 
    opacity: 0; 
}

/* Diseño en dos columnas */
.zona-edicion { 
    display: flex; 
    gap: 20px; 
    text-align: left; 
    justify-content: center; 
    flex-wrap: wrap; 
}

.datos-actuales, .formulario-cambios {
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid #eee;
}

.datos-actuales h3 { 
    border-bottom: 2px solid #eee; 
    padding-bottom: 10px; 
    color: #555; 
}
.formulario-cambios h3 { 
    border-bottom: 2px solid #d35400; 
    padding-bottom: 10px; 
    color: #d35400; 
}
.texto-ayuda { 
    color: #7f8c8d; 
    display: block; 
    margin-bottom: 15px; 
    font-style: italic; 
}

.campo { 
    margin-bottom: 15px; 
}
.campo input, .campo select { 
    width: 100%; 
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    box-sizing: border-box; 
}
.campo input:focus, .campo select:focus { 
    border-color: #d35400; 
    outline: none; 
}

/* Estilo ligero para cuando el select está vacío */
.placeholder-style { 
    color: #757575; 
}

.btn-patch { 
    width: 100%; 
    padding: 12px; 
    background: #d35400; 
    color: white; 
    border: none; 
    border-radius: 4px; 
    cursor: pointer; 
    font-weight: bold; 
    margin-top: 10px; 
    transition: background 0.3s; 
}
.btn-patch:hover { 
    background: #e67e22; 
}
.btn-patch:disabled { 
    background: #bdc3c7; 
    cursor: not-allowed; 
    }
</style>