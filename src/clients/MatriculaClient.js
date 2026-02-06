import axios from "axios";
import { obtenerTokenValido } from "./AuthorizationToken";

const BASE_URL = `http://localhost:8081/matricula/api/v1.0/estudiantes`;

/**
 * Función que asegura que siempre tengamos un token vigente 
 * antes de hablar con el backend.
 */
const getAuthHeaders = async () => {
    const tokenValido = await obtenerTokenValido();
    if (!tokenValido) {
        throw new Error("Usuario no autenticado - Token inválido o expirado");
    }
    return { 
        headers: { 
            "Authorization": `Bearer ${tokenValido}`,
            "Content-Type": "application/json"
        } 
    };
}

// --- Métodos de Consumo de API con AWAIT para asegurar la respuesta ---

const consultarTodos = async () => {
    const config = await getAuthHeaders();
    const response = await axios.get(BASE_URL, config);
    return response.data;
}

const consultarPorId = async (id) => {
    const config = await getAuthHeaders();
    const response = await axios.get(`${BASE_URL}/${id}`, config);
    return response.data;
}

const guardar = async (body) => {
    const config = await getAuthHeaders();
    const response = await axios.post(BASE_URL, body, config);
    return response.data;
}

const actualizar = async (id, body) => {
    const config = await getAuthHeaders();
    const response = await axios.put(`${BASE_URL}/${id}`, body, config);
    return response.data;
}

const eliminar = async (id) => {
    const config = await getAuthHeaders();
    const response = await axios.delete(`${BASE_URL}/${id}`, config);
    return response.data;
}

const actualizarParcial = async (id, body) => {
    const config = await getAuthHeaders();
    const response = await axios.patch(`${BASE_URL}/${id}`, body, config);
    return response.data;
}

// --- Fachadas que exportas a tus componentes .vue ---

export const consultarTodosFachada = async () => await consultarTodos();
export const consultarPorIdFachada = async (id) => await consultarPorId(id);
export const guardarFachada = async (body) => await guardar(body);
export const actualizarFachada = async (id, body) => await actualizar(id, body);
export const eliminarFachada = async (id) => await eliminar(id);
export const actualizarParcialFachada = async (id, body) => await actualizarParcial(id, body);