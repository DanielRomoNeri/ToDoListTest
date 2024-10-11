import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../api';
export const TaskEdit = () => {
    const [task, setTask] = useState([]);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();  // ID recibido desde la URL, lo uso para consultar la tarea en la base de datos
    
    const navigate = useNavigate();

    useEffect(() => {
        loadTask();
    }, []);

    const loadTask = async () => {
        try{
            const response = await getTask(id);
            
            setTask(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
        }catch (err){
            console.log(err)
            if(err.response && err.response.status === 404){
                setError("Tarea no encontrada")

            }else{
                setError("Error al obtener tarea")
            }
        }
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask({id: task.id, title, description, isCompleted: task.isCompleted});
        setTitle('');
        setDescription('');
        navigate('/');  
    }
    
    const regresar = () =>{
        navigate('/');  
    };

    if(error == ''){
        return (

            <div className='main-page'>
                <div className='container'>
                    <h1>Editar Tarea</h1>
    
                    <div className='container-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='form'>
                                <label >Título:</label>
                                <input
                                    className='d-block mt-2 mb-2'
                                    type="text"
                                    value={title}
                                    placeholder="Escribe el título de la tarea"
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='form'>
    
                            <label>Descripción:</label>
                                <textarea
                                    className='d-block mt-2 mb-2'
                                    value={description}
                                    placeholder="Escribe una descripción"
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className='d-block'>
                            <button className='btn btn-form' type="submit">Listo</button>
                            <button className='btn btn-form' onClick={regresar}>Volver</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }else{
        return (
            <div>
                <h2>{error}</h2>
                <button className='btn btn-form' onClick={regresar}>Volver</button>
            </div>
        )
    }
    
};

export default TaskEdit;

