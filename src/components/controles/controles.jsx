import React, { useState} from "react";
import { Settings } from "lucide-react";
import PanelItem from "./Panelitems/panelItem" // Importamos el componente PanelItem
import "./controles.css"; // Importamos el archivo de estilos

const SettingsPanel = ({ 
  onToggleQuote, 
  onToggleToDo, 
  onToggleMusic, 
  onToggleClockButtons, 
  onThemeChange 
}) => {
  // Estado para controlar la visibilidad del panel
  const [isPanelOpen, setIsPanelOpen] = useState(false); 
  const themes = [
    "Morning", "Autumn", "Cottagecore", "DarkAcademia", 
    "LightAcademia", "Y2K", "CleanGirl", "ParisianChic", 
    "SummerBeach","VanillaAesthetic", "CatVibe", "DogVibe",
  ];

   // Alternar la visibilidad del panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="panel">
      {/* Ícono de configuración */}
      <div className="settings-icon" onClick={togglePanel}>
        <Settings size={24} />
      </div>
        {isPanelOpen && (
          <div className="settings-panel">
            <h3 className="panel-title">Controles</h3>
            <ul className="panel-options">
              <PanelItem 
                onToggleQuote={onToggleQuote} 
                onToggleToDo={onToggleToDo}
                onToggleMusic={onToggleMusic}
                onToggleClockButtons={onToggleClockButtons}
                />
            </ul>
            <div className="theme-buttons">
              <label className="panel-title" >Select Theme:</label>
                <select
                  className="theme-select"
                  onChange={(e) => onThemeChange(e.target.value)}
                >
                    {themes.map((theme) => (
                      <option key={theme} className="Boton-estilo">
                        {theme}
                      </option>
                    ))}
                </select>
          </div>
        </div>
        )}
    </div>
  );
};

export default SettingsPanel;