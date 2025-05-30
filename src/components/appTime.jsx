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
  const [showMusic, setShowMusic] = useState(true);
  const [showToDo, setShowToDo] = useState(true);
  const [showQuote, setShowQuote] = useState(true);
  const [showClockButtons, setShowClockButtons] = useState(true);

  const [tema, setTema] = useState("Morning");



  // useEffect(() => {
  //   console.log("Tema seleccionado:", tema);
  //   console.log("Video ID:", Themes[tema]?.videoId);
  // }, [tema]);

  return (
    // Contenedor principal
    <div
      className="app-container"
      style={{
        backgroundImage: Themes[tema]?.backgroundImage
          ? `url(${Themes[tema].backgroundImage})`
          : "none", // Usa un valor predeterminado si el tema no es válido
      }}
    >
      <div className="app-left">
        {/* Contenedor para la música */}
        {showMusic && Themes[tema]?.videoId && (
          <YoutubeSpecificVideo 
            videoId={Themes[tema].videoId} />
        )}
        {/* Contenedor para el menú de tareas */}
        {showToDo && 
        <MenuEditable 
          tema={tema} 
          />} 
      </div>

      {/* <Draggable axis="y"> */}
          <div> 
          {/* Contenedor para time*/}
          <TimeDisplay 
            showClockButtons={showClockButtons} 
            tema={tema}
            />
          {/* Contenedor para quotes*/}
          {showQuote && 
          <Quote 
            tema={tema} 
            />}
        </div>
      {/* </Draggable> */}

      <div className="app-rigth">
        {/* Contenedor para las notificaciones */}
        <ToastContainer /> 
        <SettingsPanel
          onToggleQuote={() => setShowQuote((prev) => !prev)}
          onToggleToDo={() => setShowToDo((prev) => !prev)}
          onToggleMusic={() => setShowMusic((prev) => !prev)}
          onToggleClockButtons={() => setShowClockButtons((prev) => !prev)}


          onThemeChange={(theme) => {
            if (Themes[theme]) {
              setTema(theme);
              console.log(`Tema cambiado a: ${theme}`);
            } else {
              console.error(`Tema no encontrado: ${theme}`);
            }
          }}
          tema={tema} // Pasa el tema actual al panel de configuración
          
        />
      </div>

    </div>
  );
}

export default TimeComponent;
