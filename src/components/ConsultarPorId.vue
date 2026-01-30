<template>
  <div class="container">
    <h2 class="titulo">Buscar Estudiante</h2>

    <div class="buscador-wrapper">
      <input 
        v-model="idBusqueda" 
        type="number" 
        placeholder="Ingrese el ID (Ej: 1)" 
        class="input-id"
        @keyup.enter="buscarEstudiante"
      />
      <button @click="buscarEstudiante" class="btn-buscar">
        Buscar
      </button>
    </div>

    <div v-if="cargando" class="mensaje-estado">Buscando...</div>
    <div v-if="error" class="mensaje-error">{{ error }}</div>

    <div v-if="estudiante" class="resultado-wrapper">
      <h3>Resultado Encontrado:</h3>
      <table class="tabla-detalle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Provincia</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
  <tr>
    <td>{{ estudiante.id }}</td>
    <td>{{ estudiante.nombre }}</td>
    <td>{{ estudiante.apellido }}</td>
    <td>{{ estudiante.fechaNacimiento ? estudiante.fechaNacimiento.split('T')[0] : 'N/A' }}</td>
    <td>{{ estudiante.provincia || 'N/A' }}</td>
    <td>{{ estudiante.genero || 'N/A' }}</td>
  </tr>
</tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada } from '@/clients/MatriculaClient';

export default {
  name: 'ConsultarPorId',
  data() {
    return {
      idBusqueda: '',     
      estudiante: null,   
      error: null,        
      cargando: false   
    }
  },
  methods: {
    async buscarEstudiante() {
      // 1. Validación básica
      if (!this.idBusqueda) {
        this.error = "Por favor, escribe un número de ID.";
        return;
      }

      // 2. Reseteamos estados antes de la nueva búsqueda
      this.cargando = true;
      this.error = null;
      this.estudiante = null;

      try {
        // 3. Llamada al Backend
        const data = await consultarPorIdFachada(this.idBusqueda);
        
        // 4. Verificamos si llegó algo
        if (data) {
          this.estudiante = data;
        } else {
          this.error = `No se encontró ningún estudiante con el ID ${this.idBusqueda}`;
        }

      } catch (e) {
        // 5. Capturamos errores
        console.error(e);
        this.error = `No se encontró el ID ${this.idBusqueda} o hubo un error de conexión.`;
      } finally {
        this.cargando = false;
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
  color: #2c3e50; 
  margin-bottom: 25px; 
}

/* Estilos del Buscador */
.buscador-wrapper { 
  margin-bottom: 30px; 
  display: flex; 
  justify-content: center; 
  gap: 10px; 
}
.input-id { 
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 4px; 
  width: 200px; 
  font-size: 16px; 
}
.btn-buscar { 
  padding: 10px 20px; 
  background-color: #42b983; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  font-size: 16px; 
  transition: background 0.3s;
}
.btn-buscar:hover { 
  background-color: #3aa876; 
}

/* Mensajes */
.mensaje-estado { 
  color: #666;
  font-style: italic; 
}
.mensaje-error { 
  color: #e74c3c; 
  font-weight: bold; 
  background: #fadbd8; 
  padding: 10px; 
  border-radius: 4px; 
  display: inline-block; 
}

/* Tabla */
.tabla-detalle { 
  width: 100%; 
  border-collapse: collapse; 
  margin-top: 20px; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
}
.tabla-detalle th, .tabla-detalle td { 
  border: 1px solid #eee; 
  padding: 12px; 
  text-align: center; 
}
.tabla-detalle th { 
  background-color: #2c3e50; 
  color: white; 
  }
</style>