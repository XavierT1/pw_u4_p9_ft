<template>
    <div>
        <h1>About</h1>
 
        <button @click="guardar">Guardar</button>
        <button @click="actualizar">Actualizar</button>
        <button @click="eliminar">Eliminar</button>
        <button @click="actualizarParcial">Actualizar Parcial</button>
        <button @click="consultarTodos">Consultar Todos</button>
        <button @click="consultarPorId">Consultar Por Id</button>
 
    </div>
</template>
 
<script>
import { consultarTodosFachada, consultarPorIdFachada, guardarFachada, actualizarFachada, eliminarFachada, actualizarParcialFachada } from '@/clients/MatriculaClient'
export default {
    name: 'AboutComponent',
    methods: {
        async guardar() {
            const body = { nombre: 'Test', apellido: 'User' };
            await guardarFachada(body);
        },
        async actualizar() {
             const id = 1; 
             const body = { nombre: 'Updated' };
             await actualizarFachada(id, body);
        },
        async eliminar() {
             const id = 1; 
             await eliminarFachada(id);
        },
        async actualizarParcial() {
             const id = 1; 
             const body = { nombre: 'Partial Update' };
             await actualizarParcialFachada(id, body);
        },
        async consultarTodos() {
            const data = await consultarTodosFachada();
            console.log(data);
        },
        async consultarPorId() {
             const id = 1;   
             const data = await consultarPorIdFachada(id);
             console.log(data);
        }
    }
}
</script>
 
<style scoped>
    h1 {
        color: #42b983;
    }
</style>
 