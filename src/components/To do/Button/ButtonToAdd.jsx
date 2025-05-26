import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importar el ícono de añadir
import "./ButtonToDo.css"; // Importar el CSS del botón

const BotonToAdd = ({ agregarClick }) => {
    return (
        <button type="submit" onClick={agregarClick}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    );
}
export default BotonToAdd;