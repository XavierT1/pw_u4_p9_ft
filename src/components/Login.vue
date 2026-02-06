<template>
    <div class="login">
        <h2>Login</h2>
        <input type="text" v-model="usuario" placeholder="Usuario">
        <input type="password" v-model="password" placeholder="Contraseña">
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
        async login(){ 
            console.log("Iniciando sesión...");
            const token = await generarNuevoToken(this.usuario, this.password); 

            if(token){
                localStorage.setItem("token", token);
                
                localStorage.setItem("estaAutenticado", true);
                
                const redirectPath = this.$route.query.redirect || '/consultar';
                this.$router.push(redirectPath); 
            } else {
                alert("Error de autenticacion: Usuario o contraseña incorrectos");
                console.error("No se pudo obtener el token");
            }
        }
    }
}
</script>

<style>

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