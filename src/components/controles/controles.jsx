import React, { useState} from "react";
import PanelItem from "./Panelitems/panelItem" 
import ThemeButton from "./ThemeButtons/themeButton.jsx"; 
import SettingIcon from "./settingIcon/settingIcon.jsx";
import "./controles.css"; 

const SettingsPanel = ({ 
  onToggleQuote, 
  onToggleToDo, 
  onToggleMusic, 
  onToggleClockButtons, 
  onThemeChange 
}) => {
  // Estado para controlar la visibilidad del panel
  const [isPanelOpen, setIsPanelOpen] = useState(false); 

   // Alternar la visibilidad del panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="panel">
      {/* Ícono de configuración */}
      <SettingIcon togglePanel={togglePanel} />
      {/* Panel de configuración */}
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
             <ThemeButton 
                onThemeChange={onThemeChange} />
        </div>
        )}
    </div>
  );
};

export default SettingsPanel;