import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeDisplay from "./Reloj/TimeDisplay.jsx";
import YoutubeSpecificVideo from "../components/Musica/youtube.jsx";
import SettingsPanel from "./controles/controles.jsx";
import Quote from "./Quotes/quote.jsx";
import MenuEditable from "./To do/toDo.jsx";
import Themes from "./themes/themes.js"; // Importa el archivo de temas
import "./appTime.css";

function TimeComponent() {
  // Estados para controlar el tema de la aplicación
  const [selectedTheme, setSelectedTheme] = useState("Morning");
  const [showMusic, setShowMusic] = useState(true);
  const [showToDo, setShowToDo] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [showClockButtons, setShowClockButtons] = useState(true);

  useEffect(() => {
    console.log("Tema seleccionado:", selectedTheme);
    console.log("Video ID:", Themes[selectedTheme]?.videoId);
  }, [selectedTheme]);

  return (
    // Contenedor principal
    <div
      className="app-container"
      style={{
        backgroundImage: Themes[selectedTheme]?.backgroundImage
          ? `url(${Themes[selectedTheme].backgroundImage})`
          : "none", // Usa un valor predeterminado si el tema no es válido
      }}
    >
      <div className="app-left">
        {showMusic && Themes[selectedTheme]?.videoId && (
          <YoutubeSpecificVideo videoId={Themes[selectedTheme].videoId} />
        )}
        {showToDo && <MenuEditable />}
      </div>
      <Draggable axis="y">
        <div className="app-center">
          {/* Contenedor para time*/}
          <TimeDisplay  showClockButtons={showClockButtons}/>
          {/* Contenedor para quotes*/}
          {showQuote && <Quote />}
        </div>
      </Draggable>

      <div className="app-rigth">
        <ToastContainer /> {/* Contenedor para las notificaciones */}
        <SettingsPanel
          onToggleQuote={() => setShowQuote((prev) => !prev)}
          onToggleToDo={() => setShowToDo((prev) => !prev)}
          onToggleMusic={() => setShowMusic((prev) => !prev)}
          onToggleClockButtons={() => setShowClockButtons((prev) => !prev)}
          onThemeChange={(theme) => {
            if (Themes[theme]) {
              setSelectedTheme(theme);
            } else {
              console.error(`El tema "${theme}" no existe en Themes.`);
            }
          }}
        />
      </div>
    </div>
  );
}

export default TimeComponent;
