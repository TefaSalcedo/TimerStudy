import React, { useState } from "react";
import { Settings } from "lucide-react";
import "./controles.css"; // Importamos el archivo de estilos

function SettingsPanel() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="settings-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ícono de configuración */}
      <div className="settings-icon">
        <Settings size={24} />
      </div>

      {/* Panel lateral (se muestra solo si isHovered es true) */}
      {isHovered && (
        <div className="settings-panel">
          <h3 className="panel-title">Opciones</h3>
          <ul className="panel-options">
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SettingsPanel;
