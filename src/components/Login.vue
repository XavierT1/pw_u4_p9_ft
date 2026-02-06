<template>
    <div class="login">
        <h2>Login</h2>
        <input v-model="usuario" type="text" placeholder="Usuario">
        <input v-model="password" type="password" placeholder="Contrasena">
        <button @click="login">Entrar</button>
    </div>
</template>

<script>
import { generarNuevoToken } from "@/clients/AuthorizationToken";

export default {
    data(){
        return{
            usuario: "",
            password: ""
        }
    },
    methods:{
        async login(){ // Make login async
            console.log("Iniciando sesión...");
            const token = await generarNuevoToken(this.usuario, this.password); // Call API

            if(token){ // Simplified check as generarNuevoToken returns null on error
                localStorage.setItem("token", token);
                localStorage.setItem("estaAutenticado", true);
                this.$router.push({ name: 'home' }); // Redirect to home
            } else {
                alert("Error de autenticacion: Usuario o contraseña incorrectos");
                console.error("No se pudo obtener el token");
            }
        }
    }
}
</script>

<style scoped>

.login{
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
   
}

.login input{
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.login button{
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
}

.login button:hover{
    background-color: #45a049;
}


</style>