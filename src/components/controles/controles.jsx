import React, { useState } from "react";
import { Settings } from "lucide-react";
import "./controles.css"; // Importamos el archivo de estilos

function SettingsPanel({onToggleQuote, onToggleToDo, onToggleMusic, onToggleClockButtons}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Estado para controlar la visibilidad del panel

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Alternar la visibilidad del panel
  };

  return (
    <div className="settings-container">
      {/* Ícono de configuración */}
      <div className="settings-icon" onClick={togglePanel}>
        <Settings size={24} />
      </div>

      {/* Panel lateral (se muestra solo si isPanelOpen es true) */}
      {isPanelOpen && (
        <div className="settings-panel">
          <h3 className="panel-title">Controles</h3>
          <ul className="panel-options">
            <li className="panel-item">
              <span>Quote</span>
              <label className="switch">
                <input type="checkbox" defaultChecked onChange={onToggleQuote}/>
                <span className="slider round"></span>
              </label>
            </li>
            <li className="panel-item">
              <span>To do</span>
              <label className="switch">
                <input type="checkbox" defaultChecked onChange={onToggleToDo} />
                <span className="slider round"></span>
              </label>
            </li>
            <li className="panel-item">
              <span>Music</span>
              <label className="switch">
                <input type="checkbox" defaultChecked onChange={onToggleMusic}/>
                <span className="slider round"></span>
              </label>
            </li>
            <li className="panel-item">
              <span>Reloj</span>
              <label className="switch">
                <input type="checkbox" defaultChecked onChange={onToggleClockButtons}/>
                <span className="slider round"></span>
              </label>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SettingsPanel;