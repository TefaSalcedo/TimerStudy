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
  onThemeChange,
  // Propiedad para el tema actual
  tema 
}) => {
  // Estado para controlar la visibilidad del panel
  const [isPanelOpen, setIsPanelOpen] = useState(false); 
  console.log("Entraste a SettingsPanel");
  console.log("Current theme:", tema);

   // Alternar la visibilidad del panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    console.log("Panel toggled:", !isPanelOpen);
  };

  return (
    <div className="panel">
      {/* Ícono de configuración */}
      <SettingIcon 
        togglePanel={togglePanel} 
        tema={tema}
        />
      {/* Panel de configuración */}
        {isPanelOpen && (
          <div className={`menu ${tema}`}>
            <h3 className="panel-title">Controles</h3>
            <ul className="panel-options">
              <PanelItem 
                tema={tema}
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