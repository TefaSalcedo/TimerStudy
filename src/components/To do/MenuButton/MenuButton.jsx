import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'; 
import "./MenuButton.css"; // Importar el archivo CSS para estilos


const MenuButton = ({ showMenu, setShowMenu, tema }) => {
  console.log("Se esta procesando el Menu Boton")
    return (
    <button
        className={`hamburger-button ${tema}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={faList} />
      
      </button>
    );
}
export default MenuButton;