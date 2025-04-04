import React, {useState} from "react";
import { Settings } from "lucide-react";
import "./controles.css"; // Importamos el archivo de estilos

const SettingsPanel = ({ onToggleQuote, onToggleToDo, onToggleMusic, onToggleClockButtons, onThemeChange }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Estado para controlar la visibilidad del panel
  const themes = ["Morning", "Autumn", "Cottagecore", "DarkAcademia", "LightAcademia", "Y2K", "CleanGirl"];

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Alternar la visibilidad del panel
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
            <div className="theme-buttons">
              <h4 className="panel-title">Select Theme:</h4>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => onThemeChange(theme)}
                  className="Boton-estilo"
                >
                  {theme}
                </button>
              ))}
          </div>
        </div>
        )}
    </div>
  );
};

export default SettingsPanel;