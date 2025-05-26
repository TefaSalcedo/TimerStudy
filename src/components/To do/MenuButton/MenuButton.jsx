import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'; 
import "./MenuButton.css"; // Importar el archivo CSS para estilos


const MenuButton = ({ showMenu, setShowMenu }) => {
    return (
    <button
        className="hamburger-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={faList} />
      </button>
    );
}
export default MenuButton;