import React, { useState } from 'react';
import { createTask } from '../api';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {//se pasan los datos del form y isCompleted siempre se manda como false
        e.preventDefault();
        await createTask({ title, description, isCompleted: false });
        setTitle('');
        setDescription('');
        navigate('/');  
    }
    
    const regresar = () =>{
        navigate('/');  
    };

    return (
        <div className='main-page'>
            <div className='container'>
            <h1>Agregar nueva tarea</h1>

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
            <button className='btn btn-form' type="submit">Agregar Tarea</button>
                <button className='btn btn-form' type="submit" onClick={regresar}>Volver</button>
            </div>
        </form>
        </div>
        </div>
        </div>
        
    );
};

export default TaskForm;
