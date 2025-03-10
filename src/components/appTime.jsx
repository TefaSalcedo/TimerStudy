import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";
import TimeOptions from './appTime/Display/timeOption.jsx';
import TimeDisplay from './appTime/Display/timeDisplay.jsx';
import PomodoroOptions from './appTime/Pomodoro/pomodoro.jsx'
import DeepWorkOptions from './appTime/Deep Work/deepWorkOption.jsx';
import Quote from './Quotes/quote.jsx';
import MenuEditable from './To do/toDo.jsx';
import "./appTime.css";

function TimeComponent() {
  // Estado para las horas (inicializado a '00')
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  // Estado para controlar si el reloj está en tiempo real (inicializado a falso)
  const [isRealTime, setIsRealTime] = useState(false);
  // Estado para controlar el modo del temporizador ('none', 'pomodoro', 'deepWork')
  const [timerMode, setTimerMode] = useState('none');
  // Estado para controlar si se está contando (inicializado a falso)
  const [isCounting, setIsCounting] = useState(false);
  // Estado para controlar el tiempo restante (inicializado a 0)
  const [timeLeft, setTimeLeft] = useState(0);
  // Estado para visualizar opciones de Pomodoro y Deep Work
  const [showDeepWorkOptions, setShowDeepWorkOptions] = useState(false);
  const [showPomodoroOptions, setShowPomodoroOptions] = useState(false);
 

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
 
  return (
    // Contenedor principal
    <div className="app-container"> 
     <div className="app-left">
      <MenuEditable />
     </div>
      <Draggable axis="y">  
       <div className="app-center">
        {/* Contenedor para time*/}
        <div className="time-container">
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
              <TimeDisplay hours={hours} minutes={minutes} seconds={seconds}/>
              {/* Muestra los botones de opciones usando el componente TimeOptions */}
              <TimeOptions
                onRealTimeClick={handleRealTimeClick}
                onPomodoroClick={handlePomodoroClick}
                onDeepWorkClick={handleDeepWorkClick}
                onClearClick={handleClearClick}
              />
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
          <Quote />
        </div>
        </Draggable>
      <div className="app-rigth">
        <p>Hola</p>
      </div>
    </div>
  );
}

export default TimeComponent;