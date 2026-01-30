<template>
  <div class="container">
    <h2>Listado de Estudiantes</h2>
    <table v-if="lista.length > 0" class="tabla-estudiantes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Provincia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in lista" :key="est.id">
          <td>{{ est.id }}</td>
          <td>{{ est.nombre }}</td>
          <td>{{ est.apellido }}</td>
          <td>{{ est.provincia || 'N/A' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>Cargando datos desde el servidor...</div>
  </div>
</template>

<script>
import { consultarTodosFachada } from '@/clients/MatriculaClient';

export default {
  data() {
    return {
      lista: []
    }
  },
  methods: {
    async cargarDatos() {
      try {
        this.lista = await consultarTodosFachada();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
  },
  mounted() {
    this.cargarDatos();
  }
}
</script>

<style scoped>
.tabla-estudiantes { 
  width: 80%; 
  margin: 20px auto; 
  border-collapse: collapse; 
}
.tabla-estudiantes th, td { 
  border: 1px solid #ccc; 
  padding: 10px; 
  text-align: left; 
}
.tabla-estudiantes th { 
  background-color: #f4f4f4; 
  }
</style>