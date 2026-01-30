<template>
  <div class="consultar-container">
    <h2>Listado General de Estudiantes</h2>
    <button @click="obtenerDatos" class="btn-refresh">Actualizar Tabla</button>

    <table v-if="estudiantes.length > 0" class="tabla-custom">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantes" :key="est.id">
          <td>{{ est.id }}</td>
          <td>{{ est.nombre }}</td>
          <td>{{ est.apellido }}</td>
          <td>{{ est.fechaNacimiento }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay datos cargados o la lista está vacía.</p>
  </div>
</template>

<script>
// Importamos la función desde tu cliente de axios
import { consultarTodos } from '@/clients/MatriculaClient';

export default {
  name: 'ConsultarTodos',
  data() {
    return {
      estudiantes: []
    }
  },
  methods: {
    async obtenerDatos() {
      try {
        // Llamada a la función del backend Quarkus
        this.estudiantes = await consultarTodos();
      } catch (error) {
        console.error("Error al traer estudiantes", error);
      }
    }
  },
  mounted() {
    // Ejecuta la consulta automáticamente al cargar la vista
    this.obtenerDatos();
  }
}
</script>

<style scoped>
.tabla-custom { margin: 20px auto; border-collapse: collapse; width: 90%; }
.tabla-custom th, .tabla-custom td { border: 1px solid #ddd; padding: 10px; text-align: center; }
.tabla-custom th { background-color: #42b983; color: white; }
.btn-refresh { padding: 8px 15px; margin-bottom: 10px; background: #2c3e50; color: white; border: none; cursor: pointer; border-radius: 4px; }
.btn-refresh:hover { background: #42b983; }
</style>