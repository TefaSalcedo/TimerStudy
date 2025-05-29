import React from 'react';
import "./tarea.css"

const Tarea = ({ marcarCompletada, tarea,tema }) => {
    console.log(tarea)
    console.log( "entramos a tarea :3")
    return (
        <li
            className={`li-tarea ${tema}`}
            onClick={() => marcarCompletada(tarea.id)}
            style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}
        >
            {tarea.nombre}
        </li>
    );
};

export default Tarea;