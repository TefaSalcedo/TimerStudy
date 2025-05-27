import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeOptions from './appTime/Display/timeOption.jsx';
import TimeDisplay from './appTime/Display/TimeDisplay/timeDisplay.jsx';
import PomodoroOptions from './appTime/Pomodoro/pomodoro.jsx'
import DeepWorkOptions from './appTime/Deep Work/deepWorkOption.jsx';
import YoutubeSpecificVideo from '../components/Musica/youtube.jsx';
import SettingsPanel from './controles/controles.jsx';
import Quote from './Quotes/quote.jsx';
import MenuEditable from './To do/toDo.jsx';
import Themes from './themes/themes.js'; // Importa el archivo de temas
import "./appTime.css";

function TimeComponent() {
  // Estados para la hora actual
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  // Otros estados relacionados con el temporizador
  const [isRealTime, setIsRealTime] = useState(true);
  const [timerMode, setTimerMode] = useState('none');
  const [isCounting, setIsCounting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Estado para visualizar opciones de Pomodoro y Deep Work
  const [showDeepWorkOptions, setShowDeepWorkOptions] = useState(false);
  const [showPomodoroOptions, setShowPomodoroOptions] = useState(false);

  // Estados para controlar la visibilidad de los componentes
  const [showQuote, setShowQuote] = useState(true);
  const [showToDo, setShowToDo] = useState(true);
  const [showMusic, setShowMusic] = useState(true);
  const [showClockButtons, setShowClockButtons] = useState(false);

  // Estados para controlar el tema de la aplicación
  const [selectedTheme, setSelectedTheme] = useState("Morning");


  // Función para actualizar la hora actual
  const updateClock = () => {
    const now = new Date();
    setHours(String(now.getHours()).padStart(2, '0'));
    setMinutes(String(now.getMinutes()).padStart(2, '0'));
    setSeconds(String(now.getSeconds()).padStart(2, '0'));
  };

  // Efecto para actualizar el reloj en tiempo real cada segundo
  useEffect(() => {
    let intervalId;
    if (isRealTime) {
      updateClock(); // Actualiza inmediatamente la primera vez
      intervalId = setInterval(updateClock, 1000); // Actualiza cada segundo
    }
    return () => clearInterval(intervalId);// Limpia el intervalo cuando el componente se desmonta o isRealTime cambia a falso
  }, [isRealTime]);

  // Efecto para establecer la hora a '00:00' cuando se cambia el modo a 'pomodoro' o 'deepWork'
  useEffect(() => {
    if (timerMode === 'pomodoro' || timerMode === 'deepWork') {
      setHours('00');
      setMinutes('00');
      setSeconds('00');
      setIsRealTime(false); // Detiene el reloj en tiempo real
    }
  }, [timerMode]);
  
  useEffect(() => {
    handleRealTimeClick(); // Activa el reloj en tiempo real al cargar la página
  }, []);
  
  // Efecto para manejar el temporizador de cuenta regresiva
  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);
  
  // Efecto para actualizar la hora, minuto y segundos restantes
  useEffect(() => {
    if (timeLeft > 0) {
      const h = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
      const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
  }, [timeLeft]); 

  // Función para establecer el temporizador en minutos
  const setTimer = (minutes) => {
    setHours(String(Math.floor(minutes / 60)).padStart(2, '0'));
    setMinutes(String(minutes % 60).padStart(2, '0'));
    setSeconds('00'); // Restablece los segundos a '00'
    setTimeLeft(minutes * 60);
    setIsCounting(false);
  };
  // Función para iniciar la cuenta regresiva
  const startCountdown = () => {
    if (timeLeft > 0) {
      setIsCounting(true);
    }
  };
  // Función para pausar la cuenta regresiva
  const pauseCountdown = () => {
    setIsCounting(false);
  };

  // Manejador para el botón "Real Time"
  const handleRealTimeClick = () => {
    pauseCountdown(); // Pausa el temporizador
    setIsRealTime(true); // Activa el modo de tiempo real
    setTimerMode('none'); // Establece el modo a 'none'
    setShowDeepWorkOptions(false);
    setShowPomodoroOptions(false);
  };

  // Manejador para el botón "Pomodoro"
  const handlePomodoroClick = () => {
    setTimerMode('pomodoro'); // Establece el modo a 'pomodoro'
    setIsRealTime(false); // Detiene el reloj en tiempo real
    setShowDeepWorkOptions(false);
    setShowPomodoroOptions(prevState => !prevState);
    if (!showPomodoroOptions) {
      setHours('00'); // Restablece las horas a '00'
      setMinutes('00'); // Restablece los minutos a '00'
      setSeconds('00'); // Restablece los segundos a '00'
      setTimeLeft(0); // Reinicia el tiempo restante
    }
  };

  // Manejador para el botón "Deep Work"
  const handleDeepWorkClick = () => {
    setTimerMode('deepWork'); // Establece el modo a 'deepWork'
    setIsRealTime(false); // Detiene el reloj en tiempo real
    setShowDeepWorkOptions(prevState => !prevState);
    setShowPomodoroOptions(false);
    if (!showDeepWorkOptions) {
      setHours('00'); // Restablece las horas a '00'
      setMinutes('00'); // Restablece los minutos a '00'
      setSeconds('00'); // Restablece los segundos a '00'
      setTimeLeft(0); // Reinicia el tiempo restante
    }
  };

  // Manejador para el botón "Clear"
  const handleClearClick = () => {
    setIsCounting(false); // Pausa el temporizador
    setIsRealTime(false); // Detiene el reloj en tiempo real
    setTimerMode('none'); // Establece el modo a 'none'
    setHours('00'); // Restablece las horas a '00'
    setMinutes('00'); // Restablece los minutos a '00'
    setSeconds('00'); // Restablece los segundos a '00'
    setTimeLeft(0); // Reinicia el tiempo restante
    setShowDeepWorkOptions(false);
    setShowPomodoroOptions(false);
  };
 
    // Efecto para mostrar notificaciones en momentos específicos

  useEffect(() => {
    if (timeLeft === 600) {
      toast.info("Quedan 10 minutos", { position: "top-right" });
    } else if (timeLeft === 300) {
      toast.info("Quedan 5 minutos", { position: "top-right" });
    } else if (timeLeft === 180) {
      toast.info("Quedan 3 minutos", { position: "top-right" });
    } else if (timeLeft === 60) {
      toast.info("Queda 1 minuto", { position: "top-right" });
    }
  }, [timeLeft]);

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
        <div 
          className="time-container"
          style={{ color: Themes[selectedTheme].colors.timer }}
        >
        <div className={showDeepWorkOptions ? '' : 'hidden'}>
            <DeepWorkOptions
              oneHour={() => setTimer(60)}
              oneHourAndHalf={() => setTimer(90)}
              startDeepWork={startCountdown}
              pauseDeepWork={pauseCountdown} // Pausa el temporizador
            />
          </div>
          <div className="app-clock"> 
              {/* Muestra la hora usando el componente TimeDisplay */}
              <TimeDisplay
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                style={{ color: Themes[selectedTheme].colors.clock }}
              />
              {/* Muestra los botones de opciones usando el componente TimeOptions */}
              {showClockButtons && (
                <TimeOptions
                  onRealTimeClick={handleRealTimeClick}
                  onPomodoroClick={handlePomodoroClick}
                  onDeepWorkClick={handleDeepWorkClick}
                  onClearClick={handleClearClick}
                  style={{
                    backgroundColor: Themes[selectedTheme].colors.buttons,
                    color: "#fff",
                  }}
                />
              )}
          </div>
          <div className={showPomodoroOptions ? '' : 'hidden'}>
            <PomodoroOptions
            tradicional={() => setTimer(25)}
            mediaHora={() => setTimer(30)}
            startPomodoro={startCountdown}
            pausePomodoro={pauseCountdown} // Pausa el temporizador
            />
          </div>
          
        </div>
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