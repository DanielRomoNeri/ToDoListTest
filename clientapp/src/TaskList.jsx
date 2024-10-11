import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate(); 
    useEffect(() => {//carga la lista de tareas en cuanto carga el componente
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const response = await getTasks();
        const sortedTasks = response.data.sort((a, b) => b.id - a.id);
        setTasks(sortedTasks);
    };
        const handleDelete = async (id) => {
            // Mostrar SweetAlert para confirmar la eliminación
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteTask(id);  // Eliminar la tarea si se confirma
                    loadTasks();  // Recargar la lista después de eliminar
                    Swal.fire(
                        'Eliminado',
                        'La tarea ha sido eliminada',
                        'success'
                    );
                }
            });
    };

    const formattedDate = (date) => {//Darle formato legible a la fecha guardada en la base de datos
        const formattedDateTime = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(new Date(date));
        return formattedDateTime;
    };

    const createNewTask = () => {
        navigate("/new")
    };
    const editTask = (id) => {
        navigate(`/edit/${id}`)
    }
  
    const handleComplete = async (task) => {//hace un cambio de estado de isCompleted y lo actualiza en la base de datos
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        try {
            await updateTask(updatedTask);
            setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };
    
    
    return (
        <div className='main-page'>
           <div className='container'><h1>Lista de Tareas</h1>
           <div className='lista'>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.isCompleted ? 'completed' : ''}>
                    <div className='headerCard'>Creada el {formattedDate(task.createdAt)}</div>
                      <div className='titulo'>  {task.title} - 
                      </div>
                      <div className='description'>{task.description}</div>
                      <button className={task.isCompleted ? 'btn-completed' : 'btn-normal'} onClick={() => handleComplete(task)}>{task.isCompleted ? 'Completada' : 'Completar'}</button>
                      <button className='btn-normal' onClick={() => editTask(task.id)}>Editar</button>
                        <button className='btn-erase' onClick={() => handleDelete(task.id)}>Eliminar</button>
                        
                    </li>
                ))}
            </ul>
            </div>
            <button className='btn' onClick={createNewTask}>Agregar nueva tarea</button>
            </div> 
        </div>
    );
};

export default TaskList;
