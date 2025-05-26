import React from 'react';
import "./tarea.css"

const Tarea = ({ marcarCompletada, tarea }) => {
    return (
        <li
            onClick={() => marcarCompletada(tarea.id)}
            style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}
        >
            {tarea.nombre}
        </li>
    );
};

export default Tarea;