import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskEdit from './TaskEdit';

const App = () => {
    return (
      <div className='d-flex justify-content-center align-items-center' >
          
            <Router>
                <Routes>
                  
                    <Route path="/" element={<TaskList />} />
                    <Route path="/new" element={<TaskForm />} />
                    <Route path="/edit/:id" element={<TaskEdit />} />
                  
                </Routes>
            </Router>
          
        </div>
    );
};

export default App;