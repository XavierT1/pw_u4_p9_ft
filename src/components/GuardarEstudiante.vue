<template>
  <div class="container">
    <h2 class="titulo">Registrar Nuevo Estudiante</h2>

    <div class="formulario">
      <div class="campo">
        <label>Nombre:</label>
        <input v-model="estudiante.nombre" type="text" placeholder="Ej: Mateo" />
      </div>

      <div class="campo">
        <label>Apellido:</label>
        <input v-model="estudiante.apellido" type="text" placeholder="Ej: Morales" />
      </div>

      <div class="campo">
        <label>Fecha de Nacimiento:</label>
        <input v-model="estudiante.fechaNacimiento" type="date" />
      </div>

      <div class="campo">
        <label>Provincia:</label>
        <input v-model="estudiante.provincia" type="text" placeholder="Ej: Pichincha" />
      </div>

      <div class="campo">
        <label>Género:</label>
        <select v-model="estudiante.genero">
          <option disabled value="">Seleccione una opción</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>

      <button @click="guardarDatos" class="btn-guardar" :disabled="procesando">
        {{ procesando ? 'Guardando...' : 'Guardar Estudiante' }}
      </button>
      
      <p v-if="mensaje" :class="{'exito': exito, 'error': !exito}">
        {{ mensaje }}
      </p>
    </div>
  </div>
</template>

<script>
import { guardarFachada } from '@/clients/MatriculaClient';

export default {
  name: 'GuardarEstudiante',
  data() {
    return {
      estudiante: {
        nombre: '',
        apellido: '',
        fechaNacimiento: '', 
        provincia: '',
        genero: ''
      },
      procesando: false,
      mensaje: '',
      exito: false
    }
  },
  methods: {
    async guardarDatos() {
      // 1. Validaciones
      if (!this.estudiante.nombre || !this.estudiante.apellido) {
        this.mensaje = "El nombre y el apellido son obligatorios.";
        this.exito = false;
        return;
      }

      this.procesando = true;
      this.mensaje = '';

      try {
        // 2. ENVIAR DIRECTO AL BACKEND
        await guardarFachada(this.estudiante);
        
        this.mensaje = "¡Estudiante guardado correctamente!";
        this.exito = true;
        
        // Limpiar formulario
        this.estudiante = { 
          nombre: '', 
          apellido: '', 
          fechaNacimiento: '', 
          provincia: '', 
          genero: '' 
        };

      } catch (error) {
        console.error("Error al guardar:", error);
        this.mensaje = "Error al guardar. Verifica la consola.";
        this.exito = false;
      } finally {
        this.procesando = false;
      }
    }
  }
}
</script>

<style scoped>
.container { 
  max-width: 500px; 
  margin: 0 auto; 
  padding: 20px;
  text-align: center; 
}
.titulo { 
  color: #2c3e50; 
  margin-bottom: 20px; 
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.campo { 
  display: flex; 
  flex-direction: column; 
  text-align: left; 
}
.campo label { 
  font-weight: bold; 
  margin-bottom: 5px; 
  color: #555; 
}
.campo input, .campo select { 
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 4px; 
  font-size: 14px; 
}

input[type="date"] {
  font-family: inherit;
  color: #333;
}

.btn-guardar {
  margin-top: 10px;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}
.btn-guardar:hover { 
  background-color: #42b983; 
}
.btn-guardar:disabled { 
  background-color: #95a5a6; 
  cursor: not-allowed; 
}

.exito { 
  color: #27ae60; 
  margin-top: 10px; 
  font-weight: bold;
}
.error { 
  color: #e74c3c; 
  margin-top: 10px; 
  font-weight: bold;
}
</style>