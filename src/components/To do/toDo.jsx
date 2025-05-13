import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de lista|
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de añadir
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de eliminar
import "../appTime.css";
import "./toDo.css";

export default function MenuEditable() {
  const [showMenu, setShowMenu] = useState(false);
  const [tareas, setTareas] = React.useState([]);
    const [tarea, setTarea] = React.useState('');

    const agregarClick = (e) => {
        e.preventDefault();
        if (tarea.trim() === '') return;
            const nuevaTarea={
                id: Date.now(),
                nombre: tarea,
                completada:false,
            }
            setTareas([...tareas, nuevaTarea]);
            setTarea('');
    }

    const eliminarClick = (index) => {
        const nuevasTareas = tareas.filter((_, i) => i !== index);
        setTareas(nuevasTareas);
    }

    const marcarCompletada = (id) => {
        const nuevasTareas = tareas.map((tarea) => {
            if (tarea.id === id) {
                return { ...tarea, completada: !tarea.completada };
            }
            return tarea;
        });
        setTareas(nuevasTareas);
    }
    
    useEffect(() => {
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
        if (tareasGuardadas) {
            setTareas(tareasGuardadas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);

  return (
    <div className="to-do-Menu">
      {/* Botón Hamburguesa */}
      <button
        className="hamburger-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={faList} />
      </button>

      {/* Menú Desplegable */}
      {showMenu && (
        <div className="container">
        <form>
            <input 
                type="text" 
                placeholder="Escribe una tarea" 
                value={tarea} 
                onChange={(e)=>setTarea(e.target.value)}/>
            <button type="submit" onClick={agregarClick}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
        <ul>
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
        </ul>
    </div>
      )}
    </div>
  );
}
