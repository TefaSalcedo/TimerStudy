import React, { useState, useEffect } from "react";
import "../appTime.css";
import "./toDo.css";

export default function MenuEditable() {
  const [showMenu, setShowMenu] = useState(false);
  const [buttonsText, setButtonsText] = useState(["", "", ""]);
  const [isEditing, setIsEditing] = useState([false, false, false]);

  // Leer textos guardados al cargar la página
  useEffect(() => {
    const savedTexts = JSON.parse(localStorage.getItem("buttonsText"));
    if (savedTexts) {
      setButtonsText(savedTexts);
    }
  }, []);

  // Guardar los textos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("buttonsText", JSON.stringify(buttonsText));
  }, [buttonsText]);

  // Función para manejar el doble click (activar modo edición)
  const handleDoubleClick = (index) => {
    const newEditing = [...isEditing];
    newEditing[index] = true;
    setIsEditing(newEditing);
  };

  // Función para manejar cambio de texto
  const handleChange = (e, index) => {
    const newTexts = [...buttonsText];
    newTexts[index] = e.target.value;
    setButtonsText(newTexts);
  };

  // Función para salir del modo edición (cuando pierde foco)
  const handleBlur = (index) => {
    const newEditing = [...isEditing];
    newEditing[index] = false;
    setIsEditing(newEditing);
  };

   // Función para agregar un nuevo botón
   const addButton = () => {
    setButtonsText([...buttonsText, ""]);
    setIsEditing([...isEditing, false]);
  };

  return (
    <div className="to-do-Menu">
      {/* Botón Hamburguesa */}
      <button
        className="hamburger-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        ☰
      </button>

      {/* Menú Desplegable */}
      {showMenu && (
        <div className="to-do-list">
          {buttonsText.map((text, index) => (
            <div key={index}>
              {isEditing[index] ? (
                <input
                  type="text"
                  value={text}
                  onChange={(e) => handleChange(e, index)}
                  onBlur={() => handleBlur(index)}
                  autoFocus
                  className="to-do-list-item"
                />
              ) : (
                <button
                  onDoubleClick={() => handleDoubleClick(index)}
                  className="to-do-list-item"
                >
                  {text}
                </button>
              )}
            </div>
          ))}
          <button className="to-do-list-item" onClick={addButton}>
            + Añadir Botón
          </button>
        </div>
      )}
    </div>
  );
}
