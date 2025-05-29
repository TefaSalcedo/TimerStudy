import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./ButtonToDo.css"; // Importar el CSS del botón

const BotonRemove = ({ eliminarClick, tareaId, tarea }) => {
    return (
       <button 
            onClick={() => eliminarClick(tareaId)}
            className={`botonEliminar ${tarea.completada ? 'completada' : ''}`}
            >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
}
export default BotonRemove;