// buscar si tareas si va ahí, 
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de eliminar
import './ListaTareasInput.css'; // Asegúrate de tener un archivo CSS para estilos

const ListadeTareasInput = ({tareas, marcarCompletada, eliminarClick}) => {
    
    return (
    <ol>
        {tareas.map((tarea, tareaId)=>(
            <div className="tareaContainer" key={tarea.id}>  
                <li 
                    onClick={() => marcarCompletada(tarea.id)}
                    style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}
                    >
                    {tarea.nombre}
                </li>
                <button 
                    onClick={() => eliminarClick(tareaId)}
                    className={`botonEliminar ${tarea.completada ? 'completada' : ''}`}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        ))}
    </ol>
    );
}
    export default ListadeTareasInput;