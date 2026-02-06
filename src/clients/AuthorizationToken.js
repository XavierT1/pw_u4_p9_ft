import axios from 'axios';

const AUTH_URL = 'http://localhost:8082/auth/token';

// Función para obtener un nuevo token desde el microservicio Auth
export const generarNuevoToken = async (username, password) => {
    try {
        console.log("Solicitando nuevo token al servidor de Auth...");
        const response = await axios.get(AUTH_URL, {
            params: { 
                user: username, 
                password: password,
            }
        });

        const { accessToken, expiresAt } = response.data;

        // Guardamos en localStorage para persistencia
        localStorage.setItem('token', accessToken);
        localStorage.setItem('expiracion', expiresAt);

        return accessToken;
    } catch (error) {
        console.error("Error crítico al generar el token:", error);
        return null;
    }
};

// Función que decide si usar el token guardado o pedir uno nuevo
export const obtenerTokenValido = async () => {
    const tokenActual = localStorage.getItem('token');
    const tiempoExpiracion = localStorage.getItem('expiracion');

    // Tiempo actual en segundos
    const ahora = Math.floor(Date.now() / 1000);

    // Si no existe el token o faltan menos de 5 minutos para que expire (margen de seguridad)
    if (!tokenActual || !tiempoExpiracion || (tiempoExpiracion - ahora) < 300) {
        console.warn("Token inexistente o por expirar. Redirigiendo a login...");
        
        // Limpiamos la sesión
        localStorage.removeItem('token');
        localStorage.removeItem('expiracion');
        localStorage.removeItem('estaAutenticado');
        localStorage.removeItem('nombre'); // Si se usa

        // Redireccionamos forzosamente
        window.location.href = '#/login';
        
        return null;
    }

    console.log("Usando token existente (aún válido)");
    return tokenActual;
};