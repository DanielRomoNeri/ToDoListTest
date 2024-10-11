import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7248/api/Lista',  // Ruta de la API
});

export const getTasks = () => api.get('/ToDoList');
export const getTask = (id) => api.get(`/Detalle/${id}`);
export const createTask = (task) => api.post('/Crear', task);
export const updateTask = (task) => api.put('/Editar', task);
export const deleteTask = (id) => api.delete(`/Borrar/${id}`);
