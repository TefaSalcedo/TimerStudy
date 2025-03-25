import React, { useState } from "react";
import { Settings } from "lucide-react";
import "./controles.css"; // Importamos el archivo de estilos

function SettingsPanel() {
  

  return (
    <div className="settings-container">
      {/* Ícono de configuración */}
      <div className="settings-icon">
        <Settings size={24} />
      </div>
      {/* Panel lateral (se muestra solo si isHovered es true) */}
      
        <div className="settings-panel">
          <h3 className="panel-title">Opciones</h3>
          <ul className="panel-options">
            <li>Quote</li>
            <li>To do</li>
            <li>Music</li>
            <li>Reloj</li>
          </ul>
        </div>
    </div>
  );
}

export default SettingsPanel;
